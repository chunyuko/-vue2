//id:节点ID
//pid：节点的上级节点ID
//name:节点的名字
//url:节点的链接
//tid：用于在节点前显示checkbox时，作为该CHECKBOX的ID
//target:节点的target:_blank,_self....
//input: 用于在节点前显示checkbox时，该checkbox的onclick事件
//icon:节点前显示的图标地址
//iconOpen:节点前显示的图标（打开状态）的地址
//open:
//title:节点的title属性值
//alarmAction:在icon的前面增加了一个报警状态的图片，alarmAction即报警时，点击该图片所处理的动作
//icoFlag：用来区分该节点的性质：icoFlag=1表示该节点时具体的设备，为0表示是区域
//TreeType：用来区分点击机器人时是否需要收缩树,双击摄像机时是否需要打开视频
function Node(
  id,
  pid,
  name,
  url,
  tid,
  target,
  input,
  icon,
  iconOpen,
  open,
  title,
  alarmAction,
  icoFlag,
  TreeImgOnDblClick,
  TreeType
) {
  this.id = id
  this.pid = pid
  this.name = name
  this.url = url
  this.title = title
  this.target = target
  this.tid = tid
  this.input = input
  this.icon = icon
  this.iconOpen = iconOpen
  this.icoFlag = icoFlag
  this.alarmAction = alarmAction
  this.TreeImgOnDblClick = TreeImgOnDblClick
  this._io = open || false
  this._is = false
  this._ls = false
  this._hc = false //是否有下级
  this._ai = 0
  this._p
  this.TreeType = TreeType
}

// 树对象默认设置

function dTree(objName) {
  this.config = {
    target: null,
    folderLinks: true,
    useSelection: true,
    useCookies: true,
    useLines: true,
    useIcons: false,
    useStatusText: false,
    closeSameLevel: false,
    inOrder: false,
  }

  this.icon = {
    root: 'img/area.png',
    folder: 'img/folder.gif',
    folderOpen: 'img/folderopen.gif',
    node: 'img/page.gif',
    empty: 'e.gif',
    //		line				: 'l.gif',
    line: '',
    //		join				: 'j.gif',
    join: '',
    //		joinBottom	: 'b.gif',
    joinBottom: '',
    plus: 'img/p.gif',
    plus2: 'img/p2.gif',
    plusBottom: 'img/plusbottom.gif',
    plusBottom2: 'img/plusbottom2.gif',
    minus: 'img/m.gif',
    minus2: 'img/m2.gif',
    minusBottom: 'img/minusbottom.gif',
    minusBottom2: 'img/minusbottom2.gif',
    nlPlus: 'img/nolines_plus.gif',
    nlMinus: 'img/nolines_minus.gif',
  }

  this.obj = objName
  this.aNodes = []
  this.aIndent = []
  this.root = new Node(-1)
  this.selectedNode = null
  this.selectedFound = false
  this.completed = false
}

// 添加新节点的数组,
//dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open) {
//	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
//};

// 添加新节点的数组,
dTree.prototype.add = function (
  id,
  pid,
  name,
  url,
  tid,
  target,
  input,
  icon,
  iconOpen,
  open,
  title,
  alarmAction,
  icoFlag,
  TreeImgOnDblClick,
  TreeType
) {
  this.aNodes[this.aNodes.length] = new Node(
    id,
    pid,
    name,
    url,
    tid,
    target,
    input,
    icon,
    iconOpen,
    open,
    title,
    alarmAction,
    icoFlag,
    TreeImgOnDblClick,
    TreeType
  )
}

// 展开全部节点

dTree.prototype.openAll = function () {
  this.oAll(true)
  //getOnline("");
}

// 折叠全部节点
dTree.prototype.closeAll = function () {
  this.oAll(false)
}

//输出页面
dTree.prototype.toString = function () {
  var str = '<div class="dtree">\n'
  if (document.getElementById) {
    if (this.config.useCookies) {
      this.selectedNode = this.getSelected()
    }
    str += this.addNode(this.root)
  } else {
    str += '浏览器不支持'
  }
  str += '</div>'
  if (!this.selectedFound) {
    this.selectedNode = null
  }
  this.completed = true
  return str
}

