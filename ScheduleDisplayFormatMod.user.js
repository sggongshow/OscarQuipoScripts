// ==UserScript==
// @name        Change default Schedule page layout
// @namespace   GongOscar
// @description Check if the daily 97570 billing has been submitted. Easily seen on day sheet
// @include     *providercontrol.jsp?*displaymode=day*
// @include     *provideradminday.jsp?*displaymode=day*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.03.20.1
// ==/UserScript==


//Changelog
// 23.03.20.1: quipo changed format. adjusted code. Essentially remove bolding of things
// 23.03.19.2: Changed it so all appointsments are selected when mulitple doctor schedules are visible
// 23.03.19.1: changed the formatting a bit. Didn't like the bold and extra spaces
// 23.03.15.0: ORIGINAL BUILD: Makes the appointment name/reason/buttons on separate lines


window.addEventListener('load', function() {

  //check if the schedule view is multiple docs or just 1 doc. layout differs
  var multiProviders = false
  var providersCount = document.querySelectorAll('[id=providertable]')
  console.log(providersCount)
  if (providersCount.length>1){
    multiProviders = true
  }

  var apptDescriptionArray = document.querySelectorAll('[class^=reason_][class$=hideReason]')
  console.log(apptDescriptionArray)

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
    //console.log(apptBefore)
    //console.log(apptReason)
    //console.log(apptAfter)


    apptReason = apptReason.substring(apptReason.indexOf(";")+1)

    //when there's multiple providers then don't do anything besides remove <strong>
    //when only single provider layout is differnt in 1 line so needs the <br> added
    if (multiProviders == false){
      //apptReason = "<br>" + apptReason + "<br>"
    }


    var apptHTMLNew = apptBefore + apptReason + apptAfter
    apptSelected.innerHTML = apptHTMLNew

  }


}, false);


