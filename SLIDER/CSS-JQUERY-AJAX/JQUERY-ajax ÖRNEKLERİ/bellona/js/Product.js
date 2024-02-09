var ImageIndex = 0;
function changeBigImage(iIndex) {
 ImageIndex = iIndex;
 document.getElementById('BigImage').getElementsByTagName('IMG')[0].src = bigImageFolder + 'pix.gif';
 if (arrImages.length / 2 > 0) {

  document.getElementById('BigImage').getElementsByTagName('IMG')[0].src = bigImageFolder + arrImages[ImageIndex - 1].split('|')[0];
  document.getElementById('ImageText').innerHTML = arrImages[ImageIndex - 1].split('|')[1];
  _gaq.push(['_trackEvent', 'UrunGorselleri', pUrl, bigImageFolder + arrImages[ImageIndex - 1].split('|')[0]]);
  if (arrImages[ImageIndex - 1].split('|')[2] != '') {
   document.getElementById('ContainerImageDescription').style.display = '';
   document.getElementById('ImageDescription').innerHTML = arrImages[ImageIndex - 1].split('|')[2];
  }
  else {
   document.getElementById('ContainerImageDescription').style.display = 'none';
  }

  //  window.scrollTo(0, 0);

  if (arrImages.length / 2 > 1) {
   if (ImageIndex == 1) {
    document.getElementById('PrevArrow').style.visibility = 'hidden';
   }
   else {
    document.getElementById('PrevArrow').style.visibility = 'visible';
   }

   if (ImageIndex == arrImages.length / 2) {
    document.getElementById('NextArrow').style.visibility = 'hidden';
   }
   else {
    document.getElementById('NextArrow').style.visibility = 'visible';
   }
  }
 }
}
function nextImage() {
 if (arrImages.length / 2 > ImageIndex) { changeBigImage(++ImageIndex) };
}
function prevImage() {
 if (ImageIndex > 1) { changeBigImage(--ImageIndex) };
}
function closePopRecommend() {
 document.getElementById('popRecommendForm').style.display = 'none';
 document.getElementById('divBgFade').style.display = 'none';
}
function openPopRecommend() {
 _gaq.push(['_trackEvent', 'Urunler', 'Recommend', pUrl]);
 document.getElementById('popRecommendForm').style.display = 'block';
 document.getElementById('divBgFade').style.display = 'block';
}

function closePopPrice() {
 document.getElementById('popPrice').style.display = 'none';
 document.getElementById('divBgFade').style.display = 'none';
}
function openPopPrice() {
 LoadPrice();
 _gaq.push(['_trackEvent', 'Urunler', 'PriceList', pUrl]);
 document.getElementById('popPrice').style.display = 'block';
 document.getElementById('divBgFade').style.display = 'block';
}


function bigDrawing(i) {
 if (IE6) {
  document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.width = '';
  document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.height = '';
 }
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.maxWidth = '400px';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.maxHeight = '300px';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.position = 'absolute';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.margin = '0 0 0 -133px';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.border = 'solid 3px #cccccc';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.zIndex = '10';
 document.getElementById('TeknikBilgiler' + i).style.overflow = 'visible';
}
function tnDrawing(i, _w, _h) {
 if (IE6) {
  document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.height = '75px';
 }
 if (_w == undefined) {
  _w = 100;
 }
 if (_h == undefined) {
  _h = 75;
 }
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.maxWidth = _w + 'px';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.maxHeight = _h + 'px';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.position = '';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.border = '0';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.margin = '0';
 document.getElementById('TeknikBilgiler' + i).getElementsByTagName('IMG')[0].style.zIndex = '1';
 document.getElementById('TeknikBilgiler' + i).style.overflow = 'hidden';
}

var intSimplePrice = "";

