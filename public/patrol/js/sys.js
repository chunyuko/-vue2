function killerrors() {
  return true
}

if (window.location.hostname != 'localhost') {
  window.onerror = killerrors
}

//在IE10下，在IFRAME中获取的window.navigator.userAgent版本是7.0
//所以统一在最外层获取IE信息

//先获取浏览器类型及版本号
var IEVer = 0
var IsChrome = 0
var IsFirefox = 0
var IsIe = 0
var IsSafari = 0
window['MzBrowser'] = {}
;(function () {
  if (MzBrowser.platform) return
  var ua = window.navigator.userAgent
  //alert("ua="+ua);
  MzBrowser.platform = window.navigator.platform

  MzBrowser.firefox = ua.indexOf('Firefox') > 0
  MzBrowser.opera = typeof window.opera == 'object'
  MzBrowser.ie = !MzBrowser.opera && ua.indexOf('MSIE') > 0
  MzBrowser.mozilla = window.navigator.product == 'Gecko'
  MzBrowser.netscape = window.navigator.vendor == 'Netscape'
  MzBrowser.safari = ua.indexOf('Safari') > -1
  //IE11判断
  MzBrowser.ieNew = ua.indexOf('Trident') > -1

  MzBrowser.Chrome = ua.indexOf('Chrome') > -1

  if (MzBrowser.firefox) var re = /Firefox(\s|\/)(\d+(\.\d+)?)/
  else if (MzBrowser.ie) var re = /MSIE( )(\d{1,2}(\.\d+)?)/
  else if (MzBrowser.opera) var re = /Opera(\s|\/)(\d+(\.\d+)?)/
  else if (MzBrowser.netscape) var re = /Netscape(\s|\/)(\d+(\.\d+)?)/
  //Chrom放在safari前
  else if (MzBrowser.Chrome) var re = /Chrome(\s|\/)(\d+(\.\d+)?)/
  else if (MzBrowser.safari) var re = /Version(\/)(\d+(\.\d+)?)/
  else if (MzBrowser.mozilla) var re = /rv(\:)(\d+(\.\d+)?)/
  else if (MzBrowser.ieNew) var re = /rv(\:)(\d+(\.\d+)?)/

  //alert("re="+re);
  if ('undefined' != typeof re && re.test(ua)) {
    MzBrowser.version = parseFloat(RegExp.$2)
  }

  //alert("MzBrowser.version="+MzBrowser.version);
})()

if (MzBrowser.safari) {
  IsSafari = 1
}

if (MzBrowser.ie || MzBrowser.ieNew) {
  IsIe = 1
}
if (MzBrowser.firefox) {
  IsFirefox = 1
}
//alert("IsFirefox="+IsFirefox);
if (MzBrowser.Chrome) {
  IsChrome = 1
}
var InserRowOrder = -1
//chrome必须传入参数，表示插入在最后
if (IsChrome) {
  InserRowOrder = -1
}
if (IsFirefox) {
  InserRowOrder = -1
}
if (IsSafari) {
  InserRowOrder = -1
}

var IE___ = (function () {
  'use strict'

  var ret, isTheBrowser, actualVersion, jscriptMap, jscriptVersion

  isTheBrowser = false
  jscriptMap = {
    5.5: '5.5',
    5.6: '6',
    5.7: '7',
    5.8: '8',
    9: '9',
    10: '10',
    11: '11',
  }
  jscriptVersion = new Function('/*@cc_on return @_jscript_version; @*/')()

  if (jscriptVersion !== undefined) {
    isTheBrowser = true
    actualVersion = jscriptMap[jscriptVersion]
  }

  ret = {
    isTheBrowser: isTheBrowser,
    actualVersion: actualVersion,
  }

  return ret
})()

//IE里只支持window.event，Firefox只支持参数的形式，而其他主流浏览器两者都支持。所以平时为了兼容FF
//每当Firefox访问到event属性，就会顺着调用栈访问到最顶层的函数，即捕捉事件的那个函数，该函数的第一个参数即是事件对象。这样，所有的浏览器都可以用event属性，无需e=e||event那样的代码了
if (IsFirefox) {
  var $E = function () {
    var c = $E.caller
    while (c.caller) c = c.caller
    return c.arguments[0]
  }
  __defineGetter__('event', $E)
}

if (MzBrowser.ie == true || MzBrowser.ieNew == true) {
  IEVer = parseInt(MzBrowser.version)
}
//非IE类浏览器，不受版本限制
else {
  IEVer = 7
}

//注意，在使用style.display=""时，如果在css文件中，也设置了display:none;则显示不出来，不能在css文件中设置display:none;，需要直接在标签中设置display:none;

//style.display="" 这样的写法只是把元素中的style中的display清除而已，并不会影响CSS文件中，display的属性
//alert("IEVer="+IEVer);
if (IEVer == 10) {
  var DisBlock = ''
} else if (IEVer == 11) {
  var DisBlock = ''
} else {
  var DisBlock = 'block'
}

//IE11版本鼠标左键和中间键 按下对应的键值做了调整
var ButtonKeyLeft = 1
var ButtonKeyRight = 2
var ButtonKeyMiddle = 4
if (IEVer >= 11 || IsChrome || IsFirefox || IsSafari) {
  ButtonKeyLeft = 0
  ButtonKeyRight = 2
  ButtonKeyMiddle = 1
}

function $_() {
  var results = [],
    element
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (typeof element == 'string') {
      element = document.getElementById(element)
    }
    try {
      results.push(Element.extend(element))
    } catch (e) {
      results.push(element)
    }
  }
  return results.length < 2 ? results[0] : results
}
function $() {
  var results = [],
    element
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (typeof element == 'string') {
      element = document.getElementById(element)
    }
    try {
      results.push(Element.extend(element))
    } catch (e) {
      results.push(element)
    }
  }
  return results.length < 2 ? results[0] : results
}

//设置某个元素的css格式
/*
示例：setStyle(obj,{filter:"progid:DXImageTransform.Microsoft.Alpha(opacity=70);"});
*/
function setStyle(obj, css) {
  for (var atr in css) {
    obj.style[atr] = css[atr]
  }
}

//在元素上显示hint
function dishint(obj, str) {
  obj.alt = str
  obj.title = str
}

function cdi(obj, str) {
  if (obj.style.backgroundImage.indexOf('_nor') != -1) {
    obj.style.backgroundImage = obj.style.backgroundImage.replace('_nor', '_hover')
  } else {
    obj.style.backgroundImage = obj.style.backgroundImage.replace('_hover', '_nor')
  }
  if (str) {
    dishint(obj, str)
  }
}

function toolTip(obj, msg) {
  var tiplayerstyle = $_('tiplayer').style
  if (toolTip.arguments.length < 1) {
    tiplayerstyle.display = 'none'
  } else {
    var len = getLength(msg)
    var yy = getTop(obj)
    var xx = getLeft(obj)
    //alert("yy="+yy+" \r\n xx="+xx);
    tiplayerstyle.display = 'block'
    $_('tip').innerHTML = msg
    tiplayerstyle.width = 7 * len + 'px'
    tiplayerstyle.left = parseInt(xx - 10) + 'px'
    tiplayerstyle.top = parseInt(yy + 40) + 'px'
  }
}

function disobj(str) {
  $_(str).style.display = 'block'
}
function hiddenobj(str) {
  $_(str).style.display = 'none'
}

function visibleobj(str) {
  $_(str).style.visibility = 'visible'
}
function novisibleobj(str) {
  $_(str).style.visibility = 'hidden'
}

function SetCookie(name, value) {
  var exp = new Date()
  exp.setTime(exp.getTime() + 3600000000)
  document.cookie = name + '=' + value + '; expires=' + exp.toGMTString() + '; path=/'
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(';', offset)
  if (endstr == -1) {
    endstr = document.cookie.length
  }
  return unescape(document.cookie.substring(offset, endstr))
}
//注意最后必须加上path
function DelCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = GetCookie(name)
  document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString() + '; path=/'
}

function GetCookie(name) {
  var arg = name + '='
  var alen = arg.length
  var clen = document.cookie.length
  var i = 0
  while (i < clen) {
    var j = i + alen
    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal(j)
    }
    i = document.cookie.indexOf(' ', i) + 1
    if (i == 0) break
  }
  return null
}

function sleep(n) {
  var st1 = new Date().getTime()
  while (true) if (new Date().getTime() - st1 > n) break
}
function isDigit() {
  return event.keyCode >= 48 && event.keyCode <= 57
}

//元素增加事件处理
function eleAddEvent(element, eventName, eventHandler) {
  //if (navigator.appName == "Microsoft Internet Explorer"){element.attachEvent('on'+eventName, eventHandler);}
  //else{element.addEventListener(eventName, eventHandler, false);}

  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false)
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, eventHandler)
  }
}

function ReleaseEvent(element, eventName, eventHandler) {
  if (element.removeEventListener) {
    element.removeEventListener(eventName, eventHandler, true)
  } else if (element.detachEvent) {
    element.detachEvent('on' + eventName, eventHandler)
  }
}

//构造一个二维数组array[d1][d2]
function Create2dArray(d1, d2) {
  var RetArray = new Array()
  for (var i = 0; i < d1; i++) {
    RetArray.push(new Array())
    for (var j = 0; j < d2; j++) {
      RetArray[i][j] = 0
    }
  }
  return RetArray
}

//重定义array的indexof属性
//在数组中查找某个元素的索引
Array.prototype.indexOf = function (v) {
  for (var i = 0, n = this.length; i < n; i++) {
    if (this[i] == v) {
      return i
    }
  }
  return -1
}

Array.prototype.S = String.fromCharCode(2)
//在数组中查找某个元素
//存在返回true,不存在返回false
Array.prototype.in_array = function (e) {
  var r = new RegExp(this.S + e + this.S)
  return r.test(this.S + this.join(this.S) + this.S)
}

//向数组中添加新的数值，保证不重复
Array.prototype.pushnew = function (v) {
  var c = 0
  for (var i = 0; i < this.length; i++) {
    if (this[i] == v) {
      c = 1
    }
  }
  if (!c) {
    this.push(v)
  }
}
//从数组中删除值为item的项
Array.prototype.remove = function (item) {
  for (var i = 0; i < this.length; i++) {
    if (item == this[i]) {
      break
    }
  }
  if (i == this.length) {
    return
  }
  for (var j = i; j < this.length - 1; j++) {
    this[j] = this[j + 1]
  }
  this.length--
}
Array.prototype.max = function () {
  return Math.max.apply({}, this)
}
Array.prototype.min = function () {
  return Math.min.apply({}, this)
}

//在一个对象数组内，根据 某个对象 的 某个属性名及值，查该对象的 另一个属性的值
//tn:对象的已知属性名，tv:对象的已知属性值
//q:需要查询的对象的属性名，返回为该属性的值,如果没有指明该值，返回所查询对象的索引值
//如果有多个结果，返回第一个结果
Array.prototype.qao = function (tv, tn, q) {
  var rt = -1
  var r = -1
  var v = ''
  for (var i = 0; i < this.length; i++) {
    v = eval('this[' + i + '].' + tn)
    if (v == tv) {
      r = i
      break
    }
  }
  //alert("r="+r);
  if (q && r != -1) {
    rt = eval('this[' + r + '].' + q)
    return rt
  } else {
    return r
  }
}

//tn:对象的已知属性名，tv:对象的已知属性值
//根据属性名及属性值，返回数组中，所有符合条件的对象数组
Array.prototype.qaa = function (tv, tn) {
  var r = new Array()
  var v = ''
  for (var i = 0; i < this.length; i++) {
    v = eval('this[' + i + '].' + tn)
    if (v == tv) {
      r.push(eval('this[' + i + ']'))
    }
  }
  return r
}

//在对象数组中，根据某个属性name的值nm来删除该对象(可以删除多个）
//nm一定是个对象的属性值，而不能是对象本身，切记！！！！
Array.prototype.dao = function (nm, name) {
  //var f=0;
  var l_ = this.length
  for (var i_ = 0, n_ = 0; i_ < l_; i_++) {
    var nmo = eval('this[' + i_ + '].' + name)
    //alert("nmo="+nmo+" \r\n nm="+nm);
    if (nmo != nm) {
      this[n_++] = this[i_]
    }
    //else{f=1;}
  }
  this.length = n_
  //alert("i_="+i_+" \r\n n_="+n_);
  //if(f==1){this.length -= 1;}
}
//向对象数组中添加新的对象v，按照对象的name属性进行验证，如果新对象v的name属性的值在当前数组中已经存在，则替换原来的
Array.prototype.pao = function (v, name) {
  for (var i = 0; i < this.length; i++) {
    var nm = eval('this[' + i + '].' + name)
    var nmn = eval('v.' + name)
    if (nm == nmn) {
      this.dao(nm, name)
    }
  }
  this.push(v)
}

//将数组中的对象，按照name属性进行group by,返回所有的name属性的数组
Array.prototype.grp = function (name) {
  var reArry = new Array()
  for (var i = 0; i < this.length; i++) {
    var nm = eval('this[' + i + '].' + name)
    reArry.pushnew(nm)
  }
  return reArry
}

//根据多个条件AT，在对象数组中，找出某个对象的索引值，或某个属性值
function AT(v, n) {
  this.v = v
  this.n = n
}
Array.prototype.qaos = function (AT, q) {
  var rt = -1
  var r = -1
  var v = ''
  for (var i = 0; i < this.length; i++) {
    var n = 0
    for (var j = 0; j < AT.length; j++) {
      var tn = AT[j].n
      var tv = AT[j].v
      v = eval('this[' + i + '].' + tn)
      if (v != tv) {
        n = 1
        break
      }
    }
    if (n == 0) {
      r = i
      break
    }
  }
  if (q && r != -1) {
    rt = eval('this[' + r + '].' + q)
    return rt
  } else {
    return r
  }
}

if (!Array.prototype.push) {
  Array.prototype.push = function array_push() {
    for (var i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i]
    }
    return this.length
  }
}

if (!Array.prototype.pop) {
  Array.prototype.pop = function array_pop() {
    lastElement = this[this.length - 1]
    this.length = Math.max(this.length - 1, 0)
    return lastElement
  }
}

function SelectOptionMaxMinIndex(option) {
  var MaxIndex = -1
  var MinIndex = -1
  var l = option.length

  if (l > 0) {
    MaxIndex = 0
    MinIndex = 0
  }

  for (var i = 0; i < l; i++) {
    var sv = option[i].sv
    if (sv > MaxIndex) {
      MaxIndex = sv
    }
    if (sv < MinIndex) {
      MinIndex = sv
    }
  }
  return { Max: MaxIndex, Min: MinIndex }
}

