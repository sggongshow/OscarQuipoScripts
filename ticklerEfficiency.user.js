// ==UserScript==
// @name        Tickler Efficiency
// @namespace   GongOscar
// @description Tickler default task and selects text box/ default tickler person as well
// @include     */ticklerAdd.jsp?*
// @include     *ForwardDemographicTickler.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.03.20.1
// ==/UserScript==

//Changelog
//23.03.20.1 - changed code for submit button as it was renamed
//23.02.12.0 - modified for quipo: default tickler person plus Event Change to make sure it works
//Jan 3, 2022 - change ID to surrey ID for tickling self
//Dec 31 2022 - make it default to surrey and TCI

//wait window load first

var myIDNum = '133'

window.addEventListener('load', function() {


  $('a[title="Show/Hide Date Quickpick Options"]')[0].click()

  var MeBut = document.createElement('input');
  MeBut.type = 'button';
  MeBut.id = 'meButton'
  MeBut.name = 'meButton'
  MeBut.value = 'For Me'
  MeBut.onclick = meButtonFunc
  MeBut.setAttribute('style', 'width:80px;font-size:12px;padding:0px;position:fixed;top:60px;right:10; border-color:blue;');
	document.body.appendChild(MeBut);

  var HiBut = document.createElement('input');
  HiBut.type = 'button';
  HiBut.id = 'HiButton'
  HiBut.name = 'HiButton'
  HiBut.value = 'Urgent'
  HiBut.onclick = HiButtonFunc
  HiBut.setAttribute('style', 'width:80px;font-size:12px;padding:0px;position:fixed;top:80px;right:10; border-color:red;');
	document.body.appendChild(HiBut);

   //Default Tickler
  var LocationAssign = $('select[name=site]')[0]
  LocationAssign.value = 6
  var taskAssign = $('select[name=task_assigned_to]')[0]
  taskAssign.value = 34

  setdefault()

  //--------- select the textbox area so I can start typing immediately
  var textBox = $('textarea[name="textarea"]')
  textBox.select()
}, false);


document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;



  switch(true){
      //Acknowledge  button
    case theAltKey && theKey==='1':
      var subButton = $('input[type="button"][value*=Add][value*=EXIT]')
      subButton.click()
			break;

    case theAltKey && theKey==='w':
      meButtonFunc()
			break;

    case theAltKey && theKey==='q':
      HiButtonFunc()
			break;

    default:
      break;
  }


}, true);

function setdefault(){
  var LocationAssign = $('select[name=site]')[0]
  console.log(LocationAssign)
  LocationAssign.value = "Surrey"

  //activates the change event.
  var changeEvent = new Event("change");
  LocationAssign.dispatchEvent(changeEvent);

  var taskAssign = $('select[name=task_assigned_to]')[0]
  taskAssign.value = 34
}

function meButtonFunc(){
  var taskAssign = $('select[name=task_assigned_to]')[0]
  taskAssign.value = myIDNum
}
function HiButtonFunc(){
  var priorityAssign = $('select[name=priority]')[0]
  priorityAssign.value = 'High'
  //var taskAssign = $('select[name=task_assigned_to]')[0]
  //taskAssign.value = 40
}
