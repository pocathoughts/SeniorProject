var serverAddress = 'http://70.171.6.119:2555/PHP/Controller.php';



  $("#login_form").submit(function(e){
  alert("hi");
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    }


    var str = "User Email" + userEmail.toLowerCase();
    str += "\nSession_id = " + JSON.stringify(results.session_id);
    sessionStorage.userEmail = userEmail;
    sessionStorage.session_id = results.session_id;
    alert(str);
    window.location.href ="../MainPages/landingPage.html";
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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
        if(newdata.errcode == 2){
          alert(newdata.errstr + "\n\nPlease log in");
          window.location.href = "../Authentication/login.html";
          return;
        }
        if(newdata.errcode != 0){
          var str = "Errcode : " + newdata.errcode;
          str += "\nErrno : " + newdata.errno;
          str += "\nerrstr : " + newdata.errstr;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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

function getAllClubsExecutiveBoardMembers(){
    alert("we are here in exec board members");
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAllClubs'},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      results = results.name;
      alert("executiveboardmembers");
      alert(results);
      var stringToAdd = "";
      for (i = 0; i< results.length; i++){
        stringToAdd += "<li> " + results[i] + "</li>";
      }
      document.getElementById("other_club_member_accounts").innerHTML = stringToAdd;
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
      if(newdata.errcode == 2){
        alert(newdata.errstr + "\n\nPlease log in");
        window.location.href = "../Authentication/login.html";
        return;
      }
      if(newdata.errcode != 0){
        var str = "Errcode : " + newdata.errcode;
        str += "\nErrno : " + newdata.errno;
        str += "\nerrstr : " + newdata.errstr;
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

function getClubYearFromString(club){
  return String(club).match(/\(([^)]+)\)/)[1];
}

function GetAccountsNamesFromClub(){
    var clubName = $('#GetClubSportName').val();

}

function getAttachedClubsByUser(){
  var userEmail = sessionStorage.userEmail;
  var userSession = sessionStorage.session_id;
  var res = [];
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAttachedClubsByUser', email:userEmail, session_id:userSession},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    } else {
      results = results.club_team;
      res = results;
      // document.getElementById("ClubTeams").innerHTML = "<h3>Clubs Attached to " + userEmail + ":</h3>";
      // for (i = 0; i< results.length; i++){
      //   document.getElementById("ClubTeams").innerHTML += "<p>" + results[i] + "</p>";
      // }
    }
  }).fail(function (data, status) {
    alert('errorr');
  });
  return res;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      alert('success');
      window.location.href = "../mainPages/landingPage.html";
    }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
});

