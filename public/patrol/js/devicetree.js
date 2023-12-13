//将PHP变量传递给JS
//是否显示选择框
var allRequest = new Object();
allRequest = GetRequest();


var checkboxFlag=GetRequestAll('checkboxFlag');
//设备是否能点击
var ItemClickFlag=GetRequestAll('ItemClickFlag');

//将设置为“不显示”的点位也显示出来
var AllDevList=GetRequestAll('AllDevList');
//打开页面时，是否就直接生成树
var NotCreateTreeFlag=GetRequestAll('NotCreateTreeFlag');
var CheckAreaExistDevFlag=GetRequestAll('CheckAreaExistDevFlag');
var DtreeAutoSelectType=GetRequestAll('DtreeAutoSelectType');
var InspectionLog_ID=GetRequestAll('InspectionLog_ID');
var MapSelectArea=GetRequestAll('MapSelectArea');
var UseRightKeyMenuFlag=GetRequestAll('UseRightKeyMenuFlag');
var RightKeyFrom=GetRequestAll('RightKeyFrom');
var ParentUrl=GetRequestAll('ParentUrl');


//js中，直接var ADDT=window.parent.parent.parent.parent.AllDev，其实仍是同一个对象，类似与C的指针
//slice是复制一个
//var oldNodeIndex = 0;//用于记录上次打开的是哪个节点
var PageStyle=window.parent.parent.parent.PageStyle;

if(PageStyle==0){
	var plusBottom='img/plusbottom2.gif';
	var minusBottom='img/minusbottom2.gif';
}else{
	var plusBottom='img/plusbottom.gif';
	var minusBottom='img/minusbottom.gif';
}


function resizepage()
{
    var wh=pagesize();
    var bw=parseInt(wh.w);
    var bh=parseInt(document.documentElement.clientHeight);


    $_("TreeContent").style.height=(bh-160)+"px";

//	alert($_("TreeContent").style.height);

}

//alert("AllDevList="+AllDevList+"\r\n ItemClickFlag="+ItemClickFlag);
var ADDT =new Array();
var AllDev =new Array();
//alert("AllDevList="+AllDevList);

//if(AllDevList==1)
//{
//	GetDeviceInfo();
//}
//else
//{
//	ADDT=window.parent.parent.parent.parent.AllDev.slice(0);
////	AllDev=window.parent.parent.parent.parent.AllDev.slice(0);
//}
//var FADT=window.parent.parent.parent.parent.FinalArea.slice(0);
var FADT=[];

var TreeJSN="";
//alert(ADDT.length);





//这三个没用
var AllAreaDT=window.parent.parent.parent.parent.AllArea.slice(0);
var AllSpaceT=window.parent.parent.parent.parent.AllSpace.slice(0);
var AllFirstDevT=window.parent.parent.parent.parent.AllFirstDev.slice(0);


//disobjcontent(FADT[0]);

//存在设备的区域
var AreaInfoExistDev=new Array();

//选中设备
var SelectDev=new Array();
//选中主设备
var SelectFirstDev=new Array();
//选中间隔设备
var SelectSpaceDev=new Array();
var AllArea=new Array();
var FinalArea=new Array();
var xmlHttpGetAreaInfo="";
var StationID="";

function GetAreaInfo()
{
	StationID=get_ele_value("StationID");
	xmlHttpGetAreaInfo=createXMLHttpRequest();
  try
  {
		var url = "/dalirobotcms/ajax/updatearea.php?task=GetAllAreaByStation&StationID="+StationID;
//		alert("url="+url);
		xmlHttpGetAreaInfo.onreadystatechange=function(){GetAreaInfoRes();};
		xmlHttpGetAreaInfo.open("get", url, false);
		//post这一句必须加上
		xmlHttpGetAreaInfo.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlHttpGetAreaInfo.send(null);
  }
  catch(e){alert(e);}
}
function GetAreaInfoRes()
{
  if(xmlHttpGetAreaInfo.readyState == 4)
  {
    if(xmlHttpGetAreaInfo.status == 200)
    {
		var s=xmlHttpGetAreaInfo.responseText;
//			alert(s);
		if(s =="")
		{
			//alert("获取地图文件失败！");
			return false;
		}
		
		 var reg = /[\r\n]/g
	      s = s.replace(reg, '')
	      AllArea.length = 0
	      AllArea = []
	      var arr = JSON.parse(s)
	      var l = arr.length
	      //alert("l="+l);
	      for (var i = 0; i < l; i++) {
	        if (arr[i]['Parent_Id'] == -1) {
	          RootAreaID = arr[i]['Area_Id']
	          RootAreaDesc = arr[i]['Area_Desc']
	
	          //					alert("RootAreaDesc="+RootAreaDesc);
	        }
	
	        var objtemp = new AreaObj(
	          arr[i]['Area_Id'],
	          arr[i]['Area_Desc'],
	          arr[i]['Parent_Id'],
	          arr[i]['TreeLevel'],
	          arr[i]['Station_ID'],
	          arr[i]['AreaTID'],
	          arr[i]['StationAreaDesc']
	        )
	        AllArea.pao(objtemp, 'Area_Id')
	       
	      }
		AddSpaceFirstToArea();
		GetDeviceInfo();
		
	}
  }
}

