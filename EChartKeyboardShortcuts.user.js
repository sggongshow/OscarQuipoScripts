// ==UserScript==
// @name           EChart_KeyboardShortcuts
// @namespace      Gong Oscar
// @description Various Echart shortcut buttons (Alt+ e,v,z,x,k,s,0,1,2,3,4,5,7). Set your own Measurement groupName and default population text.
// @include        */casemgmt/forward.jsp?action=view&demographic*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			23.03.20.1
// ==/UserScript==

//changelog
//23.03.20.1: modified so medication shortcut works again alt+Q
//23.02.12.1: quipo update: sign and save button


function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}
function getCookie(cname)
{
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
} //x = $('#enTemplate');
//x.css('background-color', 'yellow');

var myWindow = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '//')

document.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	//var theKeyCode = theEvent.charCode;// || event.which;
	var theKey = theEvent.key
  //var theKey = String.fromCharCode(theKeyCode);
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	//var theDownKey= theEvent.PgDnKey;

	switch(true){

     case theAltKey && theKey==='q': //Show med list
 			var medsButton = document.querySelector('div[id*=menuTitleRx]')
      medsButton = medsButton.nextElementSibling.children[0].children[0]
      medsButton.click()
			break;


		case theAltKey && theKey==='w': //Repeat Meds (Meds+)
 			var icon = $('div[id*=menuTitleRx] > h3:nth-child(1) > a:nth-child(1)')[0]
      icon.click()
			break;

    case theAltKey && theKey==='s': //save, sign and bill
 			var signsave = $('[title="Sign Save & Bill"]')[0]
     			signsave.click()
			break;


    case theAltKey && theKey==='t': //new Tickler
 			//$('#tickler > div:nth-child(2) > h3:nth-child(1) > a:nth-child(1)').click()
			break;


    case theAltKey && theKey==='e': //Expand left side
 		//$('#imgeforms5').click()
  		//$('#imgmeasurements5').click()
  		$('#imgdocs5')[0].click()
  		$('#imglabs5')[0].click()
  		//$('#imgpreventions5').click()
			break;

    case theAltKey && theKey==='f': //Medical Hx
 			$('a[href="#"][onclick*="showIssueHistory"][onclick*="61\')"]')[0].click()
			break;

      /*
    case theAltKey && theKey==='1': //Imaging
 			var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  		var res = myParam.indexOf('&')
  		var demo_no = myParam.substring(0, res) //alert (demo_no)
  		// INSERT YOU OWN form ID (fid=??) here
  		var formPath = vPath + '/eform/efmformadd_data.jsp?fid=370&demographic_no=' + demo_no + '&parentAjaxId=eforms' //alert(formPath)
  		window.open(formPath, 'Popup_Window', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
			break;


    case theAltKey && theKey==='2': //Labs
 			var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  		var res = myParam.indexOf('&')
  		var demo_no = myParam.substring(0, res) //alert (demo_no)
  		// INSERT YOU OWN form ID (fid=??) here
  		var formPath = vPath + '/eform/efmformadd_data.jsp?fid=321&demographic_no=' + demo_no //var formPath = vPath + "/eform/efmformadd_data.jsp?fid=81&demographic_no=" + demo_no
  		//alert(formPath)
  		window.open(formPath, 'Popup_Window', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=1000,height=800,left = 312,top = 234');
			break;
      */

     	case theAltKey && theKey==='1': //Preventions or Save button
      	//---- Preventions tab
      	var checkHistoryPopUp= $('#showEditNote')[0].style.display

      	if (checkHistoryPopUp == "table"){

          var saveNoteBut = $('[type="image"][title*="Sign"][title*="Save"][src*="note-save"]')
          //console.log(saveNoteBut)
          for (var i=0; i < saveNoteBut.length;i++){
            if(saveNoteBut[i].parentElement.parentElement.id.includes("Issue")==true){
            	saveNoteBut[i].click()
            }
          }
        }else{
          var icon = $('div[id*=menuTitlepreventions] >  h3:nth-child(1) > a:nth-child(1)')[0]
          icon.click()
        }
      	//document.getElementById("saveImg").click()
      	break

     	case theAltKey && theKey==='2': // new Tickler
				//$('#tickler > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)')[0].click()
        var icon = $('div[id*=menuTitletickler] >  h3:nth-child(1) > a:nth-child(1)')[0]
        icon.click()
      	break

      case theAltKey && theKey==='3': //Documents
        var icon = $('div[id*=menuTitledocs] >  h3:nth-child(1) > a:nth-child(1)')[0]
        icon.click()
      	break

      case theAltKey && theKey==='4': //Diease
     		 //$('#Dx > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
      	break


  		default:
      break;

	}
}, true);

