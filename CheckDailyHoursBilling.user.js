// ==UserScript==
// @name        Check for Daily Hours Billing
// @namespace   GongOscar
// @description Check if the daily 97570 billing has been submitted. Easily seen on day sheet
// @include     *providercontrol.jsp?*displaymode=day*
// @include     *provideradminday.jsp?*displaymode=day*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    24.07.10.0
// ==/UserScript==

//24.07.10.0: 97570 button and check removed
//24.01.15.1: updated with LFP buttons
//23.02.12.0: quipo update: changed URL details so provider info + date are accurate
//23.02.06.0: fixed billing date so it's same date as visit, not current date
//23.02.02.0 : updated @include another .jsp that oscar sometimes uses

var providerID = 0
var baseURL
var ICDArray = [];
var measureDateArray = [];

//this method of getting path is better as if a custom OSCAR uses a different sub-url like /juno/ instead of /oscar/ then it corrects it along with it
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/')


var checkButton = document.createElement('input');
  checkButton.type = 'button';
  checkButton.id = 'checkButton'
  checkButton.name = 'checkButton'
  checkButton.value = 'Day Hours Billed?'
  checkButton.onclick = billingButtonClick;
  checkButton.setAttribute('style', 'width:130px;font-size:12px;padding:0px; background-color:cyan;');

var checkButtonLFP1 = document.createElement('input');
  checkButtonLFP1.type = 'button';
  checkButtonLFP1.id = 'checkButtonLFP1'
  checkButtonLFP1.name = 'checkButtonLFP1'
  checkButtonLFP1.value = 'Day Hours Billed?'
  checkButtonLFP1.onclick = billingButtonLFP1Click;
  checkButtonLFP1.setAttribute('style', 'width:130px;font-size:12px;padding:0px; background-color:cyan;');

var checkButtonLFP2 = document.createElement('input');
  checkButtonLFP2.type = 'button';
  checkButtonLFP2.id = 'checkButtonLFP2'
  checkButtonLFP2.name = 'checkButtonLFP2'
  checkButtonLFP2.value = 'Day Hours Billed?'
  checkButtonLFP2.onclick = billingButtonLFP2Click;
  checkButtonLFP2.setAttribute('style', 'width:130px;font-size:12px;padding:0px; background-color:cyan;');

window.addEventListener('load', function() {
  //console.log("running Daily Hour script")
  baseURL = window.location.toString()
  var numProvidersVisible = document.querySelectorAll('[id="expandReason"]').length
  //console.log(numProvidersVisible)

  //only show button if 1 provider is visible on the schedule. UNSURE IF 100% Accurate with this if statement variable. will need testing
  //failed using URL based as wildly variable URLS in different scenarios.
  //Currently using the number of asterix symbols seen on provider list
  if (numProvidersVisible ==1){
    main()
  }


}, false);

function main(){
  //console.log('run main')
  ///get the provider ID of the person on visble list regardless if provider that is logged in
  providerID = document.querySelectorAll('[title="zoom view"]')[0].getAttribute("onclick").split("'")[1]
  console.log(providerID)

  //Append the button
  var AppendingParagraph = $(".infirmaryView")[0]
	//AppendingParagraph.appendChild(checkButton);
  AppendingParagraph.appendChild(checkButtonLFP1);
  AppendingParagraph.appendChild(checkButtonLFP2);
  realCheckBilling()
}

function changeButton(){
  if (ICDArray.includes("97570")){
    checkButton.value = "97570 DONE TODAY"
    checkButton.setAttribute("style", "width:130px;font-size:12px;padding:0px; background-color:lime;")
    checkButton.disabled = "true"
  }else{
    checkButton.value = "97570 NOT DONE"
    checkButton.setAttribute("style", "width:130px;font-size:12px;padding:0px; background-color:red;")

  }
  //for LFP billing 1
  if (ICDArray.includes("98010")){
    checkButtonLFP1.value = "98010 DONE TODAY"
    checkButtonLFP1.setAttribute("style", "width:130px;font-size:12px;padding:0px; background-color:lime;")
    checkButtonLFP1.disabled = "true"
  }else{
    checkButtonLFP1.value = "98010 NOT DONE"
    checkButtonLFP1.setAttribute("style", "width:130px;font-size:12px;padding:0px; background-color:purple;")

  }
  //for LFP billing 1
    if (ICDArray.includes("98011")){
    checkButtonLFP2.value = "98011 DONE TODAY"
    checkButtonLFP2.setAttribute("style", "width:130px;font-size:12px;padding:0px; background-color:lime;")
    checkButtonLFP2.disabled = "true"
  }else{
    checkButtonLFP2.value = "98011 NOT DONE"
    checkButtonLFP2.setAttribute("style", "width:130px;font-size:12px;padding:0px; background-color:purple;")

  }

}