Number.prototype.NaN0 = function () {
  return isNaN(this) ? 0 : this
} //如果不是数字返回TRUE，如果是数字返回FALSE
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '')
}
String.prototype.replaceall = function (str1, str2) {
  var str = this
  var result = str.replace(eval('/' + str1 + '/gi'), str2)
  return result
}
//在字符串中查找AFindText字符，并全部替换为ARepText字符
String.prototype.replaceAll = function (AFindText, ARepText) {
  raRegExp = new RegExp(AFindText, 'g')
  return this.replace(raRegExp, ARepText)
}
function getAllChildren(e) {
  return e.all ? e.all : e.getElementsByTagName('*')
}

String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '')
}

//该函数效率较低
document.getElementsByClassName = function (className, oBox) {
  //适用于获取某个HTML区块内部含有某一特定className的所有HTML元素
  this.d = oBox || document

  var children = this.d.getElementsByTagName('*') || document.all

  var elements = new Array()
  for (var ii = 0; ii < children.length; ii++) {
    var child = children[ii]
    var classNames = child.className.split(' ')
    for (var j = 0; j < classNames.length; j++) {
      if (classNames[j] == className) {
        elements.push(child)
        break
      }
    }
  }
  return elements
}

/*
函数：getElementsByClassNamenew
使用方法：
获取document内的超链接class是“info-links”的。
getElementsByClassName(document, "a", "info-links");
获取container内的div的class是col的.
getElementsByClassName(document.getElementById("container"), "div", "col");
获取document内的所有class是“click-me”的。
getElementsByClassName(document, "*", "click-me");
*/
//该函数效率较高
function getElementsByClassNamenew(oElm, strTagName, strClassName) {
  var arrElements = strTagName == '*' && oElm.all ? oElm.all : oElm.getElementsByTagName(strTagName)
  var arrReturnElements = new Array()
  strClassName = strClassName.replace(/-/g, '-')
  var oRegExp = new RegExp('(^|s)' + strClassName + '(s|$)')
  var oElement
  for (var i = 0; i < arrElements.length; i++) {
    oElement = arrElements[i]

    var classNames = oElement.className.split(' ')
    var classNameLength = classNames.length
    for (var j = 0; j < classNameLength; j++) {
      if (oRegExp.test(classNames[j])) {
        arrReturnElements.push(oElement)
        break
      }
    }
    //if(oRegExp.test(oElement.className)){arrReturnElements.push(oElement);}
  }
  return arrReturnElements
}

//删除某元素
function RemoveDragEle(obj) {
  if (obj != null) {
    obj.parentNode.removeChild(obj)
  }
}

/*
document.getElementsByClassName = function(){
	var tTagName ="*";
	if(arguments.length > 1){
		tTagName = arguments[1];
	}
	if(arguments.length > 2){
		var pObj = arguments[2]
	}
	else{
		var pObj = document;
	}
	var objArr = pObj.getElementsByTagName(tTagName);
	var tRObj = new Array();
	for(var i=0; i<objArr.length; i++){
		if(objArr[i].className == arguments[0]){
			tRObj.push(objArr[i]);
		}
	}
	return tRObj;
}
*/

//获取元素的位置:是元素相对于整个页面左上角的坐标：（如果该容器翻滚出页面，则该容器中，翻滚出去的元素坐标为负值）
//用法：距左边距离：pos.x ,距上边距离：pos.y
function getElementPos(el) {
  var ua = navigator.userAgent.toLowerCase()
  var isOpera = ua.indexOf('opera') != -1
  var isIE = ua.indexOf('msie') != -1 && !isOpera // not opera spoof
  //var el=document.getElementById(elementId);
  if (el.parentNode === null || el.style.display == 'none') {
    return false
  }
  var parent = null
  var pos = []
  var box
  if (el.getBoundingClientRect) {
    //IE
    box = el.getBoundingClientRect()
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
    return { x: box.left + scrollLeft, y: box.top + scrollTop }
  } else if (document.getBoxObjectFor) {
    // gecko
    box = document.getBoxObjectFor(el)
    var borderLeft = el.style.borderLeftWidth ? parseInt(el.style.borderLeftWidth) : 0
    var borderTop = el.style.borderTopWidth ? parseInt(el.style.borderTopWidth) : 0
    pos = [box.x - borderLeft, box.y - borderTop]
  } // safari & opera
  else {
    pos = [el.offsetLeft, el.offsetTop]
    parent = el.offsetParent
    if (parent != el) {
      while (parent) {
        pos[0] += parent.offsetLeft
        pos[1] += parent.offsetTop
        parent = parent.offsetParent
      }
    }
    if (
      ua.indexOf('opera') != -1 ||
      (ua.indexOf('safari') != -1 && el.style.position == 'absolute')
    ) {
      pos[0] -= document.body.offsetLeft
      pos[1] -= document.body.offsetTop
    }
  }
  if (el.parentNode) {
    parent = el.parentNode
  } else {
    parent = null
  }
  while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
    // account for any scrolled ancestors
    pos[0] -= parent.scrollLeft
    pos[1] -= parent.scrollTop
    if (parent.parentNode) {
      parent = parent.parentNode
    } else {
      parent = null
    }
  }
  return { x: pos[0], y: pos[1] }
}

//返回元素在整个容器中的坐标（以该容器最左上角为原点:包括该容器翻滚的高度）
//xlt:左上角X坐标
//ylt:左上角Y坐标
//xrb:右下角X坐标
//yrb:右下角Y坐标
//w:元素宽
//h:元素高
function findPosition(ele) {
  var x2 = 0
  var y2 = 0
  var width = ele.offsetWidth
  var height = ele.offsetHeight
  if (typeof ele.offsetParent != 'undefined') {
    for (var posX = 0, posY = 0; ele; ele = ele.offsetParent) {
      posX += ele.offsetLeft
      posY += ele.offsetTop
    }
    x2 = posX + width
    y2 = posY + height
    return { xlt: posX, ylt: posY, xrb: x2, yrb: y2, w: width, h: height }
  } else {
    x2 = ele.x + width
    y2 = ele.y + height
    return { xlt: ele.x, ylt: ele.y, xrb: x2, yrb: y2, w: width, h: height }
  }
}

//IE下获取页面已经翻滚的宽及高
function scrollsize() {
  //alert("document.documentElement.scrollTop="+document.documentElement.scrollTop);
  var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
  var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
  return { l: scrollLeft, t: scrollTop }
}
//IE下获得页面左边距，上边距
function bordersize() {
  var borderleft = Math.max(document.documentElement.clientTop, document.body.clientTop)
  var bordertop = Math.max(document.documentElement.clientLeft, document.body.clientLeft)
  return { l: borderleft, t: bordertop }
}
//得到页面的宽度和高度
function pagesize() {
  var w = Math.max(document.documentElement.clientWidth, document.body.clientWidth)
  var h = Math.max(document.documentElement.clientHeight, document.body.clientHeight)
  return { w: w, h: h }
}

//获取鼠标位置的坐标，注意：浏览器不同，坐标的获取方式也不同
//这个是获得绝对位置坐标：包括翻滚高度
//注意：这里的翻滚是documnet.body的翻滚，而非页面中某个DIV容器的scroll
function mouseCoords(ev) {
  if (ev.pageX || ev.pageY) {
    //alert("ev.pageX="+ev.pageX+" \r\n ev.pageY="+ev.pageY);
    return { x: ev.pageX, y: ev.pageY }
  }
  /*
  var a=document.body.clientWidth;
var b=document.body.clientHeight;
var c=document.body.offsetWidth;
var d=document.body.offsetHeight;
var e=document.body.scrollWidth;
var f=document.body.scrollHeight;
var g=document.body.scrollTop;
var h=document.body.scrollLeft;
var i=window.screenTop;
var j=window.screenLeft;
var k=window.screen.height;
var l=window.screen.width;
var m=window.screen.availHeight;
var n=window.screen.availWidth;
var o=window.screen.colorDepth;
var p=window.screen.deviceXDPI;
alert("a="+a+" \r\n b="+b+" \r\n c="+c+" \r\n d="+d+" \r\n e="+e+" \r\n f="+f+" \r\n g="+g+" \r\n h="+h+" \r\n i="+i+" \r\n j="+j+" \r\n k="+k+" \r\n l="+l+" \r\n m="+m+" \r\n n="+n+" \r\n o="+o+" \r\n p="+p);

  */
  //alert(ev.clientY+" \r\n document.body.scrollTop="+document.body.scrollTop+" \r\n document.body.clientTop="+document.body.clientTop);

  var scrollsize_ = scrollsize()

  var bordersize_ = bordersize()
  var mouseRelativePos_ = mouseRelativePos(ev)
  //alert("scrollsize_.l="+scrollsize_.l+"\r\n scrollsize_.t="+scrollsize_.t);
  return {
    x: mouseRelativePos_.x + scrollsize_.l - bordersize_.l,
    y: mouseRelativePos_.y + scrollsize_.t - bordersize_.t,
  }
}
//IE下获得鼠标当前的相对位置（左上角）坐标：不包括页面翻滚的高度
function mouseRelativePos(e) {
  return { x: e.clientX, y: e.clientY }
}

function getMouseOffset(target, ev) {
  //获取鼠标位置相对于目标位置的距离差
  ev = ev || window.event
  var docPos = getPosition(target)
  var mousePos = mouseCoords(ev)
  return { x: mousePos.x - docPos.x, y: mousePos.y - docPos.y }
}

function getPosition(e) {
  //返回item相对页面左上角的坐标
  var left = 0
  var top = 0
  while (e.offsetParent) {
    left += e.offsetLeft
    top += e.offsetTop
    e = e.offsetParent
  }
  left += e.offsetLeft
  top += e.offsetTop
  return { x: left, y: top }
}

//将时间补成两位
function AlignTime(strTime) {
  if (strTime.toString().length < 2) {
    return '0' + strTime
  }
  return strTime
}

function DateToString(date) {
  return (
    date.getFullYear() +
    '-' +
    AlignTime(date.getMonth() + 1) +
    '-' +
    AlignTime(date.getDate()) +
    ' ' +
    AlignTime(date.getHours()) +
    ':' +
    AlignTime(date.getMinutes()) +
    ':' +
    AlignTime(date.getSeconds())
  )
}

//判断一个区域是否在鼠标选择区内
//mouseDiv:鼠标框区域
//checkDiv:待检查的区域
//在区域内返回1，不在返回0
function innerRegion(mouseDiv, checkDiv) {
  var s_top = parseInt(mouseDiv.offsetTop)
  var s_left = parseInt(mouseDiv.offsetLeft)
  var s_right = s_left + parseInt(mouseDiv.offsetWidth)
  var s_bottom = s_top + parseInt(mouseDiv.offsetHeight)

  var r_top = parseInt(checkDiv.offsetTop)
  var r_left = parseInt(checkDiv.offsetLeft)
  var r_right = r_left + parseInt(checkDiv.offsetWidth)
  var r_bottom = r_top + parseInt(checkDiv.offsetHeight)
  //alert("s_top="+s_top+"\r\n s_left="+s_left+"\r\n s_right="+s_right+"\r\n s_bottom="+s_bottom+"\r\n\r\n r_top="+r_top+"\r\n r_left="+r_left+"\r\n r_right="+r_right+"\r\n r_bottom="+r_bottom);
  var t = Math.max(s_top, r_top)
  var r = Math.min(s_right, r_right)
  var b = Math.min(s_bottom, r_bottom)
  var l = Math.max(s_left, r_left)

  if (b > t && r > l) {
    return 1
  } else {
    return 0
  }
}

/////////////////////////////////////////////////////////////////////////////////////调试用
function getnowtime() {
  var nowtime
  var time = new Date()
  var now = ''
  var hour = time.getHours()
  var mins = time.getMinutes()
  var sec = time.getSeconds()
  var msec = time.getMilliseconds()
  if (hour < 10) {
    hour = '0' + hour
  }
  if (mins < 10) {
    mins = '0' + mins
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  if (msec < 100 && msec >= 10) {
    msec = '0' + msec
  } else if (msec < 10) {
    msec = '00' + msec
  }

  nowtime = hour + ':' + mins + ':' + sec + '::' + msec
  return nowtime
}

/////////////////////////////////////////////////////////////////////////
//将HTML内容写入相应的容器内（其中包含的JS脚本可以执行），兼容多种浏览器

/////////////////////////////////////////////////////////////////////////
//将HTML内容写入相应的容器内（其中包含的JS脚本可以执行），兼容多种浏览器
//此种方法不适用与IE10,因为IE10的 defer属性如果要生效，必须制定script的SRC属性
function setInnerHTML_(el, htmlCode) {
  var ua = navigator.userAgent.toLowerCase()

  if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) {
    //alert("ua="+ua);
    htmlCode = '<div style="display:none">for IE</div>' + htmlCode
    htmlCode = htmlCode.replace(/<script([^>]*)>/gi, '<script$1 defer>')
    el.innerHTML = htmlCode
    el.removeChild(el.firstChild)
  } else {
    //alert("ua="+ua);
    var el_next = el.nextSibling
    var el_parent = el.parentNode
    el_parent.removeChild(el)
    el.innerHTML = htmlCode
    if (el_next) {
      el_parent.insertBefore(el, el_next)
    } else {
      el_parent.appendChild(el)
    }
  }
}
//此方式只适用于IE10
function setInnerHTML__(el, htmlCode) {
  var ua = navigator.userAgent.toLowerCase()

  if (IEVer >= 10 || IsChrome || IsFirefox || IsSafari) {
    el.innerHTML = htmlCode
    //alert("setInnerHTML htmlCode="+htmlCode);
    refreshDiv(el)
  } else {
    var el_next = el.nextSibling
    var el_parent = el.parentNode
    el_parent.removeChild(el)
    el.innerHTML = htmlCode
    if (el_next) {
      el_parent.insertBefore(el, el_next)
    } else {
      el_parent.appendChild(el)
    }
  }
}

function setInnerHTML(el, htmlCode) {
  if (IEVer >= 10 || IsChrome || IsFirefox || IsSafari) {
    setInnerHTML__(el, htmlCode)
  } else {
    setInnerHTML_(el, htmlCode)
  }
}

