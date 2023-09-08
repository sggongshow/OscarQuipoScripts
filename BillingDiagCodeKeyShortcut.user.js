// ==UserScript==
// @name        Diag Code Keyboard Shortcut
// @namespace   GongOscar
// @description Add shortcut key for selecting Diag Codes
// @include     *billingDigNewSearch.jsp?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.09.08.1
// ==/UserScript==

//23.01.23.2: added contracted hours shift codes to auto populate (97570) the start and end times

//wait window load first

window.addEventListener('load', function() {

}, false);


document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;


  switch(true){
      //Confirm  button
    case theAltKey && theKey==='1':
      hitSubmit()
			break;

    default:
      break;
  }


}, true);

// add the automatic hours when the hours submission code is seen of  97570
function autoTimeInput(serviceCodeElement){
  //console.log("autotime input")
  var serviceCodeUnitID = serviceCodeElement.id + "_unit"
  //console.log(serviceCodeUnitID)
  var serviceCodeUnitElement = $(`[${"id"}="${serviceCodeUnitID}"]`)[0];
  //var serviceCodeUnitElement = document.getElementById(serviceCodeUnitID); //does the same thing
  var hours = Number(serviceCodeUnitElement.value)/4;

  var startHour = new Date(2022, 0, 1, 9, 0, 0)
  var startHourPrint = moment(startHour).format('HHmm')

  var endHour = moment(startHour).add(hours, 'hours')
  var endHourPrint = moment(endHour).format('HHmm')

  var startTimeBox = $("[id='serviceStartTime']")[0]
  var endTimeBox = $("[id='serviceEndTime']")[0]
  startTimeBox.value = startHourPrint
  endTimeBox.value = endHourPrint

  //this part is necessary for the time inputs to be registered properly for the next actuall billing page. otherwise it sometimes errors the times
  //such as error of start time of 09:0009:00 instead of just 09:00 once
  var timeClick = $("[class='input-group-addon']")
  for (let button of timeClick){
    console.log(button)
    button.click()
    button.click()
  };


  hitSubmit()

}

//hit the submit button
function hitSubmit(){
  var subButton = $('input[type="submit"][value="Continue"][name="Submit"]')
  //console.log("hitsubmit")

  if (subButton.attr("value")==null){
    subButton = $('input[type="submit"][value*="Save"][value*="Bill"][name="submit"]')
  }
  if (subButton.attr("value")==null){
    subButton = $('input[type="submit"][value="Confirm"][name="update"]')
  }

  subButton.click()
}

