/* Constants
*/
var UNDEF='undefined';
var C = {
	THMB:'#thumbs',
	THMBC:'#cont',
	THMC:'#cont>ul.thmb',
	SCRL:'#scroll-left',
	SCRR:'#scroll-right',
	CLOS:'#close',
	IMGS:'#images',
	HEAD:'#header',
	FOOT:'#footer',
	UPBTN:'#up',
	PRVBTN:'#prev',
	NXTBTN:'#next'
};

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,'');
};
String.prototype.cleanupHTML = function() {
	return this.replace(/<br>/g,'\n').replace(/\&amp;/g,'&').replace(/\&lt;/g,'<').replace(/\&gt;/g,'>').replace(/\&(m|n)dash;/g,'-');
};
String.prototype.appendSep = function(s,sep) {
	if(typeof sep=='undefined') sep=' &middot; ';
	return (this.length?(this+sep):'')+s;
};

/* Easing by George Smith
*/

jQuery.extend(jQuery.easing, {
	easeOutBack: function (x, t, b, c, d, s) {
		if(s==undefined) s=1.70158;
		return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
	}
});

/* Cookie handling from http://www.quirksmode.org/js/cookies.html
*/
var Cookie = {
	put: function(name,value,days){
		var expires='';
		if(days){
			var date=new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires='; expires='+date.toGMTString();
		}
		document.cookie=name+"="+value+expires+"; path=/";
	},
	get: function(name){
		var nm=name+'=';
		var ca=document.cookie.split(';');
		for(var i in ca) {
			var c=ca[i].replace(/^\s*/,'');
			if(c.indexOf(nm)==0)
				return c.substring(nm.length);
		}
		return null;
	},
	getBoolean: function(name){
		var c=Cookie.get(name);
		return c!=null&&c!='false';
	},
	clear: function(name){
		Cookie.put(name,'',-1);
	}
};

/* Skin code
*/

var Ctrl = {
	top:null,
	bottom:null,
	topOn:true,
	bottomOn:true,
	init:function(){
		Ctrl.top=$('#top');
		Ctrl.bottom=$('#bottom');
		Ctrl.center();
		$('#toptab').click(Ctrl.toggleTop);
		$('#bottomtab').click(Ctrl.toggleBottom);
		if(!(Ctrl.topOn=Cookie.getBoolean('_cs_top')))
			Ctrl.top.css({top:-Ctrl.top.height()});
		if(!(Ctrl.bottomOn=Cookie.getBoolean('_cs_bottom')))
			Ctrl.bottom.css({bottom:-Ctrl.bottom.height()+25});
	},
	center:function(){
		var wh=$('#images').height();
		var bh=$('#prev').height();
		$('#prev,#next').css({top:Math.round((wh-bh)/2)});
	},
	toggleTop:function(){
		var ch=Ctrl.top.height();
		Ctrl.top.stop(true,false);
		if(Ctrl.topOn)
			Ctrl.top.animate({top:-ch},500,'easeOutBack');
		else
			Ctrl.top.animate({top:0},500,'easeOutBack');
		Ctrl.topOn=!Ctrl.topOn;	
		Cookie.put('_cs_top',Ctrl.topOn);
	},
	toggleBottom:function(){
		var ch=Ctrl.bottom.height();
		Ctrl.bottom.stop(true,false);
		if(Ctrl.bottomOn)
			Ctrl.bottom.animate({bottom:-ch+25},500,'easeOutBack');
		else
			Ctrl.bottom.animate({bottom:0},500,'easeOutBack');
		Ctrl.bottomOn=!Ctrl.bottomOn;	
		Cookie.put('_cs_bottom',Ctrl.bottomOn);
	}			
};
	
