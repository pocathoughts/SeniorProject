////////////////////////Setting the Hover Functions/////////////////////////////

function hoverHouse(element) {
    element.setAttribute('src', '../img/icons/colors/home-blue.png');
}
function unhoverHouse(element) {
    element.setAttribute('src', '../img/icons/home.png');
}

function hoverPig(element) {
    element.setAttribute('src', '../img/icons/colors/piggy-bank-blue.png');
}
function unhoverPig(element) {
    element.setAttribute('src', '../img/icons/piggy-bank.png');
}

function hoverShoe(element) {
    element.setAttribute('src', '../img/icons/colors/shoe-blue.png');
}
function unhoverShoe(element) {
    element.setAttribute('src', '../img/icons/shoe.png');
}

function hoverPlane(element) {
    element.setAttribute('src', '../img/icons/colors/departures-blue.png');
}
function unhoverPlane(element) {
    element.setAttribute('src', '../img/icons/departures.png');
}

function hoverForm(element) {
    element.setAttribute('src', '../img/icons/colors/forms-blue.png');
}
function unhoverForm(element) {
    element.setAttribute('src', '../img/icons/forms.png');
}

function hoverContact(element) {
    element.setAttribute('src', '../img/icons/colors/agenda-blue.png');
}
function unhoverContact(element) {
    element.setAttribute('src', '../img/icons/agenda.png');
}

function hoverTracking(element) {
    element.setAttribute('src', '../img/icons/colors/bar-chart-blue.png');
}
function unhoverTracking(element) {
    element.setAttribute('src', '../img/icons/bar-chart.png');
}

function hoverMan(element) {
    element.setAttribute('src', '../img/icons/colors/man-blue.png');
}
function unhoverMan(element) {
    element.setAttribute('src', '../img/icons/man.png');
}

function hoverAccountMod(element) {
    element.setAttribute('src', '../img/icons/colors/account-blue.png');
}

function unhoverAccountMod(element) {
    element.setAttribute('src', '../img/icons/account.png');
}

function hoverEdit(element) {
    element.setAttribute('src', '../img/icons/colors/edit-blue.png');
}

function unhoverEdit(element) {
    element.setAttribute('src', '../img/icons/edit.png');
}

///////////Adding new input forms to the community service form/////////////////

var counter = 5;
var limit = 20;

function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var volDiv = document.createElement('div');
          volDiv.className = 'row';
          volDiv.innerHTML = "<label id = 'font-style' for = 'new_vol' class='control-label'>Volunteer " +(counter + 1) + "</label>";
          volDiv.innerHTML += "<input type='text' class='form-control' id='between_input' name='vol" + (counter + 1) + "' placeholder='Name of Volunteer " + (counter + 1) +" '>";

          document.getElementById(divName).appendChild(volDiv);

          var volHoursDiv = document.createElement('div');
          volHoursDiv.className = 'row';
          volHoursDiv.innerHTML = "<label id = 'font-style' for='new_vol_hrs' class='control-label'>Hours worked by Volunteer " + (counter + 1) + "</label>";
          volHoursDiv.innerHTML = "<input type='text' class='form-control' id='between_input' name='vol" + (counter + 1) + "_hrs' placeholder='Hours Served By Volunteer " + (counter + 1)+ "' >";

          document.getElementById(divName).appendChild(volHoursDiv);
          counter++;
     }
}


/*
<label id = "font-style" for="full_name" class="control-label">name of person we can contact with the org to verify your clubs activityplease</label>
<input type="text" class="form-control" id="between_input" name="contact" placeholder="Organization Contact Name">
<input type="text" class="form-control" id="between_input" name="contact" placeholder="Organization Contact Name">
*/