function getClubRequestByClub() {
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;


  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAttachedClubsByUser', email:userEmail, session_id:userSess},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;

    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    }
    else {
      results = results.club_team;
      var clubNameArr = formatClubString(results);
      var clubName = clubNameArr[0];
      var clubYear = getClubYearFromString(results);

      $.ajax( {
        type : 'POST',
        data : {phpFunction:'GetJoinClubRequestByClub', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear},
        url  : serverAddress,
      })
      .done(function ( data, status ) {
        var newdata = JSON.parse(data);
        var results = newdata.data;

        if(newdata.errcode == 2){
          alert(newdata.errstr + "\n\nPlease log in");
          window.location.href = "../Authentication/login.html";
          return;
        }
        if(newdata.errcode != 0){
          var str = "Errcode : " + newdata.errcode;
          str += "\nErrno : " + newdata.errno;
          str += "\nerrstr : " + newdata.errstr;
          str += "\nData : " + JSON.stringify(newdata.data);
          alert(str);
        } else {
          var requestsArray = newdata.data.requests;
          var clubRequests = document.getElementById("ClubRequests");
          document.getElementById("ClubRequests").innerHTML = "<h3>Requests Attached to " + clubName + ", (" + clubYear + ")</h3>";
          var count = 0;
          for (i = 0; i < requestsArray.length; i++){
            if(requestsArray[i].status == "Pending"){
              count++;
              var newItem = document.createElement('li');
              clubRequests.appendChild(newItem);
              var printString = "<p>Name : " + requestsArray[i].name + "<br>";
              printString += "Email : " + requestsArray[i].email + "<br>";
              printString += "Club Name : " + requestsArray[i].club_name + "<br>";
              printString += "Position : " + requestsArray[i].position + "<br>";
              printString += "Status : " + requestsArray[i].status + "<br>";
              printString += "request_id : " + requestsArray[i].request_id + "</p>";
              newItem.innerHTML = printString;
              newItem.innerHTML += "<button onClick =\"RespondRequest(" + requestsArray[i].request_id + ",1);\"> Approve </button> <button onClick =\"RespondRequest(" + requestsArray[i].request_id + ",0);\"> Deny </button>"
            }
          }
          if(count == 0)
            document.getElementById("ClubRequests").innerHTML = "<h3> There are no pending club requests</h3>";
        }
      })
      .fail(function ( data, status ) {
        alert("errorr");
      });
    }
  }).fail(function (data, status) {
    alert('errorr');
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
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
    alert("hiiiiii");
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nerrstr : " + newdata.errstr;
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

function populateNavBarWithNameAndClub(){
    alert("populate nav bar");
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
      if(newdata.errcode == 2){
        alert(newdata.errstr + "\n\nPlease log in");
        window.location.href = "../Authentication/login.html";
        return;
      }
      if(newdata.errcode != 0){
        var str = "Errcode : " + newdata.errcode;
        str += "\nErrno : " + newdata.errno;
        str += "\nerrstr : " + newdata.errstr;
        str += "\nData : " + JSON.stringify(newdata.data);
      } else {
        var positionsArray = newdata.data.positions;
        var clubName = formatClubTeamNameString(positionsArray[0].club_name);
        document.getElementById("user_club").innerHTML = clubName;
        document.getElementById("logged_in").innerHTML = sessionStorage.userEmail;
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
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

// need to make a new php funciton for this
function GetApprovedClubMembersByClub(){
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
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } 
    else {
      var posArr = newdata.data.positions;
      var clubName = formatClubTeamNameString(posArr[0].club_name);
      var clubYear = getClubYearFromString(posArr[0].club_name);
      $.ajax( {
        type : 'POST',
        data : {phpFunction:'GetClubPositionByClub', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear},
        url  : serverAddress,
      })
      .done(function ( data, status ) {
        var newdata = JSON.parse(data);
        var results = newdata.data;
        if(newdata.errcode == 2){
          alert(newdata.errstr + "\n\nPlease log in");
          window.location.href = "../Authentication/login.html";
          return;
        }
        if(newdata.errcode != 0){
          var str = "Errcode : " + newdata.errcode;
          str += "\nErrno : " + newdata.errno;
          str += "\nerrstr : " + newdata.errstr;
          str += "\nData : " + JSON.stringify(newdata.data);
          alert(str);
        } else {
          var positionsArray = newdata.data.positions;
          for (i = 0; i < positionsArray.length; i++){
              var printString = "<li><p>Name : " + positionsArray[i].name + "<br>";
              printString += "Email : " + positionsArray[i].email + "<br>";
              printString += "Club Name : " + positionsArray[i].club_name + "<br>";
              printString += "Position : " + positionsArray[i].position + "<br></li>";
              document.getElementById("ClubPositions").innerHTML += printString;
          }
        }
       })
      .fail(function ( data, status ) {
        alert("errorr");
      });
     }
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function RespondRequest(request, decision) {
  //alert ('sanity check');
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'RespondJoinClubRequest', email:userEmail, session_id:userSess, request_id:request, decision:decision},
      url  : serverAddress,    //'http://' is required for request.
    })
    .done(function ( data, status ) {
      var newdata = JSON.parse(data);
      if(newdata.errcode == 2){
        alert(newdata.errstr + "\n\nPlease log in");
        window.location.href = "../Authentication/login.html";
        return;
      }
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert( str );
    })
    .fail(function ( data, status ) {
      alert( "errorr" );
    });
}

function CreateCommunityServiceRequest(){
  var values = $("form").serializeArray();
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;

  var clubName = $('#sports-club-list').val();
  var clubYear = "2016";
  var total_hours = values[9].value;
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'CreateCommunityServiceRequest', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear, total_hours:total_hours},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nerrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    alert(str);
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function EditCommunityServiceRequest(){
  var userEmail = "asilcott@ufl.edu";
  var userSess = $('#GetAttachedClubsByUserSession').val();
  var attribute = "total_hours";
  var oldValue = "25";
  var newValue = "30";
  var request_id = "1";
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'EditCommunityServiceRequest', email:userEmail, session_id:userSess, attribute:attribute, old_value:oldValue, new_value:newValue, request_id:request_id},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nerrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    alert(str);
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}
function DeleteCommunityServiceRequest(){
  var userEmail = "asilcott@ufl.edu";
  var userSess = $('#GetAttachedClubsByUserSession').val();
  var request_id = "1";
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'DeleteCommunityServiceRequest', email:userEmail, session_id:userSess, request_id:request_id},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nerrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    alert(str);
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}
function RespondCommunityServiceRequest(request_id, decision){
  var userEmail = sessionStorage.userEmail;
  var userSess = sessionStorage.session_id;
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'RespondCommunityServiceRequest', email:userEmail, session_id:userSess, request_id:request_id, decision:decision},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nerrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    alert(str);
   })
  .fail(function ( data, status ) {
    alert("errorr");
  });
}

