 var GPSWindow = null;
//-----------------------------------------------------------------//
// openGPSWindow code for Flex implementation                      //
//-----------------------------------------------------------------//
 function openGPSWindow(latitude,longitude)
 	{var url="http://www.oneilsoftware.com/cgi-bin/oneilsoftwareGPS.php?longitude="+longitude+"&latitude="+latitude;
 	 if (GPSWindow)
 	 	{try { GPSWindow.close();
 	 		 }
 	 	 catch (e){}	 
 	 	}
 	 GPSWindow = window.open(url, "gpsWindow", 'dependent=yes, height=300, width=500, resizable=yes, scrollbars=no');
 	}
//-----------------------------------------------------------------//
// closeGPSWindow code for Flex implementation                     //
//-----------------------------------------------------------------//
 function closeGPSWindow()
 	{if (!GPSWindow) return;
 	 GPSWindow.close();
 	 GPSWindow=null;
 	} 	 

//-----------------------------------------------------------------//
// GotoLink code for Flex implementation                           //
//-----------------------------------------------------------------//
function gotoLink(url)
	{window.location=url;
	}
//-----------------------------------------------------------------//
// setTitle code for Flex implementation                           //
//-----------------------------------------------------------------//
function setTitle(title)
	{document.title=title;
	}			 	
    
//-----------------------------------------------------------------//
// Order Prints Code                                               //
//-----------------------------------------------------------------//
 function fillInObject(photoItem)
    {   photoItem.imageThumbWidth=120; 
        photoItem.imageThumbHeight=120;
        photoItem.imageRawWidth=photoItem.width; 
        photoItem.imageRawHeight=photoItem.height;
        
        photoItem.imageRawName=photoItem.fullFilename||photoItem.slideFilename;
        photoItem.imageThumbName = photoItem.thumbFilename;
        
        photoItem.closeOrderWindow=photoItem.rootURL+photoItem.codeDirectory+'closeOrderWindow.html';
        if (photoItem.width>photoItem.height) 
            photoItem.imageThumbHeight=Math.floor(120*photoItem.height/photoItem.width);
        else                
            photoItem.imageThumbWidth =Math.floor(120*photoItem.width/photoItem.height);
        if (!photoItem.fullFilename)
            {if (photoItem.height/photoItem.width<0.75)
                {photoItem.imageRawHeight=Math.floor(1024*photoItem.height/photoItem.width);
                 photoItem.imageRawWidth=1024;
                } 
             else
                {photoItem.imageRawWidth =Math.floor(768*photoItem.width/photoItem.height);
                 photoItem.imageRawHeight=768;
                }
             if (photoItem.imageRawWidth>photoItem.width&&photoItem.imageRawHeight>photoItem.height)
                {photoItem.imageRawWidth=photoItem.width;
                 photoItem.imageRawHeight=photoItem.height;
                }      
            }
        return photoItem;
    }        
 
function submitOrderFormForShutterfly()
  {     return '<script language="javascript">\n'+
        'function orderit()'+
        '{form = document.forms["orderform"];'+
        'form.submit();}'+
        '</script>\n';
    }
function submitOrderFormForSnapGalaxy()
  {     return '<script language="javascript">\n'+
        'function orderit()'+
        '{form = document.forms["orderform"];'+
        'form.submit();}'+
        '</script>\n';
    }
