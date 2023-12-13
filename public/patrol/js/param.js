var localipaddress=window.location.hostname;

var ip_address="";//DM63的IP，在setCookie_里需要用到

var monitor_name="Monitor.ocx";
var realplay_name="Player.ocx";
var monitor_ver="1,0,0,6";//DVSMonitor版本号
var monitor_clsid="clsid:7d879669-ca59-4eaa-931e-d1c89fa9bed8";
var realplay_ver="1,0,0,22";
var realplay_clsid="clsid:6F110E56-32C4-4879-4543-AA66B1E1F5E2";
var cab_name="../dalirobot.cab";//cab包的文件名
var localcfg="LocalCfg.ini";

var AlarmOCXVer="1,0,0,1";
var AlarmOCXClsid="clsid:B91898A4-307B-4F95-A198-983826D1CEC7";
var AlarmOCXName="ControlCommand.ocx";
var MAX_SPLIT=16;
var SplitNow=16;//当前是几分屏的

var TalkCabName="../dalirobot.cab";
var TalkOCXVer="1,0,0,1";
var TalkOCXClsid="clsid:1D24ABFA-836C-406A-B6C1-61A95CA8FEFE";
var TalkOCXName="Talk.ocx";



var VoiceOCXVer="1,0,0,1";
var VoiceOCXClsid="clsid:D381279D-8E2E-435E-BE84-7475B2E2AEBB";
var VoiceOCXName="AudioViewImg.ocx";



var VLCCabName="vlc.cab";
var VLCclsid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921";
var VLCVer="2,2,2,0";

//1表示用OCX，0表示用VLC
var UseDaliActiveX=1;


var EXIST_YULAN_MENU=new Array("1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1");
var EXIST_LUNXUN_MENU=new Array("1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1");
var EXIST_FANGDA_MENU=new Array("1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1");
var EXIST_MAX_MENU=new Array("1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1");

var vwbusyflag=0;
var ismax=0;


var TalkHandle=-1;

var isTalking=0;
var quietFlag=0;
//oi:当前焦点视频窗口的ID,默认在第一个窗口
var oi=0;
//所有realplay的属性
var	vwinfo=new Array();
//streamType:码流 0主码流 1子码流
var streamType=0;
//poi:前一次焦点窗口的ID

var poi=0;










//1~30倍数值对应的系数表
var IPCZoomData=new Array(
	new Array(59.15,29.31),
	new Array(33.24,17.14),
	new Array(22.22,12.49),
	new Array(17.28,10.02),
	new Array(13.42,7.48),
	new Array(11.41,6.37),
	new Array(10.05,5.43),
	new Array(8.51,4.59),
	new Array(7.53,4.27),
	new Array(7.09,4.03),
	new Array(6.3,3.4),
	new Array(5.57,3.22),
	new Array(5.29,3.07),
	new Array(5.02,2.53),
	new Array(4.44,2.41),
	new Array(4.26,2.31),
	new Array(4.07,2.2),
	new Array(3.55,2.13),
	new Array(3.4,2.04),
	new Array(3.31,2),
	new Array(3.2,1.53),
	new Array(3.12,1.49),
	new Array(3.05,1.45),
	new Array(2.57,1.41),
	new Array(2.51,1.36),
	new Array(2.43,1.32),
	new Array(2.33,1.26),
	new Array(2.27,1.23),
	new Array(2.19,1.18),
	new Array(2.18,1.17)
);


//保存10条系统告警信息
var SystemAlarmInfoTotalNum=100;
var SystemAlarmInfo=new Array();
