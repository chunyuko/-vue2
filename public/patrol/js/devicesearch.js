//区域的选中条件
var AreaSelectCondition = new Array()
var AreaSpacesCondition = new Array()
var FirstDevsCondition = new Array()
var DevSelfTypeCondition = new Array()
var DeviceDetialTypeCondition = new Array()
var FirstDevTypeCondition = new Array()

var DisabledFlagCondition = new Array()
var AlwaysUseDefaultValueCondition = new Array()
var ModelCreateFlagCondition = new Array()

var TempAreaFinalDT = new Array()

var CarListCondition = new Array()
var DeviceTypeCondition = new Array()
var IdentifyTypeCondition = new Array()

function AreaCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    AreaSelectCondition.pushnew(value)
    //window.frames['devicetreeifr'].SelectAreaDev_(value,true);
  } else {
    $_('DevArea_checkall').checked = false
    AreaSelectCondition.remove(value)
    //window.frames['devicetreeifr'].SelectAreaDev_(value,false);
  }
  RefreshParam()
}

/*
function unique(arr) {
  var result = [], hash = {};
  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}
*/

//采用先PUSH，再去重的方法，效率可以提高一倍
function AreaConditionSort() {
  window.frames['devicetreeifr'].FADT = []
  window.frames['devicetreeifr'].FADT.length = 0

  /*
  var isRepeated;
  var m=TempAreaFinalDT.length;

  for (var i=0;i<m; i++) 
  {
    isRepeated = false;
    var n=window.frames['devicetreeifr'].FADT.length;
    for (var j=0; j<n; j++)
    {
      if (TempAreaFinalDT[i].Area_Id == window.frames['devicetreeifr'].FADT[j].Area_Id)
      {
        isRepeated = true;
        break;
      }
    }
    if (!isRepeated) 
    {
      window.frames['devicetreeifr'].FADT.push(TempAreaFinalDT[i]);
    }
  }

  */
  TempAreaFinalDT.sort(function (x, y) {
    if (y.Area_Id > x.Area_Id) {
      return 1
    } else if (y.Area_Id < x.Area_Id) {
      return -1
    } else {
      return 0
    }
  })

  window.frames['devicetreeifr'].FADT.push(TempAreaFinalDT[0])
  var m = TempAreaFinalDT.length

  for (var i = 1; i < m; i++) {
    var n = window.frames['devicetreeifr'].FADT.length
    if (TempAreaFinalDT[i].Area_Id != window.frames['devicetreeifr'].FADT[n - 1].Area_Id) {
      window.frames['devicetreeifr'].FADT.push(TempAreaFinalDT[i])
    }
  }

  window.frames['devicetreeifr'].FADT.sort(function (x, y) {
    if (y.Area_Desc < x.Area_Desc) {
      return 1
    } else if (y.Area_Desc > x.Area_Desc) {
      return -1
    } else {
      return 0
    }
  })

  //	alert("l111="+window.frames['devicetreeifr'].FADT.length);
}

function SetAreaSelectCondition() {
  var o = document.getElementsByName('DevArea_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      AreaSelectCondition.pushnew(o[i].value)
    }
  }
}
function SetAreaSpacesCondition() {
  var o = document.getElementsByName('AreaSpaces_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      AreaSpacesCondition.pushnew(o[i].value)
    }
  }
}
function SetFirstDevTypeCondition() {
  var o = document.getElementsByName('FirstDevs_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      FirstDevTypeCondition.pushnew(o[i].value)
    }
  }
}

function SetCarListCondition() {
  var o = document.getElementsByName('CarList_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      CarListCondition.pushnew(o[i].value)
    }
  }
}

function SetDevSelfTypeCondition() {
  var o = document.getElementsByName('DevSelfType_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      DevSelfTypeCondition.pushnew(o[i].value)
    }
  }
}
function SetDeviceDetialTypeCondition() {
  var o = document.getElementsByName('DeviceDetialType_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      DeviceDetialTypeCondition.pushnew(o[i].value)
    }
  }
}

function SetDeviceTypeCondition() {
  var o = document.getElementsByName('DeviceType_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      DeviceTypeCondition.pushnew(o[i].value)
    }
  }
}

function SetIdentifyTypeCondition() {
  var o = document.getElementsByName('IdentifyType_c')
  var l = o.length
  for (var i = 0; i < l; i++) {
    if (o[i].checked == true) {
      IdentifyTypeCondition.pushnew(o[i].value)
    }
  }
}

var RefreshParamAndCheckAll = 0

