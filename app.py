from flask import Flask, render_template, request
import os
from openpyxl import load_workbook
from werkzeug.utils import secure_filename
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
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

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/show-data")
def show_data():
    return render_template('show_data.html')

@app.route("/add-data")
def add_data():
    return render_template('add_data.html')

@app.route("/delete-data")
def delete_data():
    return render_template('delete_data.html')

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
                    table_html += f"<td>{cell.value}</td>"
                table_html += "</tr>"

            return render_template("add_data.html", table_html=table_html)