var Imgs = {
	div:null,
	curr:-1,
	width:0,
	height:0,
	left:0,
	ul:null,
	anim:0,
	fit:true,
	init:function(){
		Imgs.ul=$('#images>ul');
		if(images.length>0){
			l=Imgs.getImg(0);
			Imgs.curr=0;
			Imgs.width=Imgs.div.width();
			Imgs.height=Imgs.div.height();
			Imgs.left=Imgs.ul.offset().left;
			Imgs.fit=Cookie.getBoolean('_cs_fit');
			Imgs.setImg(1,0);
			Imgs.setImg(2,1);
			Imgs.preload(2);
			$('#prev').click(Imgs.prev);
			$('#next').click(Imgs.next);
			Imgs.setCaption();
			Thumbs.setactive();
		}
	},
	preload:function(n){
		if(n<(images.length)&&n>=0){
			var img=new Image();
			img.src=images[n].file;
		}	
	},
	/*addCaption:function(n){
		if(Imgs.curr<0) return;
		var t=images[n].title.trim();
		var c=images[n].comment.trim();
		if(t.length||c.length){
			$('#caption>div').empty().append('<span>'+n+'</span>'+t.length?('<b>'+t+'</b>'):''+c.length?('<p>'+c+'</p>'):'');
			$('#caption>div').fadeIn(1000);
		}
	},*/
	next:function(){
		Imgs.goto((Imgs.curr+1)%images.length);
	},
	prev:function(){
		Imgs.goto((Imgs.curr==0)?(images.length-1):Imgs.curr-1);
	},
	getImg:function(pos){
		return Imgs.ul.find('li').eq(pos);
	},
	setImg:function(pos,n){
		if(n<0||n>=images.length) return;
		var l=Imgs.getImg(pos);
		l.empty().append('<img src="'+images[n].file+'" alt="'+images[n].file+'" />');
		Imgs.fitWindow(pos,n);
		//l.find('img').css({marginTop:Math.round((Imgs.height-images[n].height)/2)}).click(Imgs.next);
	},
	fitWindow:function(pos,n){
		if(n<0||n>=images.length) return;
		var iw=parseInt(images[n].width), ih=parseInt(images[n].height);
		var l=Imgs.getImg(pos);
		if(Imgs.fit){
			if(Imgs.width/iw<=Imgs.height/ih){ih=Math.round(ih*Imgs.width/iw);iw=Imgs.width;}
			else{iw=Math.round(iw*Imgs.height/ih);ih=Imgs.height;}
		}
		//alert(images[n].file+' No:'+n+'\nImgs.width:'+Imgs.width+' .height:'+Imgs.height+'\nimg.width:'+iw+' .height:'+ih);
		l.find('img').css({width:iw,height:ih,top:Math.round((Imgs.height-ih)/2),left:Math.round((Imgs.width-iw)/2)}).dblclick(Imgs.toggleFit);
	},
	toggleFit:function(){
		var iw=parseInt(images[Imgs.curr].width), ih=parseInt(images[Imgs.curr].height);
		var ww=Imgs.width, wh=Imgs.height;
		var l=(ww-iw)/2, t=(wh-ih)/2;
		if(!Imgs.fit){
			if(ww/iw<=wh/ih) {ih=Math.round(ih*ww/iw);iw=ww;}
			else {iw=Math.round(iw*wh/ih);ih=wh;}
			l=(ww-iw)/2; t=(wh-ih)/2;
		}else{
			if(typeof c!=UNDEF && (iw>ww&&ih>wh)){
				l=Math.round(ww/2-c.x*iw);
				t=Math.round(wh/2-c.y*ih);
				if(l>0) l=0; else if(l<(ww-iw)) l=ww-iw;
				if(t>0) t=0; else if(t<(wh-ih)) t=wh-ih;
			}else{
				l=(ww-iw)/2; t=(wh-ih)/2;
			}
		}
		Imgs.fit=!Imgs.fit;
		Cookie.put('_cs_fit',Imgs.fit);
		Imgs.getImg(1,Imgs.curr).find('img').animate({width:iw,height:ih,left:l,top:t},500);
		Imgs.fitWindow(0,Imgs.curr-1);
		Imgs.fitWindow(2,Imgs.curr+1);
	},
	stopRight:function(){
		//Imgs.getImg(3).find('#caption>div').stop(true,false);
		Imgs.getImg(3).remove();
		Imgs.anim=0;
	},
	moveRight:function(n){
		Imgs.ul.prepend('<li>&nbsp;</li>').css({left:Imgs.left-Imgs.width});;
		if(n<(Imgs.curr-1)){Imgs.setImg(1,n);Imgs.setImg(2,n+1);}
		Imgs.setImg(0,n-1);
		Imgs.ul.animate({left:Imgs.left+'px'},1000,'easeOutBack',Imgs.stopRight);
		Imgs.preload(n-2);
	},		
	stopLeft:function(){
		//Imgs.getImg(0).find('#caption>div').stop(true,false);
		Imgs.getImg(0).remove();
		Imgs.ul.css({left:Imgs.left});
		Imgs.anim=0;
	},
	moveLeft:function(n){
		Imgs.ul.append('<li>&nbsp;</li>');
		if(n>(Imgs.curr+1)){Imgs.setImg(2,n);Imgs.setImg(1,n-1);}
		Imgs.setImg(3,n+1);
		Imgs.ul.animate({left:(Imgs.left-Imgs.width)+'px'},1000,'easeOutBack',Imgs.stopLeft);
		Imgs.preload(n+2);
	},
	stopMove:function(){
		if(Imgs.anim==0) return;
		Imgs.ul.stop(true,false);
		if(Imgs.anim<0) Imgs.stopRight();
		else Imgs.stopLeft();
	},
	goto:function(n){
		if(n==Imgs.curr) return;
		$('#caption>div').stop(true,false).fadeOut(250);
		Imgs.stopMove();
		Imgs.anim=n-Imgs.curr;
		if(Imgs.anim<0) Imgs.moveRight(n);
		else Imgs.moveLeft(n);
		Imgs.curr=n;
		Imgs.setCaption();
		Thumbs.setactive();
	},
	setCaption:function(){
		var txt=images[Imgs.curr].comment;
		if(images[Imgs.curr].title)
			txt='<b>'+images[Imgs.curr].title+'</b> &middot; '+txt;
		$('#caption>div').hide().empty();
		if(txt.length)
			$('#caption>div').hide().empty().append(txt).fadeIn(500);
	},
	center:function(){
		Imgs.width=Imgs.div.width();
		Imgs.height=Imgs.div.height();
		Imgs.left=-Imgs.width;
		Imgs.ul.css({left:Imgs.left,height:Imgs.height,width:4*Imgs.width}).find('li').css({width:Imgs.width,height:Imgs.height});
		Imgs.fitWindow(1,Imgs.curr);
		Imgs.fitWindow(0,Imgs.curr-1);
		Imgs.fitWindow(2,Imgs.curr+1);
	}
};