//将写入DIV中的HTML中的script执行一遍
//JS需要此种特定格式 <!--bs--><SCRIPT LANGUAGE="JAVASCRIPT">function();</SCRIPT><!--es-->
//可以存在多个<!--bs--><SCRIPT LANGUAGE="JAVASCRIPT">function();</SCRIPT><!--es-->
function refreshDiv(div) {
  var html = ''
  //全部大写
  var jsRuler = /(<SCRIPT([^>]*)>)/gi
  var jsHead = ''
  function changediv() {
    var oldwrite = document.write
    var oldwriteln = document.writeln
    document.write = function (str) {
      html += str
    }
    document.writeln = function (str) {
      html += str + 'n'
    }
    var htmlTmp = div.innerHTML
    //在IE10以下版本中，innerHTML读出来的内容中，会把<!--bs--><SCRIPT LANGUAGE="JAVASCRIPT">function();</SCRIPT><!--es-->这部分内容过滤掉
    //从innerHTML中读出来的内容，SCRIPT会自动转为小写
    //alert("refreshDiv htmlTmp="+htmlTmp);
    //ie默认大写,添加为支持firefox,美中不足,会替换所有script值,如果只是ie应用,可注销此行
    htmlTmp = htmlTmp.replace(/script/gi, 'SCRIPT')

    if (jsRuler.test(htmlTmp)) {
      jsHead = RegExp.$1
    }
    //alert("jsHead="+jsHead);

    var pos_1 = 0
    var pos_2 = 0
    //alert(htmlTmp);
    pos_1 = htmlTmp.indexOf(jsHead, pos_1)
    //alert("pos_1="+pos_1);
    while (pos_1 != -1) {
      html += htmlTmp.substring(pos_2, pos_1)
      var pos_3 = htmlTmp.indexOf('</SCR' + 'IPT>', pos_1)
      html += htmlTmp.substring(pos_1, pos_3 + '<-SCRIPT>'.length)
      pos_2 = pos_1 + jsHead.length
      //alert("htmlTmp.substring(pos_2,pos_3)="+htmlTmp.substring(pos_2,pos_3));
      eval(htmlTmp.substring(pos_2, pos_3))
      pos_2 = htmlTmp.indexOf('<!--es-->', pos_3)
      pos_1 = htmlTmp.indexOf(jsHead, pos_1 + 1)
    }
    html += htmlTmp.substring(pos_2, htmlTmp.length)
    document.write = oldwrite
    document.writeln = oldwriteln
  }
  eval('changediv();')
  //alert("html="+html);
  //div.innerHTML = html;
}

//判断DOM中，a元素是否包含b元素，包含返回true,不包含返回false
function DomContains(a, b) {
  return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(arg) & 16)
}

//函数获取自身的函数名，函数必须是function funname(){}方式定义的
Function.prototype.getSelfName = function () {
  return typeof this.name === 'string'
    ? this.name
    : /function\s+([^\{\(\s]+)/.test(this.toString())
    ? RegExp['$1']
    : '[Unknown]'
}

//屏蔽IE右键菜单
function OnConTextMenu() {
  event.cancelBubble = true
  event.returnValue = false

  //window.event.returnValue=false;
  return false
}

function Event(e) {
  if (!e) e = window.event
  return e
}

//email验证
function isEmail(strEmail) {
  if (
    strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1
  ) {
    return true
  } else {
    return false
  }
}

function CheckChinaMobileID(mobile) {
  if (mobile == '') {
    alert('请填写手机号码！')
    return false
  }
  if (isNaN(mobile) || mobile.length != 11) {
    alert('手机号码为11位数字！请正确填写！')
    return false
  }
  var reg = /^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/
  if (!reg.test(mobile)) {
    alert('您的手机号码不是移动号码，请重新输入')
    return false
  }

  return true
}
//手机验证
function CheckIsMobile(mobile) {
  if (isNaN(mobile) || mobile.length != 11) {
    return false
  }
  var reg = /^0{0,1}(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$/
  if (!reg.test(mobile)) {
    return false
  }
  return true
}

//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
function isTel(tel) {
  //国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
  var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  //var pattern =/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
  if (!pattern.exec(tel)) {
    return false
  }
  return true
}

//校验日期
function isdate(object) {
  var s = document.getElementById(object.id).value
  var pattern =
    /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
  if (s != '') {
    if (!pattern.exec(s)) {
      alert('请输入正确的日期')
      object.value = ''
      object.focus()
    }
  }
}

/*
 检查是否为网址 
@return {Boolean} true：是网址，false:<b>不是</b>网址;
这个太严格 
*/
function isURL_(str_url) {
  var strRegex =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  var re = new RegExp(strRegex)
  return re.test(str_url)
}

function isURL__(url) {
  var strRegex =
    '^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z].com|net|cn|cc (:s[0-9]{1-4})?/$'
  var re = new RegExp(strRegex)
  if (re.test(url)) {
    return true
  } else {
    return false
  }
}

function isURL___(url) {
  var c = url.match(/http:\/\/.+/)
  if (c == null) {
    return false
  } else {
    return true
  }
}

function isURL(url) {
  var c1 = isURL_(url)
  var c2 = isURL__(url)
  var c3 = isURL___(url)

  if (c1 == true || c2 == true || c3 == true) {
    return true
  } else {
    return false
  }
}

//校验(国内)邮政编码
function isPostalCode(postcode) {
  var pattern = /^[0-9]{6}$/
  if (!pattern.exec(postcode)) {
    return false
  }
  return true
}

function IsNum(s) {
  if (s != null && s != '') {
    return !isNaN(s)
  }
  return false
}

function IsDate(DateString, Dilimeter) {
  if (DateString == null) {
    return false
  }
  if (Dilimeter == ' ' || Dilimeter == null) {
    Dilimeter = '- '
  }
  var tempy = ' '
  var tempm = ' '
  var tempd = ' '
  var tempArray
  if (DateString.length < 8 || DateString.length > 10) {
    return false
  }

  tempArray = DateString.split(Dilimeter)
  if (tempArray.length != 3) {
    return false
  }

  if (tempArray[0].length != 4) {
    return false
  } else {
    tempy = tempArray[0]
    tempm = tempArray[1]
    tempd = tempArray[2]
  }

  if (isNaN(tempy)) {
    return false
  }
  if (isNaN(tempm)) {
    return false
  }
  if (isNaN(tempd)) {
    return false
  }

  var tDateString = tempy + '/ ' + tempm + '/ ' + tempd
  var tempDate = new Date(tDateString)
  if (tempDate.getFullYear() != tempy) {
    return false
  }
  if (tempDate.getMonth() != tempm - 1) {
    return false
  }
  if (tempDate.getDate() != tempd) {
    return false
  }
  return true
}

/**
 *
 * URL encode / decode
 *
 **/

var Url = {
  // public method for url encoding
  encode: function (string) {
    return escape(this._utf8_encode(string))
  },

  // public method for url decoding
  decode: function (string) {
    return this._utf8_decode(unescape(string))
  },

  // private method for UTF-8 encoding
  _utf8_encode: function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)

      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }

    return utftext
  },

  // private method for UTF-8 decoding
  _utf8_decode: function (utftext) {
    var string = ''
    var i = 0
    var c = (c1 = c2 = 0)

    while (i < utftext.length) {
      c = utftext.charCodeAt(i)

      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }

    return string
  },
}

/**
 * 这段是读取Cookie
 */

function GetCookie_(sName) {
  var mycookie = document.cookie.split('; ')
  for (var i = 0; i < mycookie.length; i++) {
    var cookie1 = mycookie[i].split('=')
    if (cookie1[0] == sName) {
      return Url.decode(cookie1[1])
    }
  }
  return '0'
}

function HtmlEncode(s) {
  var s1

  s1 = s.replace(new RegExp('&', 'g'), '&amp;')
  s1 = s1.replace(new RegExp('<', 'g'), '&lt;')
  s1 = s1.replace(new RegExp('>', 'g'), '&gt;')

  return s1
}

//获得radio的值
function getRadioBoxValue(radioName) {
  var obj = document.getElementsByName(radioName)
  //这个是以标签的name来取控件
  for (i = 0; i < obj.length; i++) {
    if (obj[i].checked) {
      return obj[i].value
    }
  }
  return '99'
}

//获得select的值
function getselectValue(a) {
  var obj = $_(a)
  for (i = 0; i < obj.length; i++) {
    if (obj[i].selected) {
      return obj.options[i].value
    }
  }
  return '0'
}

///////////////////////////////////////////////////////////////////////menumanage.php  commoditymanage.php
//选中所有select
function selectallch(selectobjstr) {
  //var a=document.mainform.selectall;
  var a = $_('selectall')
  //var b=document.mainform.menus;
  var b = document.getElementsByName(selectobjstr)
  if (a.value == 'allselect') {
    for (var i = 0; i < b.length; i++) {
      b[i].checked = true
    }
    a.value = 'noselect'
  } else {
    for (var i = 0; i < b.length; i++) {
      b[i].checked = false
    }
    a.value = 'allselect'
  }
}
//检查select是否有选中的
function checkselect(selectobjstr) {
  //var a=document.mainform.operateidlist;
  var a = $_('operateidlist')
  //var b=document.mainform.menus;
  var b = document.getElementsByName(selectobjstr)
  a.value = ''
  for (var i = 0; i < b.length; i++) {
    if (b(i).checked) {
      a.value = b(i).value
      for (var j = i + 1; j < b.length; j++) {
        if (b(j).checked) {
          a.value += ' ' + b(j).value
        }
      }
      break
    }
  }
  if (a.value == '') {
    alert('请至少选择一项！')
    return false
  }
  return true
}

function parseUrl(url) {
  if (!url) {
    return null
  }
  //if(typeof url == 'undefined'){url = location.href;}
  var segment = url.match(
    /^(\w+\:\/\/)?([\w\d]+(?:\.[\w]+)*)?(?:\:(\d+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/
  )
  if (!segment[3]) {
    segment[3] = '80'
  }
  var param = {}
  if (segment[5]) {
    var pse = segment[5].match(/([^=&]+)=([^&]+)/g)
    if (pse) {
      for (var i = 0; i < pse.length; i++) {
        param[pse[i].split('=')[0]] = pse[i].split('=')[1]
      }
    }
  }

  return {
    url: segment[0],
    sechme: segment[1],
    host: segment[2],
    port: segment[3],
    path: segment[4],
    queryString: segment[5],
    fregment: segment[6],
    param: param,
  }
}

//检测是否是顶级域名
function isTopDomain(domain) {
  //首先检测域名是否有非法字符组成
  if (domain.match(/^[A-Za-z0-9\-\_\.]+$/) == null) {
    return false
  }

  if (domain.match(/\./g) != null) {
    var n = domain.match(/\./g).length
    if (n > 3 || n <= 0) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

//得到顶级域名，不含www.
function get_top_domain(host_) {
  var host_ = host_.toLowerCase()
  if (host_.indexOf('/') != -1) {
    var host_s = parseUrl(host_)
    if (host_s != null) {
      host_ = host_s.host
    } else {
      alert('URL错误！')
      return false
    }
  }
  var topleveldomaindb = new Array(
    'com',
    'edu',
    'gov',
    'int',
    'mil',
    'net',
    'org',
    'biz',
    'info',
    'pro',
    'name',
    'museum',
    'coop',
    'aero',
    'xxx',
    'idv',
    'mobi',
    'cc',
    'me'
  )
  var str = ''
  for (var i = 0; i < topleveldomaindb.length; i++) {
    str += (str ? '|' : '') + topleveldomaindb[i]
  }

  var matchstr = eval('/[^\\.]+\\.(?:(' + str + ')|\\w{2}|((' + str + ')\\.\\w{2}))$/ig')
  var regexp = new RegExp(matchstr)
  var matchs = host_.match(regexp)
  if (matchs != null) {
    var domain = matchs[0]
  } else {
    var domain = host_
  }
  return domain
}

function get_domain_url(domain) {
  var domain_temp = domain

  var host = get_top_domain(domain_temp)

  if (domain.indexOf('www.') != -1) {
    var returndomain = 'www.' + host
  } else {
    returndomain = host
  }
  return returndomain
}
//////////////////////////////////////////////////////////////////////////////////////////提示框

function getLeft_(element) {
  var actualLeft = element.offsetLeft
  var current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}

function getTop_(element) {
  var actualTop = element.offsetTop
  var current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

//返回字符串的长度，兼容中文
function getLength(stringIn) {
  var strLength = 0
  for (var i = 0; i < stringIn.length; i++) {
    if (stringIn.charCodeAt(i) > 255) {
      strLength += 2
    } else {
      strLength += 1
    }
  }
  return strLength
}

//产生under-over之间的随机整数
function fRandomBy(under, over) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * under + 1)
    case 2:
      return parseInt(Math.random() * (over - under + 1) + under)
    default:
      return 0
  }
}
//DebugModel为1为调试模式，会在客户端的D盘生成一个jslog.log的日志文件（需要IE的安全设置设置为最低）
//0为正常模式
var DebugModel = 0

var LogFilePath = 'd:\\jslog.log'
function WriteRemoteFile_(content) {
  var TimeNow = getnowtime()
  content = '[' + TimeNow + ']  ' + content
  //alert("content="+content+" \r\n filepath="+filepath);
  var fs, f
  fs = new ActiveXObject('Scripting.FileSystemObject')
  //不重写已经存在的文件
  /*
	ForReading    1    只读的形式打开文件
	ForWriting    2    可以写入打开的文件，重新写入，不会接着写
	ForAppending    8    在文件的末尾接着写入
	*/
  var OpenModel = 8
  //true表示如果没有该文件，则创建该文件。
  var file = fs.openTextFile(LogFilePath, OpenModel, true)
  file.WriteLine(content)
  file.Close()
}
//查看一个对象的属性及方法
function disobjcontent(obj) {
  for (var i in obj) {
    //if(typeof(obj[i])=="object")
    WriteRemoteFile_(i + ':' + obj[i], LogFilePath)
  }
}

if (!window.createPopup) {
  var __createPopup = function () {
    var SetElementStyles = function (element, styleDict) {
      var style = element.style
      for (var styleName in styleDict) style[styleName] = styleDict[styleName]
    }
    var eDiv = document.createElement('div')
    SetElementStyles(eDiv, {
      position: 'absolute',
      top: 0 + 'px',
      left: 0 + 'px',
      width: 0 + 'px',
      height: 0 + 'px',
      zIndex: 1000,
      display: 'none',
      overflow: 'hidden',
    })
    eDiv.body = eDiv
    var opened = false
    var setOpened = function (b) {
      opened = b
    }
    var getOpened = function () {
      return opened
    }
    var getCoordinates = function (oElement) {
      var coordinates = { x: 0, y: 0 }
      while (oElement) {
        coordinates.x += oElement.offsetLeft
        coordinates.y += oElement.offsetTop
        oElement = oElement.offsetParent
      }
      return coordinates
    }
    return {
      htmlTxt: '',
      document: eDiv,
      isOpen: getOpened(),
      isShow: false,
      hide: function () {
        SetElementStyles(eDiv, {
          top: 0 + 'px',
          left: 0 + 'px',
          width: 0 + 'px',
          height: 0 + 'px',
          display: 'none',
        })
        eDiv.innerHTML = ''
        this.isShow = false
      },
      show: function (iX, iY, iWidth, iHeight, oElement) {
        if (!getOpened()) {
          document.body.appendChild(eDiv)
          setOpened(true)
        }
        this.htmlTxt = eDiv.innerHTML
        if (this.isShow) {
          this.hide()
        }
        eDiv.innerHTML = this.htmlTxt
        var coordinates = getCoordinates(oElement)
        eDiv.style.top = iX + coordinates.x + 'px'
        eDiv.style.left = iY + coordinates.y + 'px'
        eDiv.style.width = iWidth + 'px'
        eDiv.style.height = iHeight + 'px'
        eDiv.style.display = 'block'
        this.isShow = true
      },
    }
  }
  window.createPopup = function () {
    return __createPopup()
  }
}

//产生under与over之间的随机整数
function fRandomBy(under, over) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * under + 1)
    case 2:
      return parseInt(Math.random() * (over - under + 1) + under)
    default:
      return 0
  }
}

