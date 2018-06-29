
//Declaring initial variables for user inputs
var trainName;
var trainDestination;
var trainTime;
var trainFrequency;

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