

//str页面上元素的ID或NAME，该元素的说明标签的ID为str+"_l"
//t该元素的自定义类别(type_的值)
//如果该元素t=3，option为该元素的选项
//str_l_value该元素的分类文字
//cfg该元素的特殊配置（一般不需要）
function ele_init(str,ele_type,str_l_value,cfg)
{
//	alert("ele_type="+ele_type);
	if($_(str+"_l")!=null){$_(str+"_l").innerHTML=str_l_value;}

	switch(ele_type)
	{
		//select
		case 3:
			var htmlstr=new SelectBox(str,cfg);
			setInnerHTML($_(str),htmlstr);

			break;
		
		//radio
		case 4:
			var htmlstr=new RadioBox(str,cfg);
			setInnerHTML($_(str),htmlstr);
			break;
			
		//date
		case 5:
			$_(str).innerHTML=new DateBox(str, true,false);
			break;

		//time
		case 6:
			$_(str).innerHTML=new DateBox(str,false, true);
			break;
			
		//checkbox
		case 7:
			var htmlstr=new CheckBox(str,cfg);

			setInnerHTML($_(str),htmlstr);
			break;

		//picarea
		case 8:
			//$_(str).innerHTML=new PicAreaBox(str,cfg);
			var htmlstr=new PicAreaBox(str,cfg);
			setInnerHTML($_(str),htmlstr);
			if(cfg.bg!=""){PicAreaBox.all[str].setbgimg(cfg.bg);}
			else{PicAreaBox.all[str].setbgimg("http://localhost/dvr/web/dali/style3/png/bg5.jpg");}

			break;

		//slider
		case 9:
			var sliders = new SliderCtl(str,cfg);
			sliders.create();
			break;

		//osdposition
		case 10:
			//$_(str).innerHTML=new VideoOSD(str,cfg);
			var htmlstr=new VideoOSD(str,cfg);
			setInnerHTML($_(str),htmlstr);		
			if(cfg.bg!=""){VideoOSD.all[str].setbgimg(cfg.bg);}
			else{VideoOSD.all[str].setbgimg("http://localhost/dvr/web/dali/style3/png/bg5.jpg");}

			break;

		//motiondetectarea
		case 11:
			$_(str).innerHTML=new MotionDetectBox(str,cfg);
			if(cfg.bg!=""){MotionDetectBox.all[str].setbgimg(cfg.bg);}
			else{MotionDetectBox.all[str].setbgimg("http://localhost/dvr/web/dali/style3/png/bg5.jpg");}
				
			break;

		//schedule
		case 12:
			$_(str).innerHTML=new ScheduleBox(str);
			//ScheduleBox.all[$_(str).id].setbgimg("http://localhost/dvr/web/dali/style3/png/bg5.jpg");
			break;
			
		//switch
		case 13:
			var htmlstr=new SwitchYN(str,cfg);
			setInnerHTML($_(str),htmlstr);
			break;

		//selectexchange			
		case 14:
			var htmlstr=new SelectExchangeBox(str);
			setInnerHTML($_(str),htmlstr);
			break;

		//cruise
		case 20:
			var htmlstr=new CruiseBox(str);
			setInnerHTML($_(str),htmlstr);
			break;
		//selecttree
		case 21:
			var htmlstr=new SelectTree(str,cfg);
			setInnerHTML($_(str),htmlstr);
			break;

		//DisTree,用于显示各控制服务器之间的关系树
		case 22:
			var htmlstr=new DisTree(str,cfg);
			setInnerHTML($_(str),htmlstr);
			break;

		//TimerBox,用于按星期定时
		case 23:
			$_(str).innerHTML=new TimerBox(str);
			break;

		//ThresholdBox,用于设置485设备阈值
		case 24:
			var htmlstr=new ThresholdBox(str,cfg);
			setInnerHTML($_(str),htmlstr);
			break;
			
			
			
		//Progress Bar
		case 25:
			var ProgressBar = new ProBar(str,cfg);
			ProgressBar.create();
			break;

			
		//map
		case 26:
			var htmlstr=new RobotMap(str,cfg);
			setInnerHTML($_(str),htmlstr);		

			break;
			
			
		//orderselect
		case 27:
			var htmlstr=new OrderSelectBox(str,cfg);
			setInnerHTML($_(str),htmlstr);		

			break;
			
			
			
		default:
			break;
	}
	//alert("ele_type="+ele_type+" \r\n str="+str);
	set_ele_attr(ele_type,str);
}