var Thumbs = {
	div:null,
	thc:null,
	thm:null,
	cnt:0,
	tw:0,
	th:0,
	lw:0,
	init:function(){
		this.load();
		this.lw=this.thm.find('li:first').outerWidth();
		this.cnt=this.thm.find('li').length;
		this.tw=this.cnt*this.lw;
		this.thm.find('li.image>a').each(function(i){
			Hints.add($(this),'<span>'+(i+1)+'</span> '+(images[i].title.length?('<b>'+images[i].title+'</b> '):'')+(images[i].comment.length?'<small>'+images[i].comment+'</small>':''));
			$(this).click(function(){Imgs.goto(i);return false});
		});
		this.thm.find('li.folder,li.folderi').each(function(i){
			Hints.add($(this),'<b>'+folders[i].name+'</b>'+'<small>'+folders[i].desc+'<br />images:'+folders[i].imgs+'<br/>last mod:'+folders[i].lastmod+'</small>');
		});
		$(C.SCRR).click(function() {
			Thumbs.scrollright();
			return false;
		});
		$(C.SCRL).click(function() {
			Thumbs.scrollleft();
			return false;
		});
	},
	scrollleft:function(){
		var sw=Thumbs.thc.width();
		if(sw<Thumbs.tw)
			Thumbs.thm.stop(true,false).animate({left:Math.min(parseInt(Thumbs.thm.css('left'))+sw,0)+'px'},2000,'easeOutBack');
	},
	scrollright:function(){
		var sw=Thumbs.thc.width();
		if(sw<Thumbs.tw)
			Thumbs.thm.stop(true,false).animate({left:Math.max(parseInt(Thumbs.thm.css('left'))-sw,sw-Thumbs.tw)+'px'},2000,'easeOutBack');
	},
	setactive:function(){
		var n=images[Imgs.curr].rel;
		var sw=Thumbs.thc.width();
		var lw=n*Thumbs.lw;
		var lo=-parseInt(Thumbs.thm.css('left'));
		var rt=((n<(Thumbs.cnt-1))?2:1)*Thumbs.lw;
		if((lw-lo)>(sw-rt))
			Thumbs.thm.stop(true,false).animate({left:Math.max(-lw+sw-rt,sw-Thumbs.tw)+'px'},1000,'easeOutBack');
		else if((lw-lo)<Thumbs.lw) 
			Thumbs.thm.stop(true,false).animate({left:Math.min(-lw+Thumbs.lw,0)+'px'},1000,'easeOutBack');
		this.thm.find('li.active').each(function(){$(this).removeClass('active');});
		$(this.thm.find('li').get(n)).addClass('active');
	},
	load:function(){
		var st=Thumbs.thc.find('li.image').each(function(i){
			$(this).css({backgroundImage:('url('+escape(images[i].thumb)+')')});
		});
	}
};

