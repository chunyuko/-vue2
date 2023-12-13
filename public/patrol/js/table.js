



/**
 * 初始化表格 插入数据 
 * 
 * @param {*} tableObj    table标签对象 
 * @param {*} HiddenOrDis    目前只有Dis一个判断,其他都是隐藏表格 
 */
function InitDataTable(tableObj, HiddenOrDis) {
	if (HiddenOrDis == "Dis") {
		tableObj.style.display = DisBlock;
	} else {
		tableObj.style.display = 'none';
	}
}

/**
 * 清空表格   每次操作插入表格之前清空一下
 * @param {*} TableObj    table标签表格对象 
 */
function ClearTable(TableObj) {
	for (i = 1; i < TableObj.rows.length; i++) {
		TableObj.deleteRow(i);
		i--;
	}
}




function ShowData(dataArray, tableObj, everypagenum) {
	ClearTable(tableObj);
	var l = dataArray.length;
	//	alert("ShowData= l ="+l);
	for (var i = 0; i < l; i++) {
		//disobjcontent(dataArray[i]);
		//		alert("dataArray[i] length="+dataArray[i].Result_ID);

		if (dataArray[i] == "") {
			continue;
		}
		/*
		if(dataArray[i]['page_contents']!="")
		{
			//php传过来的时候，编码了一下
			var PageContent=decodeURIComponent(dataArray[i]['page_contents']);
			DisPageContent(PageContent);
		}
		*/
		InsertToTable(i, dataArray[i], everypagenum);
	}
}




function DisPageContent(PageContent) {
	if ($_("page_contents") != undefined && $_("page_contents") != null) {
		$_("page_contents").innerHTML = PageContent;
	}
}



// 选中行 样式变更 
var curRow = null;
function SelectRow() {
	var clickrow = window.event.srcElement;
	//alert("clickrow.tagName="+clickrow.tagName);
	while (clickrow.tagName != "TR") { clickrow = clickrow.parentElement; }
	/*
	if(curRow){curRow.style.backgroundColor="#b7c2d2";}
	clickrow.style.backgroundColor="#0099FF";
	curRow=clickrow;
	*/
	//if(curRow){TRBGChange(curRow,"#b4b9c5");}
	//if(curRow){TRBGChange(curRow,"#b7c2d2");}
	if (curRow) {
		if (window.parent.parent.parent.parent.sessionUserType == 8) {
			TRBGChange(curRow, "#071b60");
		} else {
			//云南普洱首页面的实时信息颜色需要修改一下
			if (window.parent.parent.parent.parent.PageStyle == 0) {
				if (window.parent.parent.yunnanWebData == true || window.parent.parent.yunnanRealData == true) {
					TRBGChange(curRow, "#071b60");
				} else {
					TRBGChange(curRow, "#060e34");
				}
			} else {
				TRBGChange(curRow, "#FFFFFF");
			}
		}
	}
	//由于在css文件中，直接指定了td的背景颜色，所以此处直接设置tr的背景颜色不能生效
	//TRBGChange(clickrow,"#0099FF");

	//云南普洱首页面的实时信息颜色需要修改一下
	if (window.parent.parent.parent.parent.PageStyle == 0) {
		if (window.parent.parent.yunnanWebData == true || window.parent.parent.yunnanRealData == true) {
			TRBGChange(clickrow, "#536d9d");
		} else {
			TRBGChange(clickrow, "#526FAA");
		}
	} else {
		TRBGChange(clickrow, "#b4b9c5");
	}
	//clickrow.style.backgroundColor="#0099FF";
	curRow = clickrow;
}



// 表格颜色添加  trEle 是tr所在id父元素一行的标签 
function TRBGChange(trEle, color) {
	var tds = trEle.childNodes;
	var l = tds.length;
	for (var i = 0; i < l; i++) {
		tds[i].style.backgroundColor = color;
	}
}



// 上一页 下一页 
function preSearch() {
	var PageNow = parseInt($_("PageNow").value);
	if (PageNow == 0) { alert("当前已经是第一页！"); return; }
	PageNow--;
	$_("PageNow").value = PageNow;

	btnSearchClick(0);
}

function nextSearch() {
	var PageNow = parseInt($_("PageNow").value);
	var TotalPage = parseInt($_("TotalPage").value);
	if (PageNow >= TotalPage - 1) { alert("当前已经是最后一页！"); return; }
	PageNow++;
	//alert("PageNow="+PageNow);
	$_("PageNow").value = PageNow;
	btnSearchClick(0);
}

// 跳转至几页 
function SearchByPage(event) {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (keyCode != 13) { return; }
	var SearchPage = parseInt($_('CurPage').value);
	var TotalPage = parseInt($_('TotalPage').value);
	if (SearchPage < 1 || SearchPage > TotalPage) { alert("输入的页码错误！"); return; }
	$_("PageNow").value = SearchPage - 1;

	btnSearchClick(0);

}



// 跳转至第一页 尾页  
function GotoFirstPage() {
	$_("PageNow").value = 0;
	btnSearchClick(0);
}

function GotoEndPage() {
	var TotalPage = parseInt($_('TotalPage').value);
	$_("PageNow").value = TotalPage - 1;
	btnSearchClick(0);
}