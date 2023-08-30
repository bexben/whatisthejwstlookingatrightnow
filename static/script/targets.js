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
                targetIndex = index-1
                console.log("Current Target: " + scheduleJSON[targetIndex]["TARGET NAME"]);
                // edits 'data' variable which is visible to all functions in this var
                targets.data = [
                    scheduleJSON[targetIndex]["PCS MODE"],
                    scheduleJSON[targetIndex]["VISIT TYPE"],
                    scheduleJSON[targetIndex]["SCHEDULED START TIME"],
                    scheduleJSON[targetIndex]["DURATION"],
                    scheduleJSON[targetIndex]["SCIENCE INSTRUMENT"],
                    scheduleJSON[targetIndex]["TARGET NAME"],
                    scheduleJSON[targetIndex]["CATEGORY"],
                    scheduleJSON[targetIndex]["KEYWORDS"],
                    scheduleJSON[targetIndex]["ADDITIONAL INSTRUMENTATION"],
                    scheduleJSON[targetIndex]["PRIME"],
                ]
                targets.nextTargetData = [
                    scheduleJSON[targetIndex+1]["PCS MODE"],
                    scheduleJSON[targetIndex+1]["VISIT TYPE"],
                    scheduleJSON[targetIndex+1]["SCHEDULED START TIME"],
                    scheduleJSON[targetIndex+1]["DURATION"],
                    scheduleJSON[targetIndex+1]["SCIENCE INSTRUMENT"],
                    scheduleJSON[targetIndex+1]["TARGET NAME"],
                    scheduleJSON[targetIndex+1]["CATEGORY"],
                    scheduleJSON[targetIndex+1]["KEYWORDS"],
                    scheduleJSON[targetIndex+1]["ADDITIONAL INSTRUMENTATION"],
                    scheduleJSON[targetIndex+1]["PRIME"],
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

                // Updating start time
                var start_time = self.data[2]; // start time
                var start_date = new Date(start_time);
                var t_s = start_date.toString().split(" ");
                $("#startTime").text(t_s[1] + ' ' + t_s[2] + ' ' + t_s[4])

                // Updating end time
                var end_time = start_time + self.data[3]; // adding duration
                var end_date = new Date(end_time);
                var t_e = end_date.toString().split(" ");
                $("#endTime").text(t_e[1] + ' ' + t_e[2] + ' ' + t_e[4])
                callback();
            })
        .catch(function (error) {
            console.error(error);
        })
        // Updating HTML 
        //console.log(this.data);
        //$("#objectName").text(this.data[5])  // target name
    },

    updateTime: function() {
        var self = this
        // First I must calculate the current time through the observation
        // note all times are in milliseconds i think
        const d = new Date();
        let time = d.getTime();
        let startTime = targets.data[2];
        let duration = targets.data[3];
        let lookingTime = Math.floor((time - startTime)/1000); // get that shit into second
    
        // Then I must put that into hour/min/sec
        let time_looking_days = Math.floor(lookingTime/86400);
        let days_remainder = Math.floor(lookingTime % 86400);

        let time_looking_hours = Math.floor(days_remainder/3600);
        let hours_remainder = Math.floor(lookingTime % 3600);

        let time_looking_minutes = Math.floor(hours_remainder/60);

        let time_looking_seconds = Math.floor(lookingTime % 60);
    
        // THen I must put in percentage
        let percentage_complete = lookingTime/duration
        
        // Then I must update all the elements
        /*
        let time_printed = 'It has been looking for ';
        if (time_looking_days > 0) {
            time_printed += (String(time_looking_days) + ' days,');
        }
        if (time_looking_hours > 0) {
            time_printed += (String(time_looking_hours) + ' hours,');
        }
        */
    
        $("#objectTimeElapsed").text(
            'It has been looking for ' + 
            time_looking_days + ' days, ' + 
            time_looking_hours + ' hours, ' +
            time_looking_minutes + ' minutes, ' + 
            time_looking_seconds + ' seconds, ');
    }
} 