var EventUtil = new Object()
EventUtil.addEventHandler = function (oTarget, sEventType, fnHandler) {
  if (oTarget.addEventListener) {
    oTarget.addEventListener(sEventType, fnHandler, false)
  } else if (oTarget.attachEvent) {
    oTarget.attachEvent('on' + sEventType, fnHandler)
  } else {
    oTarget['on' + sEventType] = fnHandler
  }
}

function GetDayTimeNow() {
  var now = new Date()
  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var strDay = now.getDate()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  if (hours < 10) {
    hours = '0' + hours
  } //时
  if (minutes < 10) {
    minutes = '0' + minutes
  } //分
  if (seconds < 10) {
    seconds = '0' + seconds
  } //秒
  var TimeNow =
    strYear + '-' + strMonth + '-' + strDay + ' ' + hours + ':' + minutes + ':' + seconds
  return TimeNow
}

function disTimeNowToObj(TimeObj) {
  var now = new Date()
  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var strDay = now.getDate()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  if (hours < 10) {
    hours = '0' + hours
  } //时
  if (minutes < 10) {
    minutes = '0' + minutes
  } //分
  if (seconds < 10) {
    seconds = '0' + seconds
  } //秒
  var TimeNow =
    strYear + '-' + strMonth + '-' + strDay + ' ' + hours + ':' + minutes + ':' + seconds
  TimeObj.value = TimeNow
}

function disDateBeginAndEnd() {
  var now = new Date()

  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var strDay = now.getDate()

  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()

  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  if (hours < 10) {
    hours = '0' + hours
  } //时
  if (minutes < 10) {
    minutes = '0' + minutes
  } //分
  if (seconds < 10) {
    seconds = '0' + seconds
  } //秒

  //在begintime里显示当前日期前 几天 的时间
  var LastDayNum = 7

  //alert("Time="+ strTime + "\r\nYear="+strYear +", Mouth="+strMonth + ", Day=" +strDay);
  if (parseInt(strDay) <= LastDayNum) {
    //每个月的前几天
    var lastYear = strYear
    var lastMonth = strMonth - 1 //上个月是几月份
    if (strMonth == 1) {
      lastYear = strYear - 1
      lastMonth = 12
    }

    var lastDay = 31
    if (lastMonth == 4 || lastMonth == 6 || lastMonth == 9 || lastMonth == 11) {
      lastDay = 30 - (LastDayNum - parseInt(strDay))
    } else if (lastMonth == 2) {
      if (strYear % 4 == 0) {
        lastDay = 29 - LastDayNum
      } else {
        lastDay = 28 - LastDayNum
      }
    } else {
      lastDay = 31 - (LastDayNum - parseInt(strDay))
    }

    if (lastMonth < 10) {
      lastMonth = '0' + lastMonth
    }
    if (lastDay < 10) {
      lastDay = '0' + lastDay
    }

    var beginTime =
      lastYear + '-' + lastMonth + '-' + lastDay + ' ' + hours + ':' + minutes + ':' + seconds
    //alert(beginTime);
    $_('BeginTime').value = beginTime
  } else {
    var mm = strDay - LastDayNum
    //alert("mm="+mm);
    if (mm < 10) {
      mm = '0' + Math.abs(mm)
    }
    var beginTime =
      strYear + '-' + strMonth + '-' + mm + ' ' + hours + ':' + minutes + ':' + seconds
    $_('BeginTime').value = beginTime
  }
  var endTime =
    strYear + '-' + strMonth + '-' + strDay + ' ' + hours + ':' + minutes + ':' + seconds

  if ($_('EndTime') !== null) {
    $_('EndTime').value = endTime
  }
}

function disDateNow() {
  var now = new Date()

  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var strDay = now.getDate()

  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()

  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  if (hours < 10) {
    hours = '0' + hours
  } //时
  if (minutes < 10) {
    minutes = '0' + minutes
  } //分
  if (seconds < 10) {
    seconds = '0' + seconds
  } //秒

  var BeginTime =
    strYear + '-' + strMonth + '-' + strDay + ' ' + hours + ':' + minutes + ':' + seconds
  $_('BeginTime').value = BeginTime
}

//显示当前日期的前后 几 天
function disBeginEndTimeOneWeek() {
  var now = new Date()

  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var strDay = now.getDate()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()

  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }

  var TimeNowStr = strYear + '-' + strMonth + '-' + strDay + ' ' + '00:00:00'
  var UnixTimeNow = strtotimestamp(TimeNowStr)
  //前三天
  var PreTimeUnix = parseInt(UnixTimeNow) - 3 * 24 * 60 * 60
  //后五天
  var NextTimeUnix = parseInt(UnixTimeNow) + 5 * 24 * 60 * 60 - 1

  $_('BeginTime').value = UnixTimeToStr(PreTimeUnix)
  $_('EndTime').value = UnixTimeToStr(NextTimeUnix)
}

function disBeginEndTimeByMonth() {
  var now = new Date()

  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var strDay = now.getDate()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()

  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }

  var PreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  var PrestrYear = PreviousMonth.getFullYear()
  var PrestrMonth = PreviousMonth.getMonth() + 1
  var PrestrDay = PreviousMonth.getDate()
  var Prehours = PreviousMonth.getHours()
  var Preminutes = PreviousMonth.getMinutes()
  var Preseconds = PreviousMonth.getSeconds()

  if (PrestrMonth < 10) {
    PrestrMonth = '0' + PrestrMonth
  }
  if (PrestrDay < 10) {
    PrestrDay = '0' + PrestrDay
  }

  var TimeNowStr = strYear + '-' + strMonth + '-' + strDay + ' ' + '23:59:59'
  var PreMonthStr = PrestrYear + '-' + PrestrMonth + '-' + PrestrDay + ' ' + '00:00:00'

  $_('BeginTime').value = PreMonthStr
  $_('EndTime').value = TimeNowStr
}

function GetFirstDayByYearMonth(strYear, strMonth) {
  var firstdate = strYear + '-' + strMonth + '-01' + ' 00:00:00'
  return firstdate
}
function GetLastDayByYearMonth(strYear, strMonth) {
  var day = new Date(strYear, strMonth, 0)
  var lastdate = strYear + '-' + strMonth + '-' + day.getDate() + ' 23:59:59' //获取当月最后一天日期
  return lastdate
}

function getFirstDayThisMonth() {
  var now = new Date()
  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var firstdate = strYear + '-' + strMonth + '-01' + ' 00:00:00'
  return firstdate
}

function getLastDayThisMonth() {
  var now = new Date()
  var strYear = now.getFullYear()
  var strMonth = now.getMonth() + 1
  var day = new Date(strYear, strMonth, 0)
  var lastdate = strYear + '-' + strMonth + '-' + day.getDate() + ' 23:59:59' //获取当月最后一天日期
  return lastdate
}

//取得2000-12-12 12：12：12中前半部分
function GetDateFromTimeStr(TimeStr) {
  var strs = TimeStr.split(' ')
  return strs[0]
}

//将12:10:30类型的时间值中的10：30，转换为数字值 10.5
function MinuteTimeToNum(t) {
  var ts = t.split(':')
  var f = parseFloat(parseFloat(ts[2]) / 60)
  //alert("t="+t+"\r\n ts[1]="+ts[1]+"\r\n ts1="+parseInt(Number(ts[1])));
  //此处ts[1]不加Number先转换为数字，会出现parseInt转换结果错误
  var r = parseFloat(parseInt(Number(ts[1])) + f)
  //保留两位数字
  r = r.toFixed(2)
  //alert("r="+r);
  return r
}
//将数字如：10.5转换为时间：10：30
function NumToMinuteTime(n) {
  var ns = n.toString().split('.')
  var fs = parseInt(parseFloat('0.' + ns[1]) * 60)
  var r = AlignTime(ns[0]) + ':' + AlignTime(fs)
  return r
}

//将12:10:30类型的时间值，转换为数字值 12.175
function HourTimeToNum(t) {
  var ts = t.split(':')
  var f = parseFloat((parseFloat(ts[1]) + parseFloat(ts[2]) / 60) / 60)
  var r = parseFloat(parseInt(Number(ts[0])) + f)
  //保留三位数字
  r = r.toFixed(3)
  //alert(r);
  return r
}
//将数字如：12.175转换为时间：12：10：30
function NumToHourTime(n) {
  var ns = n.toString().split('.')
  var fs = (parseFloat('0.' + ns[1]) * 60).toString().split('.')
  //var ms=(parseFloat("0."+fs[1])*60).toString().split(".");
  var m = (parseFloat('0.' + fs[1]) * 60).toFixed(0)

  var r = AlignTime(ns[0]) + ':' + AlignTime(fs[0]) + ':' + AlignTime(m)
  //var r=ns[0]+":"+fs[0]+":"+ms[0];
  //alert(r);
  return r
}

//将字符串型(2001-01-01 01:01:01)的时间，转换为DALI的时间戳（相对与2000-01-01 00:00:00）
function strtoDALItimestamp(datestr) {
  var UnixTime = strtotimestamp(datestr)
  var DaliUnixBeginTime = strtotimestamp('2000-01-01 00:00:00')
  var DaliUnixTime = parseInt(UnixTime) - parseInt(DaliUnixBeginTime)
  return DaliUnixTime
}

//字符串转换为unix时间戳
//字符串格式：2001-01-01 01:00:01
function strtotimestamp(datestr) {
  var new_str = datestr.replace(/:/g, '-')
  new_str = new_str.replace(/ /g, '-')
  var arr = new_str.split('-')
  var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]))
  return datum.getTime() / 1000 //为PHP所用
}
//UNIX时间戳转换为字符串,得到如：2001-01-01 01：00：01
//这个函数转换出来的字符串，进行split分割解析后，得到的年月日等信息，无法使用，不知道为什么
function timestamptostr(timestamp) {
  /*
	d = new Date(timestamp.getTime());
	var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+(d.getDate())+" "+(d.getHours())+":"+(d.getMinutes())+":"+(d.getSeconds());
	return jstimestamp;
	*/
  var unixTimeday = new Date(timestamp * 1000)
  var Datestr = unixTimeday.toLocaleString()
  Datestr = Datestr.replace(/\年|\月/g, '-')
  Datestr = Datestr.replace(/\日/g, '')
  return Datestr
}

function UnixTimeToStr(timestamp) {
  var d = new Date(timestamp * 1000) //根据时间戳生成的时间对象
  var monthstr = d.getMonth() + 1
  monthstr = monthstr < 10 ? '0' + monthstr : monthstr

  var dateStr = d.getDate()
  dateStr = dateStr < 10 ? '0' + dateStr : dateStr

  var HourStr = d.getHours()
  HourStr = HourStr < 10 ? '0' + HourStr : HourStr

  var MinutesStr = d.getMinutes()
  MinutesStr = MinutesStr < 10 ? '0' + MinutesStr : MinutesStr

  var SecondStr = d.getSeconds()
  SecondStr = SecondStr < 10 ? '0' + SecondStr : SecondStr
  var date =
    d.getFullYear() +
    '-' +
    monthstr +
    '-' +
    dateStr +
    ' ' +
    HourStr +
    ':' +
    MinutesStr +
    ':' +
    SecondStr
  return date
}

//获取2001-01-01格式的时间对应的星期
function TimeStrToWeek(datestr) {
  var new_str = datestr.replace(/:/g, '-')
  new_str = new_str.replace(/ /g, '-')
  var arr = new_str.split('-')
  var datum = new Date(arr[0], arr[1], arr[2])
  var week = datum.getDay() //0-6之间
  return week
}

//把一个时间对象，格式化输出为2012-10-11
function formatDate(date) {
  var Year = date.getFullYear()
  var mymonth = date.getMonth() + 1
  var myweekday = date.getDate()
  return Year + '-' + mymonth + '-' + myweekday
}

//把一个时间对象，格式化输出为10:00:00
function UnixTimeToHourMinSecStr(timestamp) {
  var d = new Date(timestamp * 1000) //根据时间戳生成的时间对象
  var date = add0(d.getHours()) + ':' + add0(d.getMinutes()) + ':' + add0(d.getSeconds())
  return date
}

function add0(m) {
  return m < 10 ? '0' + m : m
}

//两点之间的距离
function PointToPointLength(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(x2 - x1, 2))
}

//x2,y2绕x1,y1转angle后的新坐标
function getNewXY(x1, y1, x2, y2, angle) {
  var retX = (x2 - x1) * Math.cos(angle) - (y2 - y1) * Math.sin(angle) + x1
  var retY = (x2 - x1) * Math.sin(angle) + (y2 - y1) * Math.cos(angle) + y1
  return { x: retX, y: retY }
}

