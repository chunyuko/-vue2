


function SelectBoxOnload(idstr)
{

	var strHtml="";
	var OP=SelectBox.all[idstr].OP;
	var SZ=SelectBox.all[idstr].SZ;
	var CSS=SelectBox.all[idstr].CSS;
	var onchangeFun="";
	if(SelectBox.all[idstr].ONCHANGE!=null){onchangeFun=SelectBox.all[idstr].ONCHANGE.getSelfName();}

	var strHtml='<select id="'+idstr+'_s" size='+SZ+' class="'+CSS+'" ';
	if(onchangeFun!=""){strHtml+='onchange='+onchangeFun+'.call(this,\''+idstr+'\')';}
	strHtml+=' >';
	for(var i=0;i<OP.length;i++){strHtml+='<option value="'+OP[i].sv+'">'+OP[i].sn+'</option>';}
	strHtml+='</select>';

	
	//alert("idstr="+idstr);
	$_(idstr+"_SelectDiv").innerHTML=strHtml;
	SelectSwitchForDis(idstr,0);
	//alert(strHtml);

}







//根据select中option的text值来选中
function flush_select_by_text(ele_value,ele_str){SelectBox.all[ele_str].setValueByText(ele_value);}
//根据select中option的index值来选中
function flush_select_by_index(ele_value,ele_str){SelectBox.all[ele_str].setValueByIndex(ele_value);}


//得到select当前选中项目的text值
function get_select_TextValue(ele_str){ele_value=SelectBox.all[ele_str].getTextValue();return ele_value;}

function select_disabled(ele_str,disValue){SelectBox.all[ele_str].select_disabled_(disValue);}

function select_length(ele_str){return SelectBox.all[ele_str].select_length_();}
		//增加选项（按索引来）
function select_add_option(ele_str,i,newop){SelectBox.all[ele_str].select_add_option_(i,newop);}
		//删除选项（按索引来）
function select_del_option(ele_str,i){SelectBox.all[ele_str].select_del_option_(i);}
//////////////////////////////////////////////////////////////////////////////////////////select相关



//根据提供的选项，生成select option
function create_select_option(selectObj, options)
{
	selectObj.length=0;
	for(var i=0;i<options.length;i++)
	{
		if(options[i].sn==""){continue;}
		var optionelement=new Option(options[i].sn,options[i].sv);
		selectObj.options.add(optionelement);
	}
}

//根据获得的xml dom来重新生成select的选项
function UpdateSelectOption(ele_str,ele_value)
{
	//alert("ele_str="+ele_str);
	var objcreateby=GetVariableFromStr(ele_str+"_createby");
	//如果定义过
	if(objcreateby!=null)
	{

		var dom=res_xml_dom.getElementsByTagName(ele_str)[0].childNodes;
		var selectObj=$_(ele_str+"_s");
		if(selectObj!=null && dom!=null)
		{
			selectObj.length=0;
			for(var i=0;i<dom.length;i++)
			{


				var ele_index=dom[i].attributes.getNamedItem("index").nodeValue;
				if(ele_index==""){continue;}
				var ele_inner=dom[i].getElementsByTagName(objcreateby)[0].attributes.getNamedItem("value").nodeValue;
				
				
				//alert("ele_inner="+ele_inner+"\r\n ele_index="+ele_index);
				if(ele_inner==""){ele_inner=ele_index;}
				var optionelement=new Option(ele_inner,ele_index);
				selectObj.options.add(optionelement);
			}
			selectObj.value=ele_value;
		}
	}
}

function SelectSwitchForDis(str,index)
{
	//alert("str="+str+" \r\n index="+index);
	var objrelate=GetVariableFromStr(str+"_relate");
	//如果定义过
	if(objrelate!=null)
	{
		var objrelateD=GetVariableFromStr(str+"_relate._"+index);
		if(objrelateD!=null){for(var i=0;i<objrelateD.length;i++){DisplayObjTR(objrelateD[i]);}}
		
		var objrelateDefaultV=GetVariableFromStr(str+"_relate._"+index+"D");
		if(objrelateDefaultV!=null)
		{
			for(var i=0;i<objrelateDefaultV.length;i++)
			{
				if(objrelateDefaultV[i].label!="")
				{
					$_(objrelateDefaultV[i].idstr+"_l").innerHTML=objrelateDefaultV[i].label;
				}
				flush_html_ele_value(objrelateDefaultV[i].val,objrelateDefaultV[i].idstr);
			}
		}
		
		
		
		
		
		var objrelateH=GetVariableFromStr(str+"_relate._"+index+"_");
		if(objrelateH!=null){for(var i=0;i<objrelateH.length;i++){HiddenObjTR(objrelateH[i]);}}
	}
}


