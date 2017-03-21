var serverAddress = 'http://70.171.6.119:2555/PHP/Controller.php';
function CheckAccount() {
  //alert ('CheckAccount');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  //alert (userEmail);
  //alert (userPass);
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
      data : {phpFunction:'GetAllClubs',email:userEmail,session_id:data.session_id},
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

function CreateRequest() {
  //alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
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
      data : {phpFunction:'CreateJoinClubRequest', email:userEmail, session_id:data.session_id, club_name:'Mens Lacrosse', year:'2015', position:'president'},
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
      data : {phpFunction:'RespondJoinClubRequest', email:userEmail, session_id:data.session_id, request_id:Request, decision:'yes'},
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

function AddAccount() {
  $.ajax( {   
    type : 'POST',
    data : {phpFunction:'CreateUserAccount',email:'kmarin@ufl.edu', password:'pass',name:'Kevin Marin'},
    url  : 'http://70.171.6.119:2555/PHP/Controller.php',
  })
  .done(function ( data, status ) {
    var newdata = JSON.parse(data);
    var str = "Errcode : " + newdata.errcode;
    str += "\nErrno : " + newdata.errno;
    str += "\nErrstr : " + newdata.errstr;
    str += "\nData : " + JSON.stringify(newdata.data);
    alert(str);
  })
  .fail(function ( data, status ) {
    alert( "errorr" );
  });
}
