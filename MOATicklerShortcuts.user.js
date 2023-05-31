// ==UserScript==
// @name        Main Tickler Mod - Shortcut + Sorting
// @namespace   GongOscar
// @description MOA shortcut ticklers, sorted by priority
// @include     */ticklerMain.jsp*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.05.31.1
// ==/UserScript==

//changelog
// 23.05.31.1 - removed Honey
// 23.05.08.1 - Added Dr. Lo button
// 23.03.17.6 - Added Dr. Chan button + default sort by Date + moved all high ticklers to top
// 23.03.15.0 - added Dr. Gong's button


var TCISurreyID = 34
var GongID = 133
var ChanID = 134
var LoID= 157
var urlPath = ('https://' + location.host + window.location.pathname + '?')

var table;
var tbody;

window.addEventListener('load', function() {

  var AppendingParagraph = $("[name=serviceform]")[0]
  //AppendingParagraph = AppendingParagraph.parentElement.previousElementSibling

  var TCISurreyBut = document.createElement('input');
  TCISurreyBut.type = 'button';
  TCISurreyBut.id = 'TCISurreyBut'
  TCISurreyBut.name = 'TCISurreyBut'
  TCISurreyBut.value = 'Surrey Ticklers'
  TCISurreyBut.onclick = TCISurreyButFunc;
  TCISurreyBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:cyan;');
	AppendingParagraph.appendChild(TCISurreyBut);

  var GongBut = document.createElement('input');
  GongBut.type = 'button';
  GongBut.id = 'GongHighBut'
  GongBut.name = 'GongHighBut'
  GongBut.value = 'Gong Ticklers'
  GongBut.onclick = GongHighButFunc;
  GongBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:DeepSkyBlue;');
	AppendingParagraph.appendChild(GongBut);

  var ChanBut = document.createElement('input');
  ChanBut.type = 'button';
  ChanBut.id = 'ChanHighBut'
  ChanBut.name = 'ChanHighBut'
  ChanBut.value = 'Chan Ticklers'
  ChanBut.onclick = ChanHighButFunc;
  ChanBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:PeachPuff;');
	AppendingParagraph.appendChild(ChanBut);

  var LoBut = document.createElement('input');
  LoBut.type = 'button';
  LoBut.id = 'LoHighBut'
  LoBut.name = 'LoHighBut'
  LoBut.value = 'Lo Ticklers'
  LoBut.onclick = LoButFunc;
  LoBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:Pink;');
	AppendingParagraph.appendChild(LoBut);

  pushHighUp()

}, false);

function pushHighUp(){
  // Get a reference to the correct table (#2) on the page
  table = document.getElementsByTagName("table")[2];
  // Get a reference to the tbody element of the table
  tbody = table.getElementsByTagName("tbody")[0];

  console.log(table)
  console.log(tbody)
  var rowsToMoveArray = []
  for (var i = 0; i < tbody.childElementCount; i++) {  //<tbody.childElementCount


    var row = tbody.getElementsByTagName("tr")[i]
    //console.log(row)
    var rowPtName = row.innerText.split('\t')[2]
    var rowPriority = row.innerText.split('\t')[6]
    if (rowPriority == "High"){
      console.log("high row found")
      console.log(rowPtName)
      console.log(rowPriority)
      console.log(i)
      rowsToMoveArray.push(i)

      var nextRowNum = i
      var nextRow = ""
      var nextRowPtName = ""
      var noName = true
      do{
        nextRowNum++
        i++
        if (nextRowNum>=tbody.childElementCount){
          break
        }

        nextRow = tbody.getElementsByTagName("tr")[nextRowNum]
        nextRowPtName = nextRow.innerText.split('\t')[2]
        console.log(nextRowPtName)
        if (nextRowPtName.length>0){
          noName = false
          i-- //cancels out the double i++ once exiting do-while loop and back to for loop. (Otherwise will skip row after High set of ticklers)
        }else{
          rowsToMoveArray.push(nextRowNum)
        }

      }while (noName == true)


    }

  }

  console.log(rowsToMoveArray)

  var addonCount = 0
  for (var k = rowsToMoveArray.length-1; k>=0; k--){
    var rowToMoveNum = rowsToMoveArray[k]
    var rowtoMove = tbody.getElementsByTagName("tr")[rowToMoveNum + addonCount]
    console.log(rowToMoveNum)
    console.log(rowtoMove)

    tbody.insertBefore(rowtoMove,tbody.getElementsByTagName("tr")[0])
    addonCount++
  }


}


function TCISurreyButFunc(){
  var newURL = (urlPath + "assignedTo=" + TCISurreyID + "&Submit=Create+Report&sort_order=asc&sort_column=service_date")
    console.log(newURL)
  window.location.href = newURL

}

function GongHighButFunc(){
  var newURL = (urlPath + "assignedTo=" + GongID + "&Submit=Create+Report&sort_order=asc&sort_column=service_date")
    console.log(newURL)
  window.location.href = newURL

}

function ChanHighButFunc(){
  var newURL = (urlPath + "assignedTo=" + ChanID + "&Submit=Create+Report&sort_order=asc&sort_column=service_date")
    console.log(newURL)
  window.location.href = newURL

}

function LoButFunc(){
  var newURL = (urlPath + "assignedTo=" + LoID + "&Submit=Create+Report&sort_order=asc&sort_column=service_date")
    console.log(newURL)
  window.location.href = newURL

}
