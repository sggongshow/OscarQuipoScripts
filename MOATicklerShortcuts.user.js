// ==UserScript==
// @name        MOA Tickler Shortcuts
// @namespace   GongOscar
// @description MOA shortcut ticklers, sorted by priority
// @include     */ticklerMain.jsp*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	23.03.15.1
// ==/UserScript==

//changelog
// 23.03.15.0 - added Dr. Gong's button

var HoneyID = 135
var TCISurreyID = 34
var GongID = 133
var urlPath = ('https://' + location.host + window.location.pathname + '?')


window.addEventListener('load', function() {

  var AppendingParagraph = $(".HelpAboutLogout")[0]
  AppendingParagraph = AppendingParagraph.parentElement.previousElementSibling

  var honeyBut = document.createElement('input');
  honeyBut.type = 'button';
  honeyBut.id = 'honeyBut'
  honeyBut.name = 'honeyBut'
  honeyBut.value = 'Honey Ticklers'
  honeyBut.onclick = honeyButFunc;
  honeyBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:cyan;');
	AppendingParagraph.appendChild(honeyBut);

  var TCISurreyBut = document.createElement('input');
  TCISurreyBut.type = 'button';
  TCISurreyBut.id = 'TCISurreyBut'
  TCISurreyBut.name = 'TCISurreyBut'
  TCISurreyBut.value = 'Surrey Ticklers'
  TCISurreyBut.onclick = TCISurreyButFunc;
  TCISurreyBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:cyan;');
	AppendingParagraph.appendChild(TCISurreyBut);

  var TCISurreyBut = document.createElement('input');
  TCISurreyBut.type = 'button';
  TCISurreyBut.id = 'GongHighBut'
  TCISurreyBut.name = 'GongHighBut'
  TCISurreyBut.value = 'Gong - High'
  TCISurreyBut.onclick = GongHighButFunc;
  TCISurreyBut.setAttribute('style', 'width:100px;font-size:12px;padding:0px; background-color:DeepSkyBlue;');
	AppendingParagraph.appendChild(TCISurreyBut);

}, false);



function honeyButFunc(){
  var newURL = urlPath + "assignedTo=" + HoneyID + "&Submit=Create+Report&sort_order=desc&sort_column=priority"
  //console.log(newURL)
  window.location.href = newURL
}

function TCISurreyButFunc(){
  var newURL = (urlPath + "assignedTo=" + TCISurreyID + "&Submit=Create+Report&sort_order=desc&sort_column=priority")
    console.log(newURL)
  window.location.href = newURL

}

function GongHighButFunc(){
  var newURL = (urlPath + "assignedTo=" + GongID + "&Submit=Create+Report&sort_order=desc&sort_column=priority")
    console.log(newURL)
  window.location.href = newURL

}
