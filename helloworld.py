# A very simple Flask Hello World app for you to get started with...

from flask import Flask
import datetime

app = Flask(__name__)

def scheduleParser():
    localTime = datetime.datetime.now()
    utcTime = datetime.datetime.utcnow()

    

@app.route('/')
def hello_world():

    return 'Hello from Flask!'
