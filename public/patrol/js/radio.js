
function RadioBoxOnload(idstr)
{
	var OP=RadioBox.all[idstr].OP;
	var DV=RadioBox.all[idstr].DV;
	var CSS=RadioBox.all[idstr].CSS;
	
	var onclickFun="";
	if(RadioBox.all[idstr].ONCLICK!=null){onclickFun=RadioBox.all[idstr].ONCLICK.getSelfName();}
	
	var strhtml="";
	for(var i=0;i<OP.length;i++)
	{
		
		strhtml+='<div class="'+CSS+'">';
		
		strhtml+='<input type="radio" ';
		if(onclickFun!=""){strhtml+='onclick='+onclickFun+'.call(this)';}

		strhtml+=' class="param_radio" name="'+idstr+'_r" value="'+OP[i].sv+'"';

		if(DV!=""){if(OP[i].sv==DV){strhtml+=' checked ';}}
		strhtml+='/>';
		strhtml+='<span class="radio_lable">'+OP[i].sn+'</span>';
		strhtml+='</div>';
	}
	//alert(strhtml);
	
	$_(idstr+"_RadioDiv").innerHTML=strhtml;
}

////////////////////////////////////////////////////////////////////////////////////////radio相关
//返回ele_str对应的页面上的radio的选中值
function get_radio_value(ele_str)
{
	var radio_oj = document.getElementsByName(ele_str);
	var ret="";
	for(var i=0;i<radio_oj.length;i++){if(radio_oj[i].checked==true)
        {
            ret=radio_oj[i].value;break;}}
	return ret;
}


//根据页面中radio的值，选中符合的radio
function radio_checked(radioName,aValue)
{
	var radio_oj = document.getElementsByName(radioName);
	for(var i=0;i<radio_oj.length;i++){if(radio_oj[i].value==aValue){radio_oj[i].checked=true;break;}}
}

function radio_nochecked(radioName,aValue)
{
	var radio_oj = document.getElementsByName(radioName);
	for(var i=0;i<radio_oj.length;i++){if(radio_oj[i].value==aValue){radio_oj[i].checked=false;break;}}
}

//如果要disabled该radio，则disValue设置为true，如果要取消，disValue设置为空（不要设置为false，不生效）
//根据页面中radio的值，设置其disabled的值disValue
function radio_disabled(radioName,aValue,disValue)
{
	var radio_oj = document.getElementsByName(radioName);
	for(var i=0;i<radio_oj.length;i++){if(radio_oj[i].value==aValue){radio_oj[i].disabled=disValue;break;}}
}


function ele_radio_disabled(ele_str,disValue){RadioBox.all[ele_str].radio_disabled_(disValue);}


//分组类的Radio（编码方案）点击时
//先将上一系列的参数保存，再显示另一系列的参数
//该函数仅对手动点击事件进行处理
function GroupRadioClick()
{
	var idstr="";
	var ev = window.event;
	//alert("ev="+ev);
	if(ev==null)
	{
		return;
	}
	else
	{
		var idname = window.event.srcElement.name;
		idstr=idname.substring(0,idname.length-2);//在每个radio的name中，加了一个“_r”的后缀
	}

	if($_(idstr+"_index_hidden")==null){return;}
	//先保存上一个通道的设置信息

	var idpre=$_(idstr+"_index_hidden").value;
	//再显示新的通道的设置信息
	//var idnew=this.value;
	
	var idnew=RadioBox.all[idstr].getValue();
	
	if(idpre==idnew){return;}

	var page_node=get_page_node_from_xml(idstr);
	if(page_node==""){return;}

	flush_page_node_by_html(page_node,idpre);
	//要在再次刷新页面前，先改变这个值，避免死循环
	$_(idstr+"_index_hidden").value=idnew;
	flush_html_by_page_node(page_node,idnew);

}














function RadioBox(idstr,cfg)
{
    this.id = idstr;
    RadioBox.all[idstr]=this;
    RadioBox.all[idstr].OP=cfg.OP;
    
		var m=SelectOptionMaxMinIndex(cfg.OP);
		RadioBox.all[idstr].MAXINDEX=m.Max;
		RadioBox.all[idstr].MININDEX=m.Min;
    if(cfg.ONCLICK!=null){RadioBox.all[idstr].ONCLICK=cfg.ONCLICK;}
    else{RadioBox.all[idstr].ONCLICK=null;}
		//默认选中值
    if(cfg.DV!=null){RadioBox.all[idstr].DV=cfg.DV;}
    else{RadioBox.all[idstr].DV="";}


    if(cfg.CSS!=""){RadioBox.all[idstr].CSS=cfg.CSS;}
    else{RadioBox.all[idstr].CSS="normalradio";}

}
RadioBox.all={};

RadioBox.prototype=
{
    toString:function()
    {
			
			var strHtml='<div id="'+this.id+'_RadioDiv"></div><!--bs--><script language="javascript">RadioBoxOnload(\''+this.id+'\');</script><!--es-->';
			

			return strHtml;
    },
    
    getValue:function()
    {
    	var idstr=this.id;
			var ret=get_radio_value(idstr+"_r");
			return ret;
    },
    

    setValue:function(setDatevalue)
    {
    	
    	var idstr=this.id;
			
    	if(setDatevalue==null){return;}
    	if(setDatevalue==""){return;}
    	if(isNaN(setDatevalue)==false)
    	{
				if(setDatevalue>RadioBox.all[idstr].MAXINDEX){setDatevalue=RadioBox.all[idstr].MAXINDEX;}
				if(setDatevalue<RadioBox.all[idstr].MININDEX){setDatevalue=RadioBox.all[idstr].MININDEX;}
    	}
    	radio_checked(idstr+"_r",setDatevalue);
			if(RadioBox.all[idstr].ONCLICK!=null){RadioBox.all[idstr].ONCLICK.call(RadioBox.all[idstr]);}


    },

		radio_disabled_:function(disValue)
		{

			var idstr=this.id;
			var radio_oj = document.getElementsByName(idstr+"_r");
			for(var i=0;i<radio_oj.length;i++){radio_oj[i].disabled=disValue;}
		}


}    


