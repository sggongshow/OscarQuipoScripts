// ==UserScript==
// @name        Document Review buttons
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     */dms/showDocument.jsp?*
// @include     */dms/MultiPageDocDisplay.jsp?*
// @include     *lab/CA/ALL/labDisplay.jsp?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			24.02.17.0
// ==/UserScript==
//window.moveTo(300, 100)


//Changelog
//25.02.17.0 - changed position of label back to fixed right side
//24.01.07.2 - fixed changed in acknowledge shortcut issues after update
//23.05.04.2 - fixed echart button again on showDocument
//23.03.28.3 - fixed the echart button to work AGAIN - on showDocument.jsp due to broken stuff on quipo
//23.03.28.2 - fixed the echart button to work again
//23.03.28.1 - changed position of buttons to stop blocking things due to quipo format changes

 ///FOR TICKLER KEYBOARD SHORTCUT TO BE ENABLED

window.addEventListener('load', function () {

//window.confirm= function(){ return true;}
//window.alert= function(){ return true;}

document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
  closeButton = $('input[type="button"][value*="Close"]')

	switch(true){
      //Acknowledge  button
    case theAltKey && theKey==='1':

      showAlert()
			break;

      //Tickler
		case theAltKey && theKey==='2':
 			showAlert1()
			break;

      //Echart
    case theAltKey && theKey==='3':
 			OpenEchartFunc()
			break;

    case theAltKey && theKey==='q': //back page
 			var button = $('[id*="prevP"]')[0]

      //check if button is visible
			var visible = true
     	var styleVal = button.getAttribute("style")
      if (styleVal != null){
      	if (styleVal.includes("inline") == false ){
        visible = false
        } else{
        visible = true
        }
      }

      //if visible and on correct page then click
  		if ((window.location.pathname.includes("DocDisplay.jsp")||window.location.pathname.includes("showDocument.jsp") ) && visible == true ){
  			button.click()
  		}
			break;


    case theAltKey && theKey==='w': //fwd page

      var button = $('[id*="nextP"]')[0]
      //console.log(button)
			//check if button is visible
			var visible = true

     	var styleVal = button.getAttribute("style")
      //console.log(styleVal)
      if (styleVal != null){
      	if (styleVal.includes("inline") == false ){
        visible = false
        } else{
        visible = true
        }
      }
      //console.log(visible)
      //if visible and on correct page then click
  		if ((window.location.pathname.includes("DocDisplay.jsp")||window.location.pathname.includes("showDocument.jsp") ) && visible == true ){
  			button.click()
  		}
			break;

    case theAltKey && theKey==='e': //last page
 			var button = $('[id*="lastP"]')[0]

      //check if button is visible
			var visible = true
     	var styleVal = button.getAttribute("style")
      if (styleVal != null){
      	if (styleVal.includes("inline") == false ){
        visible = false
        } else{
        visible = true
        }
      }

      //if visible and on correct page then click
  		if ((window.location.pathname.includes("DocDisplay.jsp")||window.location.pathname.includes("showDocument.jsp") ) && visible == true ){
  			button.click()
  		}
			break;


    default:
    	break;

	}
}, true);



//New input box that follows the page
var inputTextbox = document.createElement('input');
inputTextbox.type = 'text';
inputTextbox.id = 'newTextBoxInput'
inputTextbox.name = 'newTextBoxInput'

//--- Input box that follows page but for labs page
if (window.location.pathname.includes("labDisplay.jsp")){
  //get original text field value
  var OGLabelObj = $('span[id*=labelspan][class=Field2]')
  var OGLabelText = OGLabelObj.text()
  //console.log(OGLabelText.length)
  //console.log(OGLabelText.includes("("))
  if (OGLabelText.includes("(") == false){
     //console.log(OGLabelText.includes("test"))
    OGLabelText = OGLabelText.substring(OGLabelText.indexOf(":")+1)
  }else{
    OGLabelText=""
  }
  inputTextbox.value = OGLabelText


	inputTextbox.setAttribute('style', 'width:120px;font-size:12px;padding:0px;position:fixed;top:20px;right:10px; border-color:red;');
	document.body.appendChild(inputTextbox);
  inputTextbox.focus()
}else{
  var OGLabelObj = $('input[id*=docDesc][name*=documentDes]')[0]
  var OGLabelText = OGLabelObj.value

  inputTextbox.value = OGLabelText
  inputTextbox.setAttribute('style', 'height:25px ;width:160px;font-size:14px;padding:0px;position:fixed;top:120px;right:10px; border-color:red;');
	document.body.appendChild(inputTextbox);
  inputTextbox.focus()

}




//ACKNOWLEDGE BUTTON
var input = document.createElement('input');
input.type = 'button';
input.value = 'Acknow';
input.onclick = showAlert

if (window.location.pathname.includes("labDisplay.jsp")){
input.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:40px;right:10px; background-color:#66ff66;');
}else{
input.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:30px;right:10px; background-color:#66ff66;');
}