// 创建树结构
dTree.prototype.addNode = function (pNode) {
  var str = ''
  var n = 0
  if (this.config.inOrder) {
    n = pNode._ai
  }
  //	alert("this.aNodes.length="+this.aNodes.length);
  for (n; n < this.aNodes.length; n++) {
    //alert("this.aNodes[n].pid="+this.aNodes[n].pid+" \r\n pNode.id="+pNode.id);
    if (this.aNodes[n].pid == pNode.id) {
      var cn = this.aNodes[n]
      cn._p = pNode
      cn._ai = n
      this.setCS(cn)
      if (!cn.target && this.config.target) {
        cn.target = this.config.target
      }
      if (cn._hc && !cn._io && this.config.useCookies) {
        cn._io = this.isOpen(cn.id)
      }
      if (!this.config.folderLinks && cn._hc) {
        cn.url = null
      }
      if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
        cn._is = true
        this.selectedNode = n
        this.selectedFound = true
      }
      str += this.node(cn, n)
      //alert("str==="+str);
      if (cn._ls) {
        break
      }
    }
  }
  //alert("str="+str);
  return str
}

// 创建树的图片,链接,文字
dTree.prototype.node = function (node, nodeId) {
  var str = '<div class="dTN">' + this.indent(node, nodeId)
  if (this.config.useIcons) {
    if (!node.icon)
      node.icon =
        this.root.id == node.pid ? this.icon.root : node._hc ? this.icon.folder : this.icon.node
    if (!node.iconOpen) node.iconOpen = node._hc ? this.icon.folderOpen : this.icon.node
    if (this.root.id == node.pid) {
      node.icon = this.icon.root
      node.iconOpen = this.icon.root
    }

    ////////////////////////////////////////////////选择框部分
    if (node.tid) {
      str += '<input name="G" type="checkbox" ' + node.input + ' id="' + node.tid + '">'
    }
    //////////////////////////////////////////告警图标部分
    /*
		if(node.icoFlag==1 || node.icoFlag==0)
		{
			str += '<img alt="单击显示告警详情" title="单击显示告警详情" id="' + node.id + '_al" src="img/almico.png" class="AlarmIco" ';
			if(node.alarmAction){str += 'onclick="'+node.alarmAction+'"';}
			str += '>';
		}
		*/

    //////////////////////////////////////////////////设备图标部分

    str += '<img '
    //表示是具体的设备
    if (node.icoFlag == 1) {
      str += 'id="' + node.id + '_dev"'
    }
    //表示是区域
    else if (node.icoFlag == 0) {
      str += 'id="i' + this.obj + nodeId + '"'
    }
    //表示是预置点
    else if (node.icoFlag == 2) {
      str += 'id="' + node.id + '_preset"'
    }

    str += ' src="' + (node._io ? node.iconOpen : node.icon) + '"'
    if (node.TreeImgOnDblClick) {
      str += node.TreeImgOnDblClick
    }
    str += '>'
  } else {
    ////////////////////////////////////////////////选择框部分
    if (node.tid) {
      str += '<input name="G" type="checkbox" ' + node.input + ' id="' + node.tid + '">'
    }
  }

  ///////////////////////////////////////////////////////设备名称部分
  if (node.url) {
    str +=
      '<a id="' +
      node.id +
      '_' +
      this.obj +
      nodeId +
      '_sa" class="' +
      (this.config.useSelection ? (node._is ? 'nodeSel' : 'node') : 'node') +
      '" href="javascript:void(0);" onclick="' +
      node.url +
      '"'
    if (node.title) {
      str += ' title="' + node.title + '"'
    }
    if (node.target) {
      str += ' target="' + node.target + '"'
    }
    if (this.config.useStatusText) {
      str +=
        ' onmouseover="window.status=\'' +
        node.name +
        '\';return true;" onmouseout="window.status=\'\';return true;" '
    }
    if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc)) {
      str += ' onclick="javascript:' + this.obj + '.s(' + nodeId + ');"'
    }
    str += '>'
  } else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id) {
    //		alert("node.TreeType="+node.TreeType);
    if (node.TreeType == 'CameraTree') {
      str += '<a href="#" class="node">'
    } else {
      str += '<a href="javascript:' + this.obj + '.o(' + nodeId + ');" class="node">'
    }
  }
  /*
	为了显示效率，去掉这部分
	if(node.icoFlag==1)
	{
		str+="<span id='" + node.id + "_nm'>"+node.name+"</span>";
	}
	else if(node.icoFlag==2)
	{
		str+="<span id='" + node.id + "_pnm'>"+node.name+"</span>";
	}
	else if(node.icoFlag==0)
	{
		str+="<span id='" + node.id + "_nm'>"+node.name+"</span>";
	}
	*/
  //设备
  if (node.icoFlag == 1) {
    str += "<span id='" + node.id + "_dn' onclick='SelectChildNode(\"" + node.id + '");\''
    //		console.log(node.TreeType);
    if (node.TreeType == 'CameraGroupTree') {
      str += 'ondblclick=\'OpenVideoFun("' + node.id + '",0);\''
    }
    str += '>' + node.name + '</span>'
    //str+=node.name;
  }
  //区域
  else if (node.icoFlag == 0) {
    str +=
      "<span id='" +
      node.id +
      "_an' onclick='SelectNode(\"" +
      node.id +
      '");\'>' +
      node.name +
      '</span>'
  }
  if (node.url || ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id))
    str += '</a>'

  str += '</div>'
  if (node._hc) {
    str +=
      '<div id="d' +
      this.obj +
      nodeId +
      '" class="clip" style="display:' +
      (this.root.id == node.pid || node._io ? 'block' : 'none') +
      ';">'
    str += this.addNode(node)
    str += '</div>'
  }
  this.aIndent.pop()
  //alert(str);
  return str
}