//分组类的select（通道号，报警输入号、报警输出号、网络参数类别）变化时
//先将上一系列的参数保存，再显示下一系列的参数
function GroupSelectChange(idstr)
{

	var obj=$_(idstr+'_s');
	//var idstr=idname.substring(0,idname.length-2);//使用select.js控件后，在每个select id后面加了一个'_s'
	
	//先保存上一个通道的设置信息
	var idpre=$_(idstr+"_index_hidden").value;
	//再显示新的通道的设置信息
	var idnew=obj.options[obj.options.selectedIndex].value;
	if(idpre==idnew){return;}

	var page_node=get_page_node_from_xml(idstr);
	if(page_node==null){return;}

	flush_page_node_by_html(page_node,idpre);


	//要在刷新页面前，先改变这个隐藏的值，防止死循环
	$_(idstr+"_index_hidden").value=idnew;
	//alert("idstr="+idstr+"\r\n idpre="+idpre+"\r\n idnew="+idnew+"\r\n idstr_index_hidden="+$_(idstr+"_index_hidden").value);
	flush_html_by_page_node(page_node,idnew);
}

//一般的select类元素变化时，切换相关联项目的显示与隐藏
//select元素在选择改变时，与其相关的元素的显示与隐藏控制，该元素定义在param.js中的idstr_relate数组中

function NormalSelectChange(idstr)
{
	var obj=$_(idstr+'_s');
	//alert("idstr="+idstr);
	//先保存上一个通道的设置信息
	var idpre=$_(idstr+"_index_hidden").value;
	
	//根据被选择项的索引值来判断，不再根据sv的值来判断
	//var idnew=obj.options[obj.options.selectedIndex].value;
	var idnew=obj.options.selectedIndex;
	if(idpre==idnew){return;}
	//先隐藏上一个选项打开的内容
	//alert("idpre="+idpre);	
	SelectSwitchForDis(idstr,idpre);

	$_(idstr+"_index_hidden").value=idnew;
	//alert("idnew="+idnew);	
	SelectSwitchForDis(idstr,idnew);
}






function SelectBox(idstr,cfg)
{
    this.id = idstr;
    SelectBox.all[idstr]=this;
    SelectBox.all[idstr].OP=cfg.OP;
    
		var m=SelectOptionMaxMinIndex(cfg.OP);
		SelectBox.all[idstr].MAXINDEX=m.Max;
		SelectBox.all[idstr].MININDEX=m.Min;
    if(cfg.SZ!=null){SelectBox.all[idstr].SZ=cfg.SZ;}
    else{SelectBox.all[idstr].SZ=1;}
    if(cfg.CSS!=null){SelectBox.all[idstr].CSS=cfg.CSS;}
    else{SelectBox.all[idstr].CSS="param_select";}
    if(cfg.ONCHANGE!=null){SelectBox.all[idstr].ONCHANGE=cfg.ONCHANGE;}
    else{SelectBox.all[idstr].ONCHANGE=null;}
    	
    if(cfg.SETVALUENOCALLCHANGE!=null){SelectBox.all[idstr].SETVALUENOCALLCHANGE=cfg.SETVALUENOCALLCHANGE;}
    else{SelectBox.all[idstr].SETVALUENOCALLCHANGE=0;}
    	
}
SelectBox.all={};

