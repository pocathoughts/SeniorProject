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
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
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
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
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
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
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
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
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
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
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

function RemoveClubPositionByUser(){
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
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
    //var userEmail = $('#GetAttachedClubsByUserEmail').val();
    var userEmail = sessionStorage.userEmail;
    //var userSession = $('#GetAttachedClubsByUserPass').val();
    var userSession = sessionStorage.session_id;
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
        document.getElementById("user_club").innerHTML = results;
      }
    }).fail(function (data, status) {
      alert('errorr with displaying sports club');
    });
}