// Adds the empty and line icons
dTree.prototype.indent = function (node, nodeId) {
  var str = ''
  if (this.root.id != node.pid) {
    for (var n = 0; n < this.aIndent.length; n++) {
      //20220906为了节省内存
      str +=
        '<img src="' +
        (this.aIndent[n] == 1 && this.config.useLines ? this.icon.line : this.icon.empty) +
        '">'
    }
    node._ls ? this.aIndent.push(0) : this.aIndent.push(1)
    if (node._hc) {
      str +=
        '<img onclick="' + this.obj + '.o(' + nodeId + ');" id="j' + this.obj + nodeId + '" src="'
      //str += '<a href="javascript:' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
      if (!this.config.useLines) str += node._io ? this.icon.nlMinus : this.icon.nlPlus
      else {
        if (PageStyle == 0) {
          str += node._io
            ? node._ls && this.config.useLines
              ? this.icon.minusBottom2
              : this.icon.minus2
            : node._ls && this.config.useLines
            ? this.icon.plusBottom2
            : this.icon.plus2
        } else {
          str += node._io
            ? node._ls && this.config.useLines
              ? this.icon.minusBottom
              : this.icon.minus
            : node._ls && this.config.useLines
            ? this.icon.plusBottom
            : this.icon.plus
        }
      }

      //str += '"></a>';
      str += '">'
    }
    //		else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '">';
    else
      str +=
        '<img src="' +
        (this.config.useLines
          ? node._ls
            ? this.icon.joinBottom
            : this.icon.join
          : this.icon.empty) +
        '">'
  }
  return str
}

// Checks if a node has any children and if it is the last sibling

dTree.prototype.setCS = function (node) {
  var lastId
  for (var n = 0; n < this.aNodes.length; n++) {
    if (this.aNodes[n].pid == node.id) {
      node._hc = true
    }
    if (this.aNodes[n].pid == node.pid) {
      lastId = this.aNodes[n].id
    }
  }
  if (lastId == node.id) {
    node._ls = true
  }
}

// Returns the selected node

dTree.prototype.getSelected = function () {
  var sn = this.getCookie('cs' + this.obj)

  return sn ? sn : null
}

// Highlights the selected node

dTree.prototype.s = function (id) {
  if (!this.config.useSelection) return

  var cn = this.aNodes[id]

  if (cn._hc && !this.config.folderLinks) return

  if (this.selectedNode != id) {
    if (this.selectedNode || this.selectedNode == 0) {
      eOld = document.getElementById('s' + this.obj + this.selectedNode)

      eOld.className = 'node'
    }

    eNew = document.getElementById('s' + this.obj + id)

    eNew.className = 'nodeSel'

    this.selectedNode = id

    if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id)
  }
}

// Toggle Open or close

dTree.prototype.o = function (id) {
  var cn = this.aNodes[id]

  this.nodeStatus(!cn._io, id, cn._ls)

  cn._io = !cn._io

  if (this.config.closeSameLevel) this.closeLevel(cn)

  if (this.config.useCookies) this.updateCookie()

  //getOnline("")
}

// Open or close all nodes

dTree.prototype.oAll = function (status) {
  for (var n = 0; n < this.aNodes.length; n++) {
    if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
      this.nodeStatus(status, n, this.aNodes[n]._ls)

      this.aNodes[n]._io = status
    }
  }

  if (this.config.useCookies) this.updateCookie()
}

