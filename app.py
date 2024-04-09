from flask import Flask, render_template


app = Flask("__name__")


@app.route("/")
def home():
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