function submitOrderFormForDigiBug()
  {     return '<script language="javascript">\n'+
        'function orderit()'+
        '{form = document.forms["orderform"];'+
        'form.submit();}'+
        '</script>\n';
    }


 function orderFormForShutterfly(photoItem)
     {  return ""+
        '<form name="orderform" action="http://www.shutterfly.com/c4p/UpdateCart.jsp" method="post">\n'+
        '<p>This is a form for ordering a print from Shutterfly\n<br><br>You will be transferred immediately to their web site</p><br>'+
        '<table>'+
        '<tr><td>addim</td><td><input name="addim" size="80" value="1"></td></tr>\n'+
        '<tr><td>protocol</td><td><input name="protocol" size="80" value="SFP,100"></td></tr>\n'+
        '<tr><td>pid</td><td><input name="pid" size="80" value="C4PP"></td></tr>\n'+
        '<tr><td>psid</td><td><input name="psid" size="80" value="JALB"></td></tr>\n'+
        '<tr><td>imnum</td><td><input name="imnum" size="80" value="1"></td></tr>\n'+
        '<tr><td>imraw-1</td><td><input name="imraw-1" size="80" value="'+photoItem.imageRawName+'"></td></tr>\n'+
        '<tr><td>imrawwidth-1</td><td><input name="imrawwidth-1" size="80" value="'+(photoItem.imageRawWidth-1)+'"></td></tr>\n'+
        '<tr><td>imrawheight-1</td><td><input name="imrawheight-1" size="80" value="'+(photoItem.imageRawHeight-1)+'"></td></tr>\n'+
       	'<tr><td>toImage</td><td><input name="toImage" value='+photoItem.originalFilename+'></td></tr>\n'+
        '<tr><td>imthumb-1</td><td><input name="imthumb-1" size="80" value="'+photoItem.imageThumbName+'"></td></tr>\n'+
        '<tr><td>imthumbwidth-1</td><td><input name="imthumbwidth-1" size="80" value="'+(photoItem.imageThumbWidth-1)+'"></td></tr>\n'+
        '<tr><td>imthumbheight-1</td><td><input name="imthumbheight-1" size="80" value="'+(photoItem.imageThumbHeight-1)+'"></td></tr>\n'+
        '<tr><td>returl</td><td><input name="returl" size="80" value="'+photoItem.closeOrderWindow+'"></td></tr>\n'+
        '<tr><td>fromSlides</td><td><input name="fromSlides" size="80" value="'+photoItem.galleryIndex+'"></td></tr>\n'+
        '<tr><td>toThumb</td><td><input name="toThumb" size="80" value="'+photoItem.originalFilename+'"></td></tr>\n'+
        '</tr></table>\n'+
    	'</form>\n';
     }
 function orderFormForSnapGalaxy(photoItem)
     {  return ""+
        '<form action="http://www.snapgalaxy.com/jalbum/" method="post" name="orderform">\n'+
        '<p>This is a form for ordering a print from snapgalaxy.com\n<br><br>You will be transferred immediately to their web site</p><br>'+
        '<table>'+
    	'<tr><td>version</td><td><input name="version" size="80" value="100"></td></tr>\n'+
    	'<tr><td>referid</td><td><input name="referid" size="80" value="JALBUM"></td></tr>\n'+
    	'<tr><td>partnerid</td><td><input name="partnerid" size="80" value="default"></td></tr>\n'+
    	'<tr><td>cmd</td><td><input name="cmd" size="80" value="addimg"></td></tr>\n'+       
    	'<tr><td>imagecount</td><td><input name="imagecount" size="80" value="1"></td></tr>\n'+
    	'<tr><td>image-1</td><td><input name="image_1" size="80" value="'+photoItem.imageRawName+'"></td></tr>\n'+
    	'<tr><td>imagewidth-1</td><td><input name="imagewidth_1" size="80" value="'+(photoItem.imageRawWidth-1)+'"></td></tr>\n'+
    	'<tr><td>imageheight-1</td><td><input name="imageheight_1" size="80" value="'+(photoItem.imageRawHeight-1)+'"></td></tr>\n'+
    	'<tr><td>toImage</td><td><input name="toImage" value='+photoItem.originalFilename+'></td></tr>\n'+
    	'<tr><td>thumb-1</td><td><input name="thumb_1" size="80" value="'+photoItem.imageThumbName+'"></td></tr>\n'+
    	'<tr><td>thumbwidth-1</td><td><input name="thumbwidth_1" size="80" value="'+(photoItem.imageThumbWidth-1)+'"></td></tr>\n'+
    	'<tr><td>thumbheight-1</td><td><input name="thumbheight_1" size="80" value="'+(photoItem.imageThumbHeight-1)+'"></td></tr>\n'+
    	'<tr><td>returnurl</td><td><input name="returnurl"  value="'+photoItem.closeOrderWindow+'"></td></tr>\n'+    
    	'<tr><td>addmoreurl</td><td><input name="addmoreurl" size="80" value="'+photoItem.closeOrderWindow+'"></td></tr>\n'+
    	'<tr><td>fromSlide</td><td><input name="fromSlides"  value="'+photoItem.galleryIndex+'"></td></tr>\n'+
    	'<tr><td>toThumb</td><td><input name="toThumb" size="80" value="'+photoItem.originalFilename+'"></td></tr>\n'+
    	'<tr><td>cssurl</td><td><input name="cssurl" size="80" value=""></td></tr>\n';
        '</tr></table>\n'+
    	'</form>\n';
     }

 function orderFormForDigiBug(photoItem)
     {  return ""+
        '<form action="http://www.digibug.com/dapi/order.php" method="post" name="orderform">\n'+
        '<p>This is a form for ordering a print from digibug.com\n<br><br>You will be transferred immediately to their web site</p><br>'+
        '<table>'+
    	'<tr><td>digibug_api_version</td><td><input name="digibug_api_version" size="80" value="100"></td></tr>\n'+
    	'<tr><td>partner_code</td><td><input name="partner_code" size="80" value="67"></td></tr>\n'+
    	'<tr><td>company_id</td><td><input name="company_id" size="80" value="0"></td></tr>\n'+
    	'<tr><td>event_id</td><td><input name="event_id" size="80" value="Album"></td></tr>\n'+
    	'<tr><td>cmd</td><td><input name="cmd" size="80" value="addimg"></td></tr>\n'+
    	'<tr><td>num_images</td><td><input name="num_images" size="80" value="1"></td></tr>\n'+
    	'<tr><td>imthumbheight-1</td><td><input name="image_1" size="80" value="'+photoItem.imageRawName+'"></td></tr>\n'+
    	'<tr><td>image_1</td><td><input name="imagewidth_1" size="80" value="'+(photoItem.imageRawWidth-1)+'"></td></tr>\n'+
    	'<tr><td>imageheight-1</td><td><input name="imageheight_1" size="80" value="'+(photoItem.imageRawHeight-1)+'"></td></tr>\n'+
    	'<tr><td>toImage</td><td><input name="toImage" value='+photoItem.originalFilename+'></td></tr>\n'+
    	'<tr><td>thumb_1</td><td><input name="thumb_1" size="80" value="'+photoItem.imageThumbName+'"></td></tr>\n'+
    	'<tr><td>thumbwidth-1</td><td><input name="thumbwidth_1" size="80" value="'+(photoItem.imageThumbWidth-1)+'"></td></tr>\n'+
    	'<tr><td>thumbheight-1</td><td><input name="thumbheight_1" size="80" value="'+(photoItem.imageThumbHeight-1)+'"></td></tr>\n'+
    	'<tr><td>returnurl</td><td><input name="returnurl"  value="'+photoItem.closeOrderWindow+'"></td></tr>\n'+    
    	'<tr><td>addmoreurl</td><td><input name="addmoreurl" size="80" value="'+photoItem.closeOrderWindow+'"></td></tr>\n'+
    	'<tr><td>fromSlides</td><td><input name="fromSlides"  value="'+photoItem.galleryIndex+'"></td></tr>\n'+
    	'<tr><td>toThumb</td><td><input name="toThumb" size="80" value="'+photoItem.originalFilename+'"></td></tr>\n'+
        '</tr></table>\n'+
    	'</form>\n';
    }
 