// Opens the tree to a specific node

dTree.prototype.openTo = function (nId, bSelect, bFirst) {
  if (!bFirst) {
    for (var n = 0; n < this.aNodes.length; n++) {
      if (this.aNodes[n].id == nId) {
        nId = n

        break
      }
    }
  }

  var cn = this.aNodes[nId]

  if (cn.pid == this.root.id || !cn._p) return

  cn._io = true

  cn._is = bSelect

  if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls)

  if (this.completed && bSelect) this.s(cn._ai)
  else if (bSelect) this._sn = cn._ai

  this.openTo(cn._p._ai, false, true)
}

// Closes all nodes on the same level as certain node

dTree.prototype.closeLevel = function (node) {
  for (var n = 0; n < this.aNodes.length; n++) {
    if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
      this.nodeStatus(false, n, this.aNodes[n]._ls)

      this.aNodes[n]._io = false

      this.closeAllChildren(this.aNodes[n])
    }
  }
}

// Closes all children of a node

dTree.prototype.closeAllChildren = function (node) {
  for (var n = 0; n < this.aNodes.length; n++) {
    if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
      if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls)

      this.aNodes[n]._io = false

      this.closeAllChildren(this.aNodes[n])
    }
  }
}

// Change the status of a node(open or closed)

dTree.prototype.nodeStatus = function (status, id, bottom) {
  eDiv = document.getElementById('d' + this.obj + id)

  eJoin = document.getElementById('j' + this.obj + id)
  /*
	if (this.config.useIcons) {

		eIcon	= document.getElementById('i' + this.obj + id);

		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;

	}
*/
  if (PageStyle == 0) {
    eJoin.src = this.config.useLines
      ? status
        ? bottom
          ? this.icon.minusBottom2
          : this.icon.minus2
        : bottom
        ? this.icon.plusBottom2
        : this.icon.plus2
      : status
      ? this.icon.nlMinus
      : this.icon.nlPlus
  } else {
    eJoin.src = this.config.useLines
      ? status
        ? bottom
          ? this.icon.minusBottom
          : this.icon.minus
        : bottom
        ? this.icon.plusBottom
        : this.icon.plus
      : status
      ? this.icon.nlMinus
      : this.icon.nlPlus
  }

  eDiv.style.display = status ? 'block' : 'none'
}

// [Cookie] Clears a cookie

dTree.prototype.clearCookie = function () {
  var now = new Date()

  var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24)

  this.setCookie('co' + this.obj, 'cookieValue', yesterday)

  this.setCookie('cs' + this.obj, 'cookieValue', yesterday)
}

// [Cookie] Sets value in a cookie

dTree.prototype.setCookie = function (cookieName, cookieValue, expires, path, domain, secure) {
  document.cookie =
    escape(cookieName) +
    '=' +
    escape(cookieValue) +
    (expires ? '; expires=' + expires.toGMTString() : '') +
    (path ? '; path=' + path : '') +
    (domain ? '; domain=' + domain : '') +
    (secure ? '; secure' : '')
}

// [Cookie] Gets a value from a cookie

dTree.prototype.getCookie = function (cookieName) {
  var cookieValue = ''

  var posName = document.cookie.indexOf(escape(cookieName) + '=')

  if (posName != -1) {
    var posValue = posName + (escape(cookieName) + '=').length

    var endPos = document.cookie.indexOf(';', posValue)

    if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos))
    else cookieValue = unescape(document.cookie.substring(posValue))
  }
  return cookieValue
}

// [Cookie] Returns ids of open nodes as a string

dTree.prototype.updateCookie = function () {
  var str = ''

  for (var n = 0; n < this.aNodes.length; n++) {
    if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
      if (str) str += '.'

      str += this.aNodes[n].id
    }
  }

  this.setCookie('co' + this.obj, str)
}

// [Cookie] Checks if a node id is in a cookie

dTree.prototype.isOpen = function (id) {
  var aOpen = this.getCookie('co' + this.obj).split('.')

  for (var n = 0; n < aOpen.length; n++) if (aOpen[n] == id) return true

  return false
}

// If Push and pop is not implemented by the browser

if (!Array.prototype.push) {
  Array.prototype.push = function array_push() {
    for (var i = 0; i < arguments.length; i++) this[this.length] = arguments[i]

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