function LoadSimplePrice(_pid, containerID, emptyMessage) {
 var priceContext = containerID + ',' + emptyMessage;
 ProductService.GetPriceSimple(_pid, PriceSimpleListSuccessCallBack, PriceSimpleListFailureCallBack, priceContext);
 //intSimplePrice = window.setInterval('ProductService.GetPriceSimple(' + _pid + ', ' + PriceSimpleListSuccessCallBack + ', ' + PriceSimpleListFailureCallBack + ', ' + priceContext + ')', 1999);
 //Loading(containerID);
}

function PriceSimpleListFailureCallBack(result, priceContext) {
 document.getElementById(containerID).innerHTML = 'Fiyat yüklenemedi.';
}

function PriceSimpleListSuccessCallBack(result, priceContext) {
 window.clearInterval(intSimplePrice);
 intSimplePrice = "";
 if (result == "") {
  document.getElementById(priceContext.split(",")[0]).innerHTML = priceContext.split(",")[1];
 }
 else {
  document.getElementById(priceContext.split(",")[0]).innerHTML = result;
 }
}


function LoadSimplePriceBySKU(_sku, containerID, emptyMessage) {
 var priceContext = containerID + ',' + emptyMessage;
 ProductService.GetPriceSimpleBySKU(_sku, PriceSimpleBySKUListSuccessCallBack, PriceSimpleBySKUListFailureCallBack, priceContext);
}

function PriceSimpleBySKUListFailureCallBack(result, priceContext) {
 document.getElementById(containerID).innerHTML = 'Fiyat yüklenemedi.';
}

function PriceSimpleBySKUListSuccessCallBack(result, priceContext) {
 window.clearInterval(intSimplePrice);
 intSimplePrice = "";
 if (result == "") {
  document.getElementById(priceContext.split(",")[0]).innerHTML = priceContext.split(",")[1];
 }
 else {
  document.getElementById(priceContext.split(",")[0]).innerHTML = result;
 }
}

function printProductInfo() {
 window.open('/print.aspx');
 _gaq.push(['_trackEvent', 'Urunler', 'Print', pUrl]);
}

function LoadPrice() {
 ProductService.GetPrice(__PID, PriceListSuccessCallBack);
 Loading('ProductPrice');
}
function PriceListSuccessCallBack(result) {
 document.getElementById("ProductPrice").innerHTML = result;
 writeItemCount();
 document.getElementById("ProductPrice").style.height = 'auto';
}

function AddToCompare(pid) {
 ProductService.AddComparisonItem(pid, AddToCompareSuccessCallBack, AddToCompareFailureCallBack, pid);
 _gaq.push(['_trackEvent', 'Urunler', 'Compare', pUrl]);
}

function AddToCompareFailureCallBack(result, pid) {
 alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
}


function AddToCompareSuccessCallBack(result, pid) {
 WriteCompareList();
 /* animateIt */
 //AnimateCompareList();
 ComparisonItemExist(pid);
 //alert(result);
}

function AnimateCompareList() {
 $('#CompareList a').css('background-position', '0 -41px');
 setTimeout("$('#CompareList a').css('background-position', '0 0')", 177);
 setTimeout("$('#CompareList a').css('background-position', '0 -41px')", 377);
 setTimeout("$('#CompareList a').css('background-position', 'inherit')", 777);
}


function writeItemCount() {
 for (ti = 0; ti < $('table.mainTBL').size(); ti++) {
  for (i = 0; i < $('table.mainTBL:eq(' + ti + ') tr.PriceRow').size(); i++) {

   $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(0)').html('<span class="itemCountHolder" id="count' + i + '"><a href="javascript:ItemCountMinus(' + ti + ',' + i + ');">-</a><span class="itemCount"> <b>1</b> adet</span><a href="javascript:ItemCountPlus(' + ti + ',' + i + ');"­>+</a></span>' + $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(0)').html() + '');

   for (ii = 1; ii < $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td').size(); ii++) {
    _td = $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(' + ii + ')');
   }
  }


  // generate TOTAL first of all here! then
  // update it in every progress!
  if ($('table.mainTBL:eq(' + ti + ') tr.PriceRow').size() > 11) {
   $('table.mainTBL:eq(' + ti + ') tr.PriceRow:first').before('<tr class="TRTotal" style="visibility:hidden;">' + TotalTRHtml(ti) + '</tr>');
  }
  $('table.mainTBL:eq(' + ti + ') tr.PriceRow:last').after('<tr class="TRTotal" style="visibility:hidden;">' + TotalTRHtml(ti) + '</tr>');
 }
}

