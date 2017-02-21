function CheckAccount() {
  var localDev = true;
  var ControllerSwitch = 'http://70.171.8.198:2555/PHP/Controller.php';
  if (localDev == true){
    ControllerSwitch = 'http://127.0.0.1/PHP/Controller.php';
  }
  alert ('sanity check');
  var userEmail = $('#email').val();
  alert (userEmail);
  $.ajax( { 
    type : 'POST',
    data : {phpFunction:'Login',email:userEmail,password:$('#password').val()},
    url  : 'http://70.171.8.198:2555/PHP/controller.php',    //'http://' is required for request. 
    success: function ( returned ) {
      var newdata = JSON.parse(returned);
      var str = "Errno : " + newdata.errno;
      str += "\nErrstr : " + newdata.errstr;
      str += "\nData : " + JSON.stringify(newdata.data);
      var data = newdata.data;
      str += "\nSession_id : " + data.session_id;
      alert( str );
      //$.ajax( { 
      //  type : 'POST',
      //  data : {phpFunction:'GetAttachedClubs',email:'asilcott@ufl.edu',session_id:data.session_id},
      //  url  : ControllerSwitch,    //'http://' is required for request. 
      //  success: function ( returned ) {
      //    var newdata = JSON.parse(returned);
      //    var str = "Errno : " + newdata.errno;
      //    str += "\nErrstr : " + newdata.errstr;
      //    str += "\nData : " + JSON.stringify(newdata.data);
      //    var data = newdata.data;
      //    str += "\nSession_id : " + data.session_id;
      //    alert( str );
      //  },
      //  error: function ( xhr ) {
      //    alert( "errorr" );
      //  }
      //});//end ajax 2
     },
    error: function ( xhr ) {
      alert( "errorr" );
    }
  });//end ajax 1
}

function AddAccount() {
$.ajax( {   
    type : 'POST',
    data : {phpFunction:'CreateAccount',password:'pass',email:'kmarin@ufl.edu'},
    url  : 'http://127.0.0.1/PHP/Login.php',
    success: function ( data ) {
      var newdata = JSON.parse(data);
      alert( newdata.results );
    },
    error: function ( xhr ) {
      alert( "errorr" );
    }
  });
}