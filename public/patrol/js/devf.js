

var AreaExistDevFlag=0;
//是否去掉没有设备的区域。0不去掉，1去掉
//从devicetree.php中传递这个变量
//var CheckAreaExistDevFlag=0;
function CreateDtree()
{
	AreaInfoExistDev=[];
	AreaInfoExistDev.length=0;
//WriteRemoteFile_("CreateDtree    start");
	//用于存放将要从FADT中删除的Area_Id
	var Area_IdDel=new Array();
	
	var l=FADT.length;
//	 alert("l="+l); 
	

	
	for(var i=0;i<l;i++)
	{
//		alert("checkboxFlag="+checkboxFlag);
		
		if(FADT[i].Area_Id==""){continue;}
			//WriteRemoteFile_("CreateDtree 1111   l="+l+"  i="+i+"   AreaExistDevFlag="+AreaExistDevFlag+"  FADT[i].Area_Desc="+FADT[i].Area_Desc+"  FADT[i].Area_Id="+FADT[i].Area_Id);

		
		AreaExistDevFlag=0;
		if(checkboxFlag==1)
		{
			//优化全选
			if(FADT[i].TreeLevel==0)
			{
				var CheckboxOnClick='onclick=SelectOrUnSelectAllTree(this)';
			}
			else
			{
				var CheckboxOnClick='onclick=SAD("'+FADT[i].Area_Id+'",ADDT,FADT)';
			}
			var CheckboxID=FADT[i].Area_Id+'_c';
		}
		else
		{
			var CheckboxOnClick='';
			var CheckboxID='';
		}

//alert("CheckAreaExistDevFlag="+CheckAreaExistDevFlag);

		if(CheckAreaExistDevFlag==1)
		{
			//检测区域内是否存在设备
			AreaCheckDevExist(FADT[i].Area_Id,ADDT,FADT);
			// alert("AreaExistDevFlag="+AreaExistDevFlag);
			//alert("AreaExistDevFlag="+AreaExistDevFlag+" \r\n FADT[i].Area_Id="+FADT[i].Area_Desc);
			//如果该区域内没有任何二级设备，则从FADT数组中，将该对象删除，后续不做处理
			//WriteRemoteFile_("CreateDtree 222   l="+l+"  i="+i+"   AreaExistDevFlag="+AreaExistDevFlag+"  FADT[i].Area_Desc="+FADT[i].Area_Desc);

			
			if(AreaExistDevFlag==1)
			{
				if(FADT[i].TreeLevel==0)
				{
//					alert("FADT[i].Area_Id="+FADT[i].Area_Id);
					d.add(FADT[i].Area_Id,'-1',FADT[i].Area_Desc,'',CheckboxID,'',CheckboxOnClick,'','','','','',0,'','');
				}
				else
				{
//					alert("FADT[i].Area_Id="+FADT[i].Area_Id+" \r\n FADT[i].Parent_Id="+FADT[i].Parent_Id);
					d.add(FADT[i].Area_Id,FADT[i].Parent_Id,FADT[i].Area_Desc,'',CheckboxID,'',CheckboxOnClick,'img/area.png','img/area.png','','','',0,'','');
				}
		
			}
			else
			{
				Area_IdDel.pushnew(FADT[i].Area_Id);
				//不要在此处删除，因为还在FADT.length的循环中
				//FADT.dao(FADT[i].Area_Id,"Area_Id");
			}
		}
		else
		{
				if(FADT[i].TreeLevel==0)
				{
//					console.log("FADT[i].Area_Id="+FADT[i].Area_Id);
					d.add(FADT[i].Area_Id,'-1',FADT[i].Area_Desc,'',CheckboxID,'',CheckboxOnClick,'','','','','',0,'','');
				}
				else
				{
//					console.log("FADT[i].Area_Id="+FADT[i].Area_Id+" \r\n FADT[i].Parent_Id="+FADT[i].Parent_Id);
					d.add(FADT[i].Area_Id,FADT[i].Parent_Id,FADT[i].Area_Desc,'',CheckboxID,'',CheckboxOnClick,'img/area.png','img/area.png','','','',0,'','');
				}
		}
	}
	// console.log(Area_IdDel);
//WriteRemoteFile_("CreateDtree 2222");
	
	
	if(CheckAreaExistDevFlag==1)
	{
		//d.add("aaa",'3BB9693A-D5EB-4EB3-A961-DFF96518CD6F',"temp",'','','','','img/area.gif','img/cd.gif','','','',0);
		var l=FADT.length;
		for(var i=0;i<Area_IdDel.length;i++)
		{
			FADT.dao(Area_IdDel[i],"Area_Id");
		}
		var l=FADT.length;
		//ADDT.sort(function(x, y){return y.Device_Desc - x.Device_Desc;});
		for(var i=0;i<FADT.length;i++)
		{
			var tempobj=FADT[i];
			AreaInfoExistDev.pao(tempobj,'Area_Id');
		}
		
	}
	// console.log(FADT);

	
//WriteRemoteFile_("CreateDtree 666666666");
	var l=ADDT.length;
//alert("l="+l);
	for(var i=0;i<l;i++)
	{
		//设备前的checkbox
		var DeviceDetialType=ADDT[i].DeviceDetialType;
		var DeviceType=ADDT[i].DeviceType;
		var Device_Id=ADDT[i].Device_Id;
		var Device_Desc=ADDT[i].Device_Desc;
		//此处已修改为采用一次设备作为被测设备的上级区域
		var DevArea_Id=ADDT[i].FirstDevID;
		
		
		
		if(checkboxFlag==1)
		{
			if(CheckAreaExistDevFlag==1)
			{
				var CheckboxOnClick='onclick=SAD("'+Device_Id+'",ADDT,AreaInfoExistDev)';
			}
			else
			{
				var CheckboxOnClick='onclick=SAD("'+Device_Id+'",ADDT,FADT)';
			}
			var CheckboxID=Device_Id+'_c';
		}
		else
		{
			var CheckboxOnClick='';
			var CheckboxID='';
		}
	
		if(!DeviceDetialType){DeviceDetialType=1;}
		//设备前的图标,正常状态
		var tree_img_ico_nor='img/dev_'+DeviceDetialType+'_nor.png ';
		//var tree_img_ico_nor='';
		//打开状态
		var tree_img_ico_open='img/dev_'+DeviceDetialType+'_nor.png ';
		
		var TreeImgOnDblClick="";
		var tree_url='';
		var alarmAction='';
		//摄像头
		/*
		if(DeviceType==5)
		{
			TreeImgOnDblClick=' onDblClick="OpenVideoFromDevTree(\''+Device_Id+'\');" ';
			var tree_url='OpenVideoFromDevTree(\''+Device_Id+'\');';
			var alarmAction='AlarmProcess(\''+Device_Id+'\');ShowAlarmLogPage(\''+Device_Id+'\');';
			
		}
	*/
		if(ItemClickFlag==1)
		{
			tree_url='DisDeviceFun(\''+Device_Id+'\');';
		}
		
//		alert("Device_Id="+Device_Id+" \r\n DevArea_Id="+DevArea_Id+" \r\n Device_Desc="+Device_Desc+" \r\n tree_url="+tree_url+" \r\n CheckboxID="+CheckboxID+" \r\n CheckboxOnClick="+CheckboxOnClick+" \r\n tree_img_ico_nor="+tree_img_ico_nor+" \r\n tree_img_ico_open="+tree_img_ico_open+" \r\n alarmAction="+alarmAction+" \r\n TreeImgOnDblClick="+TreeImgOnDblClick);
		
		d.add(Device_Id,DevArea_Id,Device_Desc,tree_url,CheckboxID,'',CheckboxOnClick,tree_img_ico_nor,tree_img_ico_open,'','',alarmAction,1,TreeImgOnDblClick,'');
	
	
	
	}
//WriteRemoteFile_("CreateDtree 33333333");
	return d;
}
















































