import requests
import os
from datetime import datetime, timedelta
import pandas as pd

'''url = "https://www.stsci.edu/files/live/sites/www/files/home/jwst/science-execution/observing-schedules/_documents/2220304f02_report_20220722.txt"
r = requests.get(url)
open('testfile1.txt', 'wb').write(r.content)'''
path = os.getcwd()
# print(os.listdir())
txtfiles = []

def main():
    ####~~~~ ----.TXT GRABBER---- ~~~~####
    # The following block of code grabs the schedules which have been downloaded
    # ALl schedules are .txt with the same file structure
    for file in os.listdir():
        # for file in file:
        if(file.endswith(".txt")):
            print(file)
            txtfiles.append(os.path.join(file))

    # Getting today's calendar day as that is what the schedule filename is based off of.
    utc = datetime.utcnow()
    utcday = datetime.date(utc).day 

    # last 2 digits represent day that the schedule starts
    # This block of code grabs those last two digits and stores it.
    days = []
    for count, file in enumerate(txtfiles):
        days.append(int(file[-6:-4]))

    # Grabbing the relevant schedules that are of today's date or further out.
    scheduletxt = []
    for count, txtday in enumerate(days):
        diff = txtday - utcday
        if diff >= -7:  # i doubt this will fail but it might if the gaps ever are larger than 7 days loll
            scheduletxt.append(txtfiles[count]) # scheduletxt is the filename of the relevant schedule.

    # print(scheduletxt)

    ####~~~~ ----END .TXT GRABBER---- ~~~~####

    ####~~~~ ----PARSER---- ~~~~####

    columns = ['PCS MODE', 'VISIT TYPE', 'SCHEDULED START TIME', 'DURATION', 'SCIENCE INSTRUMENT', 
                    'TARGET NAME', 'CATEGORY', 'KEYWORDS', 'ADDITIONAL INSTRUMENTATION', 'PRIME']
    df = pd.DataFrame(columns=columns)

    for count, file in enumerate(scheduletxt):
        scheduleStr = []
        initialLen = df.shape[0]
        print(file)
        with open(file) as f:
            myline = f.readline()
            while myline:
                myline = f.readline()
                if len(myline) > 2:
                    if myline[4] == ':' or myline[27:47] == 'COORDINATED PARALLEL':
                        scheduleStr.append(myline)

        # Creating final dataframe for all object data to be stored and eventually sent through the JavaScript
        
        for count, object in enumerate(scheduleStr):
            if len(object) > 150 and not object[28] == ' ':
                # Normal object 
                mode = object[15:24].strip()
                type = object[27:52].strip()
                start = datetime.fromisoformat(object[58:77])
                instrument = object[93:143].strip()
                target = object[145:176].strip()
                category = object[178:207].strip()
                keywords = object[210:].strip()
                duration = timedelta(days=int(object[80:82]), hours=int(object[83:85]), minutes=int(object[86:88]), seconds=int(object[89:91]))
                zero = 0
                print(df)
                '''df = pd.concat([df, {'PCS MODE':mode,
                            'VISIT TYPE':type,
                            'SCHEDULED START TIME':start,
                            'DURATION':duration,
                            'SCIENCE INSTRUMENT':instrument,
                            'TARGET NAME':target,
                            'CATEGORY':category,
                            'KEYWORDS':keywords,
                            'ADDITIONAL INSTRUMENTATION':zero,
                            'PRIME':True}], ignore_index=True)'''
                df = pd.concat([])

            elif object[58:77] == '^ATTACHED TO PRIME^':
                # Another instrument in same observation period
                mode = object[15:24].strip()
                type = object[27:52].strip()
                instrument = object[93:143].strip()
                df = df.append({'PCS MODE':mode,
                            'VISIT TYPE':type,
                            'SCIENCE INSTRUMENT':instrument}, ignore_index=True)
                # Set additonal instrumentation of previous non-prime row to += 1
                i = 1

                while True:
                    if df.loc[count-i+initialLen, 'PRIME'] == True:
                        currentval = int(df.loc[count-i+initialLen, 'ADDITIONAL INSTRUMENTATION'])
                        df.loc[count-i+initialLen, 'ADDITIONAL INSTRUMENTATION'] = currentval + 1
                        break
                    else:
                        i += 1
                    
            elif object[27:47] == 'COORDINATED PARALLEL':  
                # Another project in same observation period
                instrument = object[93:143].strip()
                df = df.append({'SCIENCE INSTRUMENT':instrument}, ignore_index=True)
                # Set additonal instrumentation of previous non-prime row to += 1 
                i = 1
                while True:
                    if df.loc[count-i+initialLen, 'PRIME'] == True:
                        currentval = int(df.loc[count-i+initialLen, 'ADDITIONAL INSTRUMENTATION'])
                        df.loc[count-i+initialLen, 'ADDITIONAL INSTRUMENTATION'] = currentval + 1
                        break
                    else:
                        i += 1
            elif object[27:43] == 'PRIME UNTARGETED':
                # dark frames
                mode = object[15:24].strip()
                type = object[27:52].strip()
                start = datetime.fromisoformat(object[58:77])
                duration = timedelta(days=int(object[80:82]), hours=int(object[83:85]), minutes=int(object[86:88]), seconds=int(object[89:91]))
                instrument = object[93:143].strip()
                df = df.append({'PCS MODE':mode,
                            'VISIT TYPE':type,
                            'SCHEDULED START TIME':start,
                            'DURATION':duration,
                            'SCIENCE INSTRUMENT':instrument,}, ignore_index=True)
                
            else: 
                print('oopsy woopsy')
                print(object)

    df = df.transpose()
    filename = str(utcday) + '.json'
    df.to_json(filename)

    ####~~~~ ----END PARSER---- ~~~~####

    ####~~~~ ----NAME FIXER-UPPER---- ~~~~####


if __name__ == '__main__':
    main()