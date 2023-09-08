// ==UserScript==
// @name        Billing Keyboard Shortcut
// @namespace   GongOscar
// @description Add shortcut key to Billing. Also allow for service code contracts hours to auto populate
// @include     *billing.do?billRegion*
// @include     *CreateBilling.d*
// @include     *billingBC.jsp?*
// @include     */oscar/CaseManagementEntry.do*
// @include     *SaveBilling.do?*
// @include     *formwcb.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.09.08.1
// ==/UserScript==

//changelog
//23.09.08.1: removed *billingDigNewSearch.jsp?* inclusion as causing errors in Diag Code selection pate. made separate script for that page
//23.01.23.2: added contracted hours shift codes to auto populate (97570) the start and end times

//wait window load first

var BillingCodeArray

window.addEventListener('load', function() {
  var textBox = $('textarea[name="textarea"]')
  textBox.select()

  BillingCodeArray = $("[id*='billing']").filter("[id$='fee']")



  //console.log(BillingCodeArray)
}, false);


document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;


  switch(true){
      //Confirm  button
    case theAltKey && theKey==='1':
      //console.log("alt1 pressed")
      //console.log(BillingCodeArray.length)
      var find97570 = true
      for (let element of BillingCodeArray){
        //console.log(element.value)
        if (element.value.includes("97570")){
          //console.log("97570 code found")
          autoTimeInput(element)
          break
        }
      };

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

