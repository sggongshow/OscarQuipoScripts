// ==UserScript==
// @name        Change default Schedule page layout
// @namespace   GongOscar
// @description Check if the daily 97570 billing has been submitted. Easily seen on day sheet
// @include     *providercontrol.jsp?*displaymode=day*
// @include     *provideradminday.jsp?*displaymode=day*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.03.15.0
// ==/UserScript==


//Changelog
// 23.03.15.0: ORIGINAL BUILD: Makes the appointment name/reason/buttons on separate lines


window.addEventListener('load', function() {

  var apptDescriptionArray = document.querySelectorAll('[class=reason_133hideReason]')
  //console.log(apptDescriptionArray)

  for (var i = 0; i < apptDescriptionArray.length; i++){  //apptDescriptionArray.length
    var apptSelected = apptDescriptionArray[i]
    //console.log(apptSelected)
    //apptSelected.innerHTML.replace("strong","TEST")
    //apptSelected.innerHTML.replace("/<\/strong>/g","TEST2")


    var apptHTML = apptSelected.innerHTML
   // console.log(apptHTML)
    //console.log ("--------------------------")



    var apptHTMLSplit = apptHTML.split("<strong>")
    //console.log(apptHTMLSplit)

    var apptBefore = apptHTMLSplit[0]
    var apptReason = apptHTMLSplit[1]
    //console.log(apptReason)

    var apptHTMLSplit2 = apptReason.split("</strong>")
    apptReason = apptHTMLSplit2[0]
    var apptAfter = apptHTMLSplit2[1]


    //apptReason.replace(/&nbsp;/g, "");
    //console.log ("--------------------------")
    console.log(apptBefore)
    console.log(apptReason)
    console.log(apptAfter)



    apptReason = "<br><strong>" + apptReason + "</strong><br>"
    //apptReason = "<br><b>" + apptReason + "</b><br>"


    var apptHTMLNew = apptBefore + apptReason + apptAfter
    apptSelected.innerHTML = apptHTMLNew

  }


}, false);


