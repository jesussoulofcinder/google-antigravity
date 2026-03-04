from flask import Flask, render_template, jsonify
from data import TALKS, SPEAKERS
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def index():
    # Providing the current date from the server side as a fallback or passing directly
    today = datetime.now().strftime("%B %d, %Y")
    return render_template("index.html", talks=TALKS, speakers=SPEAKERS, today=today)

@app.route("/api/talks")
def get_talks():
    return jsonify(TALKS)

@app.route("/api/speakers")
def get_speakers():
    return jsonify(SPEAKERS)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
