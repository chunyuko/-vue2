
function CheckBoxOnload(idstr)
{
	
	var OP=CheckBox.all[idstr].OP;
	var CSS=CheckBox.all[idstr].CSS;
	
	if(CheckBox.all[idstr].DISALL=="true")
	{
		var strhtml='<div class="'+CSS+'"><input type=checkbox id='+idstr+'_checkall onclick="CheckBox.prototype.CheckBoxOnSelcetAll(\''+idstr+'\');" value="0"> 全选</div>';
	}
	else
	{
		var strhtml='';
	}


	var l=OP.length;

	for(var i=0;i<l;i++)
	{
		if(OP[i].sn == ""){continue;}
		strhtml+='<div class="'+CSS+'">';
		strhtml+='<input type=checkbox onclick="CheckBox.prototype.CheckBoxOnclick(this);" name="'+idstr+'_c" value="'+OP[i].sv+'"> '+OP[i].sn;
		strhtml+='</div>';
	}

	$_(idstr+"_CheckBoxDiv").innerHTML=strhtml;
}



//VT:1传输的值以16进制表示，每位代表一个选中的选中状态
//VT:0传输的值以“-”隔开，每个值就是选中项的索引值
function CheckBox(idstr,cfg)
{
    this.id = idstr;

    CheckBox.all[idstr]=this;

    CheckBox.all[idstr].OP=cfg.OP;

    if(cfg.CSS!=""){CheckBox.all[idstr].CSS=cfg.CSS;}
    else{CheckBox.all[idstr].CSS="echo_checkbox";}


    if(cfg.DISALL!=""){CheckBox.all[idstr].DISALL=cfg.DISALL;}
    else{CheckBox.all[idstr].DISALL="false";}


    if(cfg.CHECKALLCLICK!=""){CheckBox.all[idstr].CHECKALLCLICK=cfg.CHECKALLCLICK;}
    else{CheckBox.all[idstr].CHECKALLCLICK=null;}
    


    if(cfg.VT!=""){CheckBox.all[idstr].VT=cfg.VT;}
    else{CheckBox.all[idstr].VT=0;}
    
    if(cfg.ONCLICK!=""){CheckBox.all[idstr].ONCLICK=cfg.ONCLICK;}
    else{CheckBox.all[idstr].ONCLICK=null;}
   
    
}
CheckBox.all={};

