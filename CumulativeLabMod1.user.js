// ==UserScript==
// @name        CumulativeLab1 Mods
// @namespace   GongOscar
// @include     *lab/CumulativeLabValues.jsp*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version 	24.09.24.0
// ==/UserScript==
//========Get Path============

//Changelog
//24.09.24.0 - added more to removeUnwanted
//24.06.13.0 - added more to removeUnwanted
//24.04.09.0 - added more to removeUnwanted
//24.02.23.0 - added more to removeUnwanted
//24.01.22.1 - added few more words to removeUnwanted
//23.08.15.1 - added 'holter', 'mammo' to removeUnwanted function
//23.07.28.0 - added 'ecg' to removeUnwanted function
//23.05.04.1 - added "breast" to filter out mammograms pdfs in labs. 
//23.03.18.0 - PROGRAMMED FOR QUIPO - problems with lab range as connected with text with no spacing. fixed. with regex
//22.12.08.1 - programmed for new vanilla oscar19
//- note, Getdate() will need to be modified depending on date format. curretly unchanged until vanilla oscar19 runnig
//22.12.08.0- well health broke it. doesn't work with them anymore due to long delay in getting data
//

//===============================
//var mylink = 'eform/efmshowform_data.jsp?fid='+formID

//var radioBtn1 = $('<input type="button" name="CDM" id="CDM" value ="CDM" onclick = CdmFunc
//var radioBtn3 = $('<input type="button" name="INF" id="INF" value ="INF" onclick = InfFunc />');
//var radioBtn4 = $('<input type="button" name="HEP" id="HEP" value ="HEP" onclick = HepFunc  />');
//var radioBtn5 = $('<input type="button" name="ALL" id="ALL" value ="ALL" onclick = AllFunc  />');

var $ = window.jQuery

var radioBtn1 = document.createElement('input');
radioBtn1.type = 'button';
radioBtn1.value = 'CDM';
radioBtn1.id = 'CDM'
radioBtn1.name = 'CMD'
radioBtn1.onclick = CdmFunc
var radioBtn2 = document.createElement('input');
radioBtn2.type = 'button';
radioBtn2.value = 'CBC';
radioBtn2.id = 'CBC'
radioBtn2.name = 'CBC'
radioBtn2.onclick = CbcFunc
var radioBtn3 = document.createElement('input');
radioBtn3.type = 'button';
radioBtn3.value ='INF';
radioBtn3.id = 'INF'
radioBtn3.name = 'INF'
radioBtn3.onclick = InfFunc
var radioBtn4 = document.createElement('input');
radioBtn4.type = 'button';
radioBtn4.value = 'HEP';
radioBtn4.id = 'HEP'
radioBtn4.name = 'HEP'
radioBtn4.onclick = HepFunc
var radioBtn5 = document.createElement('input');
radioBtn5.type = 'button';
radioBtn5.value = 'ALL';
radioBtn5.id = 'ALL'
radioBtn5.name = 'ALL'
radioBtn5.onclick = AllFunc
var radioBtn6= document.createElement('input');
radioBtn6.type = 'button';
radioBtn6.value = 'Sort By Date';
radioBtn6.id = 'SortByDate'
radioBtn6.name = 'SortByDate'
radioBtn6.onclick = ByDate
radioBtn6.setAttribute('style', 'background-color: lime;')
$('.TopStatusBar').append(radioBtn1)
//$('.TopStatusBar').append('CDM_Group')
$('.TopStatusBar').append(radioBtn2)
//$('.TopStatusBar').append('CBC_Group')
$('.TopStatusBar').append(radioBtn3)
//$('.TopStatusBar').append('Inflammatory_Group')
$('.TopStatusBar').append(radioBtn4)
//$('.TopStatusBar').append('Hepatic_Group')
$('.TopStatusBar').append(radioBtn5)
//$('.TopStatusBar').append('Select_All')
$('.TopStatusBar').append(radioBtn6)
//Sort button to Sort and Create the array of Lab Details

var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Sort';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:16px;position:absolute;top:0px;left:30px;');
//document.body.appendChild(input2);
function showAlert2() {
  myDisplay()
}

