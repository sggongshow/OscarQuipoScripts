// ==UserScript==
// @name        Billing Code Conversion + Move Dx box
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     *billing.do?billRegion*
// @include     *billingBC.jsp?*
// @include     *CreateBilling.*
// @include     */oscar/CaseManagementEntry.do*
// @include     *SaveBilling.do?*
// @include     *formwcb.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version 	  24.01.13.1
// ==/UserScript==

//changelog
//24.01.13.0 - change default form to LFP
//23.03.21.0 - reverted to 23.03.20.3 - parts of billing still broken
//23.03.20.3 - removed the corrent drop down selection of PCN. clarificaion and location. Options added to quipo native
//23.03.20.1 - moved the diagonstics box to the middle as it keeps cutting off while billing normally
//23.03.19.1 - updated to quipo. added to set default billing form, clarification code and service location

//wait window load first
window.addEventListener('load', function() {

   setTimeout(function(){ main(); }, 250);

}, false);


function main(){

  var codeList = $('a[href*=myFunction][onclick*=PickD]')
  //console.log(codeList)

	for (let i = 0; i < codeList.length; i++) {

    var title = codeList[i].title
    var dxCode = codeList[i].text.trim()

    codeList[i].text = "- " + title + dxCode
		codeList[i].title = dxCode
	}

  //Change the clarification code and service locations
  var ClarificationBox
  var LocationBox
  var DropDownBoxsArray = document.querySelectorAll('[class="input-group select"]')
  for(var i = 0; i < DropDownBoxsArray.length; i++) {
    if(DropDownBoxsArray[i].innerText.indexOf("Clarification") != -1){
      ClarificationBox = DropDownBoxsArray[i].querySelector("select")
    }
    else if (DropDownBoxsArray[i].innerText.indexOf("Service Location") != -1){
      LocationBox = DropDownBoxsArray[i].querySelector("select")
    }
  }

  console.log(ClarificationBox)
  console.log(LocationBox)

  ClarificationBox.selectedIndex = 0;
  LocationBox.selectedIndex = 14;

//ClarificationBox.selectedIndex(0)

  //Change the biling form to PCN
  var BillingFormBox = document.querySelector('[id=selectBillingForm]')
  //console.log(BillingFormBox)

  if (BillingFormBox.options[BillingFormBox.selectedIndex].text ="MFP"){
    for(var i = 0; i < BillingFormBox.options.length; i++) {

      if(BillingFormBox.options[i].text == "LFP") {
        BillingFormBox.selectedIndex = i;
        var event = new Event('change');
        BillingFormBox.dispatchEvent(event);
        break;
      }
    }
  }

  //Moving the Diagnosis Box to the center column instead
  var DxBox = document.querySelectorAll('[id=pop2]')[0]
  DxBox = DxBox.parentNode;

  var tbodycount = 0 //Nested in 2 tables. so to move the entire Dx box needs to go up 2 tables
  while(tbodycount !=2){
    while (DxBox.parentNode.tagName !== 'TABLE') {
      DxBox = DxBox.parentNode;
    }
    DxBox=DxBox.parentNode
    tbodycount++
  }
  console.log(DxBox)

  var CenterBox = document.querySelectorAll('[class="serviceCodesTable"]')[1]
  CenterBox.parentNode.appendChild(DxBox)

}