function GetCommunityServiceRequestByUser(){
var userEmail = sessionStorage.userEmail;
  var userSession = sessionStorage.session_id;
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetCommunityServiceRequestByUser', email:userEmail, session_id:userSession},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    } else {
      alert(results);
    }
  }).fail(function (data, status) {
    alert('errorr');
  });
}

  function GetCommunityServiceRequestByEmail(){
  var userEmail = sessionStorage.userEmail;
  var userSession = sessionStorage.session_id;
  var reqEmail = //Something form the html
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetCommunityServiceRequestByEmail', email:userEmail, session_id:userSession, request_email:reqEmail},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    } else {
      alert(results);
    }
  }).fail(function (data, status) {
    alert('errorr');
  });
}

  function GetCommunityServiceRequestByClub(){
  var userEmail = sessionStorage.userEmail;
  var userSession = sessionStorage.session_id;


$.ajax( {
    type : 'POST',
    data : {phpFunction:'GetClubPositionByUser', email:userEmail, session_id:userSession},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } 
    else {
      var posArr = newdata.data.positions;
      var clubName = formatClubTeamNameString(posArr[0].club_name);
      var clubYear = getClubYearFromString(posArr[0].club_name);

  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetCommunityServiceRequestByClub', email:userEmail, session_id:userSession, club_name:clubName, year:clubYear},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    } else {
          var requestsArray = newdata.data.community_service;
          var clubRequests = document.getElementById("CommRequests");
          document.getElementById("CommRequests").innerHTML = "<h3>Requests Attached to " + clubName + ", (" + clubYear + ")</h3>";
          var count = 0;
          for (i = 0; i < requestsArray.length; i++){
            if(requestsArray[i].status == "Pending"){
              count++;
              var newItem = document.createElement('li');
              clubRequests.appendChild(newItem);
              var printString = "<p>Club Name : " + requestsArray[i].club_name + "<br>";
              printString += "Club Year : " + requestsArray[i].club_name + "<br>";
              printString += "Request ID : " + requestsArray[i].request_id + "<br>";
              printString += "Status : " + requestsArray[i].status + "<br>";
              printString += "Total Hours : " + requestsArray[i].total_hours + "</p>";
              newItem.innerHTML = printString;
              newItem.innerHTML += "<button onClick =\"RespondCommunityServiceRequest(" + requestsArray[i].request_id + ",1);\"> Approve </button> <button onClick =\"RespondCommunityServiceRequest(" + requestsArray[i].request_id + ",0);\"> Deny </button>"
            }
          }
          if(count == 0)
            document.getElementById("CommRequests").innerHTML = "<h3> There are no pending club requests</h3>";
        }
    }).fail(function (data, status) {
      alert('errorr');
    });
  }
  }).fail(function (data, status) {
    alert('errorr');
  });
}

function GetCommunityServiceHoursByClub(){
  var userEmail = sessionStorage.userEmail;
  var userSession = sessionStorage.session_id;


$.ajax( {
    type : 'POST',
    data : {phpFunction:'GetClubPositionByUser', email:userEmail, session_id:userSession},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } 
    else {
      var posArr = newdata.data.positions;
      var clubName = formatClubTeamNameString(posArr[0].club_name);
      var clubYear = getClubYearFromString(posArr[0].club_name);

  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetCommunityServiceRequestByClub', email:userEmail, session_id:userSession, club_name:clubName, year:clubYear},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode == 2){
      alert(newdata.errstr + "\n\nPlease log in");
      window.location.href = "../Authentication/login.html";
      return;
    }
    if(newdata.errcode != 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nerrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    } else {
          var requestsArray = newdata.data.community_service;
          var hours = 0;
          for (i = 0; i < requestsArray.length; i++){
            if(requestsArray[i].status == "Accepted"){
              hours += parseInt(requestsArray[i].total_hours);
            }
          }
          document.getElementById("CommHours").innerHTML = hours;
        }
    }).fail(function (data, status) {
      alert('errorr');
    });
  }
  }).fail(function (data, status) {
    alert('errorr');
  });
}