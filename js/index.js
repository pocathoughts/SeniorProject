var serverAddress = 'http://70.171.6.119:2555/PHP/Controller.php';
  $("#login_form").submit(function(e){
  e.preventDefault();
  alert('inside login')
  var values = $(this).serializeArray();
  var userEmail = values[0].value;
  var userPass = values[1].value;
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    }


    var str = "User Email" + userEmail.toLowerCase();
    str += "\nSession_id = " + JSON.stringify(results.session_id);
    sessionStorage.userEmail = userEmail;
    sessionStorage.session_id = results.session_id;
    alert(str);
    window.location.href ="landingPage.html";
  })
  .fail(function (xhr, data, status) {
    alert( "errorr");
  });
});

//function createUserAccount() {
$("#create_account_form").submit(function(e){
  e.preventDefault();
  alert('inside createAccount')
  var values = $(this).serializeArray();
  var userName = values[0].value;
  var userEmail = values[1].value;
    if(values[2].value == values[3].value)
      var userPass = values[2].value;
    else{
      alert("Passwords do not match!!");
      return
    }
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'CreateUserAccount',email:userEmail, password:userPass,name:userName},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    }
    else {
      alert('success');


      $.ajax( {
        type : 'POST',
        data : {phpFunction:'Login',email:userEmail,password:userPass},
        url  : serverAddress,    //'http://' is required for request.
      })
      .done(function ( data, status ) {
        var newdata = JSON.parse(data);
        var results = newdata.data;
        if(newdata.errcode != 0){
          var str = "Errcode : " + newdata.errcode;
          str += "\nErrno : " + newdata.errno;
          str += "\nErrstr : " + newdata.errstr;
          str += "\nData : " + JSON.stringify(newdata.data);
          alert(str);
          //window.location.href ="";
          return;
        }
        sessionStorage.userEmail = userEmail;
        sessionStorage.session_id = results.session_id;
        alert(sessionStorage.userEmail + "  " + sessionStorage.session_id)
        window.location.href = "signUpAdditionalInfo.html"
      })
      .fail(function (xhr, data, status) {
        alert( "errorr in logging in");
      });
    }
  })
  .fail(function ( data, status ) {
    alert( "errorr in creating" );
  });
});

function getAllClubs(){
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAllClubs'},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      results = results.club_team;
      document.getElementById("ClubTeams").innerHTML = "<h3>All Clubs Requested:</h3>";
      for (i = 0; i< results.length; i++){
        document.getElementById("ClubTeams").innerHTML += "<p>" + results[i] + "</p>";
      }
    }
  }).fail(function (data, status) {
    alert('errorr');
  });
}


function populateDropDownWithClubSports(){
    alert("we are here");
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetAllClubs'},
      url : serverAddress,
    }).done(function (data, status) {
      var newdata = JSON.parse(data);
      var results = newdata.data;
      if(newdata.errcode != 0){
        var str = "Errcode : " + newdata.errcode;
        str += "\nErrno : " + newdata.errno;
        str += "\nErrstr : " + newdata.errstr;
        str += "\nData : " + JSON.stringify(newdata.data);
        alert(str);
      } else {
        results = results.club_team;
        var trimmedClubNames = formatClubString(results);
        //var hi = results.split(",");
        document.getElementById("sports-club-list").innerHTML = "<option>Sports Club Name</option>";
        for (i = 0; i < results.length; i++){
            document.getElementById("sports-club-list").innerHTML += "<option>" + trimmedClubNames[i] + "</option>";
        }
      }
    }).fail(function (data, status) {
      alert('errorr');
    });
}


function formatClubString(sportsClubs){
    var trimmedClubs = [];
    for(i = 0; i < sportsClubs.length; i++){
        var club = sportsClubs[i].split(',');
        trimmedClubs.push(club[0]);
    }
    return trimmedClubs;
}

function GetAccountsNamesFromClub(){
    var clubName = $('#GetClubSportName').val();

}

