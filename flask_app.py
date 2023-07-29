from flask import Flask, render_template
import datetime
import os

app = Flask(__name__)
path = r'D:\Ben\School\_LPDT\Python code\whatisthejwstlookingatrightnow'
#path=r'' for pythonanywhere


# def getSchedule():


def times():
    localTime = datetime.datetime.now()
    utcTime = datetime.datetime.utcnow()
    return localTime, utcTime

@app.route('/')  
def hello_world():
    ##return 'Hello World!'
    localTime, utcTime = times()
    # scheduleFilename = getSchedule()
    # scheduleParser(scheduleFilename)
    return render_template('index.html', localTime=localTime, utcTime=utcTime)

@app.route('/schedule')
def scheduleJson():
    # Change 23.json to todays date code
    return render_template('23.json')
    

    

if __name__ == '__main__':
    app.run(debug=True)