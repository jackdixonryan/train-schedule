
//Declaring initial variables for user inputs
var trainName;
var trainDestination;
var trainTime;
var trainFrequency;

//Defining a variable based on the current time
var d = new Date();
console.log(d);

//Dividing it into the components we actually need
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

//global clock is an interval that transpires every second;
var globalClock = setInterval(function() {

    //Adds one second to the clock every second...
    seconds++;

    //Evaluates based on our time scale to ensure the clock isn't all wonky.
    if (seconds > 59) {
        minutes++;
        seconds = 00;
    }
    if (minutes > 59) {
        hours++;
        minutes = 00;
    }

    //Concatenates to display as the proper format. Need to find a means of showing the 0 ahead of single-digit numbers, but my attempts to do so have proven ineffective.
    var currentTime = hours + ":" + minutes + ":" + seconds;

    //To the DOM with you!
    $("#current-time").text(currentTime);

}, 1000);

//Will go in the table, eventually.
var minutesAway;
var hoursAway;

//now to compare our trains' arrival dates against the global clock
var nextArrivals = setInterval(function() {
    minutesAway 

});


//On clicking submit...
$("#submit").on("click", function() {
    //Updating initial variables with user inputs. 
    trainName = $("#name").val()
    trainDestination = $("#destination").val()
    trainTime = $("#first-time").val()
    trainFrequency = $("#frequency").val()

    //Emptying fields for better UX
    $("#name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");

    //For bug checking--checkeroo
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    //creating a new row element for the table.
    var newTableRow = $("<tr>");

    //Now all at once, add the input information to the new table row.
    $(newTableRow).html("<th scope='row'>" + trainName + "</th><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainTime);

    //Checkeroo, except that the form doesn't perfectly align with the data needed to populate the table. That comes later.
    $("#table").append(newTableRow);

});