//检测某个区域内是否存在最终设备
//最终设备的对象，保存在DevArray数组中
//区域对象保存在AreaArray数组中
//需要全局变量DVRInfo
//递归函数，不能用return返回，
function AreaCheckDevExist(Area_Id,DevArray,AreaArray)
{
	
	//var AreaExistDevFlag=0;
	var l=AreaArray.length;
	for(var i=0;i<l;i++)
	{
		if(AreaArray[i].Parent_Id==Area_Id)
		{
			AreaCheckDevExist(AreaArray[i].Area_Id,DevArray,AreaArray);
		}
	}
	var l=DevArray.length;
	for(var i=0;i<l;i++)
	{
		//alert("DevArray["+i+"].Area_Id="+DevArray[i].Area_Id+" \r\n Area_Id="+Area_Id);
		//根据设备的FirstDevID来判断
		if(DevArray[i].FirstDevID==Area_Id)
		{
			AreaExistDevFlag=1;
			break;
		}
	}
	//return AreaExistDevFlag;
}


//需要全局变量DVRInfo
//级联选择
var LoopTimes=0;
function SAD(ids,DevArray,AreaArray) 
{
	//WriteRemoteFile_("----------------LoopTimes:"+LoopTimes);

	
	//alert(ids);
	var check_yes_no="";
	var ele=$_(ids+"_c");
	if(ele.checked==true){check_yes_no=true;}
	else{check_yes_no=false;}

	//设备的id是数字，区域的id是GUID
	if(IsNum(ids))
	{
		
	//如果点击的是具体设备
	//var j=DevArray.qao(ids,"Device_Id");
	//if(j!=-1)
	//{
		//$_(DevArray[j].Device_Id+"_c").checked=check_yes_no;
		if(check_yes_no==true)
		{
			//SelectDev.pushnew(DevArray[j].Device_Id);
			SelectDev.pushnew(ids);
		}
		else
		{
			//SelectDev.remove(DevArray[j].Device_Id);
			SelectDev.remove(ids);
		}
		
	}
	else
	{
		
		//WriteRemoteFile_("----------------Alldev Loop  start");
//		alert("DevArray.length="+DevArray.length);
		//再对区域内的设备进行选择检查
		for(var i=0;i<DevArray.length;i++)
		{
			
			if (DevArray[i].FirstDevID==ids)
			{
//				alert("DevArray[i].FirstDevID="+DevArray[i].FirstDevID+" \r\n ids="+ids);
//				alert("check_yes_no="+check_yes_no+" \r\n ids="+ids);
				$_(DevArray[i].Device_Id+"_c").checked=check_yes_no;
				if(check_yes_no==true)
				{
					SelectDev.pushnew(DevArray[i].Device_Id);
				}
				else
				{
					SelectDev.remove(DevArray[i].Device_Id);
				}
			}
	  }
	 //	WriteRemoteFile_("----------------Alldev Loop  end");
		
		//disobjcontent(AreaArray[0]);
		//先对所有区域进行选择检查
		for(var i=0;i<AreaArray.length;i++)
		{
			if (AreaArray[i].Parent_Id==ids)
			{
				//alert("i="+i+"\r\n AreaArray[i].Parent_Id="+AreaArray[i].Parent_Id+"\r\n AreaArray[i].Area_Id="+AreaArray[i].Area_Id+"\r\n AreaArray[i].Area_Desc="+AreaArray[i].Area_Desc);
				$_(AreaArray[i].Area_Id+"_c").checked=check_yes_no;
				SAD(AreaArray[i].Area_Id,DevArray,AreaArray);
			}
		}



	}
	
	//LoopTimes++;
}





