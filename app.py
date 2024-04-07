from flask import Flask, render_template


app = Flask("__name__")


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/show-data")
def show_data():
    return render_template('show_data.html')
