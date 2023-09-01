from flask import Flask, render_template
import datetime
from datetime import datetime

app = Flask(__name__)
path = r'D:\Ben\School\_LPDT\Python code\whatisthejwstlookingatrightnow'
#path=r'' for pythonanywhere

def times():
    localTime = datetime.now()
    utcTime = datetime.utcnow()
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
    # utc = datetime.utcnow()
    # utcday = datetime.date(utc).day 
    # try:
    #     return_template = render_template(f'{utcday}.json')
    # except OSError:
    #     return_template = render_template(f'{utcday-1}.json')'''
    
    return render_template('schedule.json')
    

if __name__ == '__main__':
    app.run(debug=False)