function formatSeconds(value) {
  var theTime = parseInt(value) // 秒
  var theTime1 = 0 // 分
  var theTime2 = 0 // 小时
  // alert(theTime);
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    // alert(theTime1+"-"+theTime);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  var result = '' + parseInt(theTime) + '秒'
  if (theTime1 > 0) {
    result = '' + parseInt(theTime1) + '分' + result
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2) + '小时' + result
  }
  return result
}

//预先载入图片
function MM_preloadImages() {
  var d = document
  if (d.images) {
    if (!d.MM_p) d.MM_p = new Array()
    var i,
      j = d.MM_p.length,
      a = MM_preloadImages.arguments
    for (i = 0; i < a.length; i++)
      if (a[i].indexOf('#') != 0) {
        d.MM_p[j] = new Image()
        d.MM_p[j++].src = a[i]
      }
  }
}

function mask_c(obj) {
  clipboardData.setData('text', clipboardData.getData('text').replace(/[^\d]/g, ''))
}

function mask_num(obj) {
  if ((event.keyCode == 37) | (event.keyCode == 39)) {
    return
  }
  //先把非数字的都替换掉，除了数字和.
  obj.value = obj.value.replace(/[^\d]/g, '')
  //必须保证第一个为数字而不是.
  //  obj.value = obj.value.replace(/^\./g,"");
}
function mask_ip(obj) {
  if ((event.keyCode == 37) | (event.keyCode == 39)) {
    return
  }
  //先把非数字的都替换掉，除了数字和.
  obj.value = obj.value.replace(/[^\d.]/g, '')
  //必须保证第一个为数字而不是.
  obj.value = obj.value.replace(/^\./g, '')
}

function mask(obj) {
  if ((event.keyCode == 37) | (event.keyCode == 39)) {
    return
  }
  //先把非数字的都替换掉，除了数字和.
  obj.value = obj.value.replace(/[^\d]/g, '')
  /*
if(event.keyCode == 9)	//Tab键
	return;

obj.value=obj.value.replace(/[^\d]/g,'')
key1=event.keyCode;
var str = obj.name.substr(1,8);

//alert(key1);
if (key1==37 || key1==39 )
{
obj.blur();
nextip=parseInt(obj.name.substr(8,1))
nextip=key1==37?nextip-1:nextip+1;
nextip=nextip>=5?1:nextip
nextip=nextip<=0?4:nextip
//eval("ip"+nextip+".focus()")
eval($_(str+nextip).focus());
}
if(obj.value.length>=3)
if(parseInt(obj.value)>=256 || parseInt(obj.value)<=0)
{
alert(parseInt(obj.value)+"IP地址错误！")
obj.value=""
obj.focus()
return false;
}
else
{
obj.blur();
nextip=parseInt(obj.name.substr(2,1))+1
nextip=nextip>=5?1:nextip
nextip=nextip<=0?4:nextip
eval($_(str+nextip).focus());
}*/
}

function isEmailSimple(email) {
  var regm = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  //验证Mail的正则表达式,^[a-zA-Z0-9_-]:开头必须为字母,下划线,数字,
  if (email == '') {
    return false
  }
  //if (strEmail.search(regm))
  if (email.match(regm) && email != '') {
    return true
  } else {
    return false
  }
}

function isEmail(txtID) {
  var strEmail = $_(txtID).value
  var regm = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  //验证Mail的正则表达式,^[a-zA-Z0-9_-]:开头必须为字母,下划线,数字,
  if (strEmail == '') return true
  //if (strEmail.search(regm))
  if (strEmail.match(regm) && strEmail != '') return true
  else {
    alert('邮箱格式不正确，请检查后重新输入')
    $_(txtID).focus()
    return false
  }
}

function CheckMACAddr(txtID) {
  //为了限制用户修改MAC地址的前3个字节，页面上把MAC地址输入框分成了两部分
  var str = $_(txtID).value
  str = str.replace(/-/g, ':')
  var regm = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-f]{2}$/
  //验证MAC地址的正则表达式,^[a-zA-Z0-9_-]:开头必须为字母,下划线,数字,
  if (str.match(regm) && str != '') return true
  else {
    alert('MAC地址输入有误，请检查后重新输入')
    $_(txtID).focus()
    return false
  }
  return true
}

function CheckMAC(MacStr) {
  var regm = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-f]{2}$/
  //验证MAC地址的正则表达式,^[a-zA-Z0-9_-]:开头必须为字母,下划线,数字,
  if (MacStr.match(regm) && MacStr != '') {
    return true
  } else {
    return false
  }
  return true
}

function CheckIP(txtID) {
  var str = $_(txtID).value
  if (str == '') {
    return true
  }
  var pattern =
    /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
  if (!str.match(pattern)) {
    alert('IP地址输入有误，请检查后重新输入')
    $_(txtID).focus()
    return false
  }
  return true
}

function CheckIP_(ip) {
  if (ip == '') {
    return false
  }
  var pattern =
    /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
  if (!ip.match(pattern)) {
    //alert("IP地址输入有误，请检查后重新输入");
    return false
  }
  return true
}

//限定为字母数字_
function IsLegal(s) {
  s = s.toString()
  if (s === '') {
    return false
  }
  var CheckLegal = /[^0-9a-zA-Z_]/
  if (s.match(CheckLegal)) {
    return false
  }
  return true
}

function IsNum(s) {
  s = s.toString()
  //alert("s="+s);
  if (s === '') {
    //alert("字符");
    return false
  }
  var CheckNum = /[^0-9]/
  if (s.match(CheckNum)) {
    //alert("字符");
    return false
  }
  //alert("数字");
  return true

  /*
    if (s!=null && s!="")
    {
        return !isNaN(s);
    }
    return false;
    */
}

//检查是否存在非法字符
function check_nick(str) {
  var CheckData = /<|>|'|;|&|"|'/
  if (CheckData.test(str)) {
    return false
  }
  return true
}

/*
 检查是否为网址 
@return {Boolean} true：是网址，false:<b>不是</b>网址;
这个太严格 
*/
function isURL_(str_url) {
  var strRegex =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  var re = new RegExp(strRegex)
  return re.test(str_url)
}

function isURL__(url) {
  var strRegex =
    '^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z].com|net|cn|cc (:s[0-9]{1-4})?/$'
  var re = new RegExp(strRegex)
  if (re.test(url)) {
    return true
  } else {
    return false
  }
}

function isURL___(url) {
  var c = url.match(/http:\/\/.+/)
  if (c == null) {
    return false
  } else {
    return true
  }
}

function isURL(url) {
  var c1 = isURL_(url)
  var c2 = isURL__(url)
  var c3 = isURL___(url)

  if (c1 == true || c2 == true || c3 == true) {
    return true
  } else {
    return false
  }
}

// JavaScript Document

function getCookieValue(Attribute) {
  var cookies = unescape(document.cookie)
  var cookieIndex = cookies.indexOf(Attribute + '=')
  if (cookieIndex != -1) {
    var cookieValueStart = cookieIndex + Attribute.length + 1
    var cookieValueEnd = cookies.indexOf(';', cookieValueStart)
    if (cookieValueEnd == -1) {
      cookieValueEnd = cookies.length
    }
    var cookieValue = cookies.substring(cookieValueStart, cookieValueEnd)
    return cookieValue
  }
}
//禁用本页表单元素
function disableds() {
  for (var i = 0; i < document.forms.length; i++) {
    for (var e = 0; e < document.forms[i].elements.length; e++) {
      var m = document.forms[i].elements[e]
      m.disabled = true
    }
  }
}

//获得字符串的实际长度
function GetStrLength(str) {
  ///<summary>获得字符串实际长度，中文2，英文1</summary>
  ///<param name="str">要获得长度的字符串</param>
  var realLength = 0,
    len = str.length,
    charCode = -1
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
  }
  return realLength
}

function getPath(obj) {
  if (obj) {
    if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
      obj.select()
      return document.selection.createRange().text
    } else if (window.navigator.userAgent.indexOf('Firefox') >= 1) {
      if (obj.files) {
        return obj.files.item(0).getAsDataURL()
      }
      return obj.value
    }
    return obj.value
  }
}

///////////////////////////////////////////////////获取客户端硬件信息
function getSysInfo() {
  var locator = new ActiveXObject('WbemScripting.SWbemLocator')
  var service = locator.ConnectServer('.')
  //CPU信息
  var cpu = new Enumerator(service.ExecQuery('SELECT * FROM Win32_Processor')).item()
  var cpuType = cpu.Name,
    hostName = cpu.SystemName
  //内存信息
  var memory = new Enumerator(service.ExecQuery('SELECT * FROM Win32_PhysicalMemory'))
  for (var mem = [], i = 0; !memory.atEnd(); memory.moveNext())
    mem[i++] = { cap: memory.item().Capacity / 1024 / 1024, speed: memory.item().Speed }
  //系统信息
  var system = new Enumerator(service.ExecQuery('SELECT * FROM Win32_ComputerSystem')).item()
  var physicMenCap = Math.ceil(system.TotalPhysicalMemory / 1024 / 1024),
    curUser = system.UserName,
    cpuCount = system.NumberOfProcessors

  return {
    cpuType: cpuType,
    cpuCount: cpuCount,
    hostName: hostName,
    curUser: curUser,
    memCap: physicMenCap,
    mem: mem,
  }
}

function button1_onclick() {
  //cpu 信息
  var locator = new ActiveXObject('WbemScripting.SWbemLocator')
  var service = locator.ConnectServer('.')
  var properties = service.ExecQuery('SELECT * FROM Win32_Processor')
  var e = new Enumerator(properties)
  document.write('<table border=1>')
  for (; !e.atEnd(); e.moveNext()) {
    var p = e.item()
    document.write('<tr>')
    document.write('<td>' + p.Caption + '</td>')
    document.write('<td>' + p.DeviceID + '</td>')
    document.write('<td>' + p.Name + '</td>')
    document.write('<td>' + p.CpuStatus + '</td>')
    document.write('<td>' + p.Availability + '</td>')
    document.write('<td>' + p.Level + '</td>')
    document.write('<td>' + p.ProcessorID + '</td>')
    document.write('<td>' + p.SystemName + '</td>')
    document.write('<td>' + p.ProcessorType + '</td>')
    document.write('</tr>')
  }
  document.write('</table>')
}

//主控服务器目前存储在数据库中的图片路径是绝对路径，这里处理一下
function GetPicRoute(filepath) {
  //把饭斜杠先转为正斜杠
  var filenewpath = filepath.replace(/[\\]/g, '/')
  var findstr = 'picture/'
  var n = filenewpath.lastIndexOf(findstr) + findstr.length
  //alert("n="+n);
  var retstr = filepath.substring(n, filepath.length)
  return retstr
}

function GetVideoRoute(filepath) {
  //把饭斜杠先转为正斜杠
  var filenewpath = filepath.replace(/[\\]/g, '/')
  var findstr = 'record/'
  var n = filenewpath.lastIndexOf(findstr) + findstr.length
  //alert("n="+n);
  var retstr = filepath.substring(n, filepath.length)
  return retstr
}

function GetAudioRoute(filepath) {
  //把饭斜杠先转为正斜杠
  var filenewpath = filepath.replace(/[\\]/g, '/')
  var findstr = 'audio/'
  var n = filenewpath.lastIndexOf(findstr) + findstr.length
  //alert("n="+n);
  var retstr = filepath.substring(n, filepath.length)
  return retstr
}

function GetRobotPicDisPath(PicPath, CarID, CarObj) {
  var dispath = GetPicRoute(PicPath)
  var disFilePath = ''
  var m = CarObj.qao(CarID, 'CarID')
  if (m == -1) {
    disFilePath = ''
  }
  var CarIP = CarObj[m].CarIP
  var CarPort = CarObj[m].CarPort
  disFilePath = 'http://' + CarIP + ':' + CarPort + '/picture/' + dispath
  return disFilePath
}

//用于带scroll类型的table的首行的滚动
function ScrollTbHeadChange() {
  var div = $_('divContent')
  //var left = div.scrollLeft;
  var ContentclientHeight = parseInt(div.clientHeight)
  var ContentscrollHeight = parseInt(div.scrollHeight)
  //alert("ContentclientHeight="+ContentclientHeight+" \r\n ContentscrollHeight="+ContentscrollHeight);

  var divHeader = $_('divHeader')

  /*divHeader.scrollLeft = left;
	
	var a=div.children[0].style.width.replace("px","");
	var b=div.style.width.replace("px","");
	
	var disWidth = div.children[0].style.width.replace("px","")-div.style.width.replace("px","");
	alert("left="+left+" \r\n disWidth="+disWidth+" \r\n a="+a+" \r\n b="+b);
	*/

  if (ContentscrollHeight > ContentclientHeight) {
    divHeader.style.overflowY = 'scroll'
  } else {
    divHeader.style.overflowY = 'hidden'
  }
}

function DisAlarmInfo(str) {
  var TimeStr = GetDayTimeNow()
  window.parent.parent.parent.$_('AlarmInfo').innerHTML = TimeStr + ': ' + str
}

function AddSystemAlarmInfo(str) {
  var TimeStr = GetDayTimeNow()
  window.parent.parent.parent.SystemAlarmInfo.push(TimeStr + ': ' + str)
  var l = window.parent.parent.parent.SystemAlarmInfo.length
  if (l > window.parent.parent.parent.SystemAlarmInfoTotalNum) {
    //alert("length1="+window.parent.parent.parent.SystemAlarmInfo.length);
    window.parent.parent.parent.SystemAlarmInfo.shift()

    //alert("length2="+window.parent.parent.parent.SystemAlarmInfo.length);

    //window.parent.parent.parent.SystemAlarmInfo.length=SystemAlarmInfoTotalNum;
  }
}

function getCookieValue(Attribute) {
  var cookies = unescape(document.cookie)
  var cookieIndex = cookies.indexOf(Attribute + '=')
  if (cookieIndex != -1) {
    var cookieValueStart = cookieIndex + Attribute.length + 1
    var cookieValueEnd = cookies.indexOf(';', cookieValueStart)
    if (cookieValueEnd == -1) {
      cookieValueEnd = cookies.length
    }
    var cookieValue = cookies.substring(cookieValueStart, cookieValueEnd)
    return cookieValue
  }
}

