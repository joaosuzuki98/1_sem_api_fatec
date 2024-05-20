from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from openpyxl import load_workbook
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import variables
import datetime
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

    mes = datetime.datetime.now().strftime('%h')
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
     # Dicionário para armazenar as médias por data e por atributo
    media_por_dia_e_atributo = defaultdict(lambda: defaultdict(float))

    # Consultar os dados do banco de dados agrupados por data
    dados_por_dia = db.session.query(Data.date, Data.soil_humidity, Data.ambient_humidity, Data.ambient_temperature, Data.water_volume).all()

    # Calcular a média para cada dia e para cada atributo
    for data, soil_humidity, ambient_humidity, ambient_temperature, water_volume in dados_por_dia:
        media_por_dia_e_atributo[data]["soil_humidity"] += soil_humidity
        media_por_dia_e_atributo[data]["ambient_humidity"] += ambient_humidity
        media_por_dia_e_atributo[data]["ambient_temperature"] += ambient_temperature
        media_por_dia_e_atributo[data]["water_volume"] += water_volume

    # Dividir a soma pelo número de entradas para obter a média
    for data, valores in media_por_dia_e_atributo.items():
        quantidade_entradas = len([d for d, *_ in dados_por_dia if d == data])
        for atributo in valores:
            media_por_dia_e_atributo[data][atributo] /= quantidade_entradas

    # Agora você tem um dicionário onde as chaves são as datas e os valores são dicionários contendo as médias de cada atributo para cada dia

    # Exibir o dicionário (opcional)
    print(media_por_dia_e_atributo)

    return render_template('show_data.html', )


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


@app.route("/statistics")
def statistics():
    return render_template('statistics.html',media_por_dia_e_atributo=media_por_dia_e_atributo)


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
                    info.date = datetime.datetime.strptime(str(sheet.cell(row=row, column=2).value).split(" ")[0], "%Y-%m-%d")
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
