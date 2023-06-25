// ==UserScript==
// @name        Rx Favorites Expander
// @namespace   GongOscar
// @description Favorites are cut off. fixed
// @include     *oscarRx/choosePatient.do*
// @include     *oscarRx/SearchDrug3*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			23.06.25.0
// ==/UserScript==

//changelog
//23.06.25.0. Initial Code


//wait window load first

window.addEventListener('load', function() {

  var FavArray

  FavArray = document.querySelectorAll('a[onclick*="useFav2"]');
  console.log(FavArray)

  FavArray.forEach(element => {
    const title = element.getAttribute('title');
    element.innerText = title;
  });

}, false);