//加上时间限制
function setCookie_(name, value) {
  var exp = new Date()
  exp.setTime(exp.getTime() + 3600000000)

  document.cookie = name + '=' + value + '; expires=' + exp.toGMTString() + '; path=/'
  //为了调试方便，此处不仅在本地设置了cookie，也设置了远程主机的cookie
  //否则，如果在本地调试，涉及到跨域的问题，cookie无法发送到远程主机
  //本地调试中，必须将远程主机设置为安全站点
  //alert("ip_address="+ip_address);

  document.cookie =
    name + '=' + value + '; expires=' + exp.toGMTString() + '; path=/;domain=' + ip_address
}
//Language在login.html单独设置
function setCookie(username, pwd, userType, version) {
  //	alert("userType="+userType);
  DelCookie('Name')
  DelCookie('Pass')
  DelCookie('UserType')
  DelCookie('IPCamera')
  DelCookie('DevType')
  //	DelCookie("OEMINFO");
  //alert("username="+username+" \r\n pwd="+pwd+" \r\n userType="+userType+" \r\n version="+version);
  setCookie_('Name', username)
  setCookie_('Pass', pwd)
  setCookie_('UserType', userType)
  setCookie_('IPCamera', version)
  //setCookie_("Language",Language);
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(';', offset)
  if (endstr == -1) {
    endstr = document.cookie.length
  }
  return unescape(document.cookie.substring(offset, endstr))
}
//注意最后必须加上path
function DelCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = GetCookie(name)
  document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString() + '; path=/'
}

function GetCookie(name) {
  var arg = name + '='
  var alen = arg.length
  var clen = document.cookie.length
  var i = 0
  while (i < clen) {
    var j = i + alen
    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal(j)
    }
    i = document.cookie.indexOf(' ', i) + 1
    if (i == 0) break
  }
  return null
}

function addCookie(objName, objValue, objDays) {
  var str = objName + '=' + escape(objValue)
  if (objDays > 0) {
    var date = new Date()
    var ms = objDays * 24 * 3600 * 1000
    date.setTime(date.getTime() + ms)
    str += '; expires=' + date.toGMTString()
  }
  document.cookie = str

  //alert(str);
}

function UrlEncode(str) {
  if (str == '') {
    return ''
  }

  var DevType = getCookieValue('DevType')

  if (DevType == 'JXX') {
    var ret = encodeURIComponent(str)
  } else {
    var ret = URLEncode_GB2312_2(str)
  }

  //
  //var ret=encodeUTF8(str);

  return ret
}

function UrlDecode(str) {
  if (str == '') {
    return ''
  }

  var DevType = getCookieValue('DevType')

  if (DevType == 'JXX') {
    var ret = decodeURIComponent(str)
  } else {
    var ret = URLDecode_GB2312_2(str)
  }

  //

  //var ret=decodeUTF8(str);

  return ret
}

function url_parse(argsUrl) {
  if (argsUrl.indexOf('=') == -1) {
    return null
  }
  //有时在URL中，有回车换行符，在这里先替换一下
  var properties =
    argsUrl.replace(/\r/g, '#r#').replace(/\n/g, '#n#').replace(/&/g, "',").replace(/=/g, ":'") +
    "'"
  var obj = null
  var template = 'obj = {p}'

  eval(template.replace(/p/g, properties))
  return obj
}

function dragon(o, s) {
  if (typeof o == 'string') o = $_(o)
  o.orig_x = parseInt(o.style.left) - document.body.scrollLeft
  o.orig_y = parseInt(o.style.top) - document.body.scrollTop
  o.orig_index = o.style.zIndex

  o.onmousedown = function (a) {
    this.style.cursor = 'move'
    this.style.zIndex = 10000
    var d = document
    if (!a) a = window.event
    var x = a.clientX + d.body.scrollLeft - o.offsetLeft
    var y = a.clientY + d.body.scrollTop - o.offsetTop

    d.ondragstart = 'return false;'
    //d.onselectstart = "return false;"
    //d.onselect = "document.selection.empty();"

    //if(o.setCapture) o.setCapture();
    //else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);

    d.onmousemove = function (a) {
      if (!a) a = window.event
      o.style.left = parseInt(a.clientX + document.body.scrollLeft - x) + 'px'
      o.style.top = parseInt(a.clientY + document.body.scrollTop - y) + 'px'
      o.orig_x = parseInt(o.style.left) - document.body.scrollLeft
      o.orig_y = parseInt(o.style.top) - document.body.scrollTop
    }

    d.onmouseup = function () {
      if (o.releaseCapture) o.releaseCapture()
      else if (window.captureEvents) window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
      d.onmousemove = null
      d.onmouseup = null
      d.ondragstart = null
      //d.onselectstart = null;
      //d.onselect = null;
      o.style.cursor = 'normal'
      o.style.zIndex = o.orig_index
    }
  }

  if (s) {
    var orig_scroll = window.onscroll ? window.onscroll : function () {}
    window.onscroll = function () {
      orig_scroll()
      o.style.left = parseInt(o.orig_x + document.body.scrollLeft) + 'px'
      o.style.top = parseInt(o.orig_y + document.body.scrollTop) + 'px'
    }
  }
}

function NoUseAlert() {
  alert('无此权限！')
}

function PingByHttp(_src, CameraID, callback) {
  var img = new Image()
  img.onload = function () {
    callback.call(this, CameraID, 1)
  }
  img.onerror = function () {
    callback.call(this, CameraID, 0)
  }
  //start = new Date().getTime();
  img.src = _src
  //timer = setTimeout(function() { }, 1500);
}

/*密码复杂要求：
1、长度大于8
2、密码必须是字母大写，字母小写，数字，特殊字符中任意三个组合。
*/

