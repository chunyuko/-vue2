

function monitor(Obj)
{
    var newState = Obj.vlc.input.state;
    
    
    //空闲/关闭= 0，开幕= 1，缓冲= 2，打= 3，暂停= 4，停止= 5，错误= 6
    //7:断线
    if( Obj.prevState != newState )
    {
    	//
			if( newState == 0 )
			{
			    // current media has stopped 
			    //onStop();
			}
			else if( newState == 1 )
			{
			    // current media is openning/connecting
			    //onOpen();
			}
			else if( newState == 2 )
			{
			    // current media is buffering data
			    //onBuffer();
			}
			else if( newState == 3 )
			{
			    // current media is now playing
			    //onPlay();
			}
			else if( newState == 4 )
			{
			    // current media is now paused
			    //onPause();
			}
			else if(newState== 5 || newState == 6 || newState == 7)
			{
				reConnect(Obj);
			}
	
			Obj.prevState = newState;
    }
    else if( newState == 3 )
    {
			// current media is playing
			//onPlaying();
    }

};




function reConnect(Obj)
{
	var State = Obj.vlc.input.state;
	//alert("State="+State);
	if(State > 5 || State == 0) 
	{
		doStop(Obj);
		doGo(Obj);
	}                          
}




function doGo(Obj)
{
  var options = new Array(":vout-filter=deinterlace", ":deinterlace-mode=linear");
  Obj.vlc.playlist.clear();
  //Obj.vlc.playlist.add(Obj.playurl, null, "rtsp-tcp");
  //vlc.playlist.add(targetURL, null, options);
//alert("Obj.playurl="+Obj.playurl);
  Obj.vlc.playlist.add(Obj.playurl);
  Obj.vlc.playlist.play();
  Obj.monitorTimer=setInterval(function(){monitor(Obj);},1000);
  
  //下面的方法也可以
	//var vlc=$_("Monitor1");
	//var id=vlc.playlist.add(Rtspurl);
	//vlc.playlist.playItem(id);
};


function doStop(Obj)
{
// 	alert("Obj.playurl="+Obj.playurl);
 	Obj.vlc.playlist.stop();
	window.clearInterval(Obj.monitorTimer);
	Obj.monitorTimer="";
};







function simplePlay(Obj)
{
	
	doStop(Obj);
	doGo(Obj);

};