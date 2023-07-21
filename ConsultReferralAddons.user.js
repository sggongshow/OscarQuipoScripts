// ==UserScript==
// @name        Consult Referral Addons
// @namespace   GongOscar
// @description Consult Referal Addons
// @include     */ConsultationFormRequest.jsp*
// @include     *ViewRequest.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			23.07.21.0
// ==/UserScript==


window.addEventListener('load', function() {

  var faxNoteBut = document.createElement('input');
  faxNoteBut.type = 'button';
  faxNoteBut.id = 'faxNoteBut'
  faxNoteBut.name = 'faxNoteBut'
  faxNoteBut.value = 'Add "FAXED" note'
  faxNoteBut.onclick = faxNoteButFunc
  faxNoteBut.setAttribute('style', 'width:120px;font-size:12px;padding:0px; background-color:yellow;');

  var appendBox = document.getElementsByClassName("container-fluid well")[0].firstElementChild.firstElementChild
  var childElements = appendBox.children
  appendBox = childElements[childElements.length-3]


  appendBox.firstElementChild.appendChild(faxNoteBut);



}, true);



function faxNoteButFunc(){
  var appointmentNoteBox = document.querySelector('[name="appointmentNotes"]')

  //get DATE
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  const currentDateText = `${day} ${month} ${year}`;
  console.log(currentDateText);

  //get Doctor
  const DoctorUser = document.getElementById('letterheadName').selectedOptions[0].text
  appointmentNoteBox.value += "\n Faxed on " + currentDateText + " - " + DoctorUser

  // Pending specialist clicked
  document.getElementsByClassName("stat")[4].firstElementChild.click()


}
