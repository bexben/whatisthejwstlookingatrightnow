
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

function onScheduleReadyCallback() {
    // Updates progress bar once a second. 
    timeUpdater = setInterval(targets.updateTime, 1000);
}

window.onload = function() {
    //targets.updateObject = updateObject;
    targets.updateObject(onScheduleReadyCallback);
}


