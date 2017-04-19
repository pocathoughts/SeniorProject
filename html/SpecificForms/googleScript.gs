function doPost(e){
  alert("hi there");
  fillCommunityServiceForm(e);
  return ContentService.createTextOutput('Completed!');
}

function fillCommunityServiceForm(e){
try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    var parameters = JSON.stringify(e.parameter);
    var userInput = JSON.parse(parameters);

    shortTest(userInput);

  } catch(error) {
    Logger.log(error);

  }
}

function shortTest(userInput) {
  //userInput being fassed in is the form data passed from the web app

  Logger.log('I was called!');

  // all the variable definitions for each individual question
  // you have to pull each individual question as a variable
  // well you don't have to, but for clarity I went ahead and did it
  var first_name_q;
  var last_name_q;
  var email_q;
  var club_q;
  var date_q;
  var start_time_q;
  var end_time_q;
  var multiple_dates_q;
  var we_did_q;
  var we_learned_q;
  var total_hours_q;
  var org_name_q;
  var contact_person_q;
  var email_phone_contact_person_q;
  // following variables represent the 5 required members that have to volunteer
  var vol1_q;
  var vol2_q;
  var vol3_q;
  var vol4_q;
  var vol5_q;
  var vol1_hrs_q;
  var vol2_hrs_q;
  var vol3_hrs_q;
  var vol4_hrs_q;
  var vol5_hrs_q;
  // the rest of the volunteers are optional, cant think of a more concise way atm sorry
  var vol6_q;
  var vol7_q;
  var vol8_q;
  var vol9_q;
  var vol10_q;
  var vol11_q;
  var vol12_q;
  var vol13_q;
  var vol14_q;
  var vol15_q;
  var vol16_q;
  var vol17_q;
  var vol18_q;
  var vol19_q;
  var vol20_q;
  var vol21_q;
  var vol22_q;
  var vol23_q;
  var vol24_q;
  var vol25_q;
  var vol6_hrs_q;
  var vol7_hrs_q;
  var vol8_hrs_q;
  var vol9_hrs_q;
  var vol10_hrs_q;
  var vol11_hrs_q;
  var vol12_hrs_q;
  var vol13_hrs_q;
  var vol14_hrs_q;
  var vol15_hrs_q;
  var vol16_hrs_q;
  var vol17_hrs_q;
  var vol18_hrs_q;
  var vol19_hrs_q;
  var vol20_hrs_q;
  var vol21_hrs_q;
  var vol22_hrs_q;
  var vol23_hrs_q;
  var vol24_hrs_q;
  var vol25_hrs_q;


  // pulling the right form, use a test form with this url
  // https://docs.google.com/forms/d/17aT5AuZ4XntfmV93VwjlZ9hE-FqI8YjK8z1ppEUUMmw/edit?usp=sharing
  var existing_form = FormApp.openByUrl('https://docs.google.com/forms/d/17aT5AuZ4XntfmV93VwjlZ9hE-FqI8YjK8z1ppEUUMmw/edit?usp=sharing');


  Logger.log('Form opens correctly');

  // gets the question items from the form
  var questions = existing_form.getItems();

  Logger.log('form gets all the items from the form');

  // setting the questions
  // potential error, if the form field doesn't exist
  // there will be a page break error
  Logger.log(questions[0].getTitle());
  first_name_q = questions[0].asTextItem();

  Logger.log(questions[1].getTitle());
  last_name_q = questions[1].asTextItem();

  Logger.log(questions[2].getTitle());
  email_q = questions[2].asTextItem();

  Logger.log(questions[3].getTitle());
  club_q = questions[3].asListItem();

  Logger.log(questions[4].getTitle());
  date_q = questions[4].asTextItem();

  Logger.log(questions[5].getTitle());
  start_time_q = questions[5].asTimeItem();

  Logger.log(questions[6].getTitle());
  end_time_q = questions[6].asTimeItem();

  Logger.log(questions[7].getTitle());
  multiple_dates_q = questions[7].asTextItem();

  Logger.log(questions[8].getTitle());
  we_did_q = questions[8].asTextItem();

  Logger.log(questions[9].getTitle());
  we_learned_q = questions[9].asParagraphTextItem();

  Logger.log(questions[10].getTitle());
  total_hours_q = questions[10].asTextItem();

  Logger.log(questions[11].getTitle());
  org_name_q = questions[11].asTextItem();

  Logger.log(questions[12].getTitle());
  contact_person_q = questions[12].asTextItem();

  Logger.log(questions[13].getTitle());
  email_phone_contact_person_q = questions[13].asTextItem();
  // this is the end of the normal behavior
  // this is also the end of the normal fields from the form

  // now we have a page break item
  // which i guess is the field of the section name at the top of the page
  Logger.log(questions[14].getType());
  Logger.log(questions[14].getTitle());
  var pageBreak = questions[14].asPageBreakItem();

  // so now vol1_q is actually field 15

  Logger.log(questions[15].getTitle());
  Logger.log(questions[15].getType());
  vol1_q = questions[15].asTextItem();

  Logger.log(questions[16].getTitle());
  vol1_hrs_q = questions[16].asTextItem();

  Logger.log(questions[17].getTitle());
  vol2_q = questions[17].asTextItem();

  Logger.log(questions[18].getTitle());
  vol2_hrs_q = questions[18].asTextItem();

  Logger.log(questions[19].getTitle());
  vol3_q = questions[19].asTextItem();

  Logger.log(questions[20].getTitle());
  vol3_hrs_q = questions[20].asTextItem();

  Logger.log(questions[21].getTitle());
  vol4_q = questions[21].asTextItem();

  Logger.log(questions[22].getTitle());
  vol4_hrs_q = questions[22].asTextItem();

  Logger.log(questions[23].getTitle());
  vol5_q = questions[23].asTextItem();

  Logger.log(questions[24].getTitle());
  vol5_hrs_q = questions[24].asTextItem();

  Logger.log('the required fields are all being read in');

  //now is the issue of whether or not to add in more volunteers if they werent filled out
  // for volunteers 6 - 25 we have to make a check before we add them in
  // the form will have slots for the other volunteers so the option of
  // vol6_q = questions[24].asTextItem(); is going to be a valid call
  // if there was not an input for a field then the value is going to be ""
  // if there is not a field by that name the value will be equal to null because it doesn't exist

  //creating and setting responses for a particular question
  //lets start by creating the cehc

  //formats the time fields
  var hour_start = getHourFromTimeString(userInput.start);
  var minutes_start = getMinutesFromTimeString(userInput.start);
  var mode_start = getAMPMFromTimeString(userInput.start);
  hour_start = makeMilitaryTime(hour_start, mode_start);

  var hour_end = getHourFromTimeString(userInput.end);
  var minutes_end = getMinutesFromTimeString(userInput.end);
  var mode_end = getAMPMFromTimeString(userInput.end);
  hour_end = makeMilitaryTime(hour_end, mode_end);

  var first_name_r = first_name_q.createResponse(userInput.first_name);
     Logger.log('made it hiiii');
  var last_name_r = last_name_q.createResponse(userInput.last_name);
   Logger.log('made it hiiii');
  var email_r = email_q.createResponse(userInput.email);
   Logger.log('made it hiiii');
  // note that for the dropdown list, it has to match the exact name in the dropdown of the form
  Logger.log(userInput.club);
  var club_r = club_q.createResponse(userInput.club);
     Logger.log('made it hiiii');
  var date_r = date_q.createResponse(userInput.date);
   Logger.log('made it hello');

  // the time fields must be entered in as military time
  // so we may have to do some converting there
  // and string parsing because you have to enter hour and minutes separately

  var start_time_r = start_time_q.createResponse(hour_start,minutes_start);
     Logger.log('heyyy');
  var end_time_r = end_time_q.createResponse(hour_end, minutes_end);
   Logger.log('heyyy');
  var multiple_dates_r = multiple_dates_q.createResponse(userInput.dates);
  var we_did_r = we_did_q.createResponse(userInput.did);
  var we_learned_r = we_learned_q.createResponse(userInput.learn);
  var total_hours_r = total_hours_q.createResponse(userInput.hours);
  var org_name_r = org_name_q.createResponse(userInput.org);
  var contact_person_r = contact_person_q.createResponse(userInput.contact);
   Logger.log('frands');
  var email_phone_contact_person_r = email_phone_contact_person_q.createResponse(userInput.contact_email);
  var vol1_r = vol1_q.createResponse(userInput.vol1);
  var vol1_hrs_r = vol1_hrs_q.createResponse(userInput.vol1_hrs);
  var vol2_r = vol2_q.createResponse(userInput.vol2);
  var vol2_hrs_r = vol2_hrs_q.createResponse(userInput.vol2_hrs);
  var vol3_r = vol3_q.createResponse(userInput.vol3);
  var vol3_hrs_r = vol3_hrs_q.createResponse(userInput.vol3_hrs);
  var vol4_r = vol4_q.createResponse(userInput.vol4);
  var vol4_hrs_r = vol4_hrs_q.createResponse(userInput.vol4_hrs);
  var vol5_r = vol5_q.createResponse(userInput.vol5);
  var vol5_hrs_r = vol5_hrs_q.createResponse(userInput.vol5_hrs);

    Logger.log('made it here');

  // for the next fields we need to make sure they exist, if they do we then add them in
  if (userInput.vol6 == null){
    Logger.log('no value');
  }
  else{
    Logger.log('valid field');
  }

  //now we need to handle the case where we read in up to 25 people....
  //so we need to first check that the user input field is valid




  // creating the response object for the form only need one per form
  // there are two functions for createResonse
  // with a variable it sets a question response
  // with no parameters it creates a submittal form
  var form_responses = existing_form.createResponse();

  // adding in the individual question responses
  form_responses.withItemResponse(first_name_r);
  form_responses.withItemResponse(last_name_r);
  form_responses.withItemResponse(email_r);
  form_responses.withItemResponse(club_r);
  form_responses.withItemResponse(date_r);
  form_responses.withItemResponse(start_time_r);
  form_responses.withItemResponse(end_time_r);
  form_responses.withItemResponse(multiple_dates_r);
  form_responses.withItemResponse(we_did_r);
  form_responses.withItemResponse(we_learned_r);
  form_responses.withItemResponse(total_hours_r);
  form_responses.withItemResponse(org_name_r);
  form_responses.withItemResponse(contact_person_r);
  form_responses.withItemResponse(vol1_r);
  form_responses.withItemResponse(vol1_hrs_r);
  form_responses.withItemResponse(vol2_r);
  form_responses.withItemResponse(vol2_hrs_r);
  form_responses.withItemResponse(vol3_r);
  form_responses.withItemResponse(vol3_hrs_r);
  form_responses.withItemResponse(vol4_r);
  form_responses.withItemResponse(vol4_hrs_r);
  form_responses.withItemResponse(vol5_r);
  form_responses.withItemResponse(vol5_hrs_r);
  // handle filling forms out with only certain fields filled out

  // submitting the form
  form_responses.submit();

  return true;
}

function getHourFromTimeString(timeString){
  var split_string = timeString.split(":");
  return split_string[0];
}

function getMinutesFromTimeString(timeString){
  var split_string = timeString.split(":");
  var rightSideOfColon = split_string[1];
  var split_right_side = rightSideOfColon.split(" ");
  return split_right_side[0];
}

function getAMPMFromTimeString(timeString){
  var split_string = timeString.split(":");
  var rightSideOfColon = split_string[1];
  var split_right_side = rightSideOfColon.split(" ");
  if (split_right_side[1] != null){
    // this means that there is an am/pm field
    return split_right_side[1];
  }
  var empty = " ";
  return empty;
}

function makeMilitaryTime(hour, AMPM){
  var numHour = parseInt(hour);
  Logger.log(numHour);
  if((AMPM === "PM") || (AMPM === "pm")){
    return numHour + 12;
  }
  return hour;
}

//var itemResponse = TextItem.createResponse('my text');

    //test_form.addTextItem();
    //get the first question as a text item
   // gives you ability to make an option
