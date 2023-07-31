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
                this.data = [
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
                console.log(this.data)
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
        //document.getElementById('fuck').innerHTML = 'shit';
        });
    },

    updateObject: function() {
        var self = this;
        // getting the current target
        targets.loadSchedule()
            .then(function (schedule) {
                targets.getCurrentTarget(schedule);
                console.log(self.data);
            })
        .catch(function (error) {
            console.error(error);
        })
        // Updating HTML 
        console.log(this.data);
        //$("#objectName").text(this.data[5])  // target name
    }

} 
