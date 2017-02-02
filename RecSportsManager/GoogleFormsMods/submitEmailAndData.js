
// e is the form data
function doGet(e){
  var vals=[];
  // we are going to have to enter the exact URL we would like to add to
  var spreadsheetToAddTo = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1Byscr9vUQKeRb0sUke8MDLLEsAaHV21-IpoV7EJfaAU/edit');

  //so to keep it simple, we don't need to specify the sheet because it should just go to one doc for this,
  // if we need to change it to accomodate a difference b/n fundraising, community service etc then we'll worry about
  // specific sheets
  //var specificSheet = spreadsheetToAddTo.getSheetByName('Demo');

  // this call adds a timestamp
  vals.push(new Date());
  for(var i in e.parameter){
    vals.push(e.parameter[i]);
  }
  spreadsheetToAddTo.appendRow(vals);
  return ContentService.createTextOutput("added");
}


/*
function record_data(e) {
  Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
  try {
    var doc     = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1Byscr9vUQKeRb0sUke8MDLLEsAaHV21-IpoV7EJfaAU/edit');
    var sheet   = doc.getSheetByName('Practice'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }

}
*/

/*
function doGet(e) { // change to doPost(e) if you are recieving POST data
  var ss = SpreadsheetApp.openById(ScriptProperties.getProperty('active'));
  var sheet = ss.getSheetByName("DATA");
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; //read headers
  var nextRow = sheet.getLastRow(); // get next row
  var cell = sheet.getRange('a1');
  var col = 0;
  for (i in headers){ // loop through the headers and if a parameter name matches the header name insert the value
    if (headers[i] == "Timestamp"){
      val = new Date();
    } else {
      val = e.parameter[headers[i]];
    }
    cell.offset(nextRow, col).setValue(val);
    col++;
  }
  //http://www.google.com/support/forum/p/apps-script/thread?tid=04d9d3d4922b8bfb&hl=en
  var app = UiApp.createApplication(); // included this part for debugging so you can see what data is coming in
  var panel = app.createVerticalPanel();
  for( p in e.parameters){
    panel.add(app.createLabel(p +" "+e.parameters[p]));
  }
  app.add(panel);
  return app;
}
//http://www.google.sc/support/forum/p/apps-script/thread?tid=345591f349a25cb4&hl=en
function setUp() {
  ScriptProperties.setProperty('active', SpreadsheetApp.getActiveSpreadsheet().getId());
}
*/
