// ==UserScript==
// @name        Inbox Review mods
// @namespace   GongOscar
// @description Inbox review changes
// @include     *dms/inboxManage.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			24.02.07.1
// ==/UserScript==

//Changelog
//24.02.07.1:  if (varlength >= 1) changed to 1 instead of 4. table summary tbody count changes. will just use a standard fixed wait for load

function tbodyMod2(column){
    console.log("mod2 running")
    var table = document.getElementById("summaryView")
    var tbodies = Array.from(table.getElementsByTagName("tbody"));
    var rows = tbodies.flatMap(tbody => Array.from(tbody.getElementsByTagName("tr")));

    rows.sort(function(a, b) {
      var tdA = a.getElementsByTagName("td")[column].textContent;
      var tdB = b.getElementsByTagName("td")[column].textContent;
      return tdA > tdB ? 1 : (tdA < tdB ? -1 : 0);
    });

    for (var i = 0; i < rows.length; i++) {
        tbodies[0].appendChild(rows[i]);
    }

    console.log("finish sort")
}

function waitForElementLength(element) {
  //console.log("waiting function")
  return new Promise((resolve, reject) => {
        function checkVarLength() {
            var varlength = element.children.length
            //console.log(varlength)
            // Check if varlength is greater than or equal to 4
            if (varlength >= 1) {
                //console.log("varlength is now greater than or equal to 4");
                resolve(); // Resolve the promise to signal that the condition is met
            } else {
                setTimeout(checkVarLength, 1000); // Check again after 1 second (adjust as needed)
            }
        }

        checkVarLength(); // Start the recursive checking function
    });
}





async function main(){
  //Get Cortico Icon Element
  //console.log("main started")
  var tableID = document.getElementById("summaryView")
  console.log(tableID)

   waitForElementLength(tableID).then(() => {
        //console.log("Function2 has finished, and now Function1 continues");
        console.log(tableID.children.length)

        var headers = document.getElementsByClassName("tablesorter-header-inner")

        var sort0 = document.createElement('input');
        sort0.type = 'button';
        sort0.value = 'sort';
        sort0.onclick = function() { tbodyMod2(0); };
        sort0.setAttribute('style', 'width:30px;font-size:12px;');
        headers[0].append(sort0);

        var sort1 = document.createElement('input');
        sort1.type = 'button';
        sort1.value = 'sort';
        sort1.onclick = function() { tbodyMod2(1); };
        sort1.setAttribute('style', 'width:30px;font-size:12px;');
        headers[1].append(sort1);

        var sort3 = document.createElement('input');
        sort3.type = 'button';
        sort3.value = 'sort';
        sort3.onclick = function() { tbodyMod2(3); };
        sort3.setAttribute('style', 'width:30px;font-size:12px;');
        headers[3].append(sort3);
       
        var sort4 = document.createElement('input');
        sort4.type = 'button';
        sort4.value = 'sort';
        sort4.onclick = function() { tbodyMod2(4); };
        sort4.setAttribute('style', 'width:30px;font-size:12px;');
        headers[4].append(sort4);

        var sort6 = document.createElement('input');
        sort6.type = 'button';
        sort6.value = 'sort';
        sort6.onclick = function() { tbodyMod2(6); };
        sort6.setAttribute('style', 'width:30px;font-size:12px;');
        headers[6].append(sort6);

    });


}

//-------------------------------failed
function tbodyMod(table){
  console.log("start tbody MOD")
  console.log(table)
  var childrenArray = table.children
  var tbody1 = childrenArray[1]
  var tbody2 = childrenArray[2]
  var tbody3 = childrenArray[3]
  console.log(tbody1)
  console.log(tbody2)
  console.log(tbody3)

  var rowsToMove2 = tbody2.getElementsByTagName('tr');
  var rowsToMove3 = tbody3.getElementsByTagName('tr');

  for (var i = 0; i < rowsToMove2.length; i++) {
    tbody1.appendChild(rowsToMove2[i].cloneNode(true));
  }

  for (var i = 0; i < rowsToMove3.length; i++) {
    tbody1.appendChild(rowsToMove3[i].cloneNode(true));
  }

  tbody2.parentNode.removeChild(tbody2);
  tbody3.parentNode.removeChild(tbody3);

}







window.addEventListener('load', function() {
  console.log("inbox mod start")
  setTimeout(function(){ main(); }, 5000)

}, false);
