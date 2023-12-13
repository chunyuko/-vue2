///////////////////////////////////////////////////////////////////////////////////以下部分实现右键菜单


function RightMenu() {
  this.AddExtendMenu = AddExtendMenu;
  this.AddItem = AddItem;
  this.GetMenu = GetMenu;
  this.HideAll = HideAll;
  this.I_OnMouseOver = I_OnMouseOver;
  this.I_OnMouseOut = I_OnMouseOut;
  this.I_OnMouseUp = I_OnMouseUp;
  this.P_OnMouseOver = P_OnMouseOver;
  this.P_OnMouseOut = P_OnMouseOut;
  A_rbpm = new Array();
  HTMLstr = "";
  HTMLstr += "<!-- RightButton PopMenu -->\n";
  HTMLstr += "\n";
  HTMLstr += "<!-- PopMenu Starts -->\n";
  HTMLstr += "<div id='E_rbpm' class='rm_div'>\n";
  // rbpm = right button pop menu
  HTMLstr += "<table width='100%' border='0px' cellspacing='0px'>\n";
  HTMLstr += "<tr>";
  HTMLstr += "<td height='100%' width='100%' style='padding: 1px' valign='bottom'>\n";
  HTMLstr += "<table width='110px' border='0px' cellspacing='0px'>\n";
  HTMLstr += "<!-- Insert A Extend Menu or Item On Here For E_rbpm -->\n";
  HTMLstr += "</table></td></tr></table>\n";
  HTMLstr += "</div>\n";
  HTMLstr += "<!-- Insert A Extend_Menu Area on Here For E_rbpm -->";
  HTMLstr += "\n";
  HTMLstr += "<!-- PopMenu Ends -->\n";
}

function AddExtendMenu(id, img, wh, name, parent) {
  var TempStr = "";

  eval("A_" + parent + ".length++");
  eval("A_" + parent + "[A_" + parent + ".length-1] = id");  // 将此项注册到父菜单项的ID数组中去
  TempStr += "<div id='E_" + id + "' class='rm_div'>\n";
  TempStr += "<table width='110px' border='0px' cellspacing='0'>\n";
  TempStr += "<!-- Insert A Extend Menu or Item On Here For E_" + id + " -->";
  TempStr += "</table>\n";
  TempStr += "</div>\n";
  TempStr += "<!-- Insert A Extend_Menu Area on Here For E_" + id + " -->";
  TempStr += "<!-- Insert A Extend_Menu Area on Here For E_" + parent + " -->";
  HTMLstr = HTMLstr.replace("<!-- Insert A Extend_Menu Area on Here For E_" + parent + " -->", TempStr);

  eval("A_" + id + " = new Array()");
  TempStr = "";
  TempStr += "<!-- Extend Item : P_" + id + " -->\n";
  TempStr += "<tr id='P_" + id + "' class='out'";
  TempStr += " onmouseover='P_OnMouseOver(\"" + id + "\",\"" + parent + "\")'";
  TempStr += " onmouseout='P_OnMouseOut(\"" + id + "\",\"" + parent + "\")'";
  TempStr += " onmouseup=window.event.cancelBubble=true;";
  TempStr += " onclick=window.event.cancelBubble=true;";
  TempStr += "><td nowrap alt='" + img + "' title='" + img + "'>";
  TempStr += "<font face='Wingdings' style='font-size:18px'>0</font> " + name + "  </td><td style='font-family: webdings; text-align: right;'>4";
  TempStr += "</td></tr>\n";
  TempStr += "<!-- Insert A Extend Menu or Item On Here For E_" + parent + " -->";
  HTMLstr = HTMLstr.replace("<!-- Insert A Extend Menu or Item On Here For E_" + parent + " -->", TempStr);
}