//更新页面上的相关元素的值
//ele_value该元素的值
//ele_str页面上该元素的ID或NAME：
function flush_html_ele_value(ele_value,ele_str)
{
//	alert("ele_str="+ele_str+" \r\n ele_value="+ele_value);
	var ele_type=parseInt(get_ele_attr(ele_str));
	// alert("ele_type="+ele_type);
	switch(ele_type)
	{
		//div lable
		case 1:
			$_(ele_str).innerHTML=ele_value;
			break;

		//INPUT
		case 2:
			$_(ele_str).value=ele_value;
			break;

		//select
		case 3:
			SelectBox.all[ele_str].setValue(ele_value);
			break;
		
		//radio
		case 4:
			RadioBox.all[ele_str].setValue(ele_value);
			break;
			
		//date
		case 5:
			/*
		  var curDate = new Date();
		  curDate = curDate.getFullYear() + "-" + AlignTime(curDate.getMonth()+1) + "-" + AlignTime(curDate.getDate());
		  */
		  var dates=ele_value.split(":");
		  DateBox.all[ele_str].setValue(new Array(dates[0],dates[1],dates[2],dates[3]));
			break;

		//time
		case 6:
			var dates=ele_value.split(":");
			DateBox.all[ele_str].setValue(new Array(dates[0],dates[1],dates[2]));
			break;
			
		//checkbox
		case 7:
			//alert("ele_str="+ele_str+" \r\n ele_value="+ele_value);
			CheckBox.all[ele_str].setValue(ele_value);
			break;

		//picarea
		case 8:
			PicAreaBox.all[ele_str].setValue(ele_value);
			break;

		//slider
		case 9:
			SliderCtl.all[ele_str].setValue(ele_value);
			break;
			
		//osdposition
		case 10:
			VideoOSD.all[ele_str].setValue(ele_value);
			break;

		//motiondetectarea
		case 11:
			MotionDetectBox.all[ele_str].setValue(ele_value);
			break;

		//schedule
		case 12:
			ScheduleBox.all[ele_str].setValue(ele_value);
			break;
			
		//switch
		case 13:
			SwitchYN.all[ele_str].setValue(ele_value,$_(ele_str).id);
			break;

		//selectexchange			
		case 14:
			SelectExchangeBox.all[ele_str].setValue(ele_value);
			break;

		//cruise
		case 20:
			//此时ele_value为整个节点
			if(NotesForEle.in_array(ele_str)==true){CruiseBox.all[ele_str].setValue(ele_value);}
			break;

		//selectTree		
		case 21:
			SelectTree.all[ele_str].setValue(ele_value);
			break;
			
		//DisTree		
		case 22:
			DisTree.all[ele_str].setValue(ele_value);
			break;

		//TimerBox,用于按星期定时
		case 23:
			TimerBox.all[ele_str].setValue(ele_value);
			break;
		//ThresholdBox,用于设置485阈值
		case 24:
			ThresholdBox.all[ele_str].setValue(ele_value);
			break;


		//progress bar
		case 25:
			ProBar.all[ele_str].setValue(ele_value);
			break;

		//map
		case 26:
			
			RobotMap.all[ele_str].setValue(ele_value);
			break;


		//map
		case 27:
			
			OrderSelectBox.all[ele_str].setValue(ele_value);
			break;

	
		default:
			break;
	}
}




