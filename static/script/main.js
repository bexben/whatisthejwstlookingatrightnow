
/*
function updateBar() {
    // This function runs 1/second to update the progress bar

}

function updateObject() {
    // This function runs every time to progress bar hits 100%

}
*/

// dom loaded idk where to put this rn tho


/*
let date = new Date();
let startTime = date.getTime();
let endOffset = 10;
let i = 0;

function count() {
    let date = new Date();
    let curTime = date.getTime();
    let endTime = curTime + endOffset;

    if (endTime > curTime) {
        console.log(endTime)
        console.log(curTime)
        i += 1;
    } else {
        console.log('done!')
    }
    console.log(i)
    
    
}

setInterval(count, 1000);
*/

/*
function updateBar(progressbar) {
    //let d = new Date();
    //let time = d.getTime();

    percentage = currentTime / duration * 100;
    output = 'width:' + percentage + '%';
    progressbar.setAttribute('style', output);
    progressbar.innerHTML = percentage + '%';
    console.log(currentTime + 'f');
    if (currentTime < duration) {
        currentTime += 1;
        console.log(currentTime);
    } else {
        console.log('done');
    }
    setInterval(updateBar(progressbar), 1000);
    
}
*/

/*
function updateBar() {
    document.getElementById("bar").setAttribute('style', 'width:75%');
    document.getElementById("bar").innerHTML = '75%'
} */

window.onload = function() {
    //targets.updateObject = updateObject;
    targets.updateObject();
    targets.updateTime();
}
/*
function updateTime() {

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
    console.log(targets.data[5])
    $("#objectTimeElapsed").text(targets.data[5]);

}

function updateData() {
    
}
*/