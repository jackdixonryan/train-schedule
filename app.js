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
var timeUntil;


//On referencing the database...
database.ref().on("child_added", function(snapshot) {

    //setting a new time equal to the current time using the moment api.
    var time = moment();
    //Formatting the firstTime database value into a moment with hour:minute value.
    var timeObj = moment(snapshot.val().firstTime, "hh:mm");

    //Calculates the difference between the current moment and the former moment.
    var difference = time.diff(timeObj, 'minutes');

    //The wait time is equal to the remainder of the difference in time between the train's original departure and our current moment subtracted from the frequency of the train's arrival.
    var waitTime = snapshot.val().frequency - (difference % snapshot.val().frequency);

    //Updating the value for time until next train on the database.
    database.ref().update({
        timeUntilNext: waitTime
    });

    //Using jQuery API to create a new table row for each element in the firebase. 
    var newTableRow = $("<tr>");

    //Populating the table row all at once with all necessary values.
    $(newTableRow).html("<th scope='row'>" + snapshot.val().name + "</th><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().firstTime + "</td><td>" + waitTime + "</td>");

    //Adding the values to the table.
    $("#table").append(newTableRow);

});

//On clicking submit...
$("#submit").on("click", function() {

    //Take the entries from the form and assign them to variables declared above.
    trainName = $("#name").val()
    trainDestination = $("#destination").val()
    trainTime = $("#first-time").val()
    trainFrequency = $("#frequency").val();

    currentTime = moment();
    originalTime = moment(trainTime, "hh:mm");
    originalDifference = currentTime.diff(originalTime, "minutes");
    originalWaitTime = trainFrequency - (originalDifference % trainFrequency);

    //Push said variables to the Firebase.
        database.ref().push({
            name: trainName,
            firstTime: trainTime,
            destination: trainDestination,
            frequency: trainFrequency,
            timeUntilNext: originalWaitTime
        });

        //Empty the fields for better UX in the event that the user wants to add another train.
        $("#name").val("");
        $("#destination").val("");
        $("#first-time").val("");
        $("#frequency").val("");
    
});