var myLabArray = new Array() //Array of labs and associated lab codes
var myLabArrayDate = new Array()
var visibleLabValueArr = new Array()
var HEPArray = [
  '1742-6',
  '1920-8',
  '1751-7',
  '6768-6',
  'XXX-2280',
  '1834-1',
  '14629-0',
  '2324-2',
  'XXX-2887',
  '48345-3',
  '4542-7',
  '6301-6',
  '46426-3',
  '14804-9',
  '2532-0',
  '14631-6',
  '2885-2'
]
var INFArray = [
  '2871-2',
  '30522-7',
  '4485-9',
  '4498-2',
  '5130-0',
  '14722-3',
  '2874-6',
  '2458-8',
  '2465-3',
  '2472-9',
  '5234-0',
  'XXX-2435',
  '5301-7',
  '11572-5',
  '5351-2',
  '5353-8'
]
var CBCArray = [

  '6690-2',
  '789-8',
  '718-7',
  '4544-3',
  '787-2',
  '785-6',
  '786-4',
  '788-0',
  '777-3',
  '751-8',
  '731-0',
  '742-7',
  '711-2',
  '704-7',
  '51584-1',
  '6742-1',
  '14869-2',
  '2276-4'
]
var CDMArray = [
  '1742-6',
  '14647-2',
  '33914-3',
  '14771-0',
  '14749-6',
  '4548-4',
  //  '5794-3',  //Haemoglobin
  '6301-6',
  '39469-2',
  '58453-2',
  '2857-1',
  '2823-3',
  '2951-2',
  '3016-3',
  '14927-8',
  //'1920-8',
  '30522-7',
  '2000-8',
  '14646-4',
  '16935-9',
  '5195-3',
  '14879-1',
  '14933-6',
  '1871-3',
  '32309-7',
  '718-7',
  '1988-5',
  'X10367' //Hb

]

window.resizeTo(1200, 780);
printbutton = '<input style=\'font-size:18px;position:absolute;top:10px;left:400px;\' value=\'Print\' type=\'button\'  onclick=\'window.print()\' >'
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
today = mm + '/' + dd + '/' + yyyy;
var ptname = $('.TopStatusBar > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').html()
var printthis = '<br>'
var str = ''
var LabData = []
var LabName = []
var measureArray = [];
var measureDateArray = [];
var alldata = [];
var checkedValues = ''
var LabDataPrint = ''
var myLabArray = []

var topDates = []

var labDatesArr = []

//-----------------------------------------------------------------------
//PRIMARY CODE-----------------------------------------------------------
//-----------------------------------------------------------------------
var DisplayArea = document.getElementById('cumulativeLab')

/*for reference only. do not uncomment code. ever. Shows function order for ALL Labs display button
  //console.log('show all labs')
  EraseArea()
  createLoadingDiv()
  LoadMatchedArr(myLabArray)
  //replaceHeadClass()
  //console.log("waiting for lab load ...")
  window.setTimeout(function(){ waitLabLoad() }, 1000);
  //console.log("delaycheck")
*/

//Not sure why i need URL parameters
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //=====Get Parameters============
var params = {
};

///// CHUNK 2 START
//Gets the RAW Lab data array from left side. break it into parts
if (location.search) {
  var parts = location.search.substring(1).split('&');

  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }

  f = $('.leftBox').html() //left labs tab HTML
  var parts = f.split('</li>'); //Array of each lab row on left tab
  //console.log(parts)
  var myArray = []
  var checkedValues = []

  //for (i = 0; i < parts.length - 1; i++) { //Creation of myLabArray with 3 other values
    //myLabArray[i] = new Array(3)
  //}

  for (i = 0; i < parts[i].length; i++) { //parts[i].length

    //console.log(parts[i])
    var ii = parts[i].search('header=') + 8
    var ie = parts[i].search(' body=') - 1
    searchstring = ''
    while (ii < ie) {
      searchstring = searchstring + parts[i].charAt(ii)
      ii = ii + 1
    }
    c = parts[i].substring(parts[i].length - 4, parts[i].length)
    if (c !== '</a>') {
      //  alert(i + ': Error Code Alert')
      break;
    }
    myArray[i] = searchstring + parts[i].trim()

  }
  //console.log(myArray)
  //myArray.sort()




}
//Create New Array of labs that are alphabetically sorted with checkboxes
var Newlist = ''
for (i = 0; i < myArray.length; i++) {
  startat = 0
  endat = 500
  startat = (myArray[i].indexOf('<'))
  newstartat = myArray[i].lastIndexOf(',')
  newendat = myArray[i].lastIndexOf(')')
  loincval = myArray[i].substring(newstartat + 2, newendat - 1)
  namestring = myArray[i].substring(0, startat)
  chkval = ' ' /*
  if (CDMArray.indexOf(loincval) > - 1) {
    chkval = ' checked '
  }
  if (INFArray.indexOf(loincval) > - 1) {
    chkval = ' checked '
  }
  */
  myArray[i] = '<font size = \'1\'>' + myArray[i].substring(startat, endat) + '<input name=\'checkbox\' id=' + ('myCheckBox' + i) + chkval + ' value=' + loincval + ' type=\'checkbox\'>' + (namestring + ' (' + loincval + ') ') + '<br>'
  Newlist = Newlist + myArray[i] // alert(Newlist)
}

