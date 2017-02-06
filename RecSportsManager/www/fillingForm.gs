/* here are the woes to this code

If the form is changed in format (text, dropdown, dates, etc)
I don't know a more concise way to create fields for everything
so each step is explicitely laid out at the moment. */

function myFunction(var1, var2) {
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


  // pulling the right form, use a test form with this url
  // https://docs.google.com/forms/d/17aT5AuZ4XntfmV93VwjlZ9hE-FqI8YjK8z1ppEUUMmw/edit?usp=sharing
  var existing_form = FormApp.openByUrl('https://docs.google.com/forms/d/17aT5AuZ4XntfmV93VwjlZ9hE-FqI8YjK8z1ppEUUMmw/edit?usp=sharing');

  // gets the question items
  var questions = existing_form.getItems();

  // setting the questions
  first_name_q = questions[0].asTextItem();
  last_name_q = questions[1].asTextItem();
  email_q = questions[2].asTextItem();
  club_q = questions[3].asListItem();
  date_q = questions[4].asTextItem();
  start_time_q = questions[5].asTimeItem()
  end_time_q = questions[6].asTimeItem();
  multiple_dates_q = questions[7].asTextItem();
  we_did_q = questions[8].asTextItem();
  we_learned_q = questions[9].asParagraphTextItem();
  total_hours_q = questions[10].asTextItem();
  org_name_q = questions[11].asTextItem();
  contact_person_q = questions[12].asTextItem();
  email_phone_contact_person_q = questions[13].asTextItem();


  //creating and setting responses for a particular question
  var first_name_r = first_name_q.createResponse(var1);
  var last_name_r = last_name_q.createResponse(var2);
  var email_r = email_q.createResponse('email');
  // note that for the dropdown list, it has to match the exact name in the dropdown of the form
  var club_r = club_q.createResponse('Beach Volleyball');
  var date_r = date_q.createResponse('data q');
  // the time fields must be entered in as military time
  // so we may have to do some converting there
  var start_time_r = start_time_q.createResponse(9, 00);
  var end_time_r = end_time_q.createResponse(15, 00);
  var multiple_dates_r = multiple_dates_q.createResponse('data q');
  var we_did_r = we_did_q.createResponse('data q');
  var we_learned_r = we_learned_q.createResponse('data q');
  var total_hours_r = total_hours_q.createResponse('data q');
  var org_name_r = org_name_q.createResponse('data q');
  var contact_person_r = contact_person_q.createResponse('data q');
  var email_phone_contact_person_r = email_phone_contact_person_q.createResponse('data q');


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
  form_responses.withItemResponse(email_phone_contact_person_r);

  // submitting the form
  form_responses.submit();
}

//var itemResponse = TextItem.createResponse('my text');

    //test_form.addTextItem();
    //get the first question as a text item
   // gives you ability to make an option
