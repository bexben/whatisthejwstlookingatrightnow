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
            if (startTime > time) {
                console.log("Current Target: " + scheduleJSON[index]["TARGET NAME"]);
                return(scheduleJSON[index]["TARGET NAME"]);
            }
        }
    },

    loadSchedule: function () {
        scheduleUrl = '/schedule';

        var request = new XMLHttpRequest ();
        request.open("GET", scheduleUrl, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && (request.status == 200 || request.status == 0)) {
                // Sending json to the parser 
                schedule = JSON.parse(request.responseText);
                targets.getCurrentTarget(schedule)


            }
        }
        request.send();
       //document.getElementById('fuck').innerHTML = 'shit';
    }

} 