//把区域信息，间隔信息、一次设备信息，都添加到统一的区域信息中去
function AddSpaceFirstToArea() {
  FinalArea.length = 0
  FinalArea = []
  var AreaLen = AllArea.length
//alert("AreaLen="+AreaLen);
  for (var i = 0; i < AreaLen; i++) {
    var objtemp = new FinalAreaObj(
      AllArea[i].Area_Id,
      AllArea[i].Area_Desc,
      AllArea[i].Parent_Id,
      AllArea[i].TreeLevel,
      0
    )
    FinalArea.pao(objtemp, 'Area_Id')
  }

  var SpaceLen = window.parent.parent.parent.AllSpace.length
//alert("SpaceLen="+SpaceLen);
  for (var n = 0; n < AreaLen; n++) {
  	var AreaId=AllArea[n].Area_Id;
//	alert("AreaId1111="+AreaId);
	  for (var i = 0; i < SpaceLen; i++) {
//	  	alert("AreaId2222="+window.parent.parent.parent.AllSpace[i].Area_Id);
	  	if(window.parent.parent.parent.AllSpace[i].Area_Id===AreaId){
	  		var objtemp = new FinalAreaObj(
		      window.parent.parent.parent.AllSpace[i].SpaceID,
		      window.parent.parent.parent.AllSpace[i].SpaceDesc,
		      window.parent.parent.parent.AllSpace[i].Area_Id,
		      4,
		      1
		    )
		    FinalArea.pao(objtemp, 'Area_Id')
	  	}
	  }
  }

  var FirstLen = window.parent.parent.parent.AllFirstDev.length
//alert("AllFirstDev.length="+AllFirstDev.length);
	for (var n = 0; n < SpaceLen; n++) {
		var SpaceID=window.parent.parent.parent.AllSpace[n].SpaceID;
	  	for (var i = 0; i < FirstLen; i++) {
	  		if(window.parent.parent.parent.AllFirstDev[i].SpaceID==SpaceID)
	  		{
	  			var objtemp = new FinalAreaObj(
			      window.parent.parent.parent.AllFirstDev[i].FirstDevID,
			      window.parent.parent.parent.AllFirstDev[i].FirstDevDesc,
			      window.parent.parent.parent.AllFirstDev[i].SpaceID,
			      5,
			      2
			    )
		    	FinalArea.pao(objtemp, 'Area_Id')
	  		}
	  }
	}

  //按区域名字排序
  FinalArea.sort(function (x, y) {
    if (y.Area_Desc < x.Area_Desc) {
      return 1
    } else if (y.Area_Desc > x.Area_Desc) {
      return -1
    } else {
      return 0
    }
  })
}

var xmlHttpAllDev="";
function GetDeviceInfo()
{
	StationID=get_ele_value("StationID");
	xmlHttpAllDev=createXMLHttpRequest();
  try
  {
		var url = "/dalirobotcms/ajax/getdeivcedata.php?SearchDeviceType=All&StationID="+StationID;
//		alert("url="+url);
		xmlHttpAllDev.onreadystatechange=function(){GetAllDevRes();};
		xmlHttpAllDev.open("get", url, false);
		//post这一句必须加上
		xmlHttpAllDev.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlHttpAllDev.send(null);
  }
  catch(e){alert(e);}
}

