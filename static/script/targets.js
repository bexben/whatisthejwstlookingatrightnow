var targets = {
    /* Data structure: */
    /*
    PCS MODE	
    VISIT TYPE	
    SCHEDULED START TIME	
    DURATION	
    SCIENCE INSTRUMENT	
    TARGET NAME	
    CATEGORY	
    KEYWORDS	
    ADDITIONAL INSTRUMENTATION	
    PRIME
    */


    data: [],
    nextTargetData: [],

    onScheduleReadyCallback: null,

    getCurrentTarget: function (scheduleJSON) {
        keys = Object.keys(scheduleJSON)
        const d = new Date();
        let time = d.getTime();
        for (let index = 0; index < keys.length; index++) {
            // console.log(scheduleJSON[index]["SCHEDULED START TIME"])
            startTime = scheduleJSON[index]["SCHEDULED START TIME"];
            //console.log(startTime)
            if (startTime > time) {
                console.log("Current Target: " + scheduleJSON[index]["TARGET NAME"]);
                // edits 'data' variable which is visible to all functions in this var
                targets.data = [
                    scheduleJSON[index]["PCS MODE"],
                    scheduleJSON[index]["VISIT TYPE"],
                    scheduleJSON[index]["SCHEDULED START TIME"],
                    scheduleJSON[index]["DURATION"],
                    scheduleJSON[index]["SCIENCE INSTRUMENT"],
                    scheduleJSON[index]["TARGET NAME"],
                    scheduleJSON[index]["CATEGORY"],
                    scheduleJSON[index]["KEYWORDS"],
                    scheduleJSON[index]["ADDITIONAL INSTRUMENTATION"],
                    scheduleJSON[index]["PRIME"],
                ]
                targets.nextTargetData = [
                    scheduleJSON[index+1]["PCS MODE"],
                    scheduleJSON[index+1]["VISIT TYPE"],
                    scheduleJSON[index+1]["SCHEDULED START TIME"],
                    scheduleJSON[index+1]["DURATION"],
                    scheduleJSON[index+1]["SCIENCE INSTRUMENT"],
                    scheduleJSON[index+1]["TARGET NAME"],
                    scheduleJSON[index+1]["CATEGORY"],
                    scheduleJSON[index+1]["KEYWORDS"],
                    scheduleJSON[index+1]["ADDITIONAL INSTRUMENTATION"],
                    scheduleJSON[index+1]["PRIME"],
                ]
                console.log(targets.data)
                break;
            }
        }
        console.log('actual time: ' + String(time))
    },

    loadSchedule: function () {
        return new Promise(function (resolve, reject) {
            var scheduleUrl = '/schedule';
            var request = new XMLHttpRequest ();

            request.open("GET", scheduleUrl, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200 || request.status === 0) {
                      var schedule = JSON.parse(request.responseText);
                      resolve(schedule); // Resolve the promise with the fetched data
                    } else {
                      reject(new Error('Failed to fetch schedule')); // Reject the promise in case of an error
                    }
                }
            };
            request.send();
        });
    },

    // This is great, but I need to store the schedule somehow so there aren't client requests all the time
    // to /schedule
    updateObject: function(callback) {
        var self = this;
        //self.data = [3]
        // getting the current target
        targets.loadSchedule()
            .then(function (schedule) {
                targets.getCurrentTarget(schedule);
                console.log(self.data);
                $("#objectName").text(self.data[5])  // target name
                $("#objectType").text(self.data[6])  // target type
                $("#upNextTarget").text(self.nextTargetData[5])  // next target
                $("#upNextType").text(self.nextTargetData[6])
                //targets.updateTime();
                callback();
            })
        .catch(function (error) {
            console.error(error);
        })
        // Updating HTML 
        //console.log(this.data);
        //$("#objectName").text(this.data[5])  // target name
    },

    /*
    onScheduleReadyCallback: function() {
        // Updates progress bar once a second. 
        timeUpdater = setInterval(updateTime, 1000);
    },
    */

    updateTime: function() {
        var self = this
        // First I must calculate the current time through the observation
        // note all times are in milliseconds i think
        const d = new Date();
        let time = d.getTime();
        let startTime = targets.data[2];
        let duration = targets.data[3];
        let lookingTime = time - startTime;
    
        // Then I must put that into hour/min/sec
        let time_looking_days = Math.floor(lookingTime/86400/1000);
        let time_looking_hours = Math.floor(lookingTime/3600/1000);
        let time_looking_minutes = Math.floor(lookingTime/60/1000);
        let time_looking_seconds = Math.floor(lookingTime/1000);
    
        // THen I must put in percentage
        let percentage_complete = lookingTime/duration
        
        // Then I must update all the elements
        let time_printed = 'It has been looking for ';
        if (time_looking_days > 0) {
            time_printed += (String(time_looking_days) + ' days,');
        }
        if (time_looking_hours > 0) {
            time_printed += (String(time_looking_hours) + ' hours,');
        }
        console.log('shit');
        console.log(targets.data);
        
        console.log(targets.data[3]);
        $("#objectTimeElapsed").text(lookingTime);
    
    }
} 
