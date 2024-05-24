from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from openpyxl import load_workbook
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import variables
from datetime import datetime , timedelta
from collections import defaultdict
app = Flask(__name__)
codigo = 'c0d1g0'
ALLOWED_EXTENSIONS = {'xlsx'}
hjdia='12'
hjmes='09'
hjano='2023'

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in \
        ALLOWED_EXTENSIONS


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)


class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    soil_humidity = db.Column(db.Float, nullable=False)
    ambient_humidity = db.Column(db.Float, nullable=False)
    ambient_temperature = db.Column(db.Float, nullable=False)
    water_volume = db.Column(db.Float, nullable=False)


with app.app_context():
    db.create_all()


@app.route("/")
def index():
    overview_list = zip(variables.svg_overview_list, variables.overview_desc)
    

    # Retornar os dados para o template do Chart.js

    mes = datetime.now().strftime('%h')
    return render_template('index.html', overview_list=overview_list, mes=mes)


@app.route("/trocar", methods=["POST"])
def trocar():
    global codigo
    senha = request.form["senha"]
    senhanv = request.form['senhanv']

    # Validação dos campos
    if not senha or not senhanv:
        return render_template("index.html", error="Por favor, preencha todos os campos.")

    if codigo == senha:
        if len(senhanv) < 6:  
            return render_template("index.html", error="O novo código deve ter pelo menos 6 caracteres.")

        # Atualiza o código para o novo código fornecido
        codigo = senhanv
        return render_template("index.html", success="Código atualizado com sucesso.")

    return render_template("index.html", error="Senha incorreta.")


@app.route("/show-data")
def show_data():
    
    data = request.get_json()
    variable = data['variable']
    # Do something with variable
    
    dados_por_dia = db.session.query(Data).filter_by(date=variable).all()
    return jsonify({'status': 'success'}), 200


@app.route("/add-data")
def add_data():
    return render_template('add_data.html')


@app.route("/delete-data")
def delete_data():
    return render_template('delete_data.html')


@app.route("/del-dia", methods=["POST"])
def del_dia():
    senha = request.form['senha']
    if senha == codigo:
        return render_template("delete_data.html", success="Dia deletado com sucesso.")
    return render_template("delete_data.html", error="Código de segurança errado.")


@app.route("/statistics", methods=["GET", "POST"])
def statistics():
    lista = []
    if request.method == "POST":
        interval = request.form.get("interval")
        if interval:
            interval = int(interval)
            end_date = datetime.now()
            start_date = end_date - timedelta(days=interval)
            lista = [(start_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range((end_date - start_date).days + 1)]
        else:
            date = str(request.form["data"]).split("-")
            dia = int(date[2])
            mes = int(date[1])
            ano = int(date[0])
            datef = str(request.form["dataf"]).split("-")
            diaf = int(datef[2])
            mesf = int(datef[1])
            anof = int(datef[0])

            start_date = datetime(ano, mes, dia)
            end_date = datetime(anof, mesf, diaf)
            
            current_date = start_date
            while current_date <= end_date:
                lista.append(current_date.strftime('%Y-%m-%d'))
                current_date += timedelta(days=1)
        
        print(lista)
    
    listasoilh = []
    listaambienth = []
    listaambientt = []
    listawater = []
    
    for date_str in lista:
        try:
            dia = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400
    
        dados_por_dia = db.session.query(Data).filter_by(date=dia).all()
        if not dados_por_dia:
            return jsonify({"message": f"No data found for {dia}."})

        # Dicionário para armazenar somas e contagens por atributo
        soma_por_atributo = defaultdict(float)
        contagem_por_atributo = defaultdict(int)

      # Calcular a soma e contagem para cada atributo
        for data in dados_por_dia:  
            soma_por_atributo["soil_humidity"] += round(data.soil_humidity, 2)
            soma_por_atributo["ambient_humidity"] += round(data.ambient_humidity, 2)
            soma_por_atributo["ambient_temperature"] += round(data.ambient_temperature, 2)
            soma_por_atributo["water_volume"] += round(data.water_volume*1000, 2)
            contagem_por_atributo["soil_humidity"] += 1
            contagem_por_atributo["ambient_humidity"] += 1
            contagem_por_atributo["ambient_temperature"] += 1
            contagem_por_atributo["water_volume"] += 1
                
        # Calcular as médias
        media_por_atributo = {atributo: round(soma_por_atributo[atributo] / contagem_por_atributo[atributo], 1) for atributo in soma_por_atributo}
        listasoilh.append(media_por_atributo["soil_humidity"])
        listaambienth.append(media_por_atributo["ambient_humidity"])
        listaambientt.append(media_por_atributo["ambient_temperature"])
        listawater.append(media_por_atributo["water_volume"])
       
    print("Lista Soil Humidity:", listasoilh)
    print("Lista Ambient Humidity:", listaambienth)
    print("Lista Ambient Temperature:", listaambientt)
    print("Lista Water Volume:", listawater)
    print(lista)
   

    # Agora você tem um dicionário onde as chaves são as datas e os valores são dicionários contendo as médias de cada atributo para cada dia

    # Exibir o dicionário (opcional)
    

    return render_template('statistics.html', 
                           listasoilh=listasoilh,
                           listaambienth=listaambienth,
                           listaambientt=listaambientt,
                           listawater=listawater,  lista=lista)


@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        table_html = "<table>"
        file = request.files["file"]
        if not os.path.exists('./uploads'):
            os.mkdir('./uploads')

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join("uploads", filename))

            wb = load_workbook(os.path.join("uploads", filename))
            sheet = wb.active
            table_html = "<table>"
            for row in range(1, sheet.max_row + 1):
                try:
                    info = Data()
                    info.date = datetime.strptime(str(sheet.cell(row=row, column=2).value).split(" ")[0], "%Y-%m-%d")
                    info.time = sheet.cell(row=row, column=3).value
                    info.soil_humidity = sheet.cell(row=row, column=4).value
                    info.ambient_humidity = sheet.cell(row=row, column=5).value
                    info.ambient_temperature = sheet.cell(row=row, column=6).value
                    info.water_volume = sheet.cell(row=row, column=7).value
                    db.session.add(info)
                except:
                    table_html += "<tr>"
                    for col in range(2, 7):
                        cell = sheet.cell(row=row, column=col)
                        table_html += f"<td style='color: black'>{cell.value}</td>"
                    table_html += "</tr>"
        db.session.commit()
        return render_template("add_data.html", table_html=table_html)
