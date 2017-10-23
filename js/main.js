
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

jQuery(document).ready(function(){
	

	jQuery("#main_menu_link").click(function(){
		
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}else{
			openMainMenu();
		}
	})

	jQuery(".main_menu_close").click(function(){
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}
	})
	jQuery(".main_menu_panel_bg").click(function(){
		if(!jQuery("body").hasClass("main_menu_open")){
			openMainMenu();
		}
	})

	jQuery("#main_menu_block").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			waitForFinalEvent(function(){
				if(jQuery("body").hasClass("main_menu_open")){
					closeMainMenu();
				}
			}, 50, "openMainMenu");
			
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			waitForFinalEvent(function(){
				if(!jQuery("body").hasClass("main_menu_open")){
					openMainMenu();
				}
			}, 50, "openMainMenu");
			
		},
		excludedElements: ""
	});
	


	setActionsVideoHome()
	setActionsSignUp()
	setUpPreloaderAnimation()

})
jQuery(window).on('load', function () {
	 setTimeout(function(){stopPreloaderFirst()}, 200)
});
pageHasLoad = false;
function stopPreloaderFirst(){
	pageHasLoad = true;
	jQuery("body").addClass("first_loaded_completed")
	//comment to wait for intro anim
	stopPreloader()
	setStartAppear()
	setTimeout(function(){
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
	}, 200);
}
function stopPreloader(){
	jQuery("body").removeClass("ajax_loading")
	TweenMax.to("#trama_preloader", .5, {autoAlpha:0})
}
function startPreloader(){
	jQuery("body").addClass("ajax_loading")
	TweenMax.to("#trama_preloader", .5, {autoAlpha:1})
}



isNavOpen = false;
function openMainMenu(){
	isNavOpen = true;
	jQuery("body").addClass("main_menu_open")
	menu_block = jQuery("#main_menu_block")
	TweenMax.killTweensOf(menu_block)
	TweenMax.set(menu_block, {autoAlpha:0, right:-menu_block.width()})
	TweenMax.to(menu_block, .5, {autoAlpha:1,right:0, ease:Power3.easeOut})

	
	

	
	main_menu_items = jQuery("ul.main_nav_list li");

	TweenMax.set(main_menu_items,{left:"100px",autoAlpha:0, position:"relative"})
	TweenMax.staggerTo(main_menu_items,.5,{delay:.4,left:0,autoAlpha:1,ease:Power3.easeOut,clearProps:"rotationY,opacity,visibility"},.1)


	TweenMax.killTweensOf(".l-main")
	TweenMax.set(".l-main",{position:"relative"})
	TweenMax.to(".l-main",.7,{left:-menu_block.width()+"px", ease:Power3.easeInOut})
}

function closeMainMenu(){
	isNavOpen = false;
	jQuery("body").removeClass("main_menu_open")
	
	menu_block = jQuery("#main_menu_block")
	TweenMax.killTweensOf(menu_block)
	TweenMax.to(menu_block, .5, {autoAlpha:0, right:-menu_block.width(), ease:Power3.easeInOut})

	
	
	
	TweenMax.killTweensOf(".l-main")
	TweenMax.to(".l-main",.5,{left:0, ease:Power3.easeOut, clearProps:"position,left"})

}








var pcIniDate = new Date();
console.log(pcIniDate);
var offset = pcIniDate.getTimezoneOffset()*60*1000;
//var NYCtimeoffset = -400*60*1000;
//Coordinated with GMT Universal, which is 4 hours ahead NYC, so 13h GMT is 9am NYC
var countdownEndDate = new Date("December 1, 2017 13:00:00");
countdownEndDate.setTime(countdownEndDate.getTime() - offset);
var countdownEndDate_time = countdownEndDate.getTime();


var countdown_internval;

