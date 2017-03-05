function StartTest(){
  //Unit Test 1: Successful Login.  
  var send = [
    JSON.stringify({phpFunction:'Login',email:'asilcott@ufl.edu',password:'pass'})
  ];
  var expect = [
    JSON.stringify({errcode:'0', errno:'0', data:{}}) 
  ];

  //Unit Test 2: Failed Login.
  send[1] = [
    JSON.stringify({phpFunction:'Login',email:'asilcott@ufl.edu',password:'pass'})
  ];
  expect[1] = [
    JSON.stringify({errcode:'0', errno:'0', data:{}}) 
  ];


  alert('function reached');
  for (var i = 0; i < send.length; i++){
    sendPacket(send[i], expect[i]);
  }
}

function sendPacket(dataObject, ExpectedData){
  alert("ajax func");
  var sendData = JSON.parse(dataObject);
  $.ajax( { 
    type : 'POST',
    data : sendData,
    url  : 'http://70.171.8.198:2555/PHP/Controller.php',    //'http://' is required for request. 
    })
    .done(function ( data, status ) {
      alert("success");
      checkData(data, ExpectedData);
    })
    .fail(function ( data, status ) {
      alert("failed");
      checkData(data, ExpectedData);
  });
}

function checkData(JSONOBJ, ExpectedDataStr){
  var ExpectedData = JSON.parse(ExpectedDataStr);
  var ExpectedData = ExpectedDataStr;
  var expErrcode = ExpectedData.errcode;
  var expErrno = ExpectedData.errno;
  var expData = ExpectedData.data;
  
  var container = document.createElement("div");
  var expContainer = document.createElement("div");
  var retContainer = document.createElement("div");
  
  var returnedPacket = JSON.parse(JSONOBJ);
  var returnedData = returnedPacket.data;

  var expErrcodeNode = document.createTextNode("Expected Error Code: " + expErrcode);
  var expErrnoNode = document.createTextNode("Expected Error Number: " + expErrno);
  var expDataNode = document.createTextNode("Expected Data: " + expData);

  expContainer.appendChild(expErrcodeNode);
  expContainer.appendChild(expErrnoNode);
  expContainer.appendChild(expDataNode);

  var retErrcodeNode = document.createTextNode("Returned Error Code: " + returnedPacket.errcode);
  var retErrnoNode = document.createTextNode("Returned Error Number: " + returnedPacket.errno);
  var retDataNode = document.createTextNode("Returned Data: " + JSON.stringify(returnedData));

  retContainer.appendChild(retErrcodeNode);
  retContainer.appendChild(retErrnoNode);
  retContainer.appendChild(retDataNode);

  container.appendChild(retContainer);
  container.appendChild(expContainer);
  
  document.getElementById("Results").appendChild(container);
}


