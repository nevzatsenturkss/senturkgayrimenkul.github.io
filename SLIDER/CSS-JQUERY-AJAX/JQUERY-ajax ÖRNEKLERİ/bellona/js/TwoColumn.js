function ComparisonItemExist(pid) {
 ProductService.ComparisonItemExist(pid, CompareItemExistSuccessCallBack);
 //$('ul.Submenu').css('position', 'absolute');
}
function CompareItemExistSuccessCallBack(result) {
 if ($('a.KarsilastirmaListesineEkle') != undefined && $('a.KarsilastirmaListesineEkle') != null) {
  if (result == 1) {
   $('a.KarsilastirmaListesineEkle').html('Karşılaştırma Listesine Git');
   $('a.KarsilastirmaListesineEkle').attr('title', 'Karşılaştırma Listesine Git');
   $('a.KarsilastirmaListesineEkle').attr('href', '/karsilastirma-listesi');
   $('a.KarsilastirmaListesineEkle').attr('onclick', 'javascript:void(0);');
   $('a.KarsilastirmaListesineEkle').css('background-position', '0 -33px');
  }
  else {
   $('a.KarsilastirmaListesineEkle').html('Karşılaştırma Listesine Ekle');
   $('a.KarsilastirmaListesineEkle').attr('title', 'Karşılaştırma Listesine Ekle');
   $('a.KarsilastirmaListesineEkle').attr('href', 'javascript:void(0);');
   $('a.KarsilastirmaListesineEkle').css('background-position', '0 0')
  }
 }
}
function WriteCompareList() {
 ProductService.ComparisonItemCount(CompareItemCountSuccessCallBack);
 //$('ul.Submenu').css('position', 'absolute');
}
function CompareItemCountSuccessCallBack(result) {
 if (document.getElementById('CompareItemCount') != undefined && document.getElementById('CompareItemCount') != null) {
  document.getElementById('CompareItemCount').innerHTML = '(' + result + ')';
 }
}
function RemoveFromCompareList(pid) {
 ProductService.RemoveComparisonItem(pid, RemoveFromCompareSuccessCallBack);
 Loading('CompareItemCount');
}
function RemoveFromCompareSuccessCallBack(result) {
 WriteCompareList();
}
function RemoveBigCompareItem(pid) {
 ProductService.RemoveComparisonItem(pid, RemoveCompareItemSuccessCallBack);
}
function RemoveCompareItemSuccessCallBack(result) {
 window.location.href = window.location.href;
}
function LoadProductList(_container, _list) {
 //var _context = '' + container;
 ProductService.ProductList(_list, _successHandler, _failureHandler, _container);
}
function LoadCategoryProducts(_container, _name) {
 //var _context = '' + container;
 ProductService.CategoryProducts(_name, _successHandler, _failureHandler, _container);
}
function _failureHandler(_result, _context) {
}
function _successHandler(_result, _context) {
 document.getElementById(_context).innerHTML = _result;
}
function LoadPriceAll() {
 ProductService.GetPriceAll(PriceAllSuccessCallBack);
 Loading('PriceAll');
}
function PriceAllSuccessCallBack(result) {
 document.getElementById('PriceAll').innerHTML = result;
}
function LoadPricebyKey(key,value) {
 ProductService.GetPriceByKey(key, value, PriceAllSuccessCallBack);
    Loading('PriceAll');
}

function getCurrentPageIndex() {
 _currentMenuIndex = 0;
 $('ul#CustomLeftMenu ul li a').each(function (index, value) {
  if ($(this).text() == $('ul#CustomLeftMenu ul li.activePage a').text()) {
   _currentMenuIndex = index;
  }
 });
 return _currentMenuIndex;
}

function gotoNextPage() {
 _i = getCurrentPageIndex();
 window.location.href = $('ul#CustomLeftMenu ul li a[href]')[(_i + 1) % ($('ul#CustomLeftMenu ul li a').size())];
}

function gotoPrevPage() {
 _i = getCurrentPageIndex();
 _i = (_i - 1) % ($('ul#CustomLeftMenu ul li a').size());
 if (_i == -1) {
  window.location.href = $('ul#CustomLeftMenu ul li a[href]')[$('ul#CustomLeftMenu ul li a').size() - 1];
 }
 else {
  window.location.href = $('ul#CustomLeftMenu ul li a[href]')[_i];
 }
}
$(document).bind('keydown', 'ctrl+left', function () { gotoPrevPage(); });
$(document).bind('keydown', 'ctrl+right', function () { gotoNextPage(); });

function go(i) {
 if ($('ul#SubMenu' + i).css('display') == 'none') {
  $('ul#SubMenu' + i).slideDown(555);
  window.setTimeout(function () {
   $('li#l' + i + ' a.Arrow img').attr('src', '/i/iconLeftMenuDropUp_fix.png');
  }, 555);
 }
 else {
  $('ul#SubMenu' + i).slideUp(555);
  window.setTimeout(function () {
   $('li#l' + i + ' a.Arrow img').attr('src', '/i/iconLeftMenuDropDown_fix.png');
  }, 555);
 }
}

$(document).ready(function () {

 /* Share Hover Bubble */
 if ($("a.Share")) {
 $("a.Share").hover(function () {
  $("div.infoSpec", this).stop(true, true).animate({ opacity: "show", top: "-57" }, "fast");
 }, function () {
  $("div.infoSpec", this).animate({ opacity: "hide", top: "-70" }, "fast");
 });
}
});