function getAttachedClubsByUser(){
  var userEmail = $('#GetAttachedClubsByUserEmail').val();
  var userSession = $('#GetAttachedClubsByUserPass').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAttachedClubsByUser', email:userEmail, session_id:userSession},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      results = results.club_team;
      document.getElementById("ClubTeams").innerHTML = "<h3>Clubs Attached to " + userEmail + ":</h3>";
      for (i = 0; i< results.length; i++){
        document.getElementById("ClubTeams").innerHTML += "<p>" + results[i] + "</p>";
      }
    }
  }).fail(function (data, status) {
    alert('errorr');
  });
}

$("#club_request_form").submit(function(e){
  e.preventDefault();
  var values = $(this).serializeArray();
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
  var clubName = $('#sports-club-list').val();
  var clubYear = '2016-2017';
  var userPosition = $('#selected_position').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'CreateJoinClubRequest', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear, position:userPosition},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      alert('success');
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
});

function getClubRequestByClub() {
  var userEmail = $('#GetClubRequestByClubEmail').val();
  var userSess = $('#GetClubRequestByClubSession').val();
  var clubName = $('#GetClubRequestByClubClubName').val();
  var clubYear = $('#GetClubRequestByClubYear').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetJoinClubRequestByClub', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var requestsArray = newdata.data.requests;
      document.getElementById("ClubRequests").innerHTML = "<h3>Requests Attached to " + clubName + ", (" + clubYear + "-" + (clubYear+1) + ")</h3>";
      for (i = 0; i < requestsArray.length; i++){
        var printString = "<p>Name : " + requestsArray[i].name + "<br>";
        printString += "Email : " + requestsArray[i].email + "<br>";
        printString += "Club Name : " + requestsArray[i].club_name + "<br>";
        printString += "Position : " + requestsArray[i].position + "<br>";
        printString += "Status : " + requestsArray[i].status + "<br>";
        printString += "request_id : " + requestsArray[i].request_id + "</p>";
        document.getElementById("ClubRequests").innerHTML += printString;
      }
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function getClubRequestByEmail() {
  var userEmail = $('#GetClubRequestByEmailEmail').val();
  var userSess = $('#GetClubRequestByEmailSession').val();
  var requestEmail = $('#GetClubRequestByEmailRequestEmail').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetJoinClubRequestByEmail', email:userEmail, session_id:userSess, request_email:requestEmail},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var requestsArray = newdata.data.requests;
      document.getElementById("ClubRequests").innerHTML = "<h3>Requests Attached to " + requestEmail + ")</h3>";
      for (i = 0; i < requestsArray.length; i++){
        var printString = "<p>Name : " + requestsArray[i].name + "<br>";
        printString += "Email : " + requestsArray[i].email + "<br>";
        printString += "Club Name : " + requestsArray[i].club_name + "<br>";
        printString += "Position : " + requestsArray[i].position + "<br>";
        printString += "Status : " + requestsArray[i].status + "<br>";
        printString += "request_id : " + requestsArray[i].request_id + "</p>";
        document.getElementById("ClubRequests").innerHTML += printString;
      }
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function getAllClubRequests(){

}

function getClubRequestByUser() {
  var userEmail = $('#GetClubRequestByUserEmail').val();
  var userSess = $('#GetClubRequestByUserSession').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetJoinClubRequestByUser', email:userEmail, session_id:userSess},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var requestsArray = newdata.data.requests;
      document.getElementById("ClubRequests").innerHTML = "<h3>Requests Attached to " + userEmail + ")</h3>";
      for (i = 0; i < requestsArray.length; i++){
        var printString = "<p>Name : " + requestsArray[i].name + "<br>";
        printString += "Email : " + requestsArray[i].email + "<br>";
        printString += "Club Name : " + requestsArray[i].club_name + "<br>";
        printString += "Position : " + requestsArray[i].position + "<br>";
        printString += "Status : " + requestsArray[i].status + "<br>";
        printString += "request_id : " + requestsArray[i].request_id + "</p>";
        document.getElementById("ClubRequests").innerHTML += printString;
      }
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function GetClubPositionByClub(){
  var userEmail = $('#GetClubPositionByClubEmail').val();
  var userSess = $('#GetClubPositionByClubSession').val();
  var clubName = $('#GetClubPositionByClubClubName').val();
  var clubYear = $('#GetClubPositionByClubYear').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetClubPositionByClub', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var positionsArray = newdata.data.positions;
      document.getElementById("ClubPositions").innerHTML = "<h3>Requests Attached to " + clubName + ", (" + clubYear + "-" + (clubYear+1) + ")</h3>";
      for (i = 0; i < positionsArray.length; i++){
        var printString = "<p>Name : " + positionsArray[i].name + "<br>";
        printString += "Email : " + positionsArray[i].email + "<br>";
        printString += "Club Name : " + positionsArray[i].club_name + "<br>";
        printString += "Position : " + positionsArray[i].position + "<br>";
        document.getElementById("ClubPositions").innerHTML += printString;
      }
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}
function GetClubPositionByEmail(){
  var userEmail = $('#GetClubPositionByEmailEmail').val();
  var userSess = $('#GetClubPositionByEmailSession').val();
  var positionEmail = $('#GetClubPositionByEmailPositionEmail').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetClubPositionByEmail', email:userEmail, session_id:userSess, position_email:positionEmail},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var positionsArray = newdata.data.positions;
      document.getElementById("ClubPositions").innerHTML = "<h3>Positions Attached to " + positionEmail + ")</h3>";
      for (i = 0; i < positionsArray.length; i++){
        var printString = "<p>Name : " + positionsArray[i].name + "<br>";
        printString += "Email : " + positionsArray[i].email + "<br>";
        printString += "Club Name : " + positionsArray[i].club_name + "<br>";
        printString += "Position : " + positionsArray[i].position + "<br>";
        document.getElementById("ClubPositions").innerHTML += printString;
      }
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}
function GetClubPositionByUser(){
  var userEmail = $('#GetClubPositionByUserEmail').val();
  var userSess = $('#GetClubPositionByUserSession').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetClubPositionByUser', email:userEmail, session_id:userSess},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var positionsArray = newdata.data.positions;
      document.getElementById("ClubPositions").innerHTML = "<h3>Positions Attached to " + userEmail + ")</h3>";
      for (i = 0; i < positionsArray.length; i++){
        var printString = "<p>Name : " + positionsArray[i].name + "<br>";
        printString += "Email : " + positionsArray[i].email + "<br>";
        printString += "Club Name : " + positionsArray[i].club_name + "<br>";
        printString += "Position : " + positionsArray[i].position + "<br>";
        document.getElementById("ClubPositions").innerHTML += printString;
      }
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function testing(){
    alert("hi");
}

function RemoveClubPositionByUser(){
  var userEmail = $('#RemoveClubPositionByUserEmail').val();
  var userSess = $('#RemoveClubPositionByUserSession').val();
  var clubName = $('#RemoveClubPositionByUserClubName').val();
  var clubYear = $('#RemoveClubPositionByUserYear').val();
  var clubPosition = $('#RemoveClubPositionByUserPosition').val();
  alert(userEmail + " | " + userSess + " | " + clubName + " | " + clubYear + " | " + clubPosition);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'RemoveClubPositionByUser', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear, position:clubPosition},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    alert(str);
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });

}

function displayLoggedInUser(){
  document.getElementById("logged_in").innerHTML = sessionStorage.userEmail;
}

function displayLoggedInUserClub(){
    var userEmail = sessionStorage.userEmail;
    var userSess = sessionStorage.session_id;
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetClubPositionByUser', email:userEmail, session_id:userSess},
      url  : serverAddress,
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var results = newdata.data;
      if(newdata.errcode != 0){
        var str = "Errcode : " + newdata.errcode;
        str += "\nErrno : " + newdata.errno;
        str += "\nErrstr : " + newdata.errstr;
        str += "\nData : " + JSON.stringify(newdata.data);
      } else {
        var positionsArray = newdata.data.positions;
        var clubName = formatClubTeamNameString(positionsArray[0].club_name);
        document.getElementById("user_club").innerHTML = clubName;
      }
     })
    .fail(function ( data, status ) {
      alert("errorr");
    });
}