var xmlHttpSearch
function RefreshParam() {
  if (RefreshParamAndCheckAll == 1) {
    SetAreaSelectCondition()
    SetAreaSpacesCondition()
    SetFirstDevTypeCondition()
    SetDevSelfTypeCondition()
    SetDeviceDetialTypeCondition()
    SetCarListCondition()
    SetDeviceTypeCondition()
    SetIdentifyTypeCondition()
  }

  var AreaSelectCondition_ = AreaSelectCondition.join('","')
  if (AreaSelectCondition_ != '') {
    AreaSelectCondition_ = '"' + AreaSelectCondition_ + '"'
  }

  var AreaSpacesCondition_ = AreaSpacesCondition.join('","')
  if (AreaSpacesCondition_ != '') {
    AreaSpacesCondition_ = '"' + AreaSpacesCondition_ + '"'
  }

  var FirstDevsCondition_ = FirstDevsCondition.join('","')
  if (FirstDevsCondition_ != '') {
    FirstDevsCondition_ = '"' + FirstDevsCondition_ + '"'
  }

  var DevSelfTypeCondition_ = DevSelfTypeCondition.join(',')

  var DeviceDetialTypeCondition_ = DeviceDetialTypeCondition.join(',')

  var FirstDevTypeCondition_ = FirstDevTypeCondition.join(',')

  var DisabledFlagCondition_ = DisabledFlagCondition.join(',')
  var AlwaysUseDefaultValueCondition_ = AlwaysUseDefaultValueCondition.join(',')
  var CarListCondition_ = CarListCondition.join(',')

  var DeviceTypeCondition_ = DeviceTypeCondition.join(',')
  var IdentifyTypeCondition_ = IdentifyTypeCondition.join(',')
  //如果选择建模的，同时又选择未建模的，等于什么也不选
  //alert("ModelCreateFlagCondition.length="+ModelCreateFlagCondition.length);
  if (ModelCreateFlagCondition.length > 1) {
    var ModelCreateFlagCondition_ = ''
  } else if (ModelCreateFlagCondition.length == 0) {
    var ModelCreateFlagCondition_ = ''
  } else {
    var ModelCreateFlagCondition_ = ModelCreateFlagCondition[0]
  }
  //alert("ModelCreateFlagCondition_="+ModelCreateFlagCondition_);
  var DeivceDescSearch = window.frames['devicetreeifr'].$_('DeviceSearch').value

  xmlHttpSearch = createXMLHttpRequest()

  try {
    var q =
      'task=query&AreaSelectCondition=' +
      AreaSelectCondition_ +
      '&AreaSpacesCondition=' +
      AreaSpacesCondition_ +
      '&FirstDevsCondition=' +
      FirstDevsCondition_ +
      '&DevSelfTypeCondition=' +
      DevSelfTypeCondition_ +
      '&DeviceDetialTypeCondition=' +
      DeviceDetialTypeCondition_ +
      '&FirstDevTypeCondition=' +
      FirstDevTypeCondition_ +
      '&DisabledFlagCondition=' +
      DisabledFlagCondition_ +
      '&AlwaysUseDefaultValueCondition=' +
      AlwaysUseDefaultValueCondition_ +
      '&ModelCreateFlagCondition=' +
      ModelCreateFlagCondition_ +
      '&DeivceDescSearch=' +
      encodeURIComponent(DeivceDescSearch) +
      '&CarListCondition=' +
      CarListCondition_
    q +=
      '&DeviceTypeCondition=' +
      DeviceTypeCondition_ +
      '&IdentifyTypeCondition=' +
      IdentifyTypeCondition_
    //		alert("q="+q);
    var url = '/dalirobotcms/ajax/querydevice.php'
    xmlHttpSearch.onreadystatechange = function () {
      RefreshParamRes()
    }
    xmlHttpSearch.open('post', url, true)
    //post这一句必须加上
    xmlHttpSearch.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpSearch.send(q)
  } catch (e) {
    alert(e)
  }
}