function GetAllDevRes()
{
  if(xmlHttpAllDev.readyState == 4)
  {
    if(xmlHttpAllDev.status == 200)
    {
		var s=xmlHttpAllDev.responseText;
//			alert(s);
		if(s =="")
		{
			//alert("获取地图文件失败！");
			return false;
		}
		
		var reg = /[\r\n]/g; 
		s=s.replace(reg,"");
		//var arr = eval(s);
		ADDT.length=0;
		ADDT=[];
		AllDev.length=0;
		AllDev=[];
		var arr =JSON.parse(s);
		var l=arr.length;
		//alert("l="+l);
		for(var i=0;i<l;i++)
		{
			
      		var objtemp=new DevObj(arr[i]['Device_Id'],arr[i]['DisDevName'],arr[i]['Area_Id'],arr[i]['Inspection_Id'],arr[i]['Device_Pri'],arr[i]['DeviceType'],arr[i]['DeviceDetialType'],arr[i]['Result_Unit'],arr[i]['Normal_Low'],arr[i]['Normal_High'],arr[i]['Bug_Desc'],arr[i]['Deal_Method'],arr[i]['Alarm_Flag'],arr[i]['Preset_Id'],arr[i]['AreaDevType'],arr[i]['DevSelfType'],arr[i]['DevNameTID'],arr[i]['FirstDevID'],arr[i]['VolLevel'],arr[i]['SideFlag'],arr[i]['DevDescT'],arr[i]['FirstDevType'],arr[i]['AlarmTemp1'],arr[i]['AlarmTemp2'],arr[i]['AlarmTemp3'],arr[i]['AlarmXianDuiCha1'],arr[i]['AlarmXianDuiCha2'],arr[i]['AlarmXianDuiCha3'],arr[i]['XianJianWenCha'],arr[i]['DefaultValue'],arr[i]['Rec_Time'],arr[i]['DisabledFlag'],arr[i]['Form'],arr[i]['Device_Desc'],arr[i]['BestScore'],arr[i]['AlwaysUseDefaultValue'],arr[i]['DeviceID'],arr[i]['CompDeviceID'],arr[i]['SpaceID'],arr[i]['CarID'],arr[i]['fajiID'],arr[i]['DisplayOrNot'],arr[i]['Device_Desc'],arr[i]['RFID'],arr[i]['IdentifyType'],arr[i]['RFIDAutoInspect'],arr[i]['ExportDiffValue'],arr[i]['Mulriple'],arr[i]['MeterIdentifyMode'],arr[i]['ComDevID'],arr[i]['ComName'],arr[i]['DevIDGrid'],arr[i]['OneKeyCtrl'],arr[i]['ImportantLevel'],arr[i]['GatewayID']);
			//pao效率较低，此处一般不会出现重复的内容，所以直接push
			//AllDev.pao(objtemp,'Device_Id');
			ADDT.push(objtemp);
			AllDev.push(objtemp);
		}	
		CreateTree();
		
	}
  }
}

function UnloadPage()
{

}

function Unload()
{

}

function UnSelectAll()
{
	//alert("window.parent.parent.parent.RootAreaID="+window.parent.parent.parent.RootAreaID);
	//SAD_(window.parent.parent.parent.RootAreaID,false);
	
	UnSelectTree();
	
	
}

function SAD(ids,DevArray,AreaArray)
{
    if(ParentUrl=="videoLinkageSet")
    {
        // $_(ids+"_c").checked = true;
        window.parent.DisDeviceFun(ids);
    }
    var check_yes_no="";
    var ele=$_(ids+"_c");
    if(ele.checked==true){check_yes_no=true;}
    else{check_yes_no=false;}

    //设备的id是数字，区域的id是GUID
    if(IsNum(ids))
    {

        //如果点击的是具体设备
      
        if(check_yes_no==true)
        {
            SelectDev.pushnew(ids);
        }
        else
        {
            SelectDev.remove(ids);
        }

    }
    else
    {

        //再对区域内的设备进行选择检查
        for(var i=0;i<DevArray.length;i++)
        {

            if (DevArray[i].FirstDevID==ids)
            {

                $_(DevArray[i].Device_Id+"_c").checked=check_yes_no;
                if(check_yes_no==true)
                {
                    SelectDev.pushnew(DevArray[i].Device_Id);
                    SelectFirstDev.pushnew(ids);
                }
                else
                {
                    SelectDev.remove(DevArray[i].Device_Id);
                    SelectFirstDev.remove(ids);
                }
            }
        }

        //先对所有区域进行选择检查
        for(var i=0;i<AreaArray.length;i++)
        {
            if (AreaArray[i].Parent_Id==ids)
            {
                $_(AreaArray[i].Area_Id+"_c").checked=check_yes_no;
                SAD(AreaArray[i].Area_Id,DevArray,AreaArray);
            }
            if (AreaArray[i].Area_Id==ids)
            {
            	var n=DevArray.qao(ids,"SpaceID");
                if(n>=0){
                	if(check_yes_no==true)
	                {
	                    SelectSpaceDev.pushnew(ids);
	                }
	                else
	                {
	                    SelectSpaceDev.remove(ids);
	                }
                }
            }
        }
    }

}

function DisSelectDevCheckStation()
{
	//alert("SelectDev.lengt="+SelectDev.length);
	for(var i=0;i<SelectDev.length;i++)
	{
		if($_(SelectDev[i]+"_c")!=null)
		{
			$_(SelectDev[i]+"_c").checked=true;
		}
	}
}

var SelectDevAll=new Array();
function DisSelectDevCheckStationPath()
{
	//alert("SelectDev.lengt="+SelectDev.length);
	for(var i=0;i<SelectDevAll.length;i++)
	{
		if($_(SelectDevAll[i]+"_c")!=null)
		{
			$_(SelectDevAll[i]+"_c").checked=true;
		}
	}
}