function realCheckBilling(){

  //https://total-life-care.kai-oscar.com/oscar/billing/CA/BC/billStatus.jsp?showMSP=show&billTypes=%25&submitted=yes&providerview=133&xml_vdate=2023-01-24

  var chartDate = document.querySelectorAll('[class="dateAppointment"]')[0].innerText.split(',')[1].trim()
  var newURL = vPath + "billing/CA/BC/billStatus.jsp?showMSP=show&billTypes=%25&submitted=yes"
  newURL = newURL + "&providerview=" + providerID + "&xml_vdate=" + chartDate + "&xml_appointment_date=" + chartDate
  //console.log(newURL)

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', newURL, false);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var str = xmlhttp.responseText; //local variable
     //console.log(str)

      if (!str) {
        return;
      }

      var myRe = /<td align="center">[0-9]{5}<\/td>\s*/g;
      var myArray
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString()
        //alert(y)
        var mycode = y.substring(19, 24)
        //alert(mycode)
        ICDArray[i] = mycode;
        //alert(mycode)
        i = i + 1;
      }

      //console.log(ICDArray)

    }
  }
  xmlhttp.send();

  changeButton()

}

function billingButtonClick(){
  let firstPt = document.querySelectorAll('[class="apptLink"]')

  //Check to see if there any patient on the daysheet to begin with
  if(firstPt.length>0){
    firstPt = firstPt[0]
  }else{
    //console.log("no pts on list")
    return
  }

  let extractedURL = firstPt.getAttribute("onclick").split(',')[2]

  //get the demographic_no
  let demNum = extractedURL.split("demographic_no=")[1].split("&")[0]
  //Get the name of patient and change name into correct format for URL requirements
  let NameFormat = firstPt.getAttribute("title").split("\n")[0].toUpperCase()
  NameFormat = NameFormat.replace(',',"%2C")
  let apptDate = document.querySelectorAll('[class="dateAppointment"]')[0].innerText.split(',')[1].trim()

  //URL for billing of first patient on list
  var newURL = vPath + "billing.do?billRegion=BC&billForm=GP&hotclick=&appointment_no=0&bNewForm=1&status=t" + "&user_no=" + providerID + "&apptProvider_no=" + providerID
  newURL = newURL + "&demographic_no=" + demNum + "&demographic_name=" + NameFormat + "&appointment_date=" + apptDate

  window.open(newURL,'Billing Window', 'left = 0,top = 0')
}

function billingButtonLFP1Click(){
  let firstPt = document.querySelectorAll('[class="apptLink"]')

  //Check to see if there any patient on the daysheet to begin with
  if(firstPt.length>0){
    firstPt = firstPt[0]
  }else{
    //console.log("no pts on list")
    return
  }

  let extractedURL = firstPt.getAttribute("onclick").split(',')[2]

  //get the demographic_no
  let demNum = extractedURL.split("demographic_no=")[1].split("&")[0]
  //Get the name of patient and change name into correct format for URL requirements
  let NameFormat = firstPt.getAttribute("title").split("\n")[0].toUpperCase()
  NameFormat = NameFormat.replace(',',"%2C")
  let apptDate = document.querySelectorAll('[class="dateAppointment"]')[0].innerText.split(',')[1].trim()

  //URL for billing of first patient on list
  var newURL = vPath + "billing.do?billRegion=BC&billForm=L23&hotclick=&appointment_no=0&bNewForm=1&status=t" + "&user_no=" + providerID + "&apptProvider_no=" + providerID
  newURL = newURL + "&demographic_no=" + demNum + "&demographic_name=" + NameFormat + "&appointment_date=" + apptDate

  window.open(newURL,'Billing Window', 'left = 0,top = 0')
}

function billingButtonLFP2Click(){
  let firstPt = document.querySelectorAll('[class="apptLink"]')

  //Check to see if there any patient on the daysheet to begin with
  if(firstPt.length>0){
    firstPt = firstPt[0]
  }else{
    //console.log("no pts on list")
    return
  }

  let extractedURL = firstPt.getAttribute("onclick").split(',')[2]

  //get the demographic_no
  let demNum = extractedURL.split("demographic_no=")[1].split("&")[0]
  //Get the name of patient and change name into correct format for URL requirements
  let NameFormat = firstPt.getAttribute("title").split("\n")[0].toUpperCase()
  NameFormat = NameFormat.replace(',',"%2C")
  let apptDate = document.querySelectorAll('[class="dateAppointment"]')[0].innerText.split(',')[1].trim()

  //URL for billing of first patient on list
  var newURL = vPath + "billing.do?billRegion=BC&billForm=L23&hotclick=&appointment_no=0&bNewForm=1&status=t" + "&user_no=" + providerID + "&apptProvider_no=" + providerID
  newURL = newURL + "&demographic_no=" + demNum + "&demographic_name=" + NameFormat + "&appointment_date=" + apptDate

  window.open(newURL,'Billing Window', 'left = 0,top = 0')
}

//billing.do?billRegion=BC&billForm=GP&hotclick=&demographic_name=Liu%2CXiao&status=t&demographic_no=48873&providerview=133&user_no=133&apptProvider_no=133&appointment_date=2023-2-13&start_time=09:00:00&bNewForm=1

