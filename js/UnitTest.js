function StartTest(){
  //remove nodes from previous run.  
  var myNode = document.getElementById("Results");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  //defining UnitTest object
  var UnitTest = new Object;
  UnitTest.testCount = -1;
  UnitTest.description = [];
  UnitTest.send = [];
  UnitTest.expect = [];
  UnitTest.email = [];
  UnitTest.pass = [];
  UnitTest.signin = [];
  UnitTest.add = function(descriptionParam, sendParam, expectParam){
    //alert((this.testCount+1) + " being added now");
    this.testCount++;
    this.description[this.testCount] = descriptionParam;
    this.send[this.testCount] = sendParam;
    this.expect[this.testCount] = expectParam;
    this.email[this.testCount] = '';
    this.pass[this.testCount] = '';
    this.signin[this.testCount] = false;
  };
  UnitTest.addLogin = function(descriptionParam, sendParam, expectParam, emailParam, passParam){
    this.testCount++;
    this.description[this.testCount] = descriptionParam;
    this.send[this.testCount] = sendParam;
    this.expect[this.testCount] = expectParam;
    this.email[this.testCount] = emailParam;
    this.pass[this.testCount] = passParam;
    this.signin[this.testCount] = true;
  };
  UnitTest.run = function(){
    for (var i = 0; i < this.send.length; i++){
      if(this.signin[i] === false){
        sendPacket(this.description[i], this.send[i], this.expect[i]);
      } else {    
        sendPacketLogin(this.description[i], this.expect[i], this.email[i], this.pass[i])
      }
    }
  };

  //Unit Test 1: Successful Login.  
  UnitTest.add(
    "Sucessful Login (valid Credentials)",
    JSON.stringify({phpFunction:'Login',email:'asilcott@ufl.edu',password:'pass'}),
    JSON.stringify({errcode:'0', errno:'0', data:{}})
  );
  //Unit Test 2: Invalid Credentials
  UnitTest.add(
    "Sucessful Login (valid Credentials)",
    JSON.stringify({phpFunction:'Login',email:'asilcott@ufl.edu',password:'pas'}),    //send json
    JSON.stringify({errcode:'0', errno:'0', data:{}})                                 //expected json
  );

  UnitTest.run();
} 

function sendPacket(description, dataObject, ExpectedData){
  //alert("ajax func");
  var sendData = JSON.parse(dataObject);
  $.ajax( { 
    type : 'POST',
    data : sendData,
    url  : 'http://70.171.8.198:2555/PHP/Controller.php',    //'http://' is required for request. 
    })
    .done(function ( data, status ) {
      //alert("success");
      checkData(description, data, ExpectedData);
    })
    .fail(function ( data, status ) {
      //alert("failed");
      checkData(description, data, ExpectedData);
  });
}

function checkData(description, JSONOBJ, ExpectedDataStr){
  
  //-----------------------------------DIV CREATION ------------------------------------------
  var container = document.createElement("div");
  var expContainer = document.createElement("div");
  var retContainer = document.createElement("div");
  var descContainer = document.createElement("div");
  
  //-----------------------DESCRIPTION BOX CREATION ------------------------------------------
  var descText = document.createTextNode("Test Description: " + description);
  var descNode = document.createElement("p");
  descNode.appendChild(descText);
  descContainer.appendChild(descNode);

  //-----------------------EXPECTED DATA BOX CREATION ------------------------------------------
  var ExpectedData = JSON.parse(ExpectedDataStr);
  var expData = ExpectedData.data;

  var expErrcodeText = document.createTextNode("Expected Error Code: " + ExpectedData.errcode);
  var expErrnoText = document.createTextNode("Expected Error Number: " + ExpectedData.errno);
  var expDataText = document.createTextNode("Expected Data: " + JSON.stringify(expData));
  var expErrcodeNode = document.createElement("p");
  var expErrnoNode = document.createElement("p");
  var expDataNode = document.createElement("p");
  
  expErrcodeNode.appendChild(expErrcodeText);
  expErrnoNode.appendChild(expErrnoText);
  expDataNode.appendChild(expDataText);

  expContainer.appendChild(expErrcodeNode);
  expContainer.appendChild(expErrnoNode);
  expContainer.appendChild(expDataNode);

  //-----------------------RETURNED DATA BOX CREATION -------------------------------------------
  var returnedPacket = JSON.parse(JSONOBJ);
  var returnedData = returnedPacket.data;

  var retErrcodeText = document.createTextNode("Returned Error Code: " + returnedPacket.errcode);
  var retErrnoText = document.createTextNode("Returned Error Number: " + returnedPacket.errno);
  var retDataText = document.createTextNode("Returned Data: " + JSON.stringify(returnedData));
  var retErrcodeNode = document.createElement("p");
  var retErrnoNode = document.createElement("p");
  var retDataNode = document.createElement("p");

  retErrcodeNode.appendChild(retErrcodeText);
  retErrnoNode.appendChild(retErrnoText);
  retDataNode.appendChild(retDataText);

  retContainer.appendChild(retErrcodeNode);
  retContainer.appendChild(retErrnoNode);
  retContainer.appendChild(retDataNode);
  
  //-----------------------DIV CSS STYLING AND ORGANIZING ------------------------------------------
  retContainer.style.display = 'inline-block';
  expContainer.style.display = 'inline-block';
  retContainer.style.width = '47%';
  expContainer.style.width = '47%';

  descContainer.style.margin = '1%';
  descContainer.style.borderStyle = 'solid';
  descContainer.style.backgroundColor = 'yellow';
  expContainer.style.margin = '1%';
  expContainer.style.borderStyle = 'solid';
  retContainer.style.margin = '1%';
  retContainer.style.borderStyle = 'solid';

  container.appendChild(descContainer);
  container.appendChild(expContainer);
  container.appendChild(retContainer);

  container.style.display = 'block';
  container.style.backgroundColor = 'lime'; 
  container.style.margin = '15px 5px';
  container.style.borderStyle = 'double';
  
  document.getElementById("Results").appendChild(container);
}

