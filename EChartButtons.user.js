// ==UserScript==
// @name        Echart buttons
// @namespace   GongOscar
// @description Various navigation buttons for echart screen.  Set your own specific fid (form number) or Measurement groupName
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @grant 	GM_openInTab
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @version     23.08.11.0
// ==/UserScript==
//window.moveTo(300, 100)
//
//changelog
//23.08.11.0 - added auto encouter date to note 
//23.02.12.0 - re-enabled lab grid for quipo
//23.01.10.1 - changed to surrey imaging req and lifelabs
//22.12.08.0 - lab grid dead. looonnng wait due to well health. disabled
//22.09.26.0 - updated mammogram fid


// @require https://code.jquery.com/jquery-1.7.2.min.js
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}
function getCookie(cname)
{
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
} //x = $('#enTemplate');
//x.css('background-color', 'yellow');

var myWindow = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '//')
//console.log(elements)

var splitApptNum = window.location.toString().split("appointmentNo")[1]
var ApptNum = splitApptNum.split("=")[1].split("&")[0]
if (ApptNum.length<1){
	ApptNum = 0
}

console.log(elements)


//alert(vPath)

var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res) //var myWindow = window.open("","","width=200,height=100");
var input = document.createElement('input');
input.type = 'button';
input.value = 'INR';
input.onclick = showAlert;
input.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:0px;right:0px; ');
document.body.appendChild(input);
function showAlert()
{
  $('#menu3 > a:nth-child(12)').click()
  //window.open(vPath + "/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=INR%20Management")
    window.open(vPath + "/oscarEncounter/oscarMeasurements/SetupDisplayHistory.do?type=INR","", "width=1000,height=600,left=50,top=400")
}
// INSERT YOU OWN MEASUREMENT UNIQUE SELECTOR  HERE
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Specialist';
input1.onclick = showAlert1;
input1.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:0px;right:60px; ');
document.body.appendChild(input1);
function showAlert1()
{
  window.open(vPath + '/billing/CA/BC/billingManageReferralDoc.jsp')
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Referral';
input2.onclick = showAlert2;
input2.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:0px;right:140px; ');
document.body.appendChild(input2);
function showAlert2()
{
  $('div[id*=menuTitleconsultation] > h3:nth-child(1) > a:nth-child(1)').click()
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'OSA';
input3.onclick = showAlert3;
input3.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:120px;right:0px; background-color: #ffff00;');
document.body.appendChild(input3);
function showAlert3()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1173&demographic_no=' + demo_no + '&appointment=' + ApptNum// INSERT YOU OWN form ID (fid=??) here
  var formPath2 = vPath + '/eform/efmformadd_data.jsp?fid=1088&demographic_no=' + demo_no + '&appointment=' + ApptNum// INSERT YOU OWN form ID (fid=??) here

  var popup1 = window.open(formPath,'Popup_Window5a', 'width=800,height=800,left = 0,top = 0')
  var popup2 = window.open(formPath2,'Popup_Window5b', 'width=800,height=800,left = 0,top = 0')

}
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'BP/HR/Wt';
input4.onclick = showAlert4;
input4.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:30px;right:60px; ');
document.body.appendChild(input4);
function showAlert4() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  //$('#menu3 > a:nth-child(2)').click()
  window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Vitals', 'VitalsWindow', 'width=1000,height=500')
}
var input5 = document.createElement('input');
input5.type = 'button';
input5.value = 'Forms';
input5.onclick = showAlert5;
input5.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:30px;right:140px; ');
document.body.appendChild(input5);
function showAlert5()
{
  $('div[id*=menuTitleeforms] > h3:nth-child(1) > a:nth-child(1)').click()
} // INSERT YOU OWN MEASUREMENT UNIQUE SELECTOR

var input6 = document.createElement('input');
input6.type = 'button';
input6.value = 'Note';
input6.onclick = showAlert6;
input6.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:150px;right:0px;');
document.body.appendChild(input6);
function showAlert6()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1157&demographic_no=' + demo_no // INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath,'Popup_Window2', 'width=800,height=800,left = 0,top = 0')
}

/*
var input7 = document.createElement('input');
input7.type = 'button';
input7.value = 'Screening';
input7.onclick = showAlert7;
input7.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:60px; ');
document.body.appendChild(input7);
function showAlert7() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Screening%20Procedures', 'Screening%20ProceduresWindow', 'width=1000,height=700')
}
var input7 = document.createElement('input');
input7.type = 'button';
input7.value = 'Unused2';
input7.onclick = showAlert7;
input7.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:60px; ');
document.body.appendChild(input7);
function showAlert7() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=654&demographic_no=' + demo_no // INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath,'Popup_Window3', 'width=800,height=800,left = 800,top = 0')
}
*/