function DisDeviceFun(Device_Id)
{
//	alert("Device_Id="+Device_Id+" \r\n ParentUrl="+ParentUrl+" \r\n window.parent="+window.parent.location);
	if(ParentUrl=="monitormain")
	{
		window.parent.frames['mapifr'].DisDevicePosition(Device_Id);
	}
	else if(ParentUrl=="firstdevview")
	{
		window.parent.frames['firstdevmapifr'].DisDeviceFun(Device_Id);
	}
	else if(ParentUrl=="videoLinkageSet")
	{
		$_(Device_Id+"_c").checked = true;
		window.parent.DisDeviceFun(Device_Id);
	}
	else if(ParentUrl=="imageAlg")
	{
		window.parent.DisDeviceFun(Device_Id);
	}else if(ParentUrl=='inteligentOperation'){
		window.parent.frames['querySerLog'].btnSearchClick(1,Device_Id);
	}
	else
	{
		window.parent.frames['DisDeviceifr'].DisDeviceFun(Device_Id);
	}
}


//生成设备树
//d和 'd'这两个名字要相同
var d ="";
function init()
{
	
//alert("NotCreateTreeFlag="+NotCreateTreeFlag);
//	ele_init("StationID",3,"变电站选择",{OP:window.parent.parent.parent.parent.Station_s,ONCHANGE:GetDeviceInfo});
	//区域间隔也要筛选
	ele_init("StationID",3,"变电站选择",{OP:window.parent.parent.parent.parent.Station_s,ONCHANGE:GetAreaInfo});
	flush_html_ele_value(window.parent.parent.parent.parent.StationIDNow,"StationID");

	document.oncontextmenu=OnConTextMenu;
	
	eleAddEvent(window.document, "mouseup", RightKeyMenuDesktop);
	eleAddEvent(window.document,"click", OnClick);
	
//	if(NotCreateTreeFlag==1)
//	{
//		
//	}
//	else
//	{
//		CreateTree();
//	}
	//alert("MapSelectArea="+MapSelectArea+" \r\n DtreeAutoSelectType="+DtreeAutoSelectType);
	
	
	//根据地图上选择的一次设备，自动将相关设备勾选
	if(DtreeAutoSelectType=="FromMap")
	{
		var MapMainIframeID="";
		//alert("maxWindow="+window.parent.parent.parent.maxWindow);
		for(var i=0;i<window.parent.parent.parent.maxWindow;i++)
		{
			var iframeUrl=window.parent.parent.parent.frames["mdi"].document.frames["mdi_"+i].location.pathname;
			
			//alert("iframeUrl="+iframeUrl);
			if(iframeUrl.indexOf("monitormain.php")!=-1)
			{
				MapMainIframeID=i;
				break;
			}
			//alert("iframeUrl="+iframeUrl);
		}
		if(MapMainIframeID!="")
		{
			var AreaHintData=window.parent.parent.parent.frames["mdi"].document.frames["mdi_"+MapMainIframeID].document.frames["mapifr"].AreaHintData;
			var m=AreaHintData.length;
			//alert("m="+m);
			for(var i=0;i<m;i++)
			{
				if(AreaHintData[i].isSelected==1)
				{
					SAD_(AreaHintData[i].ASFID,true);
				}
			}
		}
		//var subIframescontent=window.parent.parent.parent.frames["mdi"].document.all.getElementsByTagName['iframe'];
		//alert("subIframescontent="+subIframescontent.length);
		//var subIframes=window.parent.parent.parent.frames["mdi"].document.getElementsByTagName['iframe'];
		//alert("subIframes.length="+subIframes.length);
	}
	else if(DtreeAutoSelectType=="FromFirstDevView")
	{
		var MapMainIframeID="";
		//alert("maxWindow="+window.parent.parent.parent.maxWindow);
		for(var i=0;i<window.parent.parent.parent.maxWindow;i++)
		{
			var iframeUrl=window.parent.parent.parent.frames["mdi"].document.frames["mdi_"+i].location.pathname;
			
			//alert("iframeUrl="+iframeUrl);
			if(iframeUrl.indexOf("firstdevview.html")!=-1||iframeUrl.indexOf("firstdevview_blue.html") != -1)
			{
				MapMainIframeID=i;
				break;
			}
			//alert("iframeUrl="+iframeUrl);
		}
		if(MapMainIframeID!="")
		{
			var AreaHintData=window.parent.parent.parent.frames["mdi"].document.frames["mdi_"+MapMainIframeID].document.frames["firstdevmapifr"].AreaHintData;
			var m=AreaHintData.length;
			//alert("m="+m);
			for(var i=0;i<m;i++)
			{
				if(AreaHintData[i].isSelected==1)
				{
					SAD_(AreaHintData[i].ASFID,true);
				}
			}
		}
	}
	//从firstdevview页过来，则把map页中，点中的一次设备选中
	else if(DtreeAutoSelectType=="AlarmFromFirstDevMap")
	{
		//alert("MapSelectArea="+MapSelectArea);
		if(MapSelectArea!="")
		{
			SAD_(MapSelectArea,true);
		}
		
	}
	//从map页过来，则把map页中，点中的一次设备选中
	else if(DtreeAutoSelectType=="AlarmFromMap")
	{
		//alert("MapSelectArea="+MapSelectArea);
		if(MapSelectArea!="")
		{
			SAD_(MapSelectArea,true);
		}
		
	}
	//从间隔展示页过来，则自动把该间隔的所有设备选中
	else if(DtreeAutoSelectType=="AlarmFromViewSpace")
	{
		if(MapSelectArea!="")
		{
			SAD_(MapSelectArea,true);
		}
	}
	//从巡检日志查询页面过来的，要选中该次巡检中，所有识别错误的设备
//	else if(DtreeAutoSelectType=="FromQueryinspectionresultbylog")
//	{
//		QueryInspectLog(InspectionLog_ID);
//	}

	if(window.parent.parent.parent.parent.PageStyle == 0){
//		document.body.style.backgroundColor="#060e34";
//		document.body.style.color="#BED5EF";
//		$("html").css("border-right","#BED5EF 1px solid");
//		$("#DeviceSearch").css("background","url(images/puertxt.png) no-repeat center center");
//		$("#DeviceSearch").css("background-size","100% 100%");
//		$("#DeviceSearch").css("text-indent","5px");
//		$("#DeviceSearch").css("color","#BED5EF");
//		document.body.style.scrollbarFaceColor = "#2b4a81";
//		document.body.style.scrollbarTrackColor = "#5b73a1";
		$("#StationID_s").css({"background":"rgba(44,53,89,1)","color":"#a1bec5","border":"0px solid #a1bec5","width":"220px","height":"27px","margin-left":"-5px"});

	}

}







