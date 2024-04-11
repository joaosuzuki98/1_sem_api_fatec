from flask import Flask, render_template, request, redirect, url_for
import os  # Import for os.path.join
from openpyxl import load_workbook
from werkzeug.utils import secure_filename

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'xlsx'}  # Allowed Excel file extensions

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/show_data")
def show_data():
    return render_template('data.html')

@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        file = request.files["file"]
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

            return render_template("data.html", table_html=table_html)

if __name__ == "__main__":
    app.run(debug=True)