var input8 = document.createElement('input');
input8.type = 'button';
input8.value = 'Mammo';
input8.onclick = showAlert8;
input8.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:140px;background:#3366ff');
document.body.appendChild(input8);
function showAlert8()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1230&demographic_no=' + demo_no + '&appointment=' + ApptNum// INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath,'Popup_Window4', 'width=800,height=800,left = 0,top = 0')
}
var input9 = document.createElement('input');
input9.type = 'button';
input9.value = 'BMD';
input9.onclick = showAlert9;
input9.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:0px; background-color: #FFFFFF;');
document.body.appendChild(input9);
function showAlert9()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=979&demographic_no=' + demo_no + '&appointment=' + ApptNum// INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath,'Popup_Window5', 'width=800,height=800,left = 0,top = 0')
}

//expand left
var input51 = document.createElement('input');
input51.type = 'button';
input51.value = 'Expand';
input51.onclick = showAlert51;
input51.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:0px;left:0px; background-color: #ffff00;');
//document.body.appendChild(input51);
function showAlert51()
{
  $('#imgeforms5').click()
  $('#imgmeasurements5').click()
  $('#imgdocs5').click()
  $('#imglabs5').click()
  $('#imgpreventions5').click()
}

var input52 = document.createElement('input');
input52.type = 'button';
input52.value = 'PMHX';
input52.onclick = showAlert52;
input52.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:0px;left:80px;');
//document.body.appendChild(input52);
function showAlert52()
{
  $('#Dx > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
}

var input53 = document.createElement('input');
input53.type = 'button';
input53.value = '+Tickler';
input53.onclick = showAlert53;
input53.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:30px;left:0px;background-color: #ff6600;');
//document.body.appendChild(input53);
function showAlert53()
{
  $('#tickler > div:nth-child(2) > h3:nth-child(1) > a:nth-child(1)').click()
}

var input54 = document.createElement('input');
input54.type = 'button';
input54.value = 'Docs';
input54.onclick = showAlert54;
input54.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:30px;left:80px;background-color: #476BB3;');
//document.body.appendChild(input54);
function showAlert54()
{
  $('#docs > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
}

/*
var input10 = document.createElement('input');
input10.type = 'button';
input10.value = '- UNUSED3.';
input10.onclick = showAlert10;
input10.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:60px; ');
document.body.appendChild(input10);
function showAlert10() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  //window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Allergy Shots')
  $('#menu3 > a:nth-child(10)').click()
}
*/
var input11 = document.createElement('input');
input11.type = 'button';
input11.value = 'Save&Exit';
input11.onclick = showAlert11;
input11.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:120px;right:140px;background-color: lime;border-radius: 30px;');
document.body.appendChild(input11);
function showAlert11()
//{(document.evaluate("id('save')/span/input[contains(@src,'verify-sign.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue).click();}
//{(document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue).click();}
{

  //$('#input2').click()
//  $('#save > span:nth-child(1) > input:nth-child(5)').click()
  $('#save > span > input:nth-child(6)').click()
}



var input12 = document.createElement('input');
input12.type = 'button';
input12.value = 'Display Labs';
input12.onclick = showAlert12;
input12.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:120px;right:60px; ');
document.body.appendChild(input12);
function showAlert12() //{window.open(vPath  + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Allergy Shots 0')}
{
  //https://secure10.oscarhost.ca/SDHurwitzInc/eform/efmformadd_data.jsp?fid=68&demographic_no=640&&appointment=
  var formPath = vPath + '/lab/CumulativeLabValues.jsp?demographic_no=' + demo_no + '&appointment=' + ApptNum
  window.open(formPath,'Popup_Window6', 'width=800,height=800,left =0,top = 0')
}
var input13 = document.createElement('input');
input13.type = 'button';
input13.value = 'CVD';
input13.onclick = showAlert13;
input13.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:0px;');
document.body.appendChild(input13);
function showAlert13()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=775&demographic_no=' + demo_no + '&appointment=' + ApptNum//alert(formPath)
  window.open(formPath, 'Popup_Window7', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
}
var input14 = document.createElement('input');
input14.type = 'button';
input14.value = 'LIFELAB';
input14.onclick = showAlert14;
input14.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:150px;right:60px;background-color: #FE2EF7; ');
document.body.appendChild(input14);
function showAlert14()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1262&demographic_no=' + demo_no + '&appointment=' + ApptNum//var formPath = vPath + "/eform/efmformadd_data.jsp?fid=81&demographic_no=" + demo_no
  //alert(formPath)
  window.open(formPath, 'Popup_Window8', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
}
var input15 = document.createElement('input');
input15.type = 'button';
input15.value = 'Imaging';
input15.onclick = showAlert15;
input15.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:150px;right:140px;background-color: #FE2EF7;');
document.body.appendChild(input15);
function showAlert15()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1261&demographic_no=' + demo_no + '&parentAjaxId=eforms' + '&appointment=' + ApptNum//alert(formPath)
  window.open(formPath, 'Popup_Window9', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
}

var input16 = document.createElement('input');
input16.type = 'button';
input16.value = 'PFT';
input16.onclick = showAlert16;
input16.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:60px; background-color: #ff99cc;');
document.body.appendChild(input16);
function showAlert16()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1182&demographic_no=' + demo_no + '&parentAjaxId=eforms' + '&appointment=' + ApptNum//window.open(formPath)
  window.open(formPath, 'Popup_Window10', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
}


var input55 = document.createElement('input');
input55.type = 'button';
input55.value = 'Stress';
input55.onclick = showAlert55;
input55.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:60px; background-color: #ff99cc;');
document.body.appendChild(input55);
function showAlert55()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=251&demographic_no=' + demo_no + '&parentAjaxId=eforms' + '&appointment=' + ApptNum//alert(formPath)
  window.open(formPath, 'Popup_Window11', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
}


var input50 = document.createElement('input');
input50.type = 'button';
input50.value = 'FHA RAD';
input50.onclick = showAlert50;
input50.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:140px;background-color: #3366ff');
document.body.appendChild(input50);
function showAlert50()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=1193&demographic_no=' + demo_no + '&appointment=' + ApptNum//window.open(formPath)
  window.open(formPath, 'Popup_Window12', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
}

/*
var input17 = document.createElement('input');
input17.type = 'button';
input17.value = 'New WCB';
input17.onclick = showAlert17;
input17.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:180px;right:140px');
document.body.appendChild(input17);
function showAlert17()
{
  $('#menu1 > a:nth-child(6)').click()
}
var input18 = document.createElement('input');
input18.type = 'button';
input18.value = 'Trip
';
input18.onclick = showAlert18;
input18.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:180px;right:0px');
document.body.appendChild(input18);
function showAlert18()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + '/eform/efmformadd_data.jsp?fid=458&demographic_no=' + demo_no // INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath)
}
var input19 = document.createElement('input');
input19.type = 'button';
//input19.value="00120";
input19.value = 'RBS';
input19.onclick = showAlert19;
input19.setAttribute('style', 'width:70px;font-size:16px;z-index:1;position:fixed;bottom:180px;right:80px');
document.body.appendChild(input19);
function showAlert19()
{
  var formPath = vPath + 'oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=CDM%20Labs'
  $('#menu3 > a:nth-child(4)').click()
 // $('#menu3 > a:nth-child(6)').click()
  //myWindow = window.open(formPath)
}
*/
var input180 = document.createElement('input');
input180.type = 'button';
input180.value = 'DM flow sheet';
input180.onclick = showAlert180;
input180.setAttribute('style', 'font-size:16px;z-index:1;position:fixed;bottom: 300px;right:0px');
//document.body.appendChild(input180);
function showAlert180()
{
  window.open(vPath + 'oscarEncounter/oscarMeasurements/TemplateFlowSheet.jsp?demographic_no='+demo_no+'&template=diab2')
}


//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
// FOR CURRENT TEXT BOX, ADJUST THE DATE SO THAT IT IS CORRECT


function main(){
  console.log('main called')
  var newestNote = $('textarea[name*=caseNote][id*=caseNote]')[0]
  //console.log(newestNote)
  var noteText = newestNote.value
  var noteDate =  noteText.split(':')[0]
  var noteExtra = " " + noteText.substring(noteText.indexOf(':')+1)
  var alreadyWriting = noteText.substring(noteText.indexOf(']'))

  //console.log(noteText)
  //console.log(noteDate)
  //console.log(noteExtra)


  var today = new Date().toString()
  var todayArr = today.split(' ')
  var day = todayArr[2]
  var month = todayArr[1]
  var year = todayArr[3]
  var newDateString = '[' + day + '-' + month + '-' + year + ' :' + noteExtra

  if (alreadyWriting.length < 20){
    console.log("Note is considered blank")
	  newestNote.value = newDateString
  }
  //console.log('Date modified')
  //console.log(newDateString)
  //console.log(newestNote)
  //console.log(noteText)
  autoEncouterDate()
}

function waitForNote() {
  var newestNote = $('#nc20')
  var newestNote2 = $('#nc00')
  //console.log(newestNote)
  //console.log(newestNote2)
  if ((newestNote.length<1) && (newestNote2.length<1) ) {
    //console.log('Did not find thing')
    setTimeout(function() {
      waitForNote()
    }, 200);

  } else {
    //console.log('found thing')
    main()
  }
};



window.addEventListener('load', function() {
  //setTimeout(function(){ main(); }, 1500)
  console.log('test')
  waitForNote()


}, false);


//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
// FOR ENCOUTER DATE, Auto put in correct date + time.

function autoEncouterDate(){
  var dateVar = document.getElementById("observationDate")

  const currentDate = new Date();

  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = currentDate.toLocaleString('default', { month: 'short' });
  var year = currentDate.getFullYear();
  var hours = String(currentDate.getHours()).padStart(2, '0');
  var minutes = String(currentDate.getMinutes()).padStart(2, '0');

  var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  dateVar.value = formattedDate
}





