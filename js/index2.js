var serverAddress = 'http://70.171.6.119:2555/PHP/Controller.php';
function Login(){
  var userEmail = $('#LoginEmail').val();
  var userPass = $('#LoginPass').val();
  //alert("here");
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    url  : serverAddress,    //'http://' is required for request.
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    var str = '';
    if(newdata.errcode !== 0){
      str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
      return;
    }
    str = "User Email" + userEmail.toLowerCase();
    str += "\nSession_id = " + JSON.stringify(results.session_id);
    var idString = userEmail.toLowerCase()  + "ID";
    var node = document.getElementById(idString);
    if (node === null){
    var textNode = document.createElement("p");
    textNode.setAttribute('id', idString);
    textNode.innerHTML = "User: " + userEmail.toLowerCase()  + " session: " + JSON.stringify(results.session_id);
    document.getElementById("Sessions").appendChild(textNode);
    } else {
      node.innerHTML = "User: " + userEmail.toLowerCase()  + " session: " + JSON.stringify(results.session_id);
    }
  })
  .fail(function (xhr, data, status) {
    alert( "errorr");
  });
}

function createUserAccount(){
  var userEmail = $('#CreateAccountEmail').val();
  var userName = $('#CreateAccountName').val();
  var userPass = $('#CreateAccountPass').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'CreateUserAccount',email:userEmail,password:userPass,name:userName},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    if(newdata.errcode !== 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    }
    else {
      alert('success');
    }
  })
  .fail(function ( data, status ) {
    alert( "errorr" );
  });
}

function getAllClubs(){
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAllClubs'},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode !== 0){
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



function getAttachedClubsByUser(){
  var userEmail = $('#GetAttachedClubsByUserEmail').val();
  var userSession = $('#GetAttachedClubsByUserSession').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'GetAttachedClubsByUser', email:userEmail, session_id:userSession},
    url : serverAddress,
  }).done(function (data, status) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode !== 0){
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

function CreateJoinClubRequest() {
  var userEmail = $('#CreateRequestEmail').val();
  var userSess = $('#CreateRequestSession').val();
  var clubName = $('#CreateRequestClubName').val();
  var clubYear = $('#CreateRequestClubYear').val();
  var userPosition = $('#CreateRequestPosition').val();
  $.ajax( {
    type : 'POST',
    data : {phpFunction:'CreateJoinClubRequest', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear, position:userPosition},
    url  : serverAddress,
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var results = newdata.data;
    if(newdata.errcode !== 0){
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
}

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
    if(newdata.errcode !== 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var requestsArray = newdata.data.requests;
      var newYear = clubYear +1;
      document.getElementById("ClubRequests").innerHTML = "<h3>Requests Attached to " + clubName + ", (" + clubYear + "-" + newYear + ")</h3>";
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
    if(newdata.errcode !== 0){
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
    if(newdata.errcode !== 0){
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
    if(newdata.errcode !== 0){
      var str = "Errcode : " + newdata.errcode;
      str += "\nErrno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      alert(str);
    } else {
      var positionsArray = newdata.data.positions;
      var newYear = clubYear +1;
      document.getElementById("ClubPositions").innerHTML = "<h3>Requests Attached to " + clubName + ", (" + clubYear + "-" + newYear + ")</h3>";
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
    if(newdata.errcode !== 0){
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
    if(newdata.errcode !== 0){
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
function CreateCommunityServiceRequest(){
  //var userEmail = $('#RemoveClubPositionByUserEmail').val();
  //var userSess = $('#RemoveClubPositionByUserSession').val();
  //var clubName = $('#RemoveClubPositionByUserClubName').val();
  //var clubYear = $('#RemoveClubPositionByUserYear').val();
  //var clubPosition = $('#RemoveClubPositionByUserPosition').val();
  var userEmail = "asilcott@ufl.edu";
  var userSess = $('#GetAttachedClubsByUserSession').val();
  var clubName = "Mens Lacrosse";
  var clubYear = "2016";
  var total_hours = "25";
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'CreateCommunityServiceRequest', email:userEmail, session_id:userSess, club_name:clubName, year:clubYear, total_hours:total_hours},
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
function RespondCommunityServiceRequest(){
  var userEmail = "asilcott@ufl.edu";
  var userSess = $('#GetAttachedClubsByUserSession').val();
  var request_id = "1";
  var decision = "1";
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'RespondCommunityServiceRequest', email:userEmail, session_id:userSess, request_id:request_id, decision:decision},
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

//old functions  This includes the login, new functions wont
/*

function populateDropDownWithClubSports(){
    alert("we are here");
    $.ajax( {
      type : 'POST',
      data : {phpFunction:'GetAllClubs'},
      url : serverAddress,
    }).done(function (data, status) {
      var newdata = JSON.parse(data);
      var results = newdata.data;
      if(newdata.errcode !== 0){
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

function CheckAccount() {
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
