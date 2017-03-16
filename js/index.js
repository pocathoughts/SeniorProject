function CheckAccount() {
  var localDev = false;
  var ControllerSwitch = 'http://70.171.6.119:2555/PHP/Controller.php';
  if (localDev == true){
    ControllerSwitch = 'http://127.0.0.1/PHP/Controller.php';
  }
  alert ('sanity check');
  var userEmail = $('#email').val();
  var userPass = $('#password').val();
  alert (userEmail);
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:userPass},
    //dataType: 'jsonp',
    url  : 'http://70.171.6.119:2555/PHP/Controller.php',    //'http://' is required for request. 
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
      data : {phpFunction:'GetAllClubs',email:'asilcott@ufl.edu',session_id:data.session_id},
      url  : ControllerSwitch,    //'http://' is required for request. 
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