function AddItem(id, img, wh, name, parent, location) {
  var TempStr = "";
  var ItemStr = "<!-- ITEM : I_" + id + " -->";
  if (id == "sperator") {
    TempStr += ItemStr + "\n";
    TempStr += "<tr class='out' onclick='window.event.cancelBubble=true;' onmouseup='window.event.cancelBubble=true;'><td colspan='2' height='1px'><hr class='sperator'></td></tr>";
    TempStr += "<!-- Insert A Extend Menu or Item On Here For E_" + parent + " -->";
    HTMLstr = HTMLstr.replace("<!-- Insert A Extend Menu or Item On Here For E_" + parent + " -->", TempStr);
    return;
  }
  if (HTMLstr.indexOf(ItemStr) != -1) {
    alert("I_" + id + "already exist!");
    return;
  }
  TempStr += ItemStr + "\n";
  TempStr += "<tr id='I_" + id + "' class='out'";
  TempStr += " onmouseover='I_OnMouseOver(\"" + id + "\",\"" + parent + "\")'";
  TempStr += " onmouseout='I_OnMouseOut(\"" + id + "\")'";
  TempStr += " onclick='window.event.cancelBubble=true;'";
  if (location == null)
    TempStr += " onmouseup='I_OnMouseUp(\"" + id + "\",\"" + parent + "\",null)'";
  else
    TempStr += " onmouseup='I_OnMouseUp(\"" + id + "\",\"" + parent + "\",\"" + location + "\")'";
  TempStr += "><td nowrap >";
  TempStr += "<font face='Wingdings' style='font-size:18px'>" + wh + "</font>" + name + " ";//以Wingdings字体做为图片，要改成图片，请在这里更改
  TempStr += "</td><td></td></tr>\n";
  TempStr += "<!-- Insert A Extend Menu or Item On Here For E_" + parent + " -->";
  HTMLstr = HTMLstr.replace("<!-- Insert A Extend Menu or Item On Here For E_" + parent + " -->", TempStr);
}
function GetMenu() {
  return HTMLstr;
}
function I_OnMouseOver(id, parent) {
  var Item;
  if (parent != "rbpm") {
    var ParentItem;
    //ParentItem = eval("P_"+parent);

    ParentItem = $_("P_" + parent);
    ParentItem.className = "over";
  }
  //Item = eval("I_"+id);

  Item = $_("I_" + id);

  Item.className = "over";
  HideAll(parent, 1);
}
function I_OnMouseOut(id) {
  var Item;
  //Item = eval("I_"+id);

  Item = $_("I_" + id);
  Item.className = "out";
}
function I_OnMouseUp(id, parent, location) {
  var ParentMenu;
  window.event.cancelBubble = true;
  OnClick();
  //ParentMenu = eval("E_"+parent);
  //ParentMenu =$_("E_"+parent);
  //ParentMenu.display="none";
  if (location == null) {
    eval("Do_" + id + "()");
  }
  else if (location.substr(0, 11).toLowerCase() == "javascript:") {
    //alert(location);
    eval(location);
  }
  else {
    window.open(location);
  }
}