function SelDeviceInfo(FirstDevID)
{
	ADDT=[];
	var l=AllDev.length;
	for(var i=0;i<l;i++)
	{
		if(AllDev[i].FirstDevID==FirstDevID)
		{
			ADDT.push(AllDev[i]);
		}
	}
//	alert(ADDT.length);
}




function CreateTree()
{

	SelectDev=[];
	SelectDev.length=0;
	d = new dTree('d');
	
	FADT=FinalArea;
	
	var n=0;
			
			$_("TreeContent").innerHTML=CreateDtree();
			resizepage();
			if(window.parent.parent.parent.parent.PageStyle == 0){
				$("a,.dtree,span").css("color","#BED5EF");
	
                if(window.screen.availWidth > 3000) {
                	$('.dTN').css('height', '20px');
                    $('.dtree').css('font-size', '16px')
                    $('#TreeContent').find('.dtree').css('font-size', '14px')
                }
			}
//		}
//	},1000)
}


function OnClick()
{
	del_ico_menu();
}







function RightKeyMenuDesktop()
{
	if(UseRightKeyMenuFlag=='0' || UseRightKeyMenuFlag==""){return false;}
	//if(event.button==ButtonKeyRight)
  if(window.event.button == ButtonKeyRight)
  {
		OnClick();

	
		
		var diskeymenuflag=0;
		//根据鼠标所点的位置的元素，确定右键菜单显示的内容
		//获取当前鼠标右键按下后的位置，据此定义菜单显示的位置
		var event=arguments[0] || window.event;
		//事件所在处元素
		var element=event.srcElement || event.target;
		var ele_id=element.id;
		
		var eventX=event.clientX;
		var eventY=event.clientY;
//		var ele_id=ele_id.substr(0,ele_id.indexOf("_"));
//		alert(ele_id);
		//通过鼠标所在位置取所在位置的元素，准确度不高
		//ele_id=document.elementFromPoint(event.x,event.y).id;


		if(ele_id.indexOf("_an")>0)
//		if(!IsNum(ele_id))
		{
			//alert(ele_id);
			var Area_Id=ele_id.substr(0,ele_id.indexOf("_"));
//			var Area_Id=ele_id;
			
			//alert("EdgeID="+EdgeID);
			if(Area_Id!="")
			{
				var n=window.parent.parent.parent.FinalArea.qao(Area_Id,"Area_Id");
				if(n==-1){return false;}
				var AreaType=window.parent.parent.parent.FinalArea[n].AreaType;
				//TreeLevel=1是机器人的变电站，TreeLevel=2才是区域
				var TreeLevel=window.parent.parent.parent.FinalArea[n].TreeLevel;
				var menu = new RightMenu();
				//alert("RightKeyFrom="+RightKeyFrom);
				//区域
				if(AreaType=='0')
				{
					if(RightKeyFrom=="deviceinfomanage")
					{
						var Parent_Id=window.parent.parent.parent.FinalArea[n].Parent_Id;
						//根区域
						if(Parent_Id==-1)
						{
	
						}
						else
						{
							var o='javascript:ShowAddSpace(\\"'+Area_Id+'\\");';
							menu.AddItem("forward","start_update"," ","添加间隔","rbpm",o);
							create_ico_menu(menu);
							PopMenuPosition();
						}
					}
					else if(RightKeyFrom=="monitormain")
					{
						if(TreeLevel==2)
						{
							var o='javascript:OpenVideoByArea(\\"'+Area_Id+'\\");';
							menu.AddItem("forward","start_update"," ","打开所有视频","rbpm",o);
							var s='javascript:PollingAllDev(\\"'+AreaType+'\\",\\"'+Area_Id+'\\");';
							menu.AddItem("inspection","start_update"," ","巡检所有设备","rbpm",s);
							create_ico_menu(menu);
							PopMenuPosition();
						}
						
						
					}

				}
				//间隔
				else if(AreaType==1)
				{
					if(RightKeyFrom=="deviceinfomanage")
					{
						var o='javascript:ShowAddFirstDev(\\"'+Area_Id+'\\");';
						menu.AddItem("ShowAddFirstDev","start_update"," ","添加一次设备","rbpm",o);

						var o='javascript:ShowModifySpace(\\"'+Area_Id+'\\");';
						menu.AddItem("ShowModifySpace","start_update"," ","修改间隔","rbpm",o);

						var o='javascript:ShowDeleteSpace(\\"'+Area_Id+'\\");';
						menu.AddItem("ShowDeleteSpace","start_update"," ","删除间隔","rbpm",o);
						
						create_ico_menu(menu);
						PopMenuPosition();
					}
					else if(RightKeyFrom=="monitormain")
					{
						var o='javascript:OpenVideoBySpace(\\"'+Area_Id+'\\");';
						menu.AddItem("forward","start_update"," ","打开所有视频","rbpm",o);
						var s='javascript:PollingAllDev(\\"'+AreaType+'\\",\\"'+Area_Id+'\\");';
						menu.AddItem("inspection","start_update"," ","巡检所有设备","rbpm",s);
						create_ico_menu(menu);
						PopMenuPosition();
					}
					
				}
				//一次设备
				else if(AreaType==2)
				{
					
					if(RightKeyFrom=="deviceinfomanage")
					{
						var o='javascript:ShowAddDev(\\"'+Area_Id+'\\");';
						menu.AddItem("ShowAddDev","start_update"," ","添加点位","rbpm",o);
						
						var o='javascript:ShowModifyFirstDev(\\"'+Area_Id+'\\");';
						menu.AddItem("ShowModifyFirstDev","start_update"," ","修改一次设备","rbpm",o);
						
						var o='javascript:ShowDeleteFirstDev(\\"'+Area_Id+'\\");';
						menu.AddItem("ShowDeleteFirstDev","start_update"," ","删除一次设备","rbpm",o);
						create_ico_menu(menu);
						PopMenuPosition();
					}
					else if(RightKeyFrom=="queryinspectionresultbydev")
					{
						var o='javascript:ExportFirstDevInspectionresult(\\"'+Area_Id+'\\");';
						menu.AddItem("ExportFirstDevInspectionresult","start_update"," ","导出全面巡检结果","rbpm",o);
						create_ico_menu(menu);
						PopMenuPosition();
					}else if(RightKeyFrom=="monitormain"){
//						var l=window.parent.parent.parent.AllDev.qao(Area_Id,"FirstDevID");
//						if(l==-1){return;}
//						var Device_Id=window.parent.parent.parent.AllDev[l].Device_Id;
//						var m=window.parent.parent.parent.AllDev.qao(Device_Id,"Device_Id");
//						if(m==-1){return;}
//						var CarID=window.parent.parent.parent.AllDev[m].CarID;
//						var n=window.parent.parent.parent.AllCarObj.qao(CarID,"CarID");
//						if(n==-1){return;}
//						var CarType=window.parent.parent.parent.AllCarObj[n].CarType;
//						if(CarType==2)
//						{
							var o='javascript:OpenVideoByFirstDev(\\"'+Area_Id+'\\");';
							menu.AddItem("forward","start_update"," ","打开所有视频","rbpm",o);
							var s='javascript:PollingAllDev(\\"'+AreaType+'\\",\\"'+Area_Id+'\\");';
							menu.AddItem("inspection","start_update"," ","巡检所有设备","rbpm",s);
							create_ico_menu(menu);
							PopMenuPosition();
//						}
					}
					
					
				}


			}
		}
		else if(ele_id.indexOf("_dn")>0)
//		else
		{
			var Device_Id=ele_id.substr(0,ele_id.indexOf("_"));
//			var Device_Id=ele_id;
//			alert("Device_Id="+Device_Id);
			if(Device_Id!="")
			{
				var menu = new RightMenu();
				if(RightKeyFrom=="monitormain" || RightKeyFrom=="intelligentOperation")
				{
					var o='javascript:CallDevice(\\"'+Device_Id+'\\");';
					menu.AddItem("CallDevice","start_update"," ","呼叫","rbpm",o);
					
					var m=AllDev.qao(Device_Id,"Device_Id");
					if(m==-1){return;}
					var CarID=AllDev[m].CarID;
					var n=window.parent.parent.parent.AllCarObj.qao(CarID,"CarID");
					if(n==-1){return;}
					var CarType=window.parent.parent.parent.AllCarObj[n].CarType;
					if(CarType==2)
					{
						var o='javascript:OpenVideoByDevice(\\"'+Device_Id+'\\");';
						menu.AddItem("forward","start_update"," ","打开视频","rbpm",o);
					}
					
					if(RightKeyFrom=="monitormain"){
						var o='javascript:RunInspectionTask(\\"'+Device_Id+'\\");';
						menu.AddItem("RunInspectionTask","start_update"," ","巡检","rbpm",o);
					}
					
//
//					var o='javascript:GotoModelPage(\\"'+Device_Id+'\\");';
//					menu.AddItem("GotoModelPage","start_update","4","建模","rbpm",o);
//
//					var o='javascript:GotoDevParam(\\"'+Device_Id+'\\");';
//					menu.AddItem("GotoDevParam","start_update","4","属性","rbpm",o);
//
//					var o='javascript:GotoDevAlarmParam(\\"'+Device_Id+'\\");';
//					menu.AddItem("GotoDevAlarmParam","start_update","4","告警设置","rbpm",o);
	
					create_ico_menu(menu);
					PopMenuPosition();
				}
			}
		}
	}
}