function TotalTRHtml(ti) {
 _totalHTML = '<td style="font-weight:bold;"><span style="float:right;"><a href="javascript:resetCount(' + ti + ');">adetleri sıfırla</a></span>TOPLAM: </td>';
 for (ii = 1; ii < $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(0) td').size(); ii++) {
  _c = 0;
  for (a = 0; a < $('table.mainTBL:eq(' + ti + ') tr.PriceRow').size(); a++) {
   if ($('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + a + ') td:eq(' + ii + ')').css('visibility') != 'hidden') {
    _c += Math.round(replaceCommaDot($('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + a + ') td:eq(' + ii + ')').html()));
   }
   else {
    _c += 0;
   }
  }
  _totalHTML += '<td style="text-align:right; font-weight:bold;">' + setCommaDot(_c) + '</td>';

 }
 return _totalHTML;
}


function resetCount(ti) {
 _rows = $('table.mainTBL:eq(' + ti + ') tr.PriceRow');

 for (aa = 0; aa < _rows.size(); aa++) {

  //if first numeric TD is visible -> means not 0
  if ($('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + aa + ') td:eq(1)').css('visibility') != 'hidden') {
   for (bb = 1; bb < $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + aa + ') td:gt(0)').size()+1; bb++) {
    _perPrice = setCommaDot(replaceCommaDot($('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + aa + ') td:eq(' + bb + ')').html()) / $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + aa + ') td:eq(0) b').html());
    $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + aa + ') td:eq(' + bb + ')').html(_perPrice);
   }
   ItemCountMinus(ti, aa, 0);
  }
 }


}

function ItemCountPlus(ti, i) {


 _numericTDs = $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:gt(0)');
 _countNumberField = $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(0) b');

 _countNumber = Math.round(_countNumberField.html()) + 1;

 _countNumberField.html(_countNumber);

 $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td a').removeAttr('disabled');
 $('table.mainTBL:eq(' + ti + ') tr.TRTotal').css('visibility', 'visible');

 if (_countNumber > 1) {

  for (ii = 1; ii < _numericTDs.size() + 1; ii++) {
   _ratioPlus = _countNumber / (_countNumber - 1);
   _cleanNumber = replaceCommaDot($('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(' + ii + ')').html()) * _ratioPlus;
   _formattedNumber = setCommaDot(_cleanNumber);
   $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(' + ii + ')').html(_formattedNumber);
  }
 }

 else {
  _numericTDs.css('visibility', 'visible');
 }
 $('table.mainTBL:eq(' + ti + ') tr.TRTotal').html(TotalTRHtml(ti));
}


function ItemCountMinus(ti, i, forceCount) {

 if (forceCount === undefined) {
  forceCount = -1;
 }

 _numericTDs = $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:gt(0)');
 _countNumberField = $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(0) b');


 if (forceCount > -1) {
  _countNumber = forceCount;
 }
 else {
  _countNumber = Math.round(_countNumberField.html()) - 1;
 }

 if (_countNumber > -1) {
  _countNumberField.html(_countNumber);
 }

 $('table.mainTBL:eq(' + ti + ') tr.TRTotal').css('visibility', 'visible');

 if (_countNumber > 0) {

  for (ii = 1; ii < _numericTDs.size() + 1; ii++) {
   _ratioMinus = _countNumber / (_countNumber + 1);
   _cleanNumber = replaceCommaDot($('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(' + ii + ')').html()) * _ratioMinus;
   _formattedNumber = setCommaDot(_cleanNumber);
   $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td:eq(' + ii + ')').html(_formattedNumber);
  }

 }
 else {
  $('table.mainTBL:eq(' + ti + ') tr.PriceRow:eq(' + i + ') td a:eq(0)').attr('disabled', '1');
  _numericTDs.css('visibility', 'hidden');
 }
 $('table.mainTBL:eq(' + ti + ') tr.TRTotal').html(TotalTRHtml(ti));
}


function replaceCommaDot(_str) {
 _str = _str + '';
 return replaceAll(_str, [[".", ""], [",", ""]]);
}

function setCommaDot(_str) {
 _str = Math.round(_str);
 _str = _str / 100;
 _str = _str.toFixed(2) + '';

 _int = _str.split('.')[0];
 _dec = _str.split('.')[1];

 var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'), _sValue = _int + '';

 _sep = '.';

 while (sRegExp.test(_sValue)) {
  _sValue = _sValue.replace(sRegExp, '$1' + _sep + '$2');
 }

 _str = _sValue + ',' + _dec;
 return _str;

}



function leftMenuThumb(_i) {
 if (_i > $('li.LeftMain ul li.activePage').index()) {
  _i--;
 }
 return $('div#OtherProducts div.ThumbProduct:eq(' + _i + ')').html();
}

$(document).ready(function () {


 $('li.LeftMain ul li').mousemove(function (e) {
  var x = e.pageX + 13;
  var y = e.pageY + 13;
  $('div.LeftThumb', this).css('left', x);
  $('div.LeftThumb', this).css('top', y);
 });

 $('li.LeftMain ul li').mouseover(function () {

  $('li.LeftMain ul li div.LeftThumb').css('display', 'none');

  if ($(this).index() != $('li.LeftMain ul li.activePage').index()) {
   if ($('div.LeftThumb', this).length == 0) {
    $('<div class="LeftThumb">' + leftMenuThumb($(this).index()) + '<div>').appendTo($(this));
   }
   else {
    $('div.LeftThumb', this).css('display', 'block');
   }
  }
 });

 $('li.LeftMain ul li').mouseout(function () {
  $('div.LeftThumb', this).css('display', 'none');
 });

 $('.ConceptDDL').click(function () {
  if ($('.ConceptDDL ul').css('display') == 'none') {
   $('.ConceptDDL ul').slideDown();
   $('.ConceptDDL ul').slideDown();
  }
  else {
   $('.ConceptDDL ul').slideUp();
  }
 });

 intTimeOutLang = 0;
 $('.ConceptDDL').mouseover(function () {
  clearTimeout(intTimeOutLang);
 });
 $('.ConceptDDL').mouseleave(function () {
  intTimeOutLang = setTimeout("$('.ConceptDDL ul').slideUp()", 555)
 });
 if ($('#PImages').length > 0) {
  $('#PImages').jcarousel();
  $('#PImages').css('visibility', 'visible');
 }

 $('#divBgFade').click(function () {
  closePops();
 });



 $('#PropertyImages img.tPI').bind('mouseover', function (e) {
  _i = $('#PropertyImages img.tPI').index(this);
  if ($('span.PIDescr', this.parent).html() != '') {



   var x = e.pageX - 65 - (_i * 25);
   var y = e.pageY + 13;

   with ($('.PropertyImageDescription:eq(' + _i + ')', this.parent)) {
    css('display', 'inline-block');
    css('left', x);
    css('top', y);
   }
  }
 });


 $('#PropertyImages img.tPI').bind('mouseout', function () {
  $('.PropertyImageDescription', this.parent).css('display', 'none');
 });




});
$(document).bind('keydown', 'esc', function () {
 closePopPrice();
 closePopRecommend();
});
$(document).bind('keydown', 'left', function () { prevImage(); });
$(document).bind('keydown', 'right', function () { nextImage(); });

function showPropertyDetail(containerID) {
 hidePropertyDetails();
 $('#Property' + containerID).css('display', '');
}

function hidePropertyDetails() {
 for (i = 0; i < $('#PropertyImages div').length; i++) {
  $('#PropertyImages div:eq(' + i + ')').css('display', 'none');
 }
}


function closePops() {
 closePopPrice();
 closePopRecommend();
 //closePopImage();
}