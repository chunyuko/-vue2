////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MsgAlignment()
{
	//创建消息列表;
	var MsgList = new Array();
	//是否指定了为哪个realplay的消息，如果不为空，则各个realplay与自己的ID进行比较后，相同的去处理
	//消息的分组名
	var MsgVID = new Array();
	//对应消息队列的参数列表;
	var ParamList = new Array();

	//队列当前最大消息数
	var TotalMsg;

	//当前或查询的消息索引
	var MsgIndex;

	//===============================================;
	/*--事务处理区--*/
	//清空所有任务队列
	this.ClearMsgList=function()
	{
		MsgList.length=0;
		MsgVID.length=0;
		ParamList.length=0;
		/*
		MsgList=[];
		MsgVID=[];
		ParamList=[];
		*/
		TotalMsg=0;
		MsgIndex=0;
	}

	//对任务队列某个分组的所有任务进行清空
	this.ClearMsgListByGroup = function(vid)
	{
		for(var i=0;i<TotalMsg ;i++ )
		{
			if(MsgVID[i]==vid)
			{
				MsgList.splice(i,1);
				MsgVID.splice(i,1);
				ParamList.splice(i,1);
				TotalMsg-=1;
			}
		}
	}
	//对某个类型的所有任务队列清空
	this.ClearMsgListByName = function(fStr)
	{
		var i;
		for(var i=0;i<TotalMsg ;i++ )
		{
			if(MsgList[i].toUpperCase()==fStr.toUpperCase())
			{
				MsgList.splice(i,1);
				MsgVID.splice(i,1);
				ParamList.splice(i,1);
				TotalMsg-=1;
			}
		}
	}



	//返回当前任务队列中，消息的数量
	this.getMsgNum=function()
	{
		return TotalMsg;

	}
	//新增消息
	this.addMsg=function()
	{
		var VarArr = new Array();
		VarArr = arguments;
		ParseArgument(VarArr);
	}


	//返回消息队列中的第一个消息,并在消息队列中删除该消息
	this.popfirstmsg=function()
	{
		var tmpVar = new Array();
		if(MsgList.length>0)
		{
			tmpVar.push(MsgList.shift());
			tmpVar.push(MsgVID.shift());
			tmpVar.push(ParamList.shift());
			TotalMsg-=1;
		}
		//alert(MsgList.length)
		//alert(tmpVar)
		return tmpVar;
	}

	//返回指定索引的消息，并在消息队列中删除该消息
	this.popindexmsg=function(pid)
	{
		var tmpVar = new Array()
		tmpVar.push(MsgList.splice(pid,1));
		tmpVar.push(MsgVID.splice(pid,1));
		tmpVar.push(ParamList.splice(pid,1));
		TotalMsg-=1;
		return tmpVar;
	}

	//返回消息队列中的最后一个消息，并在消息队列中删除该消息
	this.poplastmsg=function()
	{
		var tmpVar = new Array();
		tmpVar.push(MsgList.pop());
		tmpVar.push(MsgVID.pop());
		tmpVar.push(ParamList.pop());
		TotalMsg-=1;
		return tmpVar;
	}

	//顺序执行消息
	this.RunMsg = function(DisplayObj)
	{
		//while (TotalMsg>=0)
		for(var i=0;i<TotalMsg ;i++ )
		{
			eval(MsgList[i]+"("+ParamList[i]+")");
			DisplayObj.innerText = RuturnMsg[i];
			this.poplastmsg();
		}
	}



	//===============================================;
	/*--功能区--*/
	//处理新增队列的参数列表
	function ParseArgument(Arg)
	{
		MsgList.push(Arg[0]);
		MsgVID.push(Arg[1]);

		if(Arg.length>=2)
		{
			var tmpStr = ""
			var tmpArr = new Array();
			for(var i=2;i<=Arg.length-1;i++)
			{
				tmpStr= tmpStr + "'" + Arg[i] + "',";
			}
			tmpArr = tmpStr.split(",");
			tmpArr.pop();
			tmpStr = tmpArr.toString();

		}
		ParamList.push(tmpStr);
		TotalMsg = MsgList.length;
	}

	//根据函数名查找消息
	this.SearchMsg = function(fStr)
	{
		var i;
		for(var i=0;i<TotalMsg ;i++ )
		{
			if(MsgList[i].toUpperCase()==fStr.toUpperCase())
			{
				return i;
			}
		}
		return -1;
	}

	//根据分组名查找消息
	this.SearchMyMsg = function(vid)
	{
		var i;
		for(var i=0;i<TotalMsg ;i++ )
		{
			if(MsgVID[i]==vid)
			{
				return i;
			}
		}
		return -1;
	}

}


//处理消息队列中的任务
//msggroup:任务的分组，在OpenVideoByDevID中，如果当前窗口繁忙，则以当前窗口的ID号为分组名（vwid）
//在openallvideo，创建的任务队列，以“openallvideo”为分组名
//Task为任务队列，msggroup为该队列中，分组名称为msggroup的任务

function ProcessMsg(msggroup,Task)
{
	//alert("OpenCloseVideoTask.msggroup="+msggroup);
	//关闭监视后，执行消息队列中的相关消息命令（主要用于关闭监视后的回调）
	var mid=Task.SearchMyMsg(msggroup);
//	alert("mid="+mid);
	var cmd=new Array();
	if(mid==-1)
	{
		//cmd=OpenCloseVideoTask.popfirstmsg;
	}
	else{cmd=Task.popindexmsg(mid);}

	//alert("cmd.length="+cmd.length);
	if(cmd.length>0)
	{
		
		if(DebugModel==1)
		{

			WriteRemoteFile_(" ProcessMsg task is="+cmd[0]+"("+cmd[2]+")");
		}
		//alert(cmd[0]+"("+cmd[2]+")");
		eval(cmd[0]+"("+cmd[2]+")");


	}

}