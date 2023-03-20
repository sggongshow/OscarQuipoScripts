// ==UserScript==
// @name        Billing Code Conversion + Selection off corrent forms
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
// @version 	  23.03.19.1
// ==/UserScript==

//changelog
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

  if (BillingFormBox.options[BillingFormBox.selectedIndex].text !="PCN"){
    for(var i = 0; i < BillingFormBox.options.length; i++) {

      if(BillingFormBox.options[i].text == "PCN") {
        BillingFormBox.selectedIndex = i;
        var event = new Event('change');
        //BillingFormBox.dispatchEvent(event);
        break;
      }
    }
  }



}