function P_OnMouseOver(id, parent) {
  var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  var w = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
  var h = Math.max(document.documentElement.clientHeight, document.body.clientHeight);

  var wrapleft = parseInt($_("rmenu").offsetLeft);

  //alert("id="+id+" \r\n parent="+parent);
  var Item;
  var Extend;
  var Parent;
  if (parent != "rbpm") {
    var ParentItem;
    ParentItem = eval("P_" + parent);

    ParentMenu = $_("P_" + parent);
    ParentItem.className = "over";
  }
  HideAll(parent, 1);
  /*
  Item = eval("P_"+id);
  Extend = eval("E_"+id);
  Parent = eval("E_"+parent);
  */

  Item = $_("P_" + id);
  Extend = $_("E_" + id);
  Parent = $_("E_" + parent);


  Item.className = "over";
  Extend.style.display = "block";

  //二级菜单如果再加scrollLeft，就重复了
  //D_left=scrollLeft;
  D_left = 0;;
  D_width = w;
  P_left = Parent.offsetLeft;
  P_width = Parent.offsetWidth;

  //表示上级菜单是在 上上级的左边
  if (P_left < 0) {
    E_left = P_left - P_width + 4;
  }
  else {
    E_left = D_left + P_left + P_width - 4;
  }
  E_width = Extend.offsetWidth;



  //alert("wrapleft="+wrapleft+"\r\n E_left="+E_left+"\r\n E_width="+E_width+" \r\n D_left="+D_left+" \r\n D_width="+D_width+" \r\n P_left="+P_left+" \r\n P_width="+P_width);
  //if(E_left+E_width > D_left+D_width){E_left=E_left-P_width-E_width+8;}
  //表示上级菜单是在 上上级的左边
  if (P_left < 0) {


  }
  else {
    if (E_left + wrapleft + E_width > parseInt(scrollLeft) + parseInt(w)) {
      E_left = E_left - P_width - E_width + 8;
    }
  }
  //alert("E_left1="+E_left);

  //if(E_left < 0){E_left=D_left+P_left+P_width;}

  //alert("E_left2="+E_left);
  Extend.style.left = E_left + "px";
  //alert("a");

  P_top = Parent.offsetTop;
  I_top = Item.offsetTop;
  E_top = P_top + I_top + 1;

  E_height = Extend.offsetHeight;
  D_top = scrollTop;
  D_height = h;

  if (E_top + E_height > D_top + D_height) { E_top = D_top + D_height - E_height; }
  if (E_top < 0) { E_top = 0; }
  Extend.style.top = E_top + "px";


}
function P_OnMouseOut(id, parent) {
}
function HideAll(id, flag) {
  var Area;
  var Temp;
  var i;
  if (!flag) {
    //Temp = eval("E_"+id);
    Temp = $_("E_" + id);

    Temp.style.display = "none";
  }
  Area = eval("A_" + id);
  if (Area.length) {
    for (i = 0; i < Area.length; i++) {
      HideAll(Area[i], 0);
      //Temp = eval("E_"+Area[i]);

      Temp = $_("E_" + Area[i]);

      Temp.style.display = "none";
      //Temp = eval("P_"+Area[i]);
      Temp = $_("P_" + Area[i]);
      Temp.className = "out";
    }
  }
}



//计算右键菜单的位置，并显示菜单  弃用  
function PopMenuPositionXY(eventX, eventY) {
  var PopMenu;
  //PopMenu=$_("E_rbpm");

  PopMenu = $_("rmenu");

  //PopMenu = eval("E_rbpm");
  //HideAll("rbpm",0);
  PopMenu.style.display = "block";

  var RealPopMenu = $_("E_rbpm");

  HideAll("rbpm", 0);
  RealPopMenu.style.display = "block";



  var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  var w = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
  var h = Math.max(document.documentElement.clientHeight, document.body.clientHeight);


  var PopMenuLeft = scrollLeft + eventX;
  var PopMenuTop = scrollTop + eventY;

  //alert("PopMenu.offsetHeight="+PopMenu.offsetHeight+"\r\n PopMenu.offsetWidth="+PopMenu.offsetWidth+"\r\n h="+h+"\r\n w="+w+"\r\n window.event.clientY="+window.event.clientY+"\r\n window.event.clientX="+window.event.clientX+"\r\n scrollTop="+scrollTop+" \r\n scrollLeft="+scrollLeft+" \r\n PopMenuLeft="+PopMenuLeft+" \r\n PopMenuTop="+PopMenuTop);
  if (PopMenuLeft + PopMenu.offsetWidth > scrollLeft + w) {
    PopMenuLeft = scrollLeft + w - PopMenu.offsetWidth;
  }
  if (PopMenuLeft < 0) PopMenuLeft = 0;
  if (PopMenuTop + PopMenu.offsetHeight > scrollTop + h) {
    PopMenuTop = scrollTop + h - PopMenu.offsetHeight;
  }
  if (PopMenuTop < 0) PopMenuTop = 0;

  //alert("PopMenuLeft="+PopMenuLeft+" \r\n PopMenuTop="+PopMenuTop);
  PopMenu.style.left = PopMenuLeft + "px";
  PopMenu.style.top = PopMenuTop + "px";

}

