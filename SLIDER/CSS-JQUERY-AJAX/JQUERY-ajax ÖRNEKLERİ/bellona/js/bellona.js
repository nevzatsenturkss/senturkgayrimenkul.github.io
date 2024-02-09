var isMSIE = /*@cc_on!@*/false;
var IE6 = false/*@cc_on || @_jscript_version <= 5.7@*/;

function loadInput(txtID, inputValue) {
	if ($('#' + txtID).val() == inputValue) {
		$('#' + txtID).val('');
	}
}
function blurInput(txtID, inputValue) {
	if ($('#' + txtID).val() == '') {
		$('#' + txtID).val(inputValue);
	}
	else {
		//eval('inputState'+txtID) = 1;
	}
}
		function replaceAll(str, replacements) {
			for (i = 0; i < replacements.length; i++) {
				var idx = str.indexOf(replacements[i][0]);

				while (idx > -1) {
					str = str.replace(replacements[i][0], replacements[i][1]);
					idx = str.indexOf(replacements[i][0]);
				}
			}

			return str;
		}

$(document).ready(function () {

 if ($('.Lang').length > 0) {
	$('.Lang').click(function () {
		if ($('.Lang ul').css('display') == 'none') {
			$('.Lang ul').slideDown();
			$('.Lang ul').slideDown();
		}
		else {
			$('.Lang ul').slideUp();
		}
	});

	intTimeOutLang = 0;
	$('.Lang').mouseover(function () {
		clearTimeout(intTimeOutLang);
	});
	$('.Lang').mouseleave(function () {
		intTimeOutLang = setTimeout("$('.Lang ul').slideUp()", 555)
	});

}
});
function RepeaterDisplay(repeaterContainer, emptyContainer, checkTag) {
	if (document.getElementById(repeaterContainer).getElementsByTagName(checkTag).length == 0) {
		if (emptyContainer != '') {
			document.getElementById(emptyContainer).style.display = '';
		}
		document.getElementById(repeaterContainer).style.display = 'none';
	}
	else {
		if (emptyContainer != '') {
			document.getElementById(emptyContainer).style.display = 'none';
		}
		document.getElementById(repeaterContainer).style.display = '';
	}
}
var prevGroupName = '';
function displayGroupName(groupName) {
 if (prevGroupName != groupName) {
  if (prevGroupName != '') {
   document.write('</table>');
  }
	 document.write('<table id="tblProperty"><tr><td colspan="2" class="GroupName"><h2>' + groupName + '</h2></td></tr>');
	}
	prevGroupName = groupName;
}
function Loading(targetID) {
 document.getElementById(targetID).innerHTML = '<div style="height:100%; width:100%; vertical-align:middle; text-align:center;"><img src="/i/ajax-loader.gif" style="margin:13px;"><br>yükleniyor...<br><br></div>'
}

function recordOutboundLink(link, category, action, lType , pUrl) {
 try {
  _gaq.push(['_trackEvent', category, action, lType, pUrl]);
  setTimeout('document.location = "' + link.href + '"', 100)
 } catch (err) { }
}