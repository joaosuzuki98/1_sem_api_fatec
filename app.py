from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from openpyxl import load_workbook
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import variables
from datetime import datetime

app = Flask(__name__)
codigo = 'c0d1g0'
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


@app.route("/",methods=['POST','GET'])
def index():
    overview_list = zip(variables.svg_overview_list, variables.overview_desc)

    mes=datetime.now().strftime('%h')       
    return render_template('index.html', overview_list=overview_list,codigo=codigo,mes=mes)

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




@app.route("/show-data",methods=["POST","GET"])
def show_data():
    return render_template('show_data.html')


@app.route("/add-data",methods=["POST"])
def add_data():
    
    senha = request.form['senha']  # Obtém o valor do campo 'ano' do formulário
    if senha == codigo:
        return render_template("add_data.html")
    else:
        return redirect(url_for("index"))
    
  

@app.route("/delete-data",methods=["POST","GET"])
def delete_data():
    senha = request.form['senha']  # Obtém o valor do campo 'ano' do formulário
    if senha == codigo:
        return render_template("delete_data.html")
    else:
        return redirect(url_for("index"))
    


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

            for row in range(25934, 25941):
                table_html += "<tr>"
                for col in range(2, 7):
                    cell = sheet.cell(row=row, column=col)
                    table_html += f"<td style='color: black'>{cell.value}</td>"
                table_html += "</tr>"

            return render_template("add_data.html", table_html=table_html)