//计算右键菜单的位置，并显示菜单
function PopMenuPosition() {
  var PopMenu;
  //PopMenu=$_("E_rbpm");

  PopMenu = $_("rmenu");

  //PopMenu = eval("E_rbpm");
  //HideAll("rbpm",0);
  PopMenu.style.display = "block";

  var RealPopMenu = $_("E_rbpm");

  HideAll("rbpm", 0);
  RealPopMenu.style.display = "block";



  var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  var w = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
  var h = Math.max(document.documentElement.clientHeight, document.body.clientHeight);


  var PopMenuLeft = scrollLeft + window.event.clientX;
  var PopMenuTop = scrollTop + window.event.clientY;

  //alert("PopMenu.offsetHeight="+PopMenu.offsetHeight+"\r\n PopMenu.offsetWidth="+PopMenu.offsetWidth+"\r\n h="+h+"\r\n w="+w+"\r\n window.event.clientY="+window.event.clientY+"\r\n window.event.clientX="+window.event.clientX+"\r\n scrollTop="+scrollTop+" \r\n scrollLeft="+scrollLeft+" \r\n PopMenuLeft="+PopMenuLeft+" \r\n PopMenuTop="+PopMenuTop);
  if (PopMenuLeft + PopMenu.offsetWidth > scrollLeft + w) {
    PopMenuLeft = scrollLeft + w - PopMenu.offsetWidth;
  }
  if (PopMenuLeft < 0) PopMenuLeft = 0;
  if (PopMenuTop + PopMenu.offsetHeight > scrollTop + h) {
    PopMenuTop = scrollTop + h - PopMenu.offsetHeight;
  }
  if (PopMenuTop < 0) PopMenuTop = 0;

  //alert("PopMenuLeft="+PopMenuLeft+" \r\n PopMenuTop="+PopMenuTop);
  PopMenu.style.left = PopMenuLeft + "px";
  PopMenu.style.top = PopMenuTop + "px";

}



//动态删除菜单
function del_ico_menu() {
  if ($_("rmenu")) {
    document.body.removeChild($_("rmenu"));
  }
}


//动态创建菜单
function create_ico_menu(menu) {
  var wrap = document.createElement("div");
  wrap.id = "rmenu";
  wrap.className = "rmenu";
  wrap.style.position = "absolute";
  wrap.style.border = "0px #ff0000 solid";
  wrap.style.top = "0px";
  wrap.style.left = "0px";
  wrap.style.zIndex = 20;

  //以下两个顺序不能错，否则，在IE8上会显示不出来菜单
  var ifr = document.createElement("iframe");
  ifr.src = "about:blank";
  ifr.style.position = "absolute";
  ifr.style.border = "0px #0000ff solid";
  ifr.style.top = "0px";
  ifr.style.left = "0px";
  ifr.style.zIndex = -1;
  wrap.appendChild(ifr);




  var mdiv = document.createElement("div");
  mdiv.style.position = "absolute";
  mdiv.style.border = "0px #00ff00 solid";
  mdiv.style.top = "0px";
  mdiv.style.left = "0px";
  mdiv.style.zIndex = 21;
  mdiv.style.width = "120px";
  mdiv.style.height = "auto";
  mdiv.innerHTML = menu.GetMenu();

  //WriteRemoteFile_(menu.GetMenu());

  wrap.appendChild(mdiv);



  document.body.appendChild(wrap);




  ifr.style.height = $_("E_rbpm").offsetHeight;
  ifr.style.width = $_("E_rbpm").offsetWidth;

}