//获取页面上某ID元素的值
//页面上元素的ID为ele_str
function get_ele_value(ele_str)
{
	var ele_type=parseInt(get_ele_attr(ele_str));
	var ele_value="";
	switch(ele_type)
	{
		//INPUT
		case 2:
			ele_value=$_(ele_str).value;
			break;

		//select
		case 3:
			ele_value=SelectBox.all[ele_str].getValue();
			break;
		
		//radio
		case 4:
			ele_value=RadioBox.all[ele_str].getValue();
			break;
			
		//date
		case 5:
			var datenew=DateBox.all[ele_str].getValue();
			ele_value=datenew.replace(/\ /g,":");
			break;

		//time
		case 6:
			ele_value=DateBox.all[ele_str].getValue();
			break;
			
		//checkbox
		case 7:
			ele_value=CheckBox.all[ele_str].getValue();
			break;

		//picarea
		case 8:
			ele_value=PicAreaBox.all[ele_str].getValue();
			break;

		//slider
		case 9:
			ele_value=SliderCtl.all[ele_str].getValue();
			break;
			
		//osdposition
		case 10:
			ele_value=VideoOSD.all[ele_str].getValue();
			break;

		//motiondetectarea
		case 11:
			ele_value=MotionDetectBox.all[ele_str].getValue();
			break;

		//schedule
		case 12:
			ele_value=ScheduleBox.all[ele_str].getValue();
			break;
			
		//switch
		case 13:
			//alert("ele_str="+ele_str+"\r\n SwitchYN.all[ele_str].getValue()="+SwitchYN.all[ele_str].getValue());
			ele_value=SwitchYN.all[ele_str].getValue();
			break;

		//selectexchange			
		case 14:
			ele_value=SelectExchangeBox.all[ele_str].getValue();
			break;

		//cruise
		case 20:
			//此时ele_value为整个节点
			if(NotesForEle.in_array(ele_str)==true)
			{
				//因为newNode的根节点是#document
				ele_value=CruiseBox.all[ele_str].getValue().childNodes[0];
			}
			break;
		//selectTree
		case 21:
			ele_value=SelectTree.all[ele_str].getValue();
			break;
		//DisTree
		case 22:
			ele_value=DisTree.all[ele_str].getValue();
			break;
			
		//TimerBox,用于按星期定时
		case 23:
			ele_value=TimerBox.all[ele_str].getValue();
			break;

		//ThresholdBox,用于按星期定时
		case 24:
			ele_value=ThresholdBox.all[ele_str].getValue();
			break;
			
		//progress bar
		case 25:
			ele_value=ProBar.all[ele_str].getValue();
			break;

		//orderselect
		case 27:
				ele_value=OrderSelectBox.all[ele_str].getValue();
			break;
		default:
			break;

	}
	return ele_value;
}




//////////////////////////////////////////////////////////////////////////////////各控件相关
//隐藏某一行
function HiddenObjTR(ele_str)
{
	//var ele_type=get_ele_attr(ele_str);
	if($_(ele_str+"_l")!=null)
	{
		//alert("aa");
		$_(ele_str+"_l").parentNode.parentNode.style.display="none";
	}
}
function DisplayObjTR(ele_str)
{
	if($_(ele_str+"_l")!=null)
	{
		//IE10中，不支持将table的tr的display属性设置为block，如果设置为block，表格格局会错位，所以解决方法是，设置为空
		if(IEVer>=10)
		{
			$_(ele_str+"_l").parentNode.parentNode.style.display="";
		}
		else
		{
			$_(ele_str+"_l").parentNode.parentNode.style.display="block";
		}
	}
}
function CheckELEDis(ele_str)
{
	if($_(ele_str+"_l")!=null)
	{
		if(IEVer>=10)
		{
			
			//alert("a");
			if($_(ele_str+"_l").parentNode.parentNode.style.display=="")
			{		
				//alert("b");
				return true;
			}
		}
		else
		{
			//alert("a");
			if($_(ele_str+"_l").parentNode.parentNode.style.display=="block")
			{		
				//alert("b");
				return true;
			}
		}
	}
	return false;
}