document.body.appendChild(input);
function showAlert() //acknowledge
{
  //Covering the dumb various codings of the acknowledge button

	//console.log('clicked acknow')

  //weird lab/transcriptions page
  if (window.location.pathname.includes("labDisplay.jsp")){

    //Acknowledge will also auto click label if there is text in label.
    //If nothing in text box then won't click Label button
    var labelButton = $('[type="button"][value="Label"][id*="Label"]')
    var labelEntry = $('input[id*="acklabel"][type="text"][name*="label"]')
    var labelEntryID = labelEntry.attr('id')
    var labelElement = document.getElementById(labelEntryID);

    //Check secondary textbox for value, input to original text box
    var newTextBoxVal = document.getElementById('newTextBoxInput').value
    labelElement.value = newTextBoxVal
    var labelEntryText = labelEntry.val()

    if (labelEntryText.length >0){ //check if anything in text box.
      labelButton.click()
    }

  }else{//Edoc page
    var OGLabelObj = $('input[id*=docDesc][name*=documentDes]')[0]
    //console.log('transfer text')
    //console.log(OGLabelObj.value)
    //console.log(inputTextbox.value)
    if (OGLabelObj.value.length < inputTextbox.value.length){
			OGLabelObj.value =	inputTextbox.value
    }

    var saveButton = $('input[type="submit"][name="save"][id*="save"]')
    saveButton.click()

  	}

  //click acknowledge button or close if no acknowledge button
  var button
  //if (window.location.pathname.includes("labDisplay.jsp")){
  button = $('input[type="button"][value="Acknowledge"]')[0]
  //}else{
  if (button == null){
  button = $('input[type="submit"][value="Acknowledge"]')[0]
  }
  //console.log(button)
  // if no ack, close button instead
  if (button == null){
    button = $('input[type="button"][value*="Close"]')
  }

  //console.log(button)
  console.log(button)
  var parentId = $(button).closest('form').attr('id');
  console.log(parentId)
  if (parentId != null){
    if (parentId.includes('acknowledge')){
      button.click()
      //closeButton.click()
    }
  }
  else if(button.getAttribute("id").includes("ackBtn") == true){
    button.click()
  }
}

var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Tickler';
input1.onclick = showAlert1;
if (window.location.pathname.includes("labDisplay.jsp")){
input1.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:40px;right:90px; background-color:#FF6600;');
}else{
input1.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:60px;right:10px; background-color:#FF6600;');
}
document.body.appendChild(input1);


  // Open tickler
function showAlert1()
{
  var button = $('input[type="button"][value="Tickler"]')
  var parentId = $(button).closest('form').attr('id')
  if (parentId.includes('acknowledge')){
  	button.click()
  }
}

var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Echart';
input2.onclick = OpenEchartFunc;
if (window.location.pathname.includes("labDisplay.jsp")){
input2.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:40px;right:170px;');
}else{
input2.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:90px;right:10px;');
}
document.body.appendChild(input2);


// Open Chart Function
function OpenEchartFunc()
{
  /*
  var button = $('input[type="button"][value*="Chart"]')
  var parentId = $(button).closest('form').attr('id')
  if (parentId.includes('acknowledge')){
  	button.click()
  }
  */

  var echartButton = document.querySelector('[onclick*=searchPatientWindow]')


  if (echartButton == null){
    //stupid ass issue on showDocument.jsp where Echart is broken. Workaround
    echartButton = document.querySelectorAll('[id*=msgEncounterBt]')[0]
  }
  console.log(echartButton)
  echartButton.click()

}

var NameSearchWin
var NameSearchWinDoc

var docNameDiv = $('div.FieldData:contains("Requesting Client")')
var fullName = docNameDiv.text().split(':')[1]
var lastName = fullName.split(' ')[1]
var firsNname = fullName.split(' ')[0]

if (window.location.pathname.includes("labDisplay.jsp")){
  var input3 = document.createElement('input');
  input3.type = 'button';
  input3.value = '?Specialty';
  input3.onclick = showAlert3;
  input3.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;top:40px;left:640px;');
  //document.body.appendChild(input3);
  function showAlert3(){
		//console.log("testspeci")
    var docNameDiv = $('div.FieldData:contains("Requesting Client")')
    //console.log(docNameDiv.text())
		var fullName = docNameDiv.text().split('\n')[2]
    var fullName = fullName.trim()

    var splitName = fullName.split(' ')
		var lastName = splitName[splitName.length -1]
		var firstName = splitName[0]
		//console.log(lastName)
  	//console.log(firstName)
    NameSearchWin = window.open("https://www.cpsbc.ca/public/registrant-directory/search-result");
		NameSearchWinDoc = NameSearchWin.document;

    //console.log(NameSearchWin)
    //console.log(NameSearchWinDoc)
     }

}


})