//console.log(Newlist)
///////CHUNK 2 END

Cumulative()
//removeUnwanted()

var updateBtn = document.createElement('input');
updateBtn.type = 'button';
updateBtn.value = 'Update Groups';
updateBtn.onclick = EraseArea
updateBtn.setAttribute('style', 'font-size:12px;position:absolute;top:10px;right:200px;background-color: lime;');
//input6.setAttribute('type', 'hidden');
//document.body.appendChild(updateBtn);


//------Extend horizontally so now lab value wrapping
var labDivContainer = $('#cumulativeLab')[0]
labDivContainer.style.minWidth = '5000px'


if (params.mysort) {
}
if (params.demographicNo) {
  input2.setAttribute('type', 'hidden');
}

//getDate()
//window.addLabToProfile2
setTimeout(function(){radioBtn5.click() }, 300)


//console.log(myLabArray)
//-------------------------------------------------------------------------------------------
//-----Test area-------------------------------------------------------------





//--------------------------------------------------------------------------------
//FUNCTIONS
//---------------------------------------------------------------------------------------
//Show the buttons.
function CdmFunc() {
  EraseArea()
  //console.log("cdmFuc")
  var LabIDArray = getCol(myLabArray,2)
	var MatchedArr = arrayMatch(CDMArray,LabIDArray)
  //console.log(MatchedArr)
  LoadMatchedArr(MatchedArr)
  setTimeout(function(){ waitLabLoad() }, 1000);
}
function CbcFunc() {
  EraseArea()
  var LabIDArray = getCol(myLabArray,2)
	var MatchedArr = arrayMatch(CBCArray,LabIDArray)
  LoadMatchedArr(MatchedArr)
  setTimeout(function(){ waitLabLoad() }, 1000);
}
function InfFunc() {
  EraseArea()
  //console.log("InfFunc")
  var LabIDArray = getCol(myLabArray,2)
	var MatchedArr = arrayMatch(INFArray,LabIDArray)
  LoadMatchedArr(MatchedArr)
  setTimeout(function(){ waitLabLoad() }, 1000);
}
function HepFunc() {
  /*EraseArea()
  console.log("HepFunc")
  var LabIDArray = getCol(myLabArray,2)
	var MatchedArr = arrayMatch(HEPArray,LabIDArray)
  LoadMatchedArr(MatchedArr)
  setTimeout(function(){ waitLabLoad() }, 1000);
  */
  //checkRange()

}
function AllFunc() {
  //console.log('show all labs')
  EraseArea()
  createLoadingDiv()
  LoadMatchedArr(myLabArray)
  //replaceHeadClass()
  //console.log("waiting for lab load ...")
  window.setTimeout(function(){ waitLabLoad() }, 1000);
  //console.log("delaycheck")

}
function ByDate() {
  //console.log("bydateButton")
  SortArea()
  //EraseArea()
  //LoadMatchedArr(myLabArray)
  //setTimeout(function(){ waitLabLoad() }, 1000);
}