jQuery(document).ready(function(){
	// Update the count down every 1 second
	printDateCountdown()
	countdown_internval = setInterval(printDateCountdown, 1000);
})
function printDateCountdown(){


	  // Get todays date and time
	  var now = new Date();
	  now = now.getTime();

	  // Find the distance between now an the count down date
	  var distance = countdownEndDate_time - now;

	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Display the result in the element with id="demo"
	  
		printDateValue(jQuery("#value_days"), days)
		printDateValue(jQuery("#value_hours"), hours)
		printDateValue(jQuery("#value_mins"), minutes)
		printDateValue(jQuery("#value_secs"), seconds)


		if(days == 0){
			jQuery("#countdown_home").addClass("less_than_a_day");
		}else{
			jQuery("#countdown_home").removeClass("less_than_a_day");
		}
	  // If the count down is finished, write some text
	  if (distance < 1000) {
		clearInterval(countdown_internval);
		jQuery("#countdown_home").addClass("less_than_a_day");
		jQuery("#value_days").html(0);
		jQuery("#value_hours").html(0);
		jQuery("#value_mins").html(0);
		jQuery("#value_secs").html(0);
		jQuery("#countdown_home").addClass("finished");
		
	  }
	
}
function printDateValue(_target, _value){
	current_value = _target.html();
	current_value = parseInt(current_value);
	if(current_value != _value && typeof _value == 'number' && _value > -1){
		if(_value < 10) _value = "0"+_value
		_target.html(_value)
		//TweenMax.killTweensOf(_target);
		//TweenMax.set(_target,{scale:.7 });
		//TweenMax.to(_target,.5,{scale:1,  ease:Power3.easeOut});
	}else if(typeof _value != 'number' && _value < 0){
		_target.html("00")
	}
}




var tl_start = new TimelineMax();
function setStartAppear(){
		
		wristband_block = jQuery(".wristband_block")
		watch_left = jQuery("#wristband_left")
		watch_right = jQuery("#wristband_right")
		watch_block = jQuery("#vault_watch_svg")
		
		
		
		
		
		TweenMax.set(wristband_block, {perspective:400});
		
		
		TweenMax.set(".vault_sec_bg", {perspective:400});
		TweenMax.set(".wristband_spinner_block", {perspective:400});
		
		tl_start = new TimelineMax({
			onComplete:function(){}	
		
		});
			
		tl_start.set([watch_block,watch_left,watch_right], {position:"relative"})
				.set(watch_left, {transformOrigin:"-30 -50"})
				.set(watch_right, {transformOrigin:"1000 -50"})
				.from(".vault_sec_bg_lines",2,{rotationX:-50,ease:Power3.easeOut})
				.from(".securityspin_block_holder",1,{rotationX:-30, autoAlpha:0,ease:Power3.easeIn}, "=-1.5")
				
				.from(watch_block,1,{rotationX:70,rotationY:15, opacity:0, top:-200, ease:Power3.easeOut}, "=-.5")
				.from(watch_left,.8,{scale:.8, autoAlpha:0, ease:Power2.easeIn}, "=-.7")
				.from(watch_right,.8,{scale:.8, autoAlpha:0, ease:Power2.easeIn}, "=-.6")
				.from(".play_button_block",.5,{scale:.8, autoAlpha:0, ease:Power3.easeOut}, "=-.2")
				.from(".home_copy",.5,{scale:.8, autoAlpha:0, ease:Power3.easeOut}, "=-.2")
				
		
		
		
		tl_start.play(0)
		
}