function formatClubTeamNameString(teamString){
        var club = teamString.split(',');
        return club[0];
}

function populateAccountPage(){
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetClubPositionByUser', email:userEmail, session_id:userSess},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
    } else {
      var positionsArray = newdata.data.positions;

      var printString = "<h3 style = \"font-family: 'Oswald'\"> Name : " + positionsArray[0].name + "<h3>";
      printString +=  "<h3 style = \"font-family: 'Oswald'\"> Sports Club : " + formatClubTeamNameString(positionsArray[0].club_name) + "<h3>";
      printString +=  "<h3 style = \"font-family: 'Oswald'\"'> Position : " + positionsArray[0].position + "<h3>";
      printString +=  "<h3 style = \"font-family: 'Oswald'\"> UF Email : " + positionsArray[0].email + "<h3>";

      document.getElementById("personal_account_info").innerHTML += printString;
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}


//old functions  This includes the login, new functions wont
/*function CheckAccount() {
  //alert ('CheckAccount');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  //alert (userEmail);
  //alert (userPass);
<<<<<<< HEAD
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetAttachedClubsByUser',email:userEmail,session_id:data.session_id},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert( str );
    })
    .fail(function ( data, status, third ) {
      alert( data  + "\n" + status + "\n" + third);
    });
   })
  .fail(function ( data, status  ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}
function CreateRequest() {
  //alert ('sanity check');
  var userEmail = $('#CreateRequestEmail').val();
  var userPass = $('#CreateRequestPassword').val();
  var clubName = $('#CreateRequestClubName').val();
  var clubYear = $('#CreateRequestClubYear').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
=======
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
<<<<<<< HEAD
      data : {phpFunction:'CreateJoinClubRequest', email:userEmail, session_id:data.session_id, club_name:clubName, year:clubYear, position:'president'},
=======
      data : {phpFunction:'GetAttachedClubsByUser',email:userEmail,session_id:data.session_id},
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert( str );
    })
<<<<<<< HEAD
=======
    .fail(function ( data, status, third ) {
      alert( data  + "\n" + status + "\n" + third);
    });
   })
  .fail(function ( data, status  ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}

function CreateRequest() {
  //alert ('sanity check');
  var userEmail = $('#CreateRequestEmail').val();
  var userPass = $('#CreateRequestPassword').val();
  var clubName = $('#CreateRequestClubName').val();
  var clubYear = $('#CreateRequestClubYear').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'CreateJoinClubRequest', email:userEmail, session_id:data.session_id, club_name:clubName, year:clubYear, position:'president'},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert( str );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}
function RespondRequest() {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var Request = $('#requestNumber').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'RespondJoinClubRequest', email:userEmail, session_id:data.session_id, request_id:Request, decision:'0'},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert( str );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}

function getClubRequestByClub(dataObject) {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var clubName = $('#clubName').val();
  var clubYear = $('#clubYear').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetJoinClubRequestByClub', email:userEmail, session_id:data.session_id, club_name:clubName, year:clubYear},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var alertStr = "Errcode : " + newdata.errcode;
      alertStr += "\nErrno : " + newdata.errno;
      alertStr += "\nErrstr : " + newdata.errstr;
      alertStr += "\nData : " + JSON.stringify(newdata.data);
      var requestsArray = newdata.data.requests;
      document.getElementById("results").innerHTML = "";
      for (i = 0; i < requestsArray.length; i++){
        document.getElementById("results").innerHTML += JSON.stringify(requestsArray[i]);
      }
      //document.getElementById("results").innerHTML = JSON.stringify(newdata.data);
      alert( alertStr );
    })
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
<<<<<<< HEAD
  });//end ajax 1
}
function RespondRequest() {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var Request = $('#requestNumber').val();
=======
  });//end ajax 1
}
function getClubRequestByUser(dataObject) {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var clubName = $('#clubName').val();
  var clubYear = $('#clubYear').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetJoinClubRequestByUser', email:userEmail, session_id:data.session_id},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var alertStr = "Errcode : " + newdata.errcode;
      alertStr += "\nErrno : " + newdata.errno;
      alertStr += "\nErrstr : " + newdata.errstr;
      alertStr += "\nData : " + JSON.stringify(newdata.data);
      var requestsArray = newdata.data.requests;
      document.getElementById("results").innerHTML = "";
      for (i = 0; i < requestsArray.length; i++){
        document.getElementById("results").innerHTML += JSON.stringify(requestsArray[i]);
      }
      //document.getElementById("results").innerHTML = JSON.stringify(newdata.data);
      alert( alertStr );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}

function getClubRequestByEmail(dataObject) {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var requestEmail = $('getClubRequestByEmail_RequestEmail').val();
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
<<<<<<< HEAD
      data : {phpFunction:'RespondJoinClubRequest', email:userEmail, session_id:data.session_id, request_id:Request, decision:'0'},
=======
      data : {phpFunction:'GetJoinClubRequestByEmail', email:userEmail, session_id:data.session_id, request_email:requestEmail},
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
<<<<<<< HEAD
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert( str );
=======
      var alertStr = "Errcode : " + newdata.errcode;
      alertStr += "\nErrno : " + newdata.errno;
      alertStr += "\nErrstr : " + newdata.errstr;
      alertStr += "\nData : " + JSON.stringify(newdata.data);
      var requestsArray = newdata.data.requests;
      document.getElementById("results").innerHTML = "";
      for (i = 0; i < requestsArray.length; i++){
        document.getElementById("results").innerHTML += JSON.stringify(requestsArray[i]);
      }
      //document.getElementById("results").innerHTML = JSON.stringify(newdata.data);
      alert( alertStr );
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}
<<<<<<< HEAD
function getClubRequestByClub(dataObject) {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var clubName = $('#clubName').val();
  var clubYear = $('#clubYear').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetJoinClubRequestByClub', email:userEmail, session_id:data.session_id, club_name:clubName, year:clubYear},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var alertStr = "Errcode : " + newdata.errcode;
      alertStr += "\nErrno : " + newdata.errno;
      alertStr += "\nErrstr : " + newdata.errstr;
      alertStr += "\nData : " + JSON.stringify(newdata.data);
      var requestsArray = newdata.data.requests;
      document.getElementById("results").innerHTML = "";
      for (i = 0; i < requestsArray.length; i++){
        document.getElementById("results").innerHTML += JSON.stringify(requestsArray[i]);
      }
      //document.getElementById("results").innerHTML = JSON.stringify(newdata.data);
      alert( alertStr );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}
function getClubRequestByUser(dataObject) {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var clubName = $('#clubName').val();
  var clubYear = $('#clubYear').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetJoinClubRequestByUser', email:userEmail, session_id:data.session_id},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var alertStr = "Errcode : " + newdata.errcode;
      alertStr += "\nErrno : " + newdata.errno;
      alertStr += "\nErrstr : " + newdata.errstr;
      alertStr += "\nData : " + JSON.stringify(newdata.data);
      var requestsArray = newdata.data.requests;
      document.getElementById("results").innerHTML = "";
      for (i = 0; i < requestsArray.length; i++){
        document.getElementById("results").innerHTML += JSON.stringify(requestsArray[i]);
      }
      //document.getElementById("results").innerHTML = JSON.stringify(newdata.data);
      alert( alertStr );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}
function getClubRequestByEmail(dataObject) {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  var requestEmail = $('getClubRequestByEmail_RequestEmail').val();
  //lert (userEmail);
  //alert (userPass);
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    var data = newdata.data;
    str += "\nSession_id : " + data.session_id;
    alert( str );
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetJoinClubRequestByEmail', email:userEmail, session_id:data.session_id, request_email:requestEmail},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      var alertStr = "Errcode : " + newdata.errcode;
      alertStr += "\nErrno : " + newdata.errno;
      alertStr += "\nErrstr : " + newdata.errstr;
      alertStr += "\nData : " + JSON.stringify(newdata.data);
      var requestsArray = newdata.data.requests;
      document.getElementById("results").innerHTML = "";
      for (i = 0; i < requestsArray.length; i++){
        document.getElementById("results").innerHTML += JSON.stringify(requestsArray[i]);
      }
      //document.getElementById("results").innerHTML = JSON.stringify(newdata.data);
      alert( alertStr );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
   })
  .fail(function ( data, status ) {
    alert( "errorr");
    alert(data);
  });//end ajax 1
}
=======
>>>>>>> 5184a13b7d4060e0e2599bfb48c2f196d06804a9
*/
