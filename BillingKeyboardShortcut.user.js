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
// @version	    24.01.16.2
// ==/UserScript==

//changelog
//24.01.16.2: added LFP billing code rules
//23.09.11.1: changed BillingCodeArray search as problems with autopopulating times with Daycode. (need to check if works in all computers)
//23.09.08.1: removed *billingDigNewSearch.jsp?* inclusion as causing errors in Diag Code selection pate. made separate script for that page
//23.01.23.2: added contracted hours shift codes to auto populate (97570) the start and end times

//wait window load first

var BillingCodeArray

window.addEventListener('load', function() {
  var textBox = $('textarea[name="textarea"]')
  textBox.select()

  //BillingCodeArray = $("[id*='billing']").filter("[id$='fee']")
  BillingCodeArray = document.querySelectorAll("[name*='xml_other']")


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
      var findHoursCode = false
      for (var i = 0; i < BillingCodeArray.length; i++){
        var element = BillingCodeArray[i]
        console.log(element.value)
        if (element.value.includes("97570")){
          console.log("97570 code found")
          findHoursCode = true
          autoTimeInput(BillingCodeArray[i+1])
          break
        } else if (element.value.includes("98011")){
          console.log("98011 code found")
          findHoursCode = true
          autoTimeInputLFP2(BillingCodeArray[i+1])
          break
        } else if (element.value.includes("98010")){
          //console.log("98010 code found")
          //console.log(BillingCodeArray[i+1])
          findHoursCode = true
          var hourscountX4 = 32 //8h 9-5
          BillingCodeArray[i+1].value = 32
          autoTimeInputLFP(BillingCodeArray[i+1])
          break
        }

      }

      if (findHoursCode == false){
        hitSubmit()
      }
      break;

    default:
      break;
  }


}, true);

// add the automatic hours when the hours submission code is seen of  97570
function autoTimeInput(serviceCodeElement){
  console.log("autotime input")
  var serviceCodeUnitID = serviceCodeElement.id
  console.log(serviceCodeUnitID)
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

function autoTimeInputLFP(serviceCodeElement){
  console.log("autotime input2")
  var serviceCodeUnitID = serviceCodeElement.id
  console.log(serviceCodeUnitID)
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

function autoTimeInputLFP2(serviceCodeElement){ //duplicate for 98011 due to custom later time usually.
  console.log("autotime input2")
  var serviceCodeUnitID = serviceCodeElement.id
  console.log(serviceCodeUnitID)
  var serviceCodeUnitElement = $(`[${"id"}="${serviceCodeUnitID}"]`)[0];
  //var serviceCodeUnitElement = document.getElementById(serviceCodeUnitID); //does the same thing
  var hours = Number(serviceCodeUnitElement.value)/4;

  //randomize start time for indirect care
  var startHourArray = [18,19,20]
  var startMinArray = [0,30]
  var randomHour = startHourArray[Math.floor(Math.random()*startHourArray.length)]
  var randomMin = startMinArray[Math.floor(Math.random()*startMinArray.length)]

  var startHour = new Date(2022, 0, 1, randomHour, randomMin, 0)
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


  //hitSubmit()

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