function CallDevice(Device_Id)
{
	var m=AllDev.qao(Device_Id,"Device_Id");
	if(m==-1){return false;}
	var CarID=AllDev[m].CarID;

	window.parent.ManualDevicePreset(Device_Id,CarID);
}

//在线式点位打开视频
function OpenVideoByDevice(Device_Id){
	var m=AllDev.qao(Device_Id,"Device_Id");
	var DeviceType=AllDev[m].DeviceType;
	var Preset_Id=AllDev[m].Preset_Id;
	var Inspection_Id=AllDev[m].Inspection_Id;

	if(DeviceType < 15){
		if(Preset_Id<=0)
		{
			alert("该设备没有关联相关预置位，无法打开视频！");
			return;
		}
	}
	
	if(parseInt(Preset_Id)<=0){return false;}
	if(m==-1){return false;}
	if(DeviceType==2){var DevID=Inspection_Id+"_0"}
	else{var DevID=Inspection_Id+"_1"}

	//打开视频
	window.parent.frames["videomonitor"].OpenVideoByDevID(DevID,'',1);
	
	if(ParentUrl=="inteligentOperation"){return;}
	//呼叫预置位
	window.parent.frames["mapifr"].CallIPCPreset(Device_Id,"0");
	
}

function OpenVideoByArea(Area_Id)
{
	window.parent.frames["videomonitor"].OpenVideoByArea(Area_Id);
}
function OpenVideoBySpace(SpaceID)
{
	window.parent.frames["videomonitor"].OpenVideoBySpace(SpaceID);
	
}
function OpenVideoByFirstDev(FirstDevID)
{
	window.parent.frames["videomonitor"].OpenVideoByFirstDev(FirstDevID);
	
}



