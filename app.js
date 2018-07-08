//Initializing the Firebase configuration.
var config = {
    apiKey: "AIzaSyB119InCHHmAJR6v4KpCZe08lgTV6eEbsk",
    authDomain: "timesheet-99bd6.firebaseapp.com",
    databaseURL: "https://timesheet-99bd6.firebaseio.com",
    projectId: "timesheet-99bd6",
    storageBucket: "timesheet-99bd6.appspot.com",
    messagingSenderId: "985761687542"
};

firebase.initializeApp(config);

//database assigned to a database variables. 
var database = firebase.database();

//Declaring initial variables for user inputs and for the current time.
var trainName;
var trainDestination;
var trainTime;
var trainFrequency;


//On referencing the database...
database.ref().on("child_added", function(snapshot) {

    var newTime = moment();
    console.log("New current time", newTime);
    var newTimeObj = moment(snapshot.val().firstTime, "hh:mm");
    console.log("New First Time: ", newTimeObj)
    var newDifference = newTime.diff(newTimeObj, 'minutes');
    console.log("Time between there and now:", newDifference)

    var newWaitTime = snapshot.val().frequency - (newDifference % snapshot.val().frequency);
    //snapshot.val().timeUntilNext = newWaitTime
    console.log("Your new wait time is", newWaitTime)

    var newTableRow = $("<tr>");

    database.ref().update({
        timeUntilNext: newWaitTime
    });

    $(newTableRow).html("<th scope='row'>" + snapshot.val().name + "</th><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().firstTime + "</td><td>" + newWaitTime + "</td>");

    $("#table").append(newTableRow);

});

//On clicking submit...
$("#submit").on("click", function() {

    trainName = $("#name").val()
    trainDestination = $("#destination").val()
    trainTime = $("#first-time").val()
    trainFrequency = $("#frequency").val();

    var time = moment();
    //Take the first train time and set it to a moment.
    var firstTimeObj = moment(trainTime, "hh:mm");
    console.log(firstTimeObj)
    //Take the different between then and now. 
    var difference = time.diff(firstTimeObj, 'minutes');
    //Correct the difference figure if it's in the future rather than in the past (eg, if it returns a negative value).
    if (difference < 0) {
        difference = difference + 1440;
    }
    //Calculate the time until the next train based on the frequency of the train's running subtracting the difference between that time and now.
    var timeUntil = trainFrequency - (difference % trainFrequency);
    console.log(timeUntil)


    database.ref().push({
        name: trainName,
        firstTime: trainTime,
        destination: trainDestination,
        frequency: trainFrequency,
        timeUntilNext: timeUntil
    });

    //Emptying fields for better UX
    $("#name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");

});