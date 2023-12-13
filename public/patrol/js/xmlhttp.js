
function createXMLHttpRequest()
{
	//return new ActiveXObject("msxml2.serverXMLHTTP");

	//if(IsFirefox && window.XMLHttpRequest)   // firefox
	//{
	//	try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");}
	//	catch (e){alert(e);}
	//}
	try { return new XMLHttpRequest(); } catch(e) {}
	try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
	try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
	alert("XMLHttpRequest not supported");
	return null;
}








//用于测试
function getRequest_(){if(xmlHttp.readyState==4){if(xmlHttp.status==200){alert("responseText="+xmlHttp.responseText);}}}

function refreshpage(){if(xmlHttp.readyState==4){if(xmlHttp.status==200){window.location.reload();}}}

function _getRequest_()
{
	if(xmlHttp.readyState==4)
	{
		if(xmlHttp.status==200)
		{
			var s=xmlHttp.responseText;
			//alert(s);
			try {window.execScript(s)}
			catch(e){window.eval(s)};
		}
	}
}



/*

var xmlHttp;
function makeRequest(queryString)
{

	var msXml = new Array();
	msXml[0] = "Microsoft.XMLHTTP";
	msXml[1] = "MSXML2.XMLHTTP.5.0";
	msXml[2] = "MSXML2.XMLHTTP.4.0";
	msXml[3] = "MSXML2.XMLHTTP.3.0";
	msXml[4] = "MSXML2.XMLHTTP";
	if (window.xmlHttpRequest)
	{
		xmlHttp = new XMLHttpRequest();
		
	}
	else
	{
		
		for (var i = 0; i < msXml.length; i++)
		{
			try
			{
				xmlHttp = new ActiveXObject(msXml[i]);
				break;
			}
			catch (e)
			{
				xmlHttp = new xmlHttpRequest();
			}
		}
	}
	
	
	if(!xmlHttp)
  {
	  window.alert("创建XMLHttp对象失败！");
	  return false;
  }

	xmlHttp.onreadystatechange = getRequest;
	xmlHttp.open('post', 'updatemenuurl.php', true);
	xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttp.send(queryString);
}
*/



function DynAppendJS(sId,source)
{
	if((source!=null) && (!$_(sId)))
	{
		var oHead=document.getElementsByTagName('HEAD').item(0);
		var oScript=document.createElement("script");
		oScript.language="javascript";
		oScript.type="text/javascript";
		oScript.id=sId;
		oScript.defer=true;
		oScript.text=source;
		oHead.appendChild(oScript);
	}
}


function SafeHttpSend(httpRequest,sendData)
{
	try{httpRequest.send(sendData);}
	catch(e){if(e instanceof Error){return false;}}
	return true;
}
function loadjsfile(jf)
{
	var jsid=jf.replace(/\./g,"_");
	var jsObj=$_(jsid);
	if(jsObj != null){document.getElementsByTagName("HEAD")[0].removeChild(jsObj);}
	createXmlHttp();
	xmlHttp.onreadystatechange=function(){jsgetready(jsid)};
	xmlHttp.open("get", jf, true);//true为异步，false为同步
	SafeHttpSend(xmlHttp, null);
	//jsgetready(jsid);
}


function jsgetready(jsid)
{
	if(xmlHttp.readyState == 4)
	{
		if(xmlHttp.status==200)
		{
			//var tcp=parseInt(100/tc);
			//var jscontent=xmlHttp.responseText.replace(/\#\#chenhe\#\#/g,tcp);
			jscontent=xmlHttp.responseText;
			DynAppendJS(jsid,jscontent);
		}
	}
}




//将XML DOM结构，转换为字符串
function serializeXml(oNode)
{



	var Exc = function()
	{
		var XmlDoc = null;
		if (IsIe)
		{
			XmlDoc = oNode.xml;

		}
		else
		{
			var g_oSerializer = new XMLSerializer();
			XmlDoc=g_oSerializer.serializeToString(oNode);
		}
		return XmlDoc;
	}
	return Exc();

}


//将xml字符串格式化为DOM结构
function FormatToXmlDOM(strXml)
{

   var Exc = function()
   {
       var XmlDoc = null;
       if (IsIe)
       {
           XmlDoc = new ActiveXObject("Microsoft.XMLDOM");
           XmlDoc.loadXML(strXml);
       }
       else
       {
           //FireFox2.0safari2.0
           XmlDoc = (new DOMParser()).parseFromString(strXml, "text/xml");
       }
       return XmlDoc;
    }
    return Exc();
}







