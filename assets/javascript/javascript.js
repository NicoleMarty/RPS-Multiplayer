  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyAWs-znREwUaEfvGy-pQ2FLdP3YLNmlMcQ",
      authDomain: "rps-multiplayer-4eaf2.firebaseapp.com",
      databaseURL: "https://rps-multiplayer-4eaf2.firebaseio.com",
      projectId: "rps-multiplayer-4eaf2",
      storageBucket: "rps-multiplayer-4eaf2.appspot.com",
      messagingSenderId: "1014367079911",
      appId: "1:1014367079911:web:b3e618ed921fe9cb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database.
  var database = firebase.database();

  // -----------------------------

  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");

  // '.info/connected' is a special location provided by Firebase that is updated
  // every time the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");

  // When the client's connection state changes...
  connectedRef.on("value", function(snap) {

      // If they are connected..
      if (snap.val()) {

          // Add user to the connections list.
          var con = connectionsRef.push(true);
          // Remove user from the connection list when they disconnect.
          con.onDisconnect().remove();
      }
  });

  // When first loaded or when the connections list changes...
  connectionsRef.on("value", function(snap) {

      // Display the viewer count in the html.
      // The number of online users is the number of children in the connections list.
      $("#connected-viewers").text(snap.numChildren());
  });

  // ------------------------------------
  // Initial Values
  var playerArray = ["player1", "player2"];
  var choiceArray = ["rock", "paper", "scissors"];
  var userGuess = "";
  var roundWinner = "";


  var initialBidder = "No one :-(";
  var highPrice = initialBid;
  var highBidder = initialBidder;


  // Capture Button Click
  $("user-choice").on("click", function(event) {
      // prevent page from refreshing when form tries to submit itself
      event.preventDefault();

      // Capture user inputs and store them into variables
      var userGuess = $("#name-input").val().trim();

      // Console log each of the user inputs to confirm we are receiving them
      console.log(name);

      // Replaces the content in the "recent-member" div with the new info
      $("#results").text(name);

  });