function checkPass(s) {
  if (s.length < 8) {
    return 0
  }
  var ls = 0
  if (s.match(/([a-zA-Z])+/)) {
    ls++
  }
  if (s.match(/([0-9])+/)) {
    ls++
  }
  //	if(s.match(/([A-Z])+/)){ls++;}
  //if(s.match(/[^a-zA-Z0-9]+/)){ls++;}

  if (s.match(/[\~\`\!\@\#\$\%\^\*\(\)\_\-\+\=\|\{\}\[\]\.\?\/]+/)) {
    ls++
  }

  //alert("ls="+ls);
  return ls
}

function getInspectionState(value) {
  var ResultArr = value.split('@')
  var DisResultContent = ''
  for (var j = 0; j < ResultArr.length; j++) {
    if ((ResultTypeArr = ResultArr[j].indexOf('_') === -1)) {
      continue
    }
    var ResultTypeArr = ResultArr[j].split('_')
    if (ResultTypeArr[0] == 1) {
      DisResultContent += '挂空悬浮物 '
    } else if (ResultTypeArr[0] == 2) {
      DisResultContent += '鸟巢 '
    } else if (ResultTypeArr[0] == 3) {
      DisResultContent += '有行人 '
    } else if (ResultTypeArr[0] == 4) {
      DisResultContent += '人脸检测 '
    } else if (ResultTypeArr[0] == 5) {
      if (DisResultContent.indexOf('有烟雾') != -1) continue
      DisResultContent += '有烟雾 '
    } else if (ResultTypeArr[0] == 6) {
      if (DisResultContent == '') {
        DisResultContent += '正常 '
      }
    } else if (ResultTypeArr[0] == 7) {
      DisResultContent += '未戴安全帽 '
    } else if (ResultTypeArr[0] == 8) {
      DisResultContent += '有车辆 '
    } else if (ResultTypeArr[0] == 9) {
      DisResultContent += '有人带口罩 '
    } else if (ResultTypeArr[0] == 10) {
      DisResultContent += '黑体 '
    } else if (ResultTypeArr[0] == 11) {
      DisResultContent += '表盘模糊 '
    } else if (ResultTypeArr[0] == 12) {
      DisResultContent += '表盘破损 '
    } else if (ResultTypeArr[0] == 13) {
      DisResultContent += '外壳破损 '
    } else if (ResultTypeArr[0] == 14) {
      DisResultContent += '绝缘子破裂 '
    } else if (ResultTypeArr[0] == 15) {
      DisResultContent += '地面油污 '
    } else if (ResultTypeArr[0] == 16) {
      DisResultContent += '硅胶筒破损'
    } else if (ResultTypeArr[0] == 17) {
      DisResultContent += '箱门闭合异常'
    }
    //				else if(ResultTypeArr[0]==18){DisResultContent+="挂空悬浮物";}
    //				else if(ResultTypeArr[0]==19){DisResultContent+="鸟巢";}
    else if (ResultTypeArr[0] == 20) {
      DisResultContent += '盖板破损'
    }
    //				else if(ResultTypeArr[0]==21){DisResultContent+="未带安全帽";}
    else if (ResultTypeArr[0] == 22) {
      DisResultContent += '未穿工装'
    } else if (ResultTypeArr[0] == 23) {
      DisResultContent += '吸烟'
    } else if (ResultTypeArr[0] == 24) {
      DisResultContent += '表计读数异常'
    } else if (ResultTypeArr[0] == 25) {
      DisResultContent += '呼吸器油位异常'
    } else if (ResultTypeArr[0] == 26) {
      DisResultContent += '硅胶变色'
    } else if (ResultTypeArr[0] == 27) {
      DisResultContent += '压板合'
    } else if (ResultTypeArr[0] == 28) {
      if (DisResultContent.indexOf('红外火点目标') != -1) continue
      DisResultContent += '红外火点目标'
    } else if (ResultTypeArr[0] == 29) {
      if (DisResultContent.indexOf('有异常') != -1) continue
      DisResultContent += '有异常'
    } else if (ResultTypeArr[0] == 30) {
      DisResultContent += '行为分析 '
    } else if (ResultTypeArr[0] == 31) {
      DisResultContent += '穿越警戒面 '
    } else if (ResultTypeArr[0] == 32) {
      DisResultContent += '目标进入区域 '
    } else if (ResultTypeArr[0] == 33) {
      DisResultContent += '目标离开区域 '
    } else if (ResultTypeArr[0] == 34) {
      DisResultContent += '周界入侵 '
    } else if (ResultTypeArr[0] == 35) {
      DisResultContent += '徘徊 '
    } else if (ResultTypeArr[0] == 36) {
      DisResultContent += '物品遗留拿取 '
    } else if (ResultTypeArr[0] == 37) {
      DisResultContent += '停车 '
    } else if (ResultTypeArr[0] == 38) {
      DisResultContent += '快速移动 '
    } else if (ResultTypeArr[0] == 39) {
      DisResultContent += '区域内人员聚集 '
    } else if (ResultTypeArr[0] == 40) {
      DisResultContent += '剧烈运动 '
    } else if (ResultTypeArr[0] == 41) {
      DisResultContent += '攀高 '
    } else if (ResultTypeArr[0] == 42) {
      DisResultContent += '起身 '
    } else if (ResultTypeArr[0] == 43) {
      DisResultContent += '物品遗留 '
    } else if (ResultTypeArr[0] == 44) {
      DisResultContent += '物品拿取 '
    } else if (ResultTypeArr[0] == 45) {
      DisResultContent += '离岗 '
    } else if (ResultTypeArr[0] == 46) {
      DisResultContent += '尾随'
    } else if (ResultTypeArr[0] == 47) {
      DisResultContent += '重点人员起身'
    } else if (ResultTypeArr[0] == 48) {
      DisResultContent += '起立'
    } else if (ResultTypeArr[0] == 49) {
      DisResultContent += '倒地'
    } else if (ResultTypeArr[0] == 50) {
      DisResultContent += '声强突变'
    } else if (ResultTypeArr[0] == 51) {
      DisResultContent += '折线攀高'
    } else if (ResultTypeArr[0] == 52) {
      DisResultContent += '如厕超时'
    } else if (ResultTypeArr[0] == 53) {
      DisResultContent += '放风场滞留'
    } else if (ResultTypeArr[0] == 54) {
      DisResultContent += '折线警戒面'
    } else if (ResultTypeArr[0] == 55) {
      DisResultContent += '授课（文教）'
    } else if (ResultTypeArr[0] == 56) {
      DisResultContent += '回答问题（文教）'
    } else if (ResultTypeArr[0] == 57) {
      DisResultContent += '人靠近ATM'
    } else if (ResultTypeArr[0] == 58) {
      DisResultContent += '操作超时'
    } else if (ResultTypeArr[0] == 59) {
      DisResultContent += '贴纸条'
    } else if (ResultTypeArr[0] == 60) {
      DisResultContent += '安装读卡器'
    } else if (ResultTypeArr[0] == 61) {
      DisResultContent += '人数变化事件'
    } else if (ResultTypeArr[0] == 62) {
      DisResultContent += '间距变化事件'
    } else if (ResultTypeArr[0] == 63) {
      DisResultContent += '组合规则事件'
    } else if (ResultTypeArr[0] == 64) {
      DisResultContent += '一动不动（静坐）'
    } else if (ResultTypeArr[0] == 65) {
      DisResultContent += '区域内人员聚集'
    } else if (ResultTypeArr[0] == 66) {
      DisResultContent += '奔跑'
    } else if (ResultTypeArr[0] == 67) {
      DisResultContent += '滞留'
    } else if (ResultTypeArr[0] == 68) {
      DisResultContent += '板书'
    } else if (ResultTypeArr[0] == 69) {
      DisResultContent += '态势分析'
    } else if (ResultTypeArr[0] == 70) {
      DisResultContent += '带安全帽'
    } else if (ResultTypeArr[0] == 71) {
      DisResultContent += '未带安全帽'
    } else if (ResultTypeArr[0] == 72) {
      DisResultContent += '移动侦测'
    } else if (ResultTypeArr[0] == 73) {
      DisResultContent += '未正确佩戴安全帽'
    } else if (ResultTypeArr[0] == 74) {
      DisResultContent += '越线闯入'
    } else if (ResultTypeArr[0] == 75) {
      DisResultContent += '未穿长袖工作服'
    } else if (ResultTypeArr[0] == 76) {
      DisResultContent += '场地烟火'
    } else if (ResultTypeArr[0] == 77) {
      DisResultContent += '积水'
    } else if (ResultTypeArr[0] == 78) {
      DisResultContent += '小动物'
    } else if (ResultTypeArr[0] == 79) {
      DisResultContent += '异物入侵'
    } else if (ResultTypeArr[0] == 80) {
      DisResultContent += '设备烟火'
    } else if (ResultTypeArr[0] == 81) {
      DisResultContent += '渗漏油'
    } else if (ResultTypeArr[0] == 82) {
      DisResultContent += '设备变形'
    } else if (ResultTypeArr[0] == 83) {
      DisResultContent += '设备断裂'
    } else if (ResultTypeArr[0] == 84) {
      DisResultContent += '设备倾斜'
    } else if (ResultTypeArr[0] == 85) {
      DisResultContent += '一般刀闸分'
    } else if (ResultTypeArr[0] == 86) {
      DisResultContent += '一般刀闸合'
    } else if (ResultTypeArr[0] == 87) {
      DisResultContent += '分闸异常'
    } else if (ResultTypeArr[0] == 88) {
      DisResultContent += '分闸正常'
    } else if (ResultTypeArr[0] == 89) {
      DisResultContent += '合闸正常'
    } else if (ResultTypeArr[0] == 90) {
      DisResultContent += '合闸异常'
    } else if (ResultTypeArr[0] == 91) {
      DisResultContent += '无法判断'
    } else if (ResultTypeArr[0] == '') {
      DisResultContent += ''
    } else {
      DisResultContent = ResultTypeArr[0]
    }
  }
  if (DisResultContent === '') {
    return value
  }
  return DisResultContent
}

function getBehavInspection(value) {
  //	if(ResultArr.indexOf("@")!=-1){var ResultArr=value.split("@");}
  //	else{
  //
  //	}
  var ResultArr = value.split('@')
  var DisResultContent = ''
  for (var j = 0; j < ResultArr.length; j++) {
    if ((ResultTypeArr = ResultArr[j].indexOf('_') === -1)) {
      continue
    }
    var ResultTypeArr = ResultArr[j].split('_')
    if (ResultTypeArr[0] == 30) {
      DisResultContent += '行为分析 '
    } else if (ResultTypeArr[0] == 22) {
      DisResultContent += '未穿工装'
    } else if (ResultTypeArr[0] == 31) {
      DisResultContent += '穿越警戒面 '
    } else if (ResultTypeArr[0] == 32) {
      DisResultContent += '目标进入区域 '
    } else if (ResultTypeArr[0] == 33) {
      DisResultContent += '目标离开区域 '
    } else if (ResultTypeArr[0] == 34) {
      DisResultContent += '周界入侵 '
    } else if (ResultTypeArr[0] == 35) {
      DisResultContent += '徘徊 '
    } else if (ResultTypeArr[0] == 36) {
      DisResultContent += '物品遗留拿取 '
    } else if (ResultTypeArr[0] == 37) {
      DisResultContent += '停车 '
    } else if (ResultTypeArr[0] == 38) {
      DisResultContent += '快速移动 '
    } else if (ResultTypeArr[0] == 39) {
      DisResultContent += '区域内人员聚集 '
    } else if (ResultTypeArr[0] == 40) {
      DisResultContent += '剧烈运动 '
    } else if (ResultTypeArr[0] == 41) {
      DisResultContent += '攀高 '
    } else if (ResultTypeArr[0] == 42) {
      DisResultContent += '起身 '
    } else if (ResultTypeArr[0] == 43) {
      DisResultContent += '物品遗留 '
    } else if (ResultTypeArr[0] == 44) {
      DisResultContent += '物品拿取 '
    } else if (ResultTypeArr[0] == 45) {
      DisResultContent += '离岗 '
    } else if (ResultTypeArr[0] == 46) {
      DisResultContent += '尾随'
    } else if (ResultTypeArr[0] == 47) {
      DisResultContent += '重点人员起身'
    } else if (ResultTypeArr[0] == 48) {
      DisResultContent += '起立'
    } else if (ResultTypeArr[0] == 49) {
      DisResultContent += '倒地'
    } else if (ResultTypeArr[0] == 50) {
      DisResultContent += '声强突变'
    } else if (ResultTypeArr[0] == 51) {
      DisResultContent += '折线攀高'
    } else if (ResultTypeArr[0] == 52) {
      DisResultContent += '如厕超时'
    } else if (ResultTypeArr[0] == 53) {
      DisResultContent += '放风场滞留'
    } else if (ResultTypeArr[0] == 54) {
      DisResultContent += '折线警戒面'
    } else if (ResultTypeArr[0] == 55) {
      DisResultContent += '授课（文教）'
    } else if (ResultTypeArr[0] == 56) {
      DisResultContent += '回答问题（文教）'
    } else if (ResultTypeArr[0] == 57) {
      DisResultContent += '人靠近ATM'
    } else if (ResultTypeArr[0] == 58) {
      DisResultContent += '操作超时'
    } else if (ResultTypeArr[0] == 59) {
      DisResultContent += '贴纸条'
    } else if (ResultTypeArr[0] == 60) {
      DisResultContent += '安装读卡器'
    } else if (ResultTypeArr[0] == 61) {
      DisResultContent += '人数变化事件'
    } else if (ResultTypeArr[0] == 62) {
      DisResultContent += '间距变化事件'
    } else if (ResultTypeArr[0] == 63) {
      DisResultContent += '组合规则事件'
    } else if (ResultTypeArr[0] == 64) {
      DisResultContent += '一动不动（静坐）'
    } else if (ResultTypeArr[0] == 65) {
      DisResultContent += '区域内人员聚集'
    } else if (ResultTypeArr[0] == 66) {
      DisResultContent += '奔跑'
    } else if (ResultTypeArr[0] == 67) {
      DisResultContent += '滞留'
    } else if (ResultTypeArr[0] == 68) {
      DisResultContent += '板书'
    } else if (ResultTypeArr[0] == 69) {
      DisResultContent += '态势分析'
    } else if (ResultTypeArr[0] == 70) {
      DisResultContent += '带安全帽'
    } else if (ResultTypeArr[0] == 71) {
      DisResultContent += '未带安全帽'
    } else if (ResultTypeArr[0] == 72) {
      DisResultContent += '移动侦测'
    } else if (ResultTypeArr[0] == 73) {
      DisResultContent += '未正确佩戴安全帽'
    } else if (ResultTypeArr[0] == 74) {
      DisResultContent += '越线闯入'
    } else if (ResultTypeArr[0] == 75) {
      DisResultContent += '未穿长袖工作服'
    } else if (ResultTypeArr[0] == 76) {
      DisResultContent += '场地烟火'
    } else if (ResultTypeArr[0] == 77) {
      DisResultContent += '积水'
    } else if (ResultTypeArr[0] == 78) {
      DisResultContent += '小动物'
    } else if (ResultTypeArr[0] == 79) {
      DisResultContent += '异物入侵'
    } else if (ResultTypeArr[0] == 80) {
      DisResultContent += '设备烟火'
    } else if (ResultTypeArr[0] == 81) {
      DisResultContent += '渗漏油'
    } else if (ResultTypeArr[0] == 82) {
      DisResultContent += '设备变形'
    } else if (ResultTypeArr[0] == 83) {
      DisResultContent += '设备断裂'
    } else if (ResultTypeArr[0] == 84) {
      DisResultContent += '设备倾斜'
    } else if (ResultTypeArr[0] == 85) {
      DisResultContent += '一般刀闸分'
    } else if (ResultTypeArr[0] == 86) {
      DisResultContent += '一般刀闸合'
    } else if (ResultTypeArr[0] == 87) {
      DisResultContent += '分闸异常'
    } else if (ResultTypeArr[0] == 88) {
      DisResultContent += '分闸正常'
    } else if (ResultTypeArr[0] == 89) {
      DisResultContent += '合闸正常'
    } else if (ResultTypeArr[0] == 90) {
      DisResultContent += '合闸异常'
    } else if (ResultTypeArr[0] == 91) {
      DisResultContent += '无法判断'
    } else if (ResultTypeArr[0] == '') {
      DisResultContent += ''
    }
  }
  if (DisResultContent === '') {
    return value
  }
  return DisResultContent
}

function getTop(element) {
  var actualTop = element.offsetTop
  var current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

function getLeft(element) {
  var actualLeft = element.offsetLeft
  var current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}

function getDeviceType(DeviceType) {
  var DeviceTypeTxt = ''
  var Result_Unit = ''
  if (DeviceType == 1) {
    DeviceTypeTxt = '仪表识别'
  } else if (DeviceType == 2) {
    DeviceTypeTxt = '红外测温'
    Result_Unit = '℃'
  } else if (DeviceType == 3) {
    DeviceTypeTxt = '声音检测'
  } else if (DeviceType == 4) {
    DeviceTypeTxt = '视频录像'
  } else if (DeviceType == 5) {
    DeviceTypeTxt = '图片采集'
  } else if (DeviceType == 6) {
    DeviceTypeTxt = '实物ID检测'
  } else if (DeviceType == 7) {
    DeviceTypeTxt = '局放类设备'
    Result_Unit = 'db'
  } else if (DeviceType == 8) {
    DeviceTypeTxt = 'SF6气体检测'
    Result_Unit = 'ppm'
  } else if (DeviceType == 9) {
    DeviceTypeTxt = '噪声检测'
    Result_Unit = 'ppm'
  } else if (DeviceType == 10) {
    DeviceTypeTxt = '目标检测'
  } else if (DeviceType == 11) {
    DeviceTypeTxt = '紫外'
  } else if (DeviceType == 12) {
    DeviceTypeTxt = '3D刀闸'
  } else if (DeviceType == 13) {
    DeviceTypeTxt = 'TD8843IM红外检测'
  } else if (DeviceType == 14) {
    DeviceTypeTxt = '温湿度检测类设备'
  } else if (DeviceType == 15) {
    DeviceTypeTxt = '人脸检测'
  } else if (DeviceType == 16) {
    DeviceTypeTxt = '行为分析检测'
  } else if (DeviceType == 17) {
    DeviceTypeTxt = '开关量输入设备'
  } else if (DeviceType == 18) {
    DeviceTypeTxt = '输出设备'
  } else if (DeviceType == 19) {
    DeviceTypeTxt = '车辆识别'
  }
  return DeviceTypeTxt + '_' + Result_Unit
}

// 创建Base64对象
var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    var t = ''
    var n, r, i, s, o, u, a
    var f = 0
    e = Base64._utf8_encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = ((n & 3) << 4) | (r >> 4)
      u = ((r & 15) << 2) | (i >> 6)
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    var t = ''
    var n, r, i
    var s, o, u, a
    var f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++))
      o = this._keyStr.indexOf(e.charAt(f++))
      u = this._keyStr.indexOf(e.charAt(f++))
      a = this._keyStr.indexOf(e.charAt(f++))
      n = (s << 2) | (o >> 4)
      r = ((o & 15) << 4) | (u >> 2)
      i = ((u & 3) << 6) | a
      t = t + String.fromCharCode(n)
      if (u != 64) {
        t = t + String.fromCharCode(r)
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t)
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, 'n')
    var t = ''
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192)
        t += String.fromCharCode((r & 63) | 128)
      } else {
        t += String.fromCharCode((r >> 12) | 224)
        t += String.fromCharCode(((r >> 6) & 63) | 128)
        t += String.fromCharCode((r & 63) | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    var t = ''
    var n = 0
    var r = (c1 = c2 = 0)
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63))
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        n += 3
      }
    }
    return t
  },
}

function arrayToTree(items) {
  var result = [] // 存放结果集
  var itemMap = {} //
  var l = items.length
  // 先转成map存储
  for (var i = 0; i < l; i++) {
    var item = items[i]
    //	alert(item.Area_Id);
    itemMap[item.Area_Id] = {
      Id: item.Area_Id,
      Desc: item.Area_Desc,
      Pid: item.Parent_Id,
      level: item.TreeLevel,
      children: [],
    }
  }

  //console.log(itemMap);

  for (var i = 0; i < l; i++) {
    var item = items[i]
    var id = item.Area_Id
    var pid = item.Parent_Id
    var treeItem = itemMap[id]

    if (pid === '-1') {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

//html页面获取url中?后面的参数
function GetRequest() {
  var url = location.search
  var theRequest = new Object()
  if (url.indexOf('?') != -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      var strord = strs[i]
      theRequest[strord.split('=')[0]] = unescape(strord.split('=')[1])
    }
  }
  return theRequest
}

//html页面使用正则获取url中?后面的参数
//function getQueryString(name){
//	var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i');
//	var r=window.location.search.substr(1).match(reg);
//	if(r != null){
//		return unescape(r[2]);
//	}
//	return null;
//}
//
//console.log(getQueryString("aaa"));

function GetRequestAll(name) {
  if (allRequest[name] == undefined) {
    allRequest[name] = ''
  }
  return allRequest[name]
}

//将存储在数据库中的可见光摄像机的类型转换成可展示的数据
function ChangeIPCCameraType(IPCCameraType) {
  if (IPCCameraType < 100 && IPCCameraType > 0) {
    return IPCCamera_s[IPCCameraType]
  } else if (IPCCameraType == 0) {
    return '海康定制3007ipc'
  } else if (IPCCameraType == 100) {
    return '大华DH-SD-6A302DW-HN'
  } else if (IPCCameraType == 101) {
    return '大华DH-SD-6A420DW-HNX'
  } else if (IPCCameraType == 102) {
    return '大华DH-SD-6A9230UE-HNI'
  } else if (IPCCameraType == 150) {
    return '宇视DLM-P30Q4'
  } else if (IPCCameraType == 151) {
    return '宇视DLM-P12D4-2'
  } else if (IPCCameraType == 152) {
    return '宇视HIC9821-IR'
  }
}

var xmlHttpGetDevByArea = ''
function GetDevByArea(Area_Id) {
  xmlHttpGetDevByArea = createXMLHttpRequest()
  try {
    var q = 'SearchDeviceType=GetDevByArea&Area_Id=' + Area_Id
    //alert("q="+q);
    var url = '/dalirobotcms/ajax/getdeivceinfo.php'
    xmlHttpGetDevByArea.onreadystatechange = function () {
      GetDevByAreaRes()
    }
    xmlHttpGetDevByArea.open('post', url, true)
    xmlHttpGetDevByArea.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpGetDevByArea.send(q)
  } catch (e) {
    alert(e)
  }
}

function GetDevByAreaRes() {
  if (xmlHttpGetDevByArea.readyState == 4) {
    if (xmlHttpGetDevByArea.status == 200) {
      var s = xmlHttpGetDevByArea.responseText
      //alert(s);
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      //var arr = eval(s);
      AllAreaDev.length = 0
      AllAreaDev = []
      var arr = JSON.parse(s)
      var l = arr.length
      //alert("l="+l);
      for (var i = 0; i < l; i++) {
        //				alert(arr[i]['fajiID']);
        var objtemp = new DevObj(
          arr[i]['Device_Id'],
          arr[i]['DisDevName'],
          arr[i]['Area_Id'],
          arr[i]['Inspection_Id'],
          arr[i]['Device_Pri'],
          arr[i]['DeviceType'],
          arr[i]['DeviceDetialType'],
          arr[i]['Result_Unit'],
          arr[i]['Normal_Low'],
          arr[i]['Normal_High'],
          arr[i]['Bug_Desc'],
          arr[i]['Deal_Method'],
          arr[i]['Alarm_Flag'],
          arr[i]['Preset_Id'],
          arr[i]['AreaDevType'],
          arr[i]['DevSelfType'],
          arr[i]['DevNameTID'],
          arr[i]['FirstDevID'],
          arr[i]['VolLevel'],
          arr[i]['SideFlag'],
          arr[i]['DevDescT'],
          arr[i]['FirstDevType'],
          arr[i]['AlarmTemp1'],
          arr[i]['AlarmTemp2'],
          arr[i]['AlarmTemp3'],
          arr[i]['AlarmXianDuiCha1'],
          arr[i]['AlarmXianDuiCha2'],
          arr[i]['AlarmXianDuiCha3'],
          arr[i]['XianJianWenCha'],
          arr[i]['DefaultValue'],
          arr[i]['Rec_Time'],
          arr[i]['DisabledFlag'],
          arr[i]['Form'],
          arr[i]['Device_Desc'],
          arr[i]['BestScore'],
          arr[i]['AlwaysUseDefaultValue'],
          arr[i]['DeviceID'],
          arr[i]['CompDeviceID'],
          arr[i]['SpaceID'],
          arr[i]['CarID'],
          arr[i]['fajiID'],
          '1',
          arr[i]['Device_Desc'],
          arr[i]['RFID'],
          arr[i]['IdentifyType'],
          arr[i]['RFIDAutoInspect'],
          arr[i]['ExportDiffValue'],
          arr[i]['Mulriple'],
          arr[i]['MeterIdentifyMode'],
          arr[i]['ComDevID'],
          arr[i]['ComName'],
          arr[i]['DevIDGrid'],
          arr[i]['OneKeyCtrl'],
          arr[i]['ImportantLevel'],
          arr[i]['GatewayID'],
          arr[i]['DevieIDOnRobot']
        )
        //pao效率较低，此处一般不会出现重复的内容，所以直接push
        //AllDev.pao(objtemp,'Device_Id');
        AllAreaDev.push(objtemp)
      }

      DeviceFunForArea()
    }
  }
}

var xmlHttpGetDevBySpaceID = ''
function GetDevBySpaceID(SpaceID) {
  xmlHttpGetDevBySpaceID = createXMLHttpRequest()
  try {
    var q = 'SearchDeviceType=GetDevBySpace&SpaceID=' + SpaceID
    //alert("q="+q);
    var url = '/dalirobotcms/ajax/getdeivceinfo.php'
    xmlHttpGetDevBySpaceID.onreadystatechange = function () {
      GetDevBySpaceIDRes()
    }
    xmlHttpGetDevBySpaceID.open('post', url, true)
    xmlHttpGetDevBySpaceID.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpGetDevBySpaceID.send(q)
  } catch (e) {
    alert(e)
  }
}

function GetDevBySpaceIDRes() {
  if (xmlHttpGetDevBySpaceID.readyState == 4) {
    if (xmlHttpGetDevBySpaceID.status == 200) {
      var s = xmlHttpGetDevBySpaceID.responseText
      //alert(s);
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      //var arr = eval(s);
      AllSpaceDev.length = 0
      AllSpaceDev = []
      var arr = JSON.parse(s)
      var l = arr.length
      //alert("l="+l);
      for (var i = 0; i < l; i++) {
        //				alert(arr[i]['fajiID']);
        var objtemp = new DevObj(
          arr[i]['Device_Id'],
          arr[i]['DisDevName'],
          arr[i]['Area_Id'],
          arr[i]['Inspection_Id'],
          arr[i]['Device_Pri'],
          arr[i]['DeviceType'],
          arr[i]['DeviceDetialType'],
          arr[i]['Result_Unit'],
          arr[i]['Normal_Low'],
          arr[i]['Normal_High'],
          arr[i]['Bug_Desc'],
          arr[i]['Deal_Method'],
          arr[i]['Alarm_Flag'],
          arr[i]['Preset_Id'],
          arr[i]['AreaDevType'],
          arr[i]['DevSelfType'],
          arr[i]['DevNameTID'],
          arr[i]['FirstDevID'],
          arr[i]['VolLevel'],
          arr[i]['SideFlag'],
          arr[i]['DevDescT'],
          arr[i]['FirstDevType'],
          arr[i]['AlarmTemp1'],
          arr[i]['AlarmTemp2'],
          arr[i]['AlarmTemp3'],
          arr[i]['AlarmXianDuiCha1'],
          arr[i]['AlarmXianDuiCha2'],
          arr[i]['AlarmXianDuiCha3'],
          arr[i]['XianJianWenCha'],
          arr[i]['DefaultValue'],
          arr[i]['Rec_Time'],
          arr[i]['DisabledFlag'],
          arr[i]['Form'],
          arr[i]['Device_Desc'],
          arr[i]['BestScore'],
          arr[i]['AlwaysUseDefaultValue'],
          arr[i]['DeviceID'],
          arr[i]['CompDeviceID'],
          arr[i]['SpaceID'],
          arr[i]['CarID'],
          arr[i]['fajiID'],
          '1',
          arr[i]['Device_Desc'],
          arr[i]['RFID'],
          arr[i]['IdentifyType'],
          arr[i]['RFIDAutoInspect'],
          arr[i]['ExportDiffValue'],
          arr[i]['Mulriple'],
          arr[i]['MeterIdentifyMode'],
          arr[i]['ComDevID'],
          arr[i]['ComName'],
          arr[i]['DevIDGrid'],
          arr[i]['OneKeyCtrl'],
          arr[i]['ImportantLevel'],
          arr[i]['GatewayID'],
          arr[i]['DevieIDOnRobot']
        )
        //pao效率较低，此处一般不会出现重复的内容，所以直接push
        //AllDev.pao(objtemp,'Device_Id');
        AllSpaceDev.push(objtemp)
      }

      DeviceFunForSpace()
    }
  }
}

var xmlHttpGetDevByFirstDev = ''
function GetDevByFirstDev(FirstDevID) {
  xmlHttpGetDevByFirstDev = createXMLHttpRequest()
  try {
    var q = 'SearchDeviceType=GetDevByFirstDev&FirstDevID=' + FirstDevID
    //alert("q="+q);
    var url = '/dalirobotcms/ajax/getdeivceinfo.php'
    xmlHttpGetDevByFirstDev.onreadystatechange = function () {
      GetDevByFirstDevRes()
    }
    xmlHttpGetDevByFirstDev.open('post', url, true)
    xmlHttpGetDevByFirstDev.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpGetDevByFirstDev.send(q)
  } catch (e) {
    alert(e)
  }
}

function GetDevByFirstDevRes() {
  if (xmlHttpGetDevByFirstDev.readyState == 4) {
    if (xmlHttpGetDevByFirstDev.status == 200) {
      var s = xmlHttpGetDevByFirstDev.responseText
      //alert(s);
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      //var arr = eval(s);
      AllDevFirstDev.length = 0
      AllDevFirstDev = []
      var arr = JSON.parse(s)
      var l = arr.length
      //alert("l="+l);
      for (var i = 0; i < l; i++) {
        //				alert(arr[i]['fajiID']);
        var objtemp = new DevObj(
          arr[i]['Device_Id'],
          arr[i]['DisDevName'],
          arr[i]['Area_Id'],
          arr[i]['Inspection_Id'],
          arr[i]['Device_Pri'],
          arr[i]['DeviceType'],
          arr[i]['DeviceDetialType'],
          arr[i]['Result_Unit'],
          arr[i]['Normal_Low'],
          arr[i]['Normal_High'],
          arr[i]['Bug_Desc'],
          arr[i]['Deal_Method'],
          arr[i]['Alarm_Flag'],
          arr[i]['Preset_Id'],
          arr[i]['AreaDevType'],
          arr[i]['DevSelfType'],
          arr[i]['DevNameTID'],
          arr[i]['FirstDevID'],
          arr[i]['VolLevel'],
          arr[i]['SideFlag'],
          arr[i]['DevDescT'],
          arr[i]['FirstDevType'],
          arr[i]['AlarmTemp1'],
          arr[i]['AlarmTemp2'],
          arr[i]['AlarmTemp3'],
          arr[i]['AlarmXianDuiCha1'],
          arr[i]['AlarmXianDuiCha2'],
          arr[i]['AlarmXianDuiCha3'],
          arr[i]['XianJianWenCha'],
          arr[i]['DefaultValue'],
          arr[i]['Rec_Time'],
          arr[i]['DisabledFlag'],
          arr[i]['Form'],
          arr[i]['Device_Desc'],
          arr[i]['BestScore'],
          arr[i]['AlwaysUseDefaultValue'],
          arr[i]['DeviceID'],
          arr[i]['CompDeviceID'],
          arr[i]['SpaceID'],
          arr[i]['CarID'],
          arr[i]['fajiID'],
          '1',
          arr[i]['Device_Desc'],
          arr[i]['RFID'],
          arr[i]['IdentifyType'],
          arr[i]['RFIDAutoInspect'],
          arr[i]['ExportDiffValue'],
          arr[i]['Mulriple'],
          arr[i]['MeterIdentifyMode'],
          arr[i]['ComDevID'],
          arr[i]['ComName'],
          arr[i]['DevIDGrid'],
          arr[i]['OneKeyCtrl'],
          arr[i]['ImportantLevel'],
          arr[i]['GatewayID'],
          arr[i]['DevieIDOnRobot']
        )
        //pao效率较低，此处一般不会出现重复的内容，所以直接push
        //AllDev.pao(objtemp,'Device_Id');
        AllDevFirstDev.push(objtemp)
      }

      DeviceFunForFirstDev()
    }
  }
}

var xmlHttpGetDevByDevID = ''
function GetDevByDevID(DeviceId) {
  xmlHttpGetDevByDevID = createXMLHttpRequest()
  try {
    var q = 'SearchDeviceType=GetDevByDeviceId&DeviceId=' + DeviceId
    //		alert("q="+q);
    var url = '/dalirobotcms/ajax/getdeivcedata.php'
    xmlHttpGetDevByDevID.onreadystatechange = function () {
      GetDevByDevIDRes()
    }
    xmlHttpGetDevByDevID.open('post', url, true)
    xmlHttpGetDevByDevID.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpGetDevByDevID.send(q)
  } catch (e) {
    alert(e)
  }
}

function GetDevByDevIDRes() {
  if (xmlHttpGetDevByDevID.readyState == 4) {
    if (xmlHttpGetDevByDevID.status == 200) {
      var s = xmlHttpGetDevByDevID.responseText
      //			alert(s);
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      //var arr = eval(s);
      DevIDInfo = []
      DevIDInfo = JSON.parse(s)

      DeviceFunForDevID()
    }
  }
}

var xmlHttpGetDevByDevIDS = ''
function GetDevByDevIDS(DevStr) {
  xmlHttpGetDevByDevIDS = createXMLHttpRequest()
  try {
    var q = 'SearchDeviceType=GetDevByDeviceIds&DeviceIdS=' + DevStr
    //		alert("q="+q);
    var url = '/dalirobotcms/ajax/getdeivceinfo.php'
    xmlHttpGetDevByDevIDS.onreadystatechange = function () {
      GetDevByDevIDSRes()
    }
    xmlHttpGetDevByDevIDS.open('post', url, true)
    xmlHttpGetDevByDevIDS.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpGetDevByDevIDS.send(q)
  } catch (e) {
    alert(e)
  }
}

function GetDevByDevIDSRes() {
  if (xmlHttpGetDevByDevIDS.readyState == 4) {
    if (xmlHttpGetDevByDevIDS.status == 200) {
      var s = xmlHttpGetDevByDevIDS.responseText
      //			alert(s);
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      AllDevS.length = 0
      AllDevS = []
      var arr = JSON.parse(s)
      var l = arr.length
      //alert("l="+l);
      for (var i = 0; i < l; i++) {
        //				alert(arr[i]['fajiID']);
        var objtemp = new DevObj(
          arr[i]['Device_Id'],
          arr[i]['DisDevName'],
          arr[i]['Area_Id'],
          arr[i]['Inspection_Id'],
          arr[i]['Device_Pri'],
          arr[i]['DeviceType'],
          arr[i]['DeviceDetialType'],
          arr[i]['Result_Unit'],
          arr[i]['Normal_Low'],
          arr[i]['Normal_High'],
          arr[i]['Bug_Desc'],
          arr[i]['Deal_Method'],
          arr[i]['Alarm_Flag'],
          arr[i]['Preset_Id'],
          arr[i]['AreaDevType'],
          arr[i]['DevSelfType'],
          arr[i]['DevNameTID'],
          arr[i]['FirstDevID'],
          arr[i]['VolLevel'],
          arr[i]['SideFlag'],
          arr[i]['DevDescT'],
          arr[i]['FirstDevType'],
          arr[i]['AlarmTemp1'],
          arr[i]['AlarmTemp2'],
          arr[i]['AlarmTemp3'],
          arr[i]['AlarmXianDuiCha1'],
          arr[i]['AlarmXianDuiCha2'],
          arr[i]['AlarmXianDuiCha3'],
          arr[i]['XianJianWenCha'],
          arr[i]['DefaultValue'],
          arr[i]['Rec_Time'],
          arr[i]['DisabledFlag'],
          arr[i]['Form'],
          arr[i]['Device_Desc'],
          arr[i]['BestScore'],
          arr[i]['AlwaysUseDefaultValue'],
          arr[i]['DeviceID'],
          arr[i]['CompDeviceID'],
          arr[i]['SpaceID'],
          arr[i]['CarID'],
          arr[i]['fajiID'],
          '1',
          arr[i]['Device_Desc'],
          arr[i]['RFID'],
          arr[i]['IdentifyType'],
          arr[i]['RFIDAutoInspect'],
          arr[i]['ExportDiffValue'],
          arr[i]['Mulriple'],
          arr[i]['MeterIdentifyMode'],
          arr[i]['ComDevID'],
          arr[i]['ComName'],
          arr[i]['DevIDGrid'],
          arr[i]['OneKeyCtrl'],
          arr[i]['ImportantLevel'],
          arr[i]['GatewayID'],
          arr[i]['DevieIDOnRobot']
        )
        //pao效率较低，此处一般不会出现重复的内容，所以直接push
        //AllDev.pao(objtemp,'Device_Id');
        AllDevS.push(objtemp)
      }

      DeviceFunForDevIDS()
    }
  }
}