var Hints = {
	init:function(){
		$('a.showhint,div.showhint,ul.showhint>li').each(function() {Hints.add($(this));});
	},
	add:function(to,txt){
		if(typeof txt==UNDEF) {
			txt=to.attr('title');
			to.removeAttr('title');
		}
		if(txt.length){
			to.data('hint',txt).hover(function(){
				$('body').append('<p id="hint">'+to.data('hint')+'</p>');
				var h=$('#hint');
				var o=to.offset();
				var t=o.top-h.outerHeight()-10;
				var l=Math.round(o.left+(to.outerWidth()-h.outerWidth())/2);
				if(t<0){
					t=o.top+to.outerHeight()+10;
					if((t+to.outerHeight())>$(window).height())
						t=$(window).height()-h.outerHeight();
				}
				if(l<0){
					l=o.left+to.outerWidth()+10;
					t=o.top+(to.outerHeight()-h.outerHeight())/2;
				}
				else if((l+h.outerWidth())>$(window).width()) {
					l=o.left-10-h.outerWidth();
					t=o.top+(to.outerHeight()-h.outerHeight())/2;
				}
				h.css({left:l,top:t}).fadeIn();
			},function(){$('#hint').remove()});
		}
	}
};

var Help = {
	init:function(){
		$('.showhelp').click(Help.show);
		$('#help .close a').click(Help.hide);
	},
	show:function(){
		$('#help').fadeIn(500);
		$('#help .window').css({marginTop:(Math.round((Imgs.height-$('#help .window').height()-46)/2))});
	},
	hide:function(){
		if($('#help').is(':visible'))
			$('#help').fadeOut(500);
	}
};

$(document).ready(function(){
	Hints.init();
	Help.init();
	Ctrl.init();

	Thumbs.div=$(C.THMB);
	Thumbs.thm=$(C.THMC);
	Thumbs.thc=$(C.THMBC);
	Imgs.div=$(C.IMGS);
	
	if(images.length){
		Imgs.init();
		Thumbs.init();
	}
	$(document).keydown(function(e){
		if(typeof _jaWidgetFocus!=UNDEF&&_jaWidgetFocus) return true;
		var k=e?e.keyCode:window.event.keyCode; //alert(k);
  		switch(k) {
  			case 38: window.location=(typeof parentIndexPage=='undefined' || !parentIndexPage.length)?'../':parentIndexPage; break;
			case 39: Imgs.next(); break;
			case 37: Imgs.prev(); break;
			case 109: Ctrl.toggleTop(); Ctrl.toggleBottom(); break;
			case 107: Imgs.toggleFit(); break;
			case 112: Help.show(); break;
			case 27: Help.hide(); break;
			default: return true;
		}
		return false;
	});
	$(window).resize(function(){ Ctrl.center(); Imgs.center();});
});