var xmlHttpPollingAllDev="";
function PollingAllDev(AreaType,Area_Id)
{
	xmlHttpPollingAllDev=createXMLHttpRequest();
  try
  {
 		var RunTime = GetDayTimeNow()
		var url = "/dalirobotcms/ajax/pollingAllDev.php?AreaType="+AreaType+"&Area_Id="+Area_Id+"&RunTime="+RunTime;
//alert("url="+url);
		xmlHttpPollingAllDev.onreadystatechange=function(){PollingAllDevRes();};
		xmlHttpPollingAllDev.open("get", url, true);
		xmlHttpPollingAllDev.send(null);
  }
  catch(e){alert(e);}
}

function PollingAllDevRes()
{
  if(xmlHttpPollingAllDev.readyState == 4)
  {
    if(xmlHttpPollingAllDev.status == 200)
    {
			var s=xmlHttpPollingAllDev.responseText;
			
//			alert("s="+s);
//			if(s =="")
//			{
//				alert("打开巡检失败！");
//				return false;
//			}
			
			var reg = /[\r\n]/g; 
			s=s.replace(reg,"");
//			if(s=="OK")
//			{
				
//				alert("打开巡检成功！");
				alert(s);
//			}
	}
  }
}

function GotoDevAlarmParam(Device_Id)
{
	var m=AllDev.qao(Device_Id,"Device_Id");
	if(m==-1){return false;}
	
	if(window.parent.parent.parent.PageStyle == 0){
		var Url="devicemanageBlue.html?ShowDevice_Id="+Device_Id;
	}else{
		var Url="devicemanage.html?ShowDevice_Id="+Device_Id;
	}
	//alert("Url="+Url);
	window.parent.parent.parent.fu(Url);
}