home_video_src = "";
function setActionsVideoHome(){
	
	home_video_src = jQuery(".video_lightbox .the_video iframe").attr("src")
	
	video_block = jQuery(".video_lightbox")
	
	TweenMax.set(video_block,{autoAlpha:0})
	
	jQuery(".video_lightbox .video_player_bg,.video_lightbox .video_button_back").click(function(){
		closeVideoHome();
	})
	jQuery(".play_button_block").click(function(){
		openVideoHome();
	})
}
function openVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	TweenMax.to(video_block,.2,{autoAlpha:1, ease:Power3.easeOut})
	TweenMax.set(video_player_bg,{width:0})
	TweenMax.to(video_player_bg,.6,{width:"100%", ease:Power3.easeOut})
	
	TweenMax.set(video_player.parent(),{perspective:1200})
	TweenMax.set(video_player,{scale:.8,top:100,autoAlpha:0, rotationX:-90,transformStyle:"preserve-3d"})
	TweenMax.to(video_player,.7,{scale:1,autoAlpha:1,top:0,rotationX:0, ease:Power3.easeOut,delay:.3, clearProps:"transform,top,opacity,visibility,scale"})
}
function closeVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	
	TweenMax.to(video_block,.4,{autoAlpha:0, ease:Power3.easeOut,delay:.3, onComplete:clearVideoPlayerHome })
	TweenMax.to(video_player_bg,.5,{width:0, ease:Power3.easeOut, delay:.1})
	
	TweenMax.to(video_player,.3,{scale:.8,autoAlpha:0, ease:Power3.easeOut})
}
function clearVideoPlayerHome(){
	video_player_iframe = jQuery(".video_lightbox .the_video iframe");
	video_player_iframe.attr("src", "")
	video_player_iframe.attr("src", home_video_src)
	
}




function setActionsSignUp(){
	
	//home_video_src = jQuery(".video_lightbox .the_video iframe").attr("src")
	
	signup_block = jQuery(".signup_lightbox")
	
	TweenMax.set(signup_block,{autoAlpha:0})
	/*
	jQuery(".signup_lightbox .video_player_bg,.signup_lightbox .signup_button_back").click(function(){
		closeSignupBlock();
	})
	jQuery(".join_our_list").click(function(e){
		e.preventDefault();
		openSignupBlock();
	})*/
	jQuery(".join_our_list").click(function(e){
		waitForFinalEvent(function(){
			jQuery("div[data-leadbox-wrap-ignore='true']").addClass("join_us_auto_box")
		}, 200, "fix_join_list");
		
	})
	
	
}
/*
function openSignupBlock(){
	signup_block = jQuery(".signup_lightbox")
	video_player_bg = jQuery(".signup_lightbox .video_player_bg ")
	content_block = jQuery(".signup_lightbox .signup_form_block")
	TweenMax.to(signup_block,.2,{autoAlpha:1, ease:Power3.easeOut})
	TweenMax.set(video_player_bg,{width:0})
	TweenMax.to(video_player_bg,.6,{width:"100%", ease:Power3.easeOut})
	
	TweenMax.set(content_block.parent(),{perspective:1200})
	TweenMax.set(content_block,{scale:.8,top:100,autoAlpha:0, rotationX:-90,transformStyle:"preserve-3d"})
	TweenMax.to(content_block,.7,{scale:1,autoAlpha:1,top:0,rotationX:0, ease:Power3.easeOut,delay:.3, clearProps:"transform,top,opacity,visibility,scale"})
}
function closeSignupBlock(){
	signup_block = jQuery(".signup_lightbox")
	video_player_bg = jQuery(".signup_lightbox .video_player_bg ")
	content_block = jQuery(".signup_lightbox .signup_form_block")
	TweenMax.to(signup_block,.4,{autoAlpha:0, ease:Power3.easeOut,delay:.3 })
	TweenMax.to(video_player_bg,.5,{width:0, ease:Power3.easeOut, delay:.1})
	
	TweenMax.to(content_block,.3,{scale:.8,autoAlpha:0, ease:Power3.easeOut})
}
*/

















