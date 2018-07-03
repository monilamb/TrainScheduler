newTrain = {
    name: "",
    destination: "",
    firsttraintime: "",
    frequency: 0,
 }


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMHVFr6neWGNe5rYDH2dqj5wod4hswklg",
    authDomain: "new-proj-d2dfb.firebaseapp.com",
    databaseURL: "https://new-proj-d2dfb.firebaseio.com",
    projectId: "new-proj-d2dfb",
    storageBucket: "new-proj-d2dfb.appspot.com",
    messagingSenderId: "540482193571"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
  

 $("#submit").on("click", function(event){

    event.preventDefault();

        //this will get the text from the form and save it to variables
        newTrain.name = $("#train-name").val().trim();
        newTrain.destination = $("#destination").val().trim();
        newTrain.firsttraintime = $("#first-train-time").val().trim();
        newTrain.frequency = $("#frequency").val().trim();

    //console logging the variables to make sure it is correct
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firsttraintime);
    console.log(newTrain.frequency);

    
    //then the object is pushed into the database
    database.ref().push({
        name: newTrain.name,
        destination: newTrain.destination,
        firsttraintime: newTrain.firsttraintime,
        frequency: newTrain.frequency,
    });



 });

 //when a new object is added to the database, this function will be performed
 database.ref().on("child_added", function(snapshot){
    //this will populate the table with each entry in the database
    var row = $("<tr>");
 
    var data1 = $("<td>");
    $(data1).html(snapshot.val().name);
    row.append(data1);
 
    var data2 = $("<td>");
    $(data2).html(snapshot.val().destination);
    row.append(data2);

    var data3 = $("<td>");
    $(data3).html(snapshot.val().frequency);
    row.append(data3);
 
    var data4 = $("<td>");
    

    //this calculates the amount of time till the next train comes and at what time it will arrive

    var time = snapshot.val().firsttraintime;    
    var frequent = snapshot.val().frequency;
    // console.log(frequent+" esto es frequency");
    var momentTime = moment(time, "HH:mm").format("HH:mm");
    // console.log(momentTime+" esto es first train time");
    var currentTime = moment(new Date()).format("HH:mm");
    // console.log(currentTime+"esto es current time");

    var howmuch =frequent - ((moment(time, "HH:mm").diff(moment(currentTime, "HH:mm"), "minutes"))%frequent * -1);
    var arrivaltime = moment(new Date()).add(howmuch, "minutes").format("HH:mm");
    // console.log(arrivaltime + "En esto llega el fkn train");

    $(data4).html(arrivaltime);
    row.append(data4);
    
    var data5 = $("<td>");
    $(data5).html(howmuch);
    row.append(data5);

  

 
    $("table").append(row);
 },function(errorObject){
    console.log("The read failed: " + errorObject.code);
 });