function RefreshParamRes() {
  if (xmlHttpSearch.readyState == 4) {
    if (xmlHttpSearch.status == 200) {
      var s = xmlHttpSearch.responseText
      //			alert(s);
      if (s == '') {
        alert('没有符合要求的结果！')

        return
      }

      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      s = s.replace(/[\\]/g, '\\\\')
      //var arr = eval(s);
      //alert(s);
      var arr = JSON.parse(s)
      window.frames['devicetreeifr'].ADDT = []
      window.frames['devicetreeifr'].ADDT.length = 0

      //			window.frames['devicetreeifr'].AllDev=[];
      //			window.frames['devicetreeifr'].AllDev.length=0;

      window.frames['devicetreeifr'].FADT = []
      window.frames['devicetreeifr'].FADT.length = 0
      TempAreaFinalDT = []
      TempAreaFinalDT.length = 0
      var l = arr.length
      //		alert("l="+l);
      if (l > 0) {
        for (var i = 0; i < l; i++) {
          if (arr[i].Area_Id && arr[i].SpaceID && arr[i].FirstDevID) {
            //在数据库中，会出现某些设备，没有任何上级关系
            //数据库中，会出现某些设备 没有上级 一次设备 或 间隔 或区域，会导致 树 显示有问题，这里过滤掉

            var objtemp = new FinalAreaObj(
              arr[i].Area_Id,
              arr[i].Area_Desc,
              arr[i].Station_ID,
              arr[i].AreaTreeLevel,
              0
            )
            TempAreaFinalDT.push(objtemp)

            var objtemp = new FinalAreaObj(arr[i].SpaceID, arr[i].SpaceDesc, arr[i].Area_Id, 2, 1)
            TempAreaFinalDT.push(objtemp)

            var objtemp = new FinalAreaObj(
              arr[i].FirstDevID,
              arr[i].FirstDevDesc,
              arr[i].SpaceID,
              3,
              2
            )
            TempAreaFinalDT.push(objtemp)

            var objtemp = new DevObj(
              arr[i].Device_Id,
              arr[i].Device_Desc,
              '',
              '',
              '',
              arr[i].DeviceType,
              arr[i].DeviceDetialType,
              '',
              '',
              '',
              '',
              '',
              '',
              arr[i].Preset_Id,
              '',
              '',
              '',
              arr[i].FirstDevID,
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              1,
              arr[i].Device_Desc,
              arr[i].RFID,
              ''
            )
            //pao效率较低，此处一般不会出现重复的内容，所以直接push
            //window.frames['devicetreeifr'].ADDT.pao(objtemp,'Device_Id');
            window.frames['devicetreeifr'].ADDT.push(objtemp)
            //						window.frames['devicetreeifr'].AllDev.push(objtemp);
          }
        }
        //				alert("RootAreaID="+window.parent.parent.parent.RootAreaID);
        //				alert(TempAreaFinalDT.length);

        for (var i = 0; i < l; i++) {
          if (arr[i].Area_Id && arr[i].SpaceID && arr[i].FirstDevID) {
            //在数据库中，会出现某些设备，没有任何上级关系
            //数据库中，会出现某些设备 没有上级 一次设备 或 间隔 或区域，会导致 树 显示有问题，这里过滤掉
            var objtemp = new FinalAreaObj(arr[i].StationID, arr[i].StationName, '-1', 0, 0)
            //						TempAreaFinalDT.pao(objtemp,'Area_Id');
            TempAreaFinalDT.push(objtemp)
          }
        }

        //				alert(TempAreaFinalDT.length);
        //把根区域push进去，必须有，否则树无法生成
        //				var objtemp=new FinalAreaObj(window.parent.parent.parent.RootAreaID,window.parent.parent.parent.RootAreaDesc,'-1',0,0);
        //				TempAreaFinalDT.push(objtemp);

        //alert("push ok");
        AreaConditionSort()
        //alert("order ok");
      } else {
        //alert("没有符合要求的结果！");
        //return false;
      }

      window.frames['devicetreeifr'].CreateTree()
      if (RefreshParamAndCheckAll == 1) {
        window.frames['devicetreeifr'].SelectAllTree()
      }

      RefreshParamAndCheckAll = 0
    }
  }
}

function IdentifyTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    IdentifyTypeCondition.pushnew(value)
  } else {
    $_('DeviceType_checkall').checked = false
    IdentifyTypeCondition.remove(value)
  }
  console.log(IdentifyTypeCondition)
  RefreshParam()
}

function DeviceTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    DeviceTypeCondition.pushnew(value)
  } else {
    $_('DeviceType_checkall').checked = false
    DeviceTypeCondition.remove(value)
  }
  //	console.log(DeviceTypeCondition);
  RefreshParam()
}

function AreaSpacesCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    AreaSpacesCondition.pushnew(value)
  } else {
    $_('AreaSpaces_checkall').checked = false
    AreaSpacesCondition.remove(value)
  }
  RefreshParam()
}
function FirstDevsCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    FirstDevsCondition.pushnew(value)
  } else {
    FirstDevsCondition.remove(value)
  }
  RefreshParam()
}

function AppearTypeCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      FirstDevTypeCondition.pushnew(value)
    } else {
      FirstDevTypeCondition.remove(value)
    }
  }
  RefreshParam()
}
function PointSourTypeCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      FirstDevTypeCondition.pushnew(value)
    } else {
      FirstDevTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function RunPathTypeCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')
//   purge();
//   console.log("obj.value:"+obj.value)
  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      FirstDevTypeCondition.pushnew(value)
    } else {
      FirstDevTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function FirstDevTypeCheckCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      FirstDevTypeCondition.pushnew(value)
    } else {
      FirstDevTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function DisabledFlagCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      DisabledFlagCondition.pushnew(value)
    } else {
      DisabledFlagCondition.remove(value)
    }
  }
  RefreshParam()
}

function AlwaysUseDefaultValueCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      AlwaysUseDefaultValueCondition.pushnew(value)
    } else {
      AlwaysUseDefaultValueCondition.remove(value)
    }
  }
  RefreshParam()
}

function ModelCreateFlagCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      ModelCreateFlagCondition.pushnew(value)
    } else {
      ModelCreateFlagCondition.remove(value)
    }
  }
  RefreshParam()
}
function DeviceDetialTypeCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      DeviceDetialTypeCondition.pushnew(value)
    } else {
      DeviceDetialTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function DevSelfTypeCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      DevSelfTypeCondition.pushnew(value)
    } else {
      DevSelfTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function CarListCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      CarListCondition.pushnew(value)
    } else {
      CarListCondition.remove(value)
    }
  }
  RefreshParam()
}

function AreaCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      AreaSelectCondition.pushnew(value)
    } else {
      AreaSelectCondition.remove(value)
    }
  }
  RefreshParam()
}

function IdentifyTypeAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      IdentifyTypeCondition.pushnew(value)
    } else {
      IdentifyTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function DeviceTypeCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      DeviceTypeCondition.pushnew(value)
    } else {
      DeviceTypeCondition.remove(value)
    }
  }
  RefreshParam()
}

function AreaSpacesCheckAll(idstr) {
  var obj = $_(idstr + '_checkall')
  var ele = document.getElementsByName(idstr + '_c')

  if (obj.value == '0') {
    obj.checked = true
    obj.value = '1'
  } else {
    obj.checked = false
    obj.value = '0'
  }

  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = obj.checked

    var value = ele[i].value
    //alert("value="+value);
    if (ele[i].checked == true) {
      AreaSpacesCondition.pushnew(value)
    } else {
      AreaSpacesCondition.remove(value)
    }
  }
  RefreshParam()
}

function RunPathTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    FirstDevTypeCondition.pushnew(value)
  } else {
    $_('InspectionType_checkall').checked = false
    FirstDevTypeCondition.remove(value)
  }
  RefreshParam()
}

function AppearTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    FirstDevTypeCondition.pushnew(value)
  } else {
    $_('AppearType_checkall').checked = false
    FirstDevTypeCondition.remove(value)
  }
  RefreshParam()
}

function PointSourTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    FirstDevTypeCondition.pushnew(value)
  } else {
    $_('PointSourType_checkall').checked = false
    FirstDevTypeCondition.remove(value)
  }
  RefreshParam()
}

function FirstDevTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    FirstDevTypeCondition.pushnew(value)
  } else {
    $_('FirstDevs_checkall').checked = false
    FirstDevTypeCondition.remove(value)
  }
  RefreshParam()
}

function CarListCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    CarListCondition.pushnew(value)
  } else {
    $_('CarList_checkall').checked = false
    CarListCondition.remove(value)
  }
  RefreshParam()
}

function DevSelfTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    DevSelfTypeCondition.pushnew(value)
  } else {
    $_('DevSelfType_checkall').checked = false
    DevSelfTypeCondition.remove(value)
  }
  RefreshParam()
}
function DeviceDetialTypeCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    DeviceDetialTypeCondition.pushnew(value)
  } else {
    $_('DeviceDetialType_checkall').checked = false
    DeviceDetialTypeCondition.remove(value)
  }
  RefreshParam()
}

function DisabledFlagCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    DisabledFlagCondition.pushnew(value)
  } else {
    $_('DisabledFlag_checkall').checked = false
    DisabledFlagCondition.remove(value)
  }
  RefreshParam()
}

function AlwaysUseDefaultValueCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    AlwaysUseDefaultValueCondition.pushnew(value)
  } else {
    $_('AlwaysUseDefaultValue_checkall').checked = false
    AlwaysUseDefaultValueCondition.remove(value)
  }
  RefreshParam()
}

function ModelCreateFlagCheck() {
  var idname = this.name
  var idstr = idname.substring(0, idname.length - 2) //在每个checkbox的name中，加了一个“_c”的后缀
  var value = this.value
  if (this.checked == true) {
    ModelCreateFlagCondition.pushnew(value)
  } else {
    $_('ModelCreateFlag_checkall').checked = false
    ModelCreateFlagCondition.remove(value)
  }
  RefreshParam()
}

///////////////////////////////////////////////////////////////////根据条件去数据库中查找符合条件的设备，重新生成树