CheckBox.prototype=
{
    toString:function()
    {
			
			var strHtml='<div id="'+this.id+'_CheckBoxDiv"></div><!--bs--><SCRIPT LANGUAGE="JAVASCRIPT">CheckBoxOnload(\''+this.id+'\');</SCRIPT><!--es-->';
			return strHtml;
    },
    
    getValue:function()
    {
    	var idstr=this.id;
    	var VT=CheckBox.all[idstr].VT;

			var o = document.getElementsByName(idstr+"_c");
			var ret="";//从大到小返回所有选中的索引，索引之间用"-"隔开
			var RetHex=0x00000000;//返回一个16进制的数，每位代表每个选项是否被选中，最高位代表索引最大的选项，最低位为索引最小的选项，1表示选中，0表示未选中
			var l=o.length-1;

			for(var i=l;i>=0;i--)
			{
				RetHex=RetHex<<1;
				if(o[i].checked==true)
				{
					ret+=o[i].value+"|";
					RetHex=RetHex|0x01;
				}
			}
			if(ret!=""){ret=ret.substr(0,ret.length-1);}
			RetHex=RetHex.toString(16);
			if(VT==1){return RetHex;}
			else{return ret;}
    },

    setValue:function(setDatevalue)
    {
    	//alert("setDatevalue="+setDatevalue);
    	var idstr=this.id;
    	if(setDatevalue==null){return;}
    	var VT=CheckBox.all[idstr].VT;
			var ele = document.getElementsByName(idstr+"_c");
    	//初始化
    	if(setDatevalue==-1)
    	{
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=false;
					CheckBox.prototype.CheckBoxOnclick(ele[i]);
				}
				return false;
    	}
    	

			if(VT==1)
			{
				//将字符串转换为16进制数字
				var DataHex=parseInt(setDatevalue,16);
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=false;
					//如果选中状态
					if((DataHex>>i)&0x00000001){ele[i].checked=true;}
					CheckBox.prototype.CheckBoxOnclick(ele[i]);
				}
			}
			else
			{
				//alert("setDatevalue="+setDatevalue);
				var checks=setDatevalue.split("|");
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=false;
					if(checks.in_array(ele[i].value)==true){ele[i].checked=true;}
					CheckBox.prototype.CheckBoxOnclick(ele[i]);
				}
			}
    },


   OnlysetValue:function(setDatevalue)
    {
    	//alert("setDatevalue="+setDatevalue);
    	var idstr=this.id;
    	if(setDatevalue==null){return;}
    	var VT=CheckBox.all[idstr].VT;
			var ele = document.getElementsByName(idstr+"_c");
    	//初始化
    	if(setDatevalue==-1)
    	{
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=false;
					//CheckBox.prototype.CheckBoxOnclick(ele[i]);
				}
				return false;
    	}
    	

			if(VT==1)
			{
				//将字符串转换为16进制数字
				var DataHex=parseInt(setDatevalue,16);
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=false;
					//如果选中状态
					if((DataHex>>i)&0x00000001){ele[i].checked=true;}
					//CheckBox.prototype.CheckBoxOnclick(ele[i]);
				}
			}
			else
			{
				//alert("setDatevalue="+setDatevalue);
				var checks=setDatevalue.split("|");
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=false;
					if(checks.in_array(ele[i].value)==true){ele[i].checked=true;}
					//CheckBox.prototype.CheckBoxOnclick(ele[i]);
				}
			}
    },


    //checkbox在选中或取消选中时，进行相关联元素的显示与隐藏处理
		CheckBoxOnclick:function(obj,flag)      //选框元素
		{
			var idname=obj.name;
			var idstr=idname.substring(0,idname.length-2);//在每个checkbox的name中，加了一个“_c”的后缀
			var index=obj.value;
			var objrelate=null;
			objrelate=GetVariableFromStr(idstr+"_relate");
			var objrelateDH=GetVariableFromStr(idstr+"_relate._"+index);
            
            var obj=$_(idstr+"_checkall");
			var ele = document.getElementsByName(idstr+"_c");
            var count =0;
            if(flag!==1){  
                for(var i=0;i<ele.length;i++)  
			    {
                    
                    if(ele[i].checked==false){
                        count=count+1;
                        obj.checked=false;
                    //   obj.value=0;                      
                    }
				}
               
                if(count==0){    
                    obj.checked=true;
                }

                 for(var i=0;i<ele.length;i++)   
				{
					if(ele[i].checked==true){
                        obj.value="0";
                    }
				}
            }
   
			if(objrelateDH!=null)
			{ 
				if(obj.checked==true){
                    for(var i=0;i<objrelateDH.length;i++){
                        DisplayObjTR(objrelateDH[i]);
                    }
                }
				else{
                    for(var i=0;i<objrelateDH.length;i++){
                        HiddenObjTR(objrelateDH[i]);
                    }
                }
			}
			

			if(CheckBox.all[idstr].ONCLICK!=null){
                CheckBox.all[idstr].ONCLICK.call(obj);
            }
            
			
           
		},
		
		
		CheckBoxOnSelcetAll:function(idstr)   //全选框功能
		{
			var CHECKALLCLICK=CheckBox.all[idstr].CHECKALLCLICK;
			
			var obj=$_(idstr+"_checkall");
			var ele = document.getElementsByName(idstr+"_c");
			var flag=1;
    
			if(CHECKALLCLICK!=null)
			{
				CHECKALLCLICK.call(obj,idstr);
			}
			else
			{
				if(obj.value=="0")
				{
					obj.checked=true;
					obj.value="1";
				}
				else
				{
					obj.checked=false;
					obj.value="0";
				}
	
				for(var i=0;i<ele.length;i++)
				{
					ele[i].checked=obj.checked;
			   	CheckBox.prototype.CheckBoxOnclick(ele[i],flag);
				}
			}

           
		},
		
		
		SelcetAll:function()
		{
			var idstr=this.id;
			var obj=$_(idstr+"_checkall");
			var ele = document.getElementsByName(idstr+"_c");
			obj.checked=true;
	
			for(var i=0;i<ele.length;i++)
			{
				ele[i].checked=true;
			}
		}	

}