function SAD_(ids,check_yes_no)
{

	if($_(ids+"_c")==null){return false;}

	//如果点击的是具体设备
	var j=ADDT.qao(ids,"Device_Id");
	if(j!=-1)
	{
		$_(ADDT[j].Device_Id+"_c").checked=check_yes_no;
		if(check_yes_no==true)
		{
			SelectDev.pushnew(ADDT[j].Device_Id);
		}
		else
		{
			SelectDev.remove(ADDT[j].Device_Id);
		}
		
	}
	else
	{
		//先对所有区域进行选择检查
		for(var i=0;i<FADT.length;i++)
		{
			if (FADT[i].Parent_Id==ids)
			{
				//alert("FADT[i].Area_Id="+FADT[i].Area_Id);
				$_(FADT[i].Area_Id+"_c").checked=check_yes_no;
				SAD_(FADT[i].Area_Id,check_yes_no);
			}
		}
		
		//再对区域内的设备进行选择检查
		for(var i=0;i<ADDT.length;i++)
		{
			//alert("ADDT[i].Area_Id="+ADDT[i].Area_Id+" \r\n ids="+ids);
			if (ADDT[i].FirstDevID==ids)
			{

				$_(ADDT[i].Device_Id+"_c").checked=check_yes_no;
				if(check_yes_no==true)
				{
					SelectDev.pushnew(ADDT[i].Device_Id);
				}
				else
				{
					SelectDev.remove(ADDT[i].Device_Id);
				}
			}
	  }
	 
	}
}





function UnSelectTree()
{
	var ele = document.getElementsByName("G");
	var l=ele.length;
	for(var i=0;i<l;i++)
	{
		ele[i].checked=false;
	}
	SelectDev=[];
	SelectDev.length=0;
}

function SelectAllTree()
{
	SelectDev=[];
	SelectDev.length=0;
	var ele = document.getElementsByName("G");
	var l=ele.length;
//	alert("l="+l);
	for(var i=0;i<l;i++)
	{
		/*
		if(ele[i]==null)
		{
			continue;
		}
		*/
		ele[i].checked=true;
		var idname=ele[i].id;
		var idstr=idname.substring(0,idname.length-2);//在每个checkbox的name中，加了一个“_c”的后缀
		if(IsNum(idstr))
		{
			SelectDev.push(idstr);
		}
	}
}


function SelectOrUnSelectAllTree(obj)
{
	
	if(obj.checked==true)
	{
		SelectAllTree();
		
	}
	else
	{
		UnSelectTree();
	}
	
	
}