function GetVariableFromStr(str)
{
	//alert("str="+str);
	var VariableExist=true;
	var objrelate=null;
	//判断对应的数组是否定义
	try
	{
		objrelate=eval(str);
	}
	catch(e)
	{
		VariableExist=false;
		//alert(e.message);
	}

	return objrelate;
}

/*
t=1:div
t=2:input text
t=3:select
t=4:radio
t=5:date
t=6:time
t=7:checkbox
t=8:picarea
t=9:slider
t=10:osdposition
t=11:motiondetectarea
t=12:schedule

*/
//将页面上ID或NAME为ele_str的元素增加一个type_的属性，并设置该属性的值为t
function set_ele_attr(t,ele_str)
{
	/*
	alert("set_ele_attr ele_str="+ele_str+" \r\n t="+t);
	//这里有错误，radio中实际元素的radio name在radio.js的RadioBoxOnload(idstr)函数中，被命名为 idstr+'_r"
	//checkbox中实际的元素 checkbox name在checkbox.js的CheckBoxOnload(idstr)函数中，被命名为 idstr+'_c"
	//所以此处用document.getElementsByName(ele_str)是获取不到内容的，但在IE10以下版本中，能够获取到ele_str本身
	//IE10中，连ele_str本身都获取不到
	if(t==4 || t==7) 
	{
		var radio_obj=document.getElementsByName(ele_str);
		alert("radio_obj.length="+radio_obj.length);
		for(var i=0;i<radio_obj.length;i++){radio_obj[i].setAttribute("type_",t);}
	}
	else
	{
	*/
	$_(ele_str).setAttribute("type_",t);
	
	//}
}

//返回页面上ID或name为ele_str元素的type_属性的值
function get_ele_attr(ele_str)
{
	var ele_type="";
	var ele_obj=$_(ele_str);
	if(ele_obj!=null)
	{
		//alert("get_ele_attr ele_str="+ele_str);
		ele_type=ele_obj.getAttribute("type_");
		//alert("get_ele_attr ele_str="+ele_str+" \r\n ele_type="+ele_type);
	}
	/*
	else
	{
		var radio_obj = document.getElementsByName(ele_str);
		if(radio_obj.length>0){ele_type=radio_obj[0].getAttribute("type_");}
	}
	*/
	return ele_type;
}

//初始化所有yes,no类span的内容
function yes_no_lable_init(obj)
{
	var ids=getElementsByClassNamenew(obj,"span","yes_lable");//效率高
	var l=ids.length;
	for(var i=0;i<l;i++){ids[i].innerHTML="YSE";}
	var ids=getElementsByClassNamenew(obj,"span","no_lable");//效率高
	var l=ids.length;
	for(var i=0;i<l;i++){ids[i].innerHTML="NO";}
}








function IniHtmlTxt()
{
	var Txts=new Array();
	Txts=getElementsByClassNamenew(document,"span","txt");
	var TxtL=Txts.length;
	
	for(var i=0;i<TxtL;i++)
	{
		var Txtid=Txts[i].id;
		var Txtids=Txtid.split("_");
		
		//alert("Txtid="+Txtid+" \r\n Txtids[0]="+Txtids[0]);
		Txts[i].innerText=eval(Txtids[0]);
	}
	
	//所有button
	var bunTxts=new Array();
	bunTxts=getElementsByClassNamenew(document,"input","butn");
	var bunTxtsL=bunTxts.length;
	for(var i=0;i<bunTxtsL;i++)
	{
		var Txtid=bunTxts[i].id;
		var Txtids=Txtid.split("_");
		//alert("Txtid="+Txtid+" \r\n Txtids[0]="+Txtids[0]);
		bunTxts[i].value=eval(Txtids[0]);
	}
}