function GotoDevParam(Device_Id)
{
	var m=AllDev.qao(Device_Id,"Device_Id");
	if(m==-1){return false;}
	if(window.parent.parent.parent.PageStyle == 0){
		var Url="deviceinfomanageBlue.html?ShowDevice_Id="+Device_Id;
	}else{
		var Url="deviceinfomanage.html?ShowDevice_Id="+Device_Id;
	}
	window.parent.parent.parent.fu(Url);
}



function GotoModelPage(Device_Id)
{
	var m=AllDev.qao(Device_Id,"Device_Id");
	if(m==-1){return false;}
	var Preset_Id=AllDev[m].Preset_Id;
	var DeviceType=AllDev[m].DeviceType;
	//仪表识别类
	if(DeviceType==1)
	{
		var Url="createmodel.php?Device_Id="+Device_Id;
		window.parent.parent.parent.fu(Url);
	}
	//红外测温类
	else if(DeviceType==2)
	{
		if(Preset_Id<=0)
		{
			alert("该设备没有关联相关预置位，无法建模！");
		}
		else
		{
			var Url="ifrcreatemodel.php?Preset_Id="+Preset_Id;
			window.parent.parent.parent.fu(Url);
		}
	}

}




function RunInspectionTask(Device_Id)
{
	var m=AllDev.qao(Device_Id,"Device_Id");
	if(m==-1){return false;}
	var DevieIDOnRobot=AllDev[m].DevieIDOnRobot;
	var CarID=AllDev[m].CarID;
	
	xmlHttpInspectPreset=createXMLHttpRequest();
  try
  {
		var url = "/dalirobotcms/ajax/manualDevice.php?Device_Id="+DevieIDOnRobot+"&CarID="+CarID;
//		alert("url="+url);
		xmlHttpInspectPreset.onreadystatechange=function(){RunInspectionTaskRes();};
		xmlHttpInspectPreset.open("get", url, true);
		//post这一句必须加上
		xmlHttpInspectPreset.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlHttpInspectPreset.send(null);
  }
  catch(e){alert(e);}
}

function RunInspectionTaskRes()
{
  if(xmlHttpInspectPreset.readyState == 4)
  {
    if(xmlHttpInspectPreset.status == 200)
    {
			var s=xmlHttpInspectPreset.responseText;
//			alert(s);
			
			if(s =="offline")
			{
				alert("机器人不在线，巡检失败！");
		
			}
			else
			{
				var reg = /[\r\n]/g; 
				s=s.replace(reg,"");
				//var arr = eval(s);
				var arr=JSON.parse(s);
				if(arr.length!=0 && arr["Result"]!=""){
					
					alert("巡检成功！");
				}else{
					alert("巡检失败！");
				}		
			}
				
		}
  }
}

function ExportFirstDevInspectionresult(Area_Id)
{
	
	window.parent.ExportFirstDevInspectionresult(Area_Id);
}



function ShowAddArea(Area_Id)
{
	
	window.parent.ShowAddArea(Area_Id);
}


//一次设备下 添加点位
function ShowAddDev(FirstDevID)
{
	
	window.parent.ShowAddDev(FirstDevID);
}
//修改一次设备
function ShowModifyFirstDev(FirstDevID)
{
	window.parent.ShowModifyFirstDev(FirstDevID);
}
//删除一次设备
function ShowDeleteFirstDev(FirstDevID)
{
	window.parent.ShowDeleteFirstDev(FirstDevID);
}

function ShowDeleteSpace(SpaceID)
{
	window.parent.ShowDeleteSpace(SpaceID);
}


//间隔下 添加一次设备
function ShowAddFirstDev(SpaceID)
{
	window.parent.ShowAddFirstDev(SpaceID);
}

//区域下，添加间隔
function ShowAddSpace(Area_Id)
{
	window.parent.ShowAddSpace(Area_Id);
}

function ShowModifySpace(SpaceID)
{
	window.parent.ShowModifySpace(SpaceID);
}





function btnDeviceSearchClick()
{

	//var DeivceDescSearch=$_("DeviceSearch").value;
	//if(DeivceDescSearch==""){return false;}
	window.parent.RefreshParam();
}




function SelectNode(NodeId)
{
//	alert(NodeId);
}


function SelectChildNode(NodeId)
{

}

