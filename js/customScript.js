////////////////////////Setting the Hover Functions/////////////////////////////

function hoverHouse(element) {
    element.setAttribute('src', 'img/icons/home-blue.png');
}
function unhoverHouse(element) {
    element.setAttribute('src', 'img/icons/home.png');
}

function hoverPig(element) {
    element.setAttribute('src', 'img/icons/piggy-bank-blue.png');
}
function unhoverPig(element) {
    element.setAttribute('src', 'img/icons/piggy-bank.png');
}

function hoverShoe(element) {
    element.setAttribute('src', 'img/icons/shoe-blue.png');
}
function unhoverShoe(element) {
    element.setAttribute('src', 'img/icons/shoe.png');
}

function hoverPlane(element) {
    element.setAttribute('src', 'img/icons/departures-blue.png');
}
function unhoverPlane(element) {
    element.setAttribute('src', 'img/icons/departures.png');
}

function hoverForm(element) {
    element.setAttribute('src', 'img/icons/forms-blue.png');
}
function unhoverForm(element) {
    element.setAttribute('src', 'img/icons/forms.png');
}

function hoverWarning(element) {
    element.setAttribute('src', 'img/icons/warning-blue.png');
}
function unhoverWarning(element) {
    element.setAttribute('src', 'img/icons/warning.png');
}

function hoverTracking(element) {
    element.setAttribute('src', 'img/icons/bar-chart-blue.png');
}
function unhoverTracking(element) {
    element.setAttribute('src', 'img/icons/bar-chart.png');
}

function hoverMan(element) {
    element.setAttribute('src', 'img/icons/man-blue.png');
}
function unhoverMan(element) {
    element.setAttribute('src', 'img/icons/man.png');
}

///////////Adding new input forms to the community service form/////////////////

var counter = 1;
var limit = 3;

function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "<label id = 'font-style' for='email_id' class='control-label'>Volunteer " +(counter + 1) + "</label>"
          newdiv.innerHTML += "<input type='text' class='form-control' id='between_input' name='volunteer" + (counter + 1) + "' placeholder='Volunteer Name'>";

          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}
/*
<label id = "font-style" for="full_name" class="control-label">name of person we can contact with the org to verify your clubs activityplease</label>
<input type="text" class="form-control" id="between_input" name="contact" placeholder="Organization Contact Name">
<input type="text" class="form-control" id="between_input" name="contact" placeholder="Organization Contact Name">
*/
