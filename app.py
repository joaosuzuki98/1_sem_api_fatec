from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from openpyxl import load_workbook
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import distinct
from filters import enumerate_filter
import variables
import datetime
app = Flask(__name__)
ALLOWED_EXTENSIONS = {'xlsx'}


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

# tabela para armazenar a senha
class Code(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String, nullable=False)


with app.app_context():
    db.create_all()

# Registrando o filtro criado em filters.py
app.jinja_env.filters['enumerate'] = enumerate_filter


@app.route("/")
def index():
    overview_list = zip(variables.svg_overview_list, variables.overview_desc)

    # Realizando um select * em nossa tabela e guardando estes valores em
    # uma variável
    dados_db = Data.query.all()

    # Aqui estou pegando todos os valores do campo date e os tornando único,
    # pois há vários dias iguais gravados no banco de dados
    datas = db.session.query(distinct(Data.date)).all()

    datas_index = 0  # variável necessária para atribuir ao atributo key a data completa

    return render_template(
        'index.html',
        overview_list=overview_list,
        dados_db=dados_db,
        datas=datas,
        datas_index=datas_index)


@app.route("/trocar", methods=["POST"])
def trocar():
    with app.app_context():
        codigo = Code.query.first()
        senha = request.form["senha"]
        senhanv = request.form['senhanv']

        # Validação dos campos
        if not senha or not senhanv:
            return render_template("delete_data.html", error="Por favor, preenocha tods os campos.")

        if codigo.password == senha:
            if len(senhanv) < 6:  
                return render_template("delete_data.html", error="O novo código deve ter pelo menos 6 caracteres.")

            # Atualiza o código para o novo código fornecido
            codigo.password = senhanv
            db.session.commit()
            return render_template("delete_data.html", success="Código atualizado com sucesso.")
    return render_template("delete_data.html", error="Senha incorreta.")


@app.route("/show-data")
def show_data():
    data = request.args.get('date')
    data = data.split()
    ano = data[0].replace('datetime.date', '').replace('(', '').replace(',', '')
    mes = data[1].replace(',', '')
    dia = data[2].replace(')', '').replace(',', '')

    if len(mes) < 1:
        mes = f'0{mes}'

    if len(dia) < 2:
        dia = f'0{dia}'

    all_dates = Data.query.filter_by(date=f'{ano}-{mes}-{dia}').all()
    return render_template('show_data.html', all_dates=all_dates)


@app.route("/add-data")
def add_data():
    return render_template('add_data.html')


@app.route("/delete-data")
def delete_data():
    data = request.args.get('date')
    data = data.split()
    ano = data[0].replace('datetime.date', '').replace('(', '').replace(',', '')
    mes = data[1].replace(',', '')
    dia = data[2].replace(')', '').replace(',', '')

    # Valor que irá aparecer na bolinha vermelha
    dia_swiper = dia
    if len(mes) < 1:
        mes = f'0{mes}'

    if len(dia) < 2:
        dia = f'0{dia}'

    # Valor que será salvo no atributo key
    date_key = f'{ano}-{mes}-{dia}'
    return render_template('delete_data.html', date_key=date_key, dia_swiper=dia_swiper)


@app.route("/del-dia", methods=["POST"])
def del_dia():
    data = request.args.get('date')
    data = datetime.datetime.strptime(data, "%Y-%m-%d").date()
    print(data)

    senha = request.form['senha']
    with app.app_context():
        codigo = Code.query.first()
    if senha == codigo.password:
        db.session.query(Data).filter_by(date=data).delete()
        db.session.commit()
        return render_template("delete_data.html", success="Dia deletado com sucesso.")
    return render_template("delete_data.html", error="Código de segurança errado.")


@app.route("/statistics")
def statistics():
    return render_template('statistics.html')


@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
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