//-----------------------------------------------------------------//
// Order Prints Code                                               //
//-----------------------------------------------------------------//
 function orderPrints(photoItem)
    {   if (location.protocol != 'http:') 
            {alert("Ordering prints on-line requires this album to be hosted on a public web server" );
           }      
   		else if (confirm("A popup windown will be opened connecting you to "+photoItem.orderType+".com\n"+
                   "You may complete the order or click 'Add more photos' to return to this album\n"+
                  "and add more photos before completing your order.\n\n"+
                   "If the popup window does not open, please disable your popup blocker for this site.\n"+
                  "Disclaimer:\n"+photoItem.orderType+".com is solely responsible for the fulfillment of this printing service.")) 
                        {orderWindow(photoItem);
   		                }
    }
//-----------------------------------------------------------------//
// Order Prints Code                                               //
//-----------------------------------------------------------------//
 var myOrderWindow = null;
 function orderWindow(photoItem)
 {	 if (myOrderWindow)
 	 	{try { myOrderWindow.close();}
 	 	 catch (e){}	 
 	 	}
    var form="";
    var submit="";
    photoItem=fillInObject(photoItem);
    switch (photoItem.orderType)
        {case "digibug":
            form = orderFormForDigiBug(photoItem);
            submit = submitOrderFormForDigiBug();
            break;
         case "snapgalaxy":
            form = orderFormForSnapGalaxy(photoItem);
            submit = submitOrderFormForSnapGalaxy();
            break;
         case "shutterfly":
            form = orderFormForShutterfly(photoItem);
            submit = submitOrderFormForShutterfly();
            break;    
        }
    var output ="<html><head><title>"+document.title+" Online Print</title>\n"+submit+"</head><body onload='setTimeout(\"orderit()\",200)' style='margin:8%;padding:0px;'>\n"+form+"</body></html>";     
    myOrderWindow = window.open("", "OrderPrints", 'dependent=yes, height=500, width=750, resizable=yes, scrollbars=yes');
    myOrderWindow.document.write(output);
    //myOrderWindow.document.write(submit);
    //myOrderWindow.document.write("</html><body onLoad='setTimeout(\"orderit()\",500)' style='margin:8%;padding:0px;'>"+form+"</body></html>");
    myOrderWindow.document.close(); 
} 
//-----------------------------------------------------------------//
// Startup code for Flash                                          //
//-----------------------------------------------------------------//
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
// Globals
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 0;
var codeDirectory;
// setupFlash parameters
//   parameter #1 - res/module path
//   parameter #2 - debug mode ... only for developer - should be false for production
//   parameter #3 - full screen mode enabled for flash in browser
//   parameter #4 - hide menu when display album ... useful for imbedding album in web page???
//   parameter #5 - Name of the DPL Menu generated for this album...   default name is DPLMenu.xml
//   parameter #6 - Default Album to be displayed first .. Case sensitive
//   parameter #7 - Default View to be displayed first  .. Case sensitive .. overrides selection in skin
//   parameter #8 - Default Theme to be displayed first .. Case sensitive .. overrides selection in skin
function setupFlash(moduleDir,debug,fullScreen,menu_visible,DPLMenu_File,defaultAlbumName,defaultViewName,defaultThemeName)
{// Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
        var htmlParms = new QSObject(window.location);
        var fullScreenMode=(typeof htmlParms.fullScreen!="undefined")?htmlParms.fullScreen:((typeof fullScreen=="undefined")?true:fullScreen);
        var menuVisible=(typeof htmlParms.menuVisible!="undefined")?htmlParms.menuVisible:((typeof menu_visible=="undefined")?true:menu_visible);
        codeDirectory=moduleDir;
        if (typeof(debug) == "undefined") debug=false;
	    var DPLMenu = (typeof htmlParms.DPLMenu!="undefined")?htmlParms.DPLMenu:((typeof DPLMenu_File=="undefined")?"DPLMenu.xml":DPLMenu_File);
        var defaultAlbum=(typeof htmlParms.defaultAlbum!="undefined")?htmlParms.defaultAlbum:((typeof defaultAlbumName=="undefined")?"":defaultAlbumName);
        var defaultView=(typeof htmlParms.defaultView!="undefined")?htmlParms.defaultView:((typeof defaultViewName=="undefined")?"":defaultViewName);
        var defaultTheme=(typeof htmlParms.defaultTheme!="undefined")?htmlParms.defaultTheme:((typeof defaultThemeName=="undefined")?"":defaultThemeName);
        var hasProductInstall = DetectFlashVer(6, 0, 65);

        // Version check based upon the values defined in globals
        var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);


        // Check to see if a player with Flash Product Install is available and the version does not meet the requirements for playback
        if ( hasProductInstall && !hasRequestedVersion ) {
        	// MMdoctitle is the stored document.title value used by the installation process to close the window that started the process
        	// This is necessary in order to close browser windows that are still utilizing the older version of the player after installation has completed
        	// DO NOT MODIFY THE FOLLOWING FOUR LINES
        	// Location visited after installation is complete if installation is required
        	var MMPlayerType = (isIE == true) ? "ActiveX" : "PlugIn";
        	var MMredirectURL = window.location;
            document.title = document.title.slice(0, 47) + " - Flash Player Installation";
            var MMdoctitle = document.title;

        	AC_FL_RunContent(
        		"src", moduleDir+"/playerProductInstall"+(debug?"-debug":""),
        		"FlashVars", "MMredirectURL="+MMredirectURL+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle+""+
					"&DPLMenu="+moduleDir+"/"+DPLMenu+"&defaultAlbum="+defaultAlbum+"&defaultView="+defaultView+"&defaultTheme="+defaultTheme,
        		"width", "100%",
        		"height", "100%",
        		"align", "middle",
//				"wmode","opaque",  // can cause problems of duplicate keystrokes in Firefox
        		"id", "PhotoViewerControl",
        		"quality", "best",
        		"bgcolor", "#869ca7",
        		"name", "PhotoViewerControl",
        		"allowFullScreen",(fullScreenMode?"true":"false"),
        		"allowScriptAccess","sameDomain",
        		"type", "application/x-shockwave-flash",
        		"pluginspage", "http://www.adobe.com/go/getflashplayer"
        	);
        } else if (hasRequestedVersion) {
        	// if we've detected an acceptable version
        	// embed the Flash Content SWF when all tests are passed
        	AC_FL_RunContent(
        			"src","PhotoViewerControl"+(debug?"-debug":""),
        			"width", "100%",
        			"height", "100%",
        			"align", "middle",
        			"id", "PhotoViewerControl",
        			"quality", "best",
//        			"wmode","opaque",    // can cause problems of duplicate keystrokes in Firefox
					"bgcolor", "#869ca7",
        			"flashvars","DPLMenu="+moduleDir+"/"+DPLMenu+
						"&menuVisible="+(menuVisible?"true":"false")+"&defaultAlbum="+defaultAlbum+"&defaultView="+defaultView+"&defaultTheme="+defaultTheme,
        			"name", "PhotoViewerControl",
	        		"allowFullScreen", (fullScreenMode?"true":"false"),
        			"allowScriptAccess","sameDomain",
        			"type", "application/x-shockwave-flash",
        			"pluginspage", "http://www.adobe.com/go/getflashplayer"
        	);
          } else {  // flash is too old or we can't detect the plugin
            var alternateContent = 'This DPL Album requires the Adobe Flash Player  Version 9 or higher. <br><br>' +
           	'<a href=http://www.adobe.com/go/getflash/>Get Flash</a> and try again.';
            document.write(alternateContent);  // insert non-flash content
          }
}

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var i, str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (i in params)
  			{str += '><param name="' + i + '" value="' + params[i];
  			 if (i == "flashvars")
  				{ str+="&allowFullScreen="+ (params.hasOwnProperty("allowFullScreen")?params.allowFullScreen:"false");
  				}
  			 str += '" /> ';
  			}
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (i in embedAttrs)
  			{str += i + '="' + embedAttrs[i];
   			 if (i == "flashvars")
  				{ str+="&allowFullScreen="+ (embedAttrs.hasOwnProperty("allowFullScreen")?embedAttrs.allowFullScreen:"false");
  				}
  			 str += '" ';
  			} 
  		str += '> </embed>';
    }
//alert(str);
    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function QSObject(querystring){ 

    //Create regular expression object to retrieve the qs part 

    var qsReg = new RegExp("[?][^#]*","i"); 

    hRef = unescape(querystring); 

    var qsMatch = hRef.match(qsReg); 

 

    //removes the question mark from the url 

    qsMatch = new String(qsMatch); 

    qsMatch = qsMatch.substr(1, qsMatch.length -1); 

 

    //split it up 

    var rootArr = qsMatch.split("&"); 

    for(i=0;i<rootArr.length;i++){ 

        var tempArr = rootArr[i].split("="); 

        if(tempArr.length ==2){ 

            tempArr[0] = unescape(tempArr[0]); 

            tempArr[1] = unescape(tempArr[1]); 

 

            this[tempArr[0]]= tempArr[1]; 

        } 

    } 

} 