SelectBox.prototype=
{
    toString:function()
    {
			var strHtml='<div id="'+this.id+'_SelectDiv"></div>';
			strHtml+='<!--bs--><SCRIPT LANGUAGE="JAVASCRIPT">SelectBoxOnload(\''+this.id+'\');</SCRIPT><!--es-->';
			//alert(strHtml);
			return strHtml;
    },

    getValue:function()
    {
    	var retstr="";
			var idstr=this.id;
			//alert("idstr="+$_(idstr+"_s").options.selectedIndex);
			var i=$_(idstr+"_s").options.selectedIndex;
			if(i<0){return "-1";}
			//alert("idstr="+idstr+" \r\n $_(idstr+_s).options.selectedIndex="+$_(idstr+"_s").options.selectedIndex);
			retstr=$_(idstr+"_s").options[i].value;
			//alert("retstr="+retstr);
			return retstr;
    },
    
    getTextValue:function()
    {
    	var retstr="";
			var idstr=this.id;
			retstr=$_(idstr+"_s").options[$_(idstr+"_s").options.selectedIndex].text;
			return retstr;
    },
    
    setValue:function(setDatevalue)
    {
    	
    	if(setDatevalue==""){return;}
    	var idstr=this.id;
    	var SETVALUENOCALLCHANGE=SelectBox.all[idstr].SETVALUENOCALLCHANGE;
    	//alert("idstr="+idstr);
    	var OldValue=$_(idstr+"_s").value;
    	//alert("OldValue="+OldValue);
    	
    	if(setDatevalue!=OldValue)
    	{
				if(setDatevalue>SelectBox.all[idstr].MAXINDEX){setDatevalue=SelectBox.all[idstr].MAXINDEX;}
				if(setDatevalue<SelectBox.all[idstr].MININDEX){setDatevalue=SelectBox.all[idstr].MININDEX;}
				
				//alert("setDatevalue="+setDatevalue+" \r\n OldValue="+OldValue);
				$_(idstr+"_s").value=setDatevalue;
				
	  		if(SETVALUENOCALLCHANGE==1)
	  		{
	  		}
	  		else
	  		{
					if(SelectBox.all[idstr].ONCHANGE!=null){SelectBox.all[idstr].ONCHANGE.call(SelectBox.all[idstr],idstr);}
				}

				//alert("aaaa");
				var SelectIndex=$_(idstr+"_s").options.selectedIndex;
				SelectSwitchForDis(idstr,SelectIndex);
			}
		},
		
		setValueByText:function(setDatevalue)
		{

    	if(setDatevalue==""){return;}
    	var idstr=this.id;
    	var SETVALUENOCALLCHANGE=SelectBox.all[idstr].SETVALUENOCALLCHANGE;
    	var selectOk=0;
    	var selectValue="";
    	var OldValue=$_(idstr+"_s").options[$_(idstr+"_s").selectedIndex].text;
    	if(setDatevalue!=OldValue)
    	{

	    	for(var j=0;j<$_(idstr+"_s").options.length;j++)
	    	{
	
	    		if($_(idstr+"_s").options[j].text==setDatevalue)
	    		{
	    			$_(idstr+"_s").options[j].selected=true;
	    			selectOk=1;
	    			selectValue=$_(idstr+"_s").options[j].value;
	    			break;
	    		}
	    	}
				if(selectOk==1)
				{
					
				
		  		if(SETVALUENOCALLCHANGE==1)
		  		{
		  		}
		  		else
		  		{
						if(SelectBox.all[idstr].ONCHANGE!=null){SelectBox.all[idstr].ONCHANGE.call(SelectBox.all[idstr],idstr);}
					}
					var SelectIndex=$_(idstr+"_s").options.selectedIndex;
					SelectSwitchForDis(idstr,SelectIndex);
				}
			}
		},
		
		setValueByIndex:function(setDatevalue)
		{
    	if(setDatevalue==""){return;}
    	var idstr=this.id;
    	var selectValue="";
    	var SETVALUENOCALLCHANGE=SelectBox.all[idstr].SETVALUENOCALLCHANGE;
    	var OldValue=$_(idstr+"_s").selectedIndex;
    	if(setDatevalue!=OldValue)
    	{

	    	var l=$_(idstr+"_s").options.length;
				if(setDatevalue>=l){setDatevalue=l-1;}
				if(setDatevalue<0){setDatevalue=0;}
				$_(idstr+"_s").selectedIndex = setDatevalue;
	  		selectValue=$_(idstr+"_s").options[setDatevalue].value;
	  		if(SETVALUENOCALLCHANGE==1)
	  		{
	  		}
	  		else
	  		{
					if(SelectBox.all[idstr].ONCHANGE!=null){SelectBox.all[idstr].ONCHANGE.call(SelectBox.all[idstr],idstr);}
				}
				var SelectIndex=$_(idstr+"_s").options.selectedIndex;
				SelectSwitchForDis(idstr,SelectIndex);
			}
		},
		
		
		select_disabled_:function(disValue){var idstr=this.id;$_(idstr+"_s").disabled=disValue;},
		
		select_length_:function(){var idstr=this.id;return $_(idstr+"_s").length;},
		//增加选项（按索引来）
		select_add_option_:function(i,newop){var idstr=this.id;$_(idstr+"_s").options[i] = newop;},
		//删除选项（按索引来）
		select_del_option_:function(i){var idstr=this.id;$_(idstr+"_s").remove(i);}

}