var tl_intro = new TimelineMax()
function setUpPreloaderAnimation(){
	/*var logo_preloader = jQuery("#vyral_logo_svg_loading")
	var line_1 = logo_preloader.find(".logo_svg_linea_1")
	var line_2 = logo_preloader.find(".logo_svg_linea_2")
	var line_3 = logo_preloader.find(".logo_svg_linea_3")
	var line_4 = logo_preloader.find(".logo_svg_linea_4")
	var line_5 = logo_preloader.find(".logo_svg_linea_5")
	var pieces_white = logo_preloader.find(".logo_white")
	*/
	
	/*	
		tl_intro = new TimelineMax({
			onComplete:function(){
				if(pageHasLoad){
					stopPreloader()
					setStartAppear()
					setUpLogoAnimation()
					waitForFinalEvent(function(){
						tl_logo_home.play(0);
					}, 750, "tl_logo_home");
				}else{
					this.play(0);
				}
				
			}	
		
		});
		
		
		tl_intro.set(line_2,{transformOrigin:"center bottom"})
				.set(line_3,{transformOrigin:"right center"})
				.set(pieces_white,{transformOrigin:"center center"})
				.from(line_1,.3,{scaleX:0})
				.from(line_2,.3,{scaleY:0}, "=-.05")
				.from(line_3,.4,{scaleX:0}, "=-.05")
				.from(line_4,.3,{scaleY:0}, "=-.05")
				.from(line_5,.3,{scaleX:0}, "=-.05")
				.staggerFrom(pieces_white,.2,{scale:0}, .03, "=-.2")
				.set(line_1,{transformOrigin:"right center"})
				.set(line_2,{transformOrigin:"center top"})
				.set(line_3,{transformOrigin:"left center"})
				.set(line_4,{transformOrigin:"center bottom"})
				.set(line_5,{transformOrigin:"right center"})
				.to(line_1,.2,{scaleX:0})
				.to(line_2,.2,{scaleY:0}, "=-.05")
				.to(line_3,.3,{scaleX:0}, "=-.05")
				.to(line_4,.2,{scaleY:0}, "=-.05")
				.to(line_5,.2,{scaleX:0}, "=-.05")
				.staggerTo(pieces_white,.3,{scale:0, ease:Power3.easeInOut}, .03, "=-.4")
				
		
	
	tl_intro.play(0);
	
	*/

}






var tl_logo_home = new TimelineMax()
function setUpLogoAnimation(){
	

	

}




jQuery(document).ready(function(){
	setHomeBgLines()
	setSpinner()
})

function setHomeBgLines(){
	redoAnimateBgLines()
}
function redoAnimateBgLines(){
	
	animateOneBgLine()
	if(Math.random() > .2){
		setTimeout(animateOneBgLine, 100);
	}
	if(Math.random() > .5){
		setTimeout(animateOneBgLine, 200);
	}
	if(Math.random() > .5){
		setTimeout(animateOneBgLine, 300);
	}
	setTimeout(redoAnimateBgLines, Math.random()*3000+300);
	
}
function animateOneBgLine(){
	bg_lines = jQuery(".vault_sec_bg_lines .vault_sec_bg_line_innercolor:not(.animating)")
	
	rand_line = bg_lines.eq(Math.floor(Math.random()*bg_lines.length))
	if(bg_lines.length > 0){
		rand_dir = Math.random();
		if(rand_dir > .5){
			TweenMax.set(rand_line,{height:0, top:0, className:"+=animating"})
			TweenMax.to(rand_line,1,{height:"30%", top:"35%", ease:Power1.easeIn})
			TweenMax.to(rand_line,1,{delay:1,height:0,top:"100%",className:"-=animating",  clearProps:"top,bottom,height", ease:Power1.easeOut})
		}else{
			TweenMax.set(rand_line,{height:0, top:"auto", bottom:0, className:"+=animating"})
			TweenMax.to(rand_line,1,{height:"30%", bottom:"35%", ease:Power1.easeIn})
			TweenMax.to(rand_line,1,{delay:1,height:0,bottom:"100%",className:"-=animating", clearProps:"top,bottom,height", ease:Power1.easeOut})
		}
	}
}



function setSpinner(){
	spinner = jQuery(".securityspin_block");
	TweenMax.set(spinner,{transformOrigin:"50% 50%"})
	redoAnimateSpinner()
}

function redoAnimateSpinner(){
	animateSpinner()
	setTimeout(redoAnimateSpinner, Math.random()*5000+1500);
}
function animateSpinner(){
	spinner = jQuery(".securityspin_block");
	rand_rot = Math.random()*360-180;
	rand_speed = Math.random()*.5+1;
	
	TweenMax.killTweensOf(spinner)
	TweenMax.to(spinner,rand_speed,{rotation:"+="+rand_rot, ease:Power1.easeInOut})
		
	
}