function Cumulative() {
  //console.log('cumulative')
  //console.log(parts.length)
  //console.log(parts)
  //console.log(myLabArray)
  for (i = 0; i < parts.length; i++) {
  //for (i = 29; i < parts.length; i++) {   //testing purposes only
    parts[i]= parts[i].trim()

    if(parts[i].indexOf('addLabToProfile2(') < 0){
      continue
    }

    var frontRemoved = parts[i].split('addLabToProfile2(')[1]

    var indexLastBrac = frontRemoved.lastIndexOf(');')
    var backRemoved = frontRemoved.substring(0,indexLastBrac)
    backRemoved = backRemoved.replace("\\/", "/");

    var noquote = backRemoved.replace(/'/g, '');
    var FinalArray = noquote.split(',')
    //console.log(FinalArray)
    var name = FinalArray[1]
    var Code = FinalArray[2]
    var HL7 = FinalArray[0]


    var tempArr = [name,HL7,Code]
    //console.log(tempArr)
		myLabArray.push(tempArr)
    //myLabArray[i][1] = HL7
    //myLabArray[i][0] = name
    //myLabArray[i][2] = Code


  }

  removeUnwanted()
}

//Removed lines that are weird info and not labs
function removeUnwanted() {
  		//console.log('remove unwanted')
  		var unwantedWords = ['physician', 'report', 'history', 'notification', 'consultation', 'breast', 'ultrasound',
				     'holter', 'mammo', 'other','colonoscopy','pathology', 'note', 'progress',
                           	     'surgical','operation', 'discharge','date','referred','ecg', 'egd',
				     'consult', 'scopy', 'scope', 'summary', 'treat', 'med', 'exam', 'review',
				     'cervix' ] //'exam'
      for (i = myLabArray.length -1  ; i >= 0 ; i--) {
				var toDelete = 0
    		for (j = 0; j < unwantedWords.length; j++) {
                if (myLabArray[i][0].toLowerCase().indexOf(unwantedWords[j]) >= 0){
                    toDelete = 1
                    //console.log('removed ' + name)
                }
            }
        if (toDelete == 1){
         	//console.log('removed ' + myLabArray[i][0])
         	myLabArray.splice(i,1)
        }
      }
     //console.log(myLabArray)
}

//----------------------------------- End of functions run on initiation of script

//---------------
//Pass the array of labs to show on the screen. 3 column array. In order you want it
//Calls the native function that will request for the information to be displayed on screen
//---------------
function LoadMatchedArr(ArrayToLoad){   //myLabArray is default
    console.log("addinglabs to profile")
    //console.log(ArrayToLoad)
    toggleTableVis()
    //for(var i=0; i<2; i++){ ///testing purposes shortened vesion
  	for(var i=0; i<ArrayToLoad.length; i++){
      //console.log(ArrayToLoad[i])
      if (ArrayToLoad[i][2].includes("")== true) { //Gets rid of non-labs. like PDF and Reports-------------------------------MAY BE SOURCE OF PROBLEM DEPEND ON HLA NUMBERING, previously all HLA numbers had a "-"
        //console.log(ArrayToLoad[i])
  			unsafeWindow.addLabToProfile2(ArrayToLoad[i][1],ArrayToLoad[i][0],ArrayToLoad[i][2])
      	//var LabElement = addLabToProfile3(ArrayToLoad[i][1],ArrayToLoad[i][0],ArrayToLoad[i][2])

        //console.log(LabElement)
      	}
    	}
}

function EraseArea(){
  DisplayArea.innerHTML=''
}

function topDatesReset(){
 topDates = [
  new Date('1990-01-01'),
  new Date('1990-02-01'),
  new Date('1990-03-01'),
  new Date('1990-04-01'),
  new Date('1990-05-01'),
  new Date('1990-06-01'),
  new Date('1990-07-02'),
  new Date('1990-07-03'),
  new Date('1990-07-04'),
  new Date('1990-07-05'),
  new Date('1990-07-06'),
  new Date('1990-07-07'),
  new Date('1990-07-08'),
  new Date('1990-07-09'),
  new Date('1990-07-20')
  ]
}

function sortDate(arrayDate){
	arrayDate.sort(function(a,b){
  	return b-a;
  });
  //return arrayDate
}

//---------------
//toggle visibility of the table. When visible interactions while running the modification
//codes stops the code
function toggleTableVis(){

  var labGrid = $('#cumulativeLab')[0]
  var loadingText = $('#loadingDiv')[0]
 	labGrid.hidden = !labGrid.hidden
  loadingText.hidden = !loadingText.hidden
}
//------------------------------------------------------------------------------------------------------------------------------------------- Major code section part 2, data manipulation
//wait for all labs data to be loaded before modifying and putting colors around it.
//-------------------------------------------------------------------------------------------------------------------------------------------
function waitLabLoad(){
  //console.log("waiting for labs to load - in function")
	var tableDiv = $('#cumulativeLab')[0]
  var tableChildren = tableDiv.children
  //console.log(tableChildren)
  var failed = 0

  for (i=0; i<tableChildren.length; i++){
    if (tableChildren[i].innerHTML.indexOf('pinwheel')>=0){
     		 failed = 1
    }

  }
  if (failed == 1){
    		setTimeout(function(){ waitLabLoad() }, 500);
  }else{
  	//console.log('finished waiting load labs')
    expandLabName()
    //console.log("after expand")
  	getDate()
    //console.log("get date done") ===============================================================================================Turn back on
    setTimeout(function(){labTextMod() }, 400)
    //getDate()
  }
}

//----- Expands the lab name column so it isn't cut offf
//----- Removes the ones with no lab values
//----- Changes Ferritin color
function expandLabName(){
  console.log("expand lab name")
  var labBoxArr = $("a[id*=ahead][id*=\\.]")
  //console.log(labBoxArr)
	for (var i=0; i<labBoxArr.length; i++){//labBoxArr.length
    var RawHTML = labBoxArr[i].innerHTML
    var LabName = labBoxArr[i].title.split('header')[1]
    LabName = LabName.split(']')[0]
    LabName = LabName.split('[')[1]
    //console.log(labBoxArr[i])

    var PreText = RawHTML.split('>')[0] + '>'
    var PostText = '</' + RawHTML.split('</')[1]
    labBoxArr[i].innerHTML = PreText + LabName + PostText

   // change ferritn color
    if (LabName == "Ferritin"){
            labBoxArr[i].parentElement.style.border = "5px solid pink"
    }

  }

  //Remove rows that are empty
  var sectionDivs = $('div[id*=preventionSection][id*=\\.]')
  for (i=0; i<sectionDivs.length; i++){//sectionDivs.length
     //console.log("finding empty")
     var children = sectionDivs[i].children
     if (children.length <=1){
       //sectionDivs[i].remove()
     }
   }


  //console.log("finished expandname")
}

//---- Array of every lab value's ID and it's Date. Also makes list of Top Dates
function getDate(){
  topDatesReset()
  visibleLabValueArr = []

  console.log('getdate')
  var LabDateRawArr = $('div[id*=preventionProcedure]')
  //console.log(LabDateRawArr)

  for (var i=0; i<LabDateRawArr.length; i++){ //LabDateRawArr.length
    var id = LabDateRawArr[i].id
  	var RawText = LabDateRawArr[i].innerText
		RawText = RawText.substring(0, RawText.lastIndexOf(' '))
    RawText = RawText.substring(RawText.lastIndexOf(' ')+1)
    RawText = RawText.trim()
    //console.log(RawText)
    var eleDate = new Date(RawText)

    var fillerArr = [id,eleDate]
    visibleLabValueArr.push(fillerArr)

    //chunk to get Dates and organize to top list
    var eleDate = new Date(RawText)
    var topDatesStr = topDates.toString()
    if (topDatesStr.indexOf(eleDate.toString()) <0){
      topDates.push(eleDate)
      sortDate(topDates)
      topDates.pop()
    }
  }

	//console.log(topDates)

}
//---------------
//modifies the innerHTML of the lab values. Currently removes the Hour and bolds Lab Value
//Changes add the reference lab range onto to html
function labTextMod(){
  console.log('labTextMod started')


  var LabDateRawArr = $('div[id*=preventionProcedure]')
  //console.log(LabDateRawArr.length)
  for (var i=0; i< LabDateRawArr.length; i++){ //LabDateRawArr.length
  	var RawText = LabDateRawArr[i].innerHTML
    //console.log(RawText)
    var labRange = LabDateRawArr[i].title.split('body=[')[1]
    labRange = labRange.split(']')[0]
    //console.log(labRange)



    // SPLIT THE VALUE NORMAL RANGE FROM ATTACHED TEXT.
    // THERE'S NO SPACING. THUS NEED TO FILTER AWAY THE LETTERS AND SYMPTOMS NOT INCLUDING <>=.-
    if (labRange.length>1){
    //Due to lack of spacing between value and units. this section is to make sure only the range values show
      let regex = /[^0-9<>=.-]/g; // FIND ANYTHING THAT'S NOT NUMBER OR EXCLUDED SYMBOLS
      let match = labRange.match(regex); // GET AN ARRAY OF ALL THINGS THAT MATCH
      //console.log(match)

      if (match != null){
        let lastIndex = labRange.lastIndexOf(match.pop())//GET THE LAST FOUND MATCH. AND FIND THE LAST INDEX OF THAT.
        labRange = labRange.substring(lastIndex+1)
      }

      //console.log(labRange)
      labRange = labRange.substring(labRange.lastIndexOf(' '))
      labRange = labRange.replace(/\s/g, ''); //Extra spaces in the reference range string causes issues
    }

    //----END BLOCK: SPLIT THE VALUE NORMAL RANGE FROM ATTACHED TEXT.

    //removal of times and bolding of values
    if (RawText.indexOf('</b>')>=0){
      //console.log('firstcol')
      //---Splitting so get correct access to text area
      var PreP = RawText.split('<p')[0] + '<p'
      var innerP = RawText.split('<p')[1].split('p>')[0]
      var PostP = 'p>' +  RawText.split('p>')[1]

      PreP = PreP + innerP.substring(0,innerP.indexOf('>')) + '>'
      innerP = innerP.substring(innerP.indexOf('>')+1,innerP.indexOf('</'))
      PostP =  '</' + PostP
      innerP = innerP.substring(0,innerP.lastIndexOf(' '))
      //end---Splitting so get correct access to text area

      var lineBreakIndex = innerP.lastIndexOf('&nbsp;')
      innerP = '<b>' + innerP.substring(0,lineBreakIndex) + '</b>' + '  <i>(' + labRange + ')</i><br>'  + innerP.substring(lineBreakIndex)
      LabDateRawArr[i].innerHTML =PreP + innerP + PostP


  	}else{ // for the non-first column suff
      //---Splitting so get correct access to text area
      //console.log('not-firstcol')
      var ReplaceText = RawText
      ReplaceText = ReplaceText.trim()
      ReplaceText = ReplaceText.substring(0,ReplaceText.lastIndexOf(' '))
      //end---Splitting so get correct access to text area

      var lineBreakIndex = ReplaceText.lastIndexOf(' ')
      ReplaceText = '<b>' + ReplaceText.substring(0,lineBreakIndex) + '</b>' + '  <i>(' + labRange + ')</i><br>'  + ReplaceText.substring(lineBreakIndex)
      LabDateRawArr[i].innerHTML =ReplaceText
    }

    //console.log(LabDateRawArr[i].innerHTML)

  }

  //console.log(topDates)

  setTimeout(function(){ colorDates() },250);
}

function checkDoneLabTextMod(){
  var fail = 0
  for (i=0; i< LabDateRawArr.length; i++){
    var RawText = LabDateRawArr[i].innerHTML
    if (RawText.indexOf('</b>') <0){
      fail = 1
      break
    }
  }

  if (fail == 0){
  	setTimeout(function(){ colorDates() },250);
  }else{
    console.log('failed check')
    labTextMod()
  }
}


//color the borders of the dates based on how old they are
function colorDates(date,divVar){
    console.log('color dates')

  var colorArr = [
    '2px solid #00ff00',
    '2px solid #00ffff',
    '2px solid #ffff00',
    '2px solid #0080ff',
    '2px solid #8000ff'
    ]
  //console.log(topDates)
  var LabDateRawArr = $('div[id*=preventionProcedure]')
  //console.log(LabDateRawArr.length)
  for (i=0; i<visibleLabValueArr.length; i++){ //LabDateRawArr.length
    var idVal = visibleLabValueArr[i][0]
    var idObj = document.getElementById(idVal)
    var eleDate = visibleLabValueArr[i][1]

    //console.log(eleDate)
    if (+eleDate == +topDates[0]) {
      //console.log('y')
  		idObj.style.border = colorArr[0]
    }else if (+eleDate == +topDates[1]) {
      //console.log('y1')
     	idObj.style.border = colorArr[1]
    }else if (+eleDate == +topDates[2]) {
      //console.log('y2')
     	idObj.style.border = colorArr[2]
    }else if (+eleDate == +topDates[3]) {
      //console.log('y3')
     	idObj.style.border = colorArr[3]
    }else if (+eleDate == +topDates[4]) {
      //console.log('y4')
     	idObj.style.border = colorArr[4]
    }

  }

  SortArea()
}

//----Sorts visible labs on page to newest on top. The number of dates that it sorts is number of rows of TopValue
function SortArea(){

  console.log('sortingbyDate')
  var marginObj


  var copyVisibleLabArr = new Array()
    console.log(visibleLabValueArr)

  for (var i=0; i<visibleLabValueArr.length; i++){
    var divId = visibleLabValueArr[i][0]
    var eledate = visibleLabValueArr[i][1]
    var objDiv = document.getElementById(divId)
    //console.log(divId)
   //console.log(eledate)
    //console.log(objDiv)
    //var Pusharr =
    if(objDiv.previousElementSibling.id.indexOf('headP')>=0){
     	 copyVisibleLabArr.push([objDiv,eledate])
    }

  }

	var cumTable = $('#cumulativeLab')[0]
  //console.log(cumTable)
  //console.log(copyVisibleLabArr)

  for (var j=0; j<topDates.length; j++){
    for (var i=0; i<copyVisibleLabArr.length; i++){
      var eledate = copyVisibleLabArr[i][1]
      var objDiv = copyVisibleLabArr[i][0]
      var objDivParent = objDiv.parentElement
      var topDateVal = topDates[j]

      //console.log(topDateVal.getTime() == eledate.getTime())

      if (topDateVal.getTime() == eledate.getTime()){
        copyVisibleLabArr.splice(i,1)
        marginObj = objDivParent
        cumTable.appendChild(objDivParent)
        i--
      }


    }
    //makes a gap after the last colored box
    if (j==5){
    	marginObj.style.marginBottom = '50px'
    }
  }

  //print out everything that is left over
  //console.log(copyVisibleLabArr)
  for (var j=0; j<copyVisibleLabArr.length; j++){
    var objDiv = copyVisibleLabArr[j][0]
    var objDivParent = objDiv.parentElement
    copyVisibleLabArr.splice(j,1)
    cumTable.appendChild(objDivParent)
    j--

  }

  checkRange()
  toggleTableVis()
}
///Check if the result is within range and color it pink if it is out of range
function checkRange(){
  console.log("check range")
	var LabDateRawArr = $('div[id*=preventionProcedure]')
  //console.log(LabDateRawArr)

	console.log("check if labs in rage")
  for (var i=0; i<LabDateRawArr.length; i++){
    var min = 9999
    var max = -1
    var value = -9
    var div = LabDateRawArr[i]
    var raw = LabDateRawArr[i].innerText
    var valueStr = raw.split('(')[0].trim()
    var reference = raw.split("(")[1].split(")")[0]
    //reference = reference.replace(/\s/g, '');
    //console.log(raw)

    let inBound = true


    if (valueStr.includes("-")){
      //console.log(valueStr)
      valueStr = "NaN"
    }
    /*if (valueStr.indexOf(">")>=0){//If result contain ">" it usually means something is bad
      inBound = false
    }*/

   	var value = parseFloat(valueStr)





    if (raw.includes("()")){    ///what to do if no reference range
      //do nothing if empty aka remain true and no changes to background color
    }else if (reference.includes(">")){// what to do if there is a bottom only limiter
      var min = raw.split("(")[1].split(")")[0]
      min = min.replace(/[^\w.]+/g, '')
      min = parseFloat(min)
      if (value<=min){
        inBound = false
      }
    }else if (reference.includes("<")){//what to do if there is a top only limiter
      var max = raw.split("(")[1].split(")")[0]
      max = max.replace(/[^\w.]+/g, '')
      max = parseFloat(max)
      if (value>=max || value<0){
        inBound = false
      }
    }else if (reference.includes("-")){// what to do if there is a range limit
      var minMax = raw.split("(")[1].split(")")[0]
      min = parseFloat(minMax.split("-")[0])
      max = parseFloat(minMax.split("-")[1])
      if(value<min || value > max){
        inBound = false
      }
    }else if (raw.includes("(0)")){ //if value is zero expected
      if (value != 0){
        inBound = false
      }
    }else{
      //console.log("value: " + valueStr)
    	//console.log(reference)
      if (valueStr != reference){
        inBound = false
      }
    }

    //console.log(inBound)
    if (inBound === false){//SUPPOSED TO BE FALSE
      //console.log("running background mod")
      //console.log(div.children)
      var background = div.querySelector(['p'])
      //console.log(div)
      background.style.backgroundColor = "lightpink"
    }

    //end loop
  }

}//end Check range


//--------------------------------------------------------
//--------------------------------------------------------
//-----------------Random Functions-----------------------
//--------------------------------------------------------
//--------------------------------------------------------


function replaceHeadClass(){
  console.log("replace headers")
  var LabHeaders = $('div[id*=headPrevention0][class*=headPrevention]')
  console.log(LabHeaders)
  for (var i=0; i<LabHeaders.length; i++){
    	LabHeaders[i].className= 'headPrevention'
    	//console.log(LabHeaders[i].class)
  //Change color for ferritin numbers



  }
}

function createLoadingDiv(){
  var canvas = $(".MainTableRightColumn")[0]
  var newDiv = document.createElement('div')
  newDiv.setAttribute("id", "loadingDiv");
  newDiv.hidden = true
  var newContent = document.createTextNode("LOADING LABS, PLEASE WAIT..... the more labs the longer it takes :)");
  newDiv.appendChild(newContent)
  canvas.appendChild(newDiv)
}

//Get colum of multiple dim aray
function getCol(matrix, col){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }

//Returns the matched values between array
function arrayMatch(arrSection, arrFull) {
    var resultArr = [];

    for(var i=0; i<arrSection.length; i++){
      //console.log(arrSection[i])
      for(var j=0; j<myLabArray.length; j++){
         //console.log(myLabArray[j])
         if(arrSection[i] == (myLabArray[j][2])){
           //console.log("match found")
           resultArr.push(myLabArray[j]);
         }
      }
    }
    //console.log(resultArr);

    return resultArr
 }



//Alphabetical sort of left labs and checkboxes
function myDisplay() {
  input2.setAttribute('type', 'hidden');
  Cumulative() // alert(myLabArray)
  myLabArray.sort()
  //console.log(myLabArray)
  $('.leftBox > div:nth-child(3)').html(Newlist)
  //CCBox()
}




function getMeasures(measure, arrayno) {
  labURL = ''
  labURL = 'testName=' + measure + '&demo=' + params.demographic_no + '&labType=HL7&identifier=' + myLabArray[arrayno][2] //alert(labURL)
  xmlhttp = new XMLHttpRequest();
  str = ''
  var pathArray = window.location.pathname.split('/');
  var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/lab/CA/ON/labValues.jsp?' + labURL
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      measureArray = [
      ]
      measureDateArray = [
      ]
      var myRe = /<td align="right">(.*?)([\d,\.]+)<\/td>/g; //for the measurement
      var myRe2 = /<td align="center">(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})<\/td>/g; //the observation date
      var r = 0
      var myArray;
      while ((myArray = myRe.exec(str)) !== null) {
        pend = myArray[0].indexOf('</td>')
        measureArray[r] = '<b>' + myArray[0].substring(18, pend) + '</b>'
        r++
      }
      var r = 0
      var myArray;
      while ((myArray = myRe2.exec(str)) !== null) {
        measureDateArray[r] = '<u>' + myArray[0].substring(19, 29) + '</u>'
        r++
      }
      measureArray.reverse()
      measureDateArray.reverse()
      alldata[arrayno] = '<br><u>' + measure + '</u>' + '<br>' //*************Limit to 10 results**********************
      vlimit = 10
      if (measureArray.length < vlimit) {
        vlimit = measureArray.length
      } //****END LIMIT********************************

      for (zz = 0; zz < vlimit; zz++) {
        if (measureArray[zz]) {
          alldata[arrayno] = alldata[arrayno] + (measureArray[zz] + ' (' + measureDateArray[zz] + ');  ' + printthis)
        }
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}

// Detailed Lab names with associated Codes. Displayed on the left bar
// Each lab and associated code is recorded






function CCBox() {
  for (i = 0; i < myArray.length; i++) {
    q = document.getElementById(('myCheckBox' + i)) //alert(i)
    if (q) {
      q = document.getElementById(('myCheckBox' + i)) // alert(q.value)
      qq = document.getElementById('ALL')
      if (qq.checked == true) {
        q.checked = true;
      }
      else if (qq.checked == false) {
        q.checked = false;
      } //*****************

      q = document.getElementById(('myCheckBox' + i))
      qq = document.getElementById('CDM')
      if (CDMArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      }
      else if (CDMArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      qq = document.getElementById('CBC')
      if (CBCArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      }
      else if (CBCArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      qq = document.getElementById('INF')
      if (INFArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      }
      else if (INFArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      qq = document.getElementById('HEP')
      if (HEPArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      }
      else if (HEPArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      q = document.getElementById(('myCheckBox' + i))
      qq = document.getElementById('ALL')
      if (qq.checked == true) {
        q.checked = true;
      } //*****************

    }
  }
}

function addLabToProfile23(labType,testName,identCode){
	console.log('test')
   ///alert("calling addLabToProfile2");
   var newNode = document.createElement('div');
   var img = document.createElement('img');
   img.setAttribute('src','../images/osx-pinwheel.gif');
   newNode.appendChild(img)
   var ran_number=Math.round(Math.random()*1000000);
   newNode.setAttribute('id','d'+ran_number);


   //$('cumulativeLab').appendChild(req.responseText);
   var testing = $('#cumulativeLab')[0]
   console.log(testing)
   $('#cumulativeLab')[0].appendChild(newNode);
   //alert(req.responseText);
   console.log('tes2t')

   var url = "total-life-care.kai-oscar.com/oscar/lab/DisplayLabValue.jsp";
   var ran_number=Math.round(Math.random()*1000000);
   var params = "demographicNo=71833&rand="+ran_number+"&labType="+labType+"&testName="+testName+"&identCode="+identCode;  //hack to get around ie caching the page
   ///alert(params);  //'d'+ran_number
  console.log('tes32t')
   new Ajax.Updater(newNode,url, {method:'post',
                                          parameters:params,
                                          asynchronous:true,
                                           //onComplete: reRound
                                          evalScripts:true});
   ///alert("sdf"+$('d'+ran_number));
   ///alert("sdf"+$('d'+ran_number));
  console.log('tes24t')
}

