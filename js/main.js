test_mode = false;
test_inisec = 0;
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
var countdownEndDate = new Date("March 29, 2018 14:00:00");
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
		watch_block = jQuery(".wristband_proportion_holder")





		TweenMax.set(".wristband_block,.wristband_proportion_holder", {perspective:400});


		TweenMax.set(".vault_sec_bg", {perspective:400});
		TweenMax.set(".wristband_spinner_block", {perspective:400});

		tl_start = new TimelineMax({
			onComplete:function(){}

		});

		//tl_start.set([watch_block,watch_left,watch_right], {position:"relative"})
		tl_start.set(watch_left, {transformOrigin:"100% 50%"})
				.set(watch_right, {transformOrigin:"0% 50%"})
				.from(".current_section .vault_sec_bg_lines",2,{rotationX:-50,ease:Power3.easeOut})
				.from(".securityspin_block_holder",1,{rotationX:-30, autoAlpha:0,ease:Power3.easeIn}, "=-1.5")

				.from(watch_block,1,{rotationX:70,rotationY:15, opacity:0, top:-200, ease:Power3.easeOut}, "=-.5")
				.from(watch_left,.8,{scale:.8, autoAlpha:0, rotationY:-90, ease:Power3.easeOut}, "=-.8")
				.from(watch_right,.8,{scale:.8, autoAlpha:0, rotationY:90,ease:Power3.easeOut}, "=-.7")
				//.from(".play_button_block",.5,{scale:.8, autoAlpha:0, ease:Power3.easeOut}, "=-.2")
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
	jQuery(".wristband_center").click(function(){
		openVideoHome();
	})
}
function openVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	close_button = jQuery(".video_lightbox .button_back_block")
	TweenMax.killTweensOf(close_button)
	TweenMax.set(close_button,{autoAlpha:0, scale:0})

	TweenMax.to(video_block,.2,{autoAlpha:1, ease:Power3.easeOut})
	TweenMax.set(video_player_bg,{width:0})
	TweenMax.to(video_player_bg,.6,{width:"100%", ease:Power3.easeOut})

	TweenMax.set(video_player.parent(),{perspective:1200})
	TweenMax.set(video_player,{scale:.8,top:100,autoAlpha:0, rotationX:-90,transformStyle:"preserve-3d"})
	TweenMax.to(video_player,.7,{scale:1,autoAlpha:1,top:0,rotationX:0, ease:Power3.easeOut,delay:.3, clearProps:"transform,top,opacity,visibility,scale"})
	TweenMax.to(close_button,.4,{scale:1,autoAlpha:1, ease:Back.easeOut,delay:.6, clearProps:"transform,opacity,visibility,scale"})
}
function closeVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	close_button = jQuery(".video_lightbox .button_back_block")
	TweenMax.killTweensOf(close_button)


	TweenMax.to(video_block,.4,{autoAlpha:0, ease:Power3.easeOut,delay:.3, onComplete:clearVideoPlayerHome })
	TweenMax.to(video_player_bg,.5,{width:0, ease:Power3.easeOut, delay:.1})

	TweenMax.to(video_player,.3,{scale:.8,autoAlpha:0, ease:Power3.easeOut})

	TweenMax.to(close_button,.3,{scale:0,autoAlpha:0, ease:Power3.easeOut})
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


secIntroFunctionQueue.push(function(_currentsec){
	base_gradient_image = _currentsec.find(".vault_sec_bg_basegradient");
	TweenMax.killTweensOf(base_gradient_image);
	TweenMax.set(base_gradient_image,{autoAlpha:0});
	TweenMax.to(base_gradient_image,.7,{autoAlpha:1, ease:Power1.easeInOut, delay:.3});
})
secOutFunctionQueue.push(function(_currentsec){
	base_gradient_image = _currentsec.find(".vault_sec_bg_basegradient");
	TweenMax.killTweensOf(base_gradient_image);
	TweenMax.to(base_gradient_image,.7,{autoAlpha:0, ease:Power1.easeOut});
})

jQuery(document).ready(function(){
	setHomeBgLines()
	setSpinner()
})
secIntroFunctionQueue.push(animateManyLines)
function animateManyLines(_currentsec){
	setTimeout(function(){
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
		animateOneBgLine();
	}, 200);
}
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
	_context = getCurrentSec();
	bg_lines = _context.find(".vault_sec_bg_lines .vault_sec_bg_line_innercolor:not(.animating)")

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



/***

left navigation rotation:

***/

jQuery(document).ready(function(){
	setNavCirclePos(0, false)
	jQuery(".site_portfolio_controls").on("mouseenter",function(){
			openFullNav()

	})
	jQuery(".site_portfolio_controls").on("mouseleave",function(){

		closeFullNav()
	})
})
function openFullNav(){
	jQuery(".site_portfolio_controls").addClass("opened");
	lockNavPos()
}
function closeFullNav(){
	jQuery(".site_portfolio_controls").removeClass("opened");
	unlockNavPos();
}
navPosLocked = false;
function lockNavPos(){
	navPosLocked = true;
	setNavCirclePos("center", true)
}
function unlockNavPos(){
	navPosLocked = false;
	setNavCirclePos("current", true)
}
function setNavCirclePos(align_center, anim){

	//align_center is the index or "center"
	if(navPosLocked) align_center = "center"

	total_nav_index = 0;
	angle_distance = 4;
	total_items = Math.floor(360/angle_distance);
	all_control_steps = jQuery(".portfolio_control_steps .portfolio_control_step")
	valid_control_steps = jQuery(".portfolio_control_steps .portfolio_control_step:not(.hiddenStep)")

	total_nav_index = valid_control_steps.length;

	if(align_center == "current") align_center = currentSection;
	if(align_center == "center"){
		align_center = Math.floor(total_nav_index/2)
	}else{
		temp_center = align_center;
		all_control_steps.each(function(index_step){
			if(!jQuery(this).hasClass("hiddenStep")){
				last_index_visible = index_step;
			}
			if(jQuery(this) == valid_control_steps.eq(temp_center)){
				align_center = last_index_visible;
			}

		})
	}




	index_align = align_center;

	// falta ver que el index incluya cuando se mande uno "invisible"

	anim_time = 0
	if(anim){
		anim_time = .5
	}
	valid_control_steps.each(function(index_step){
		new_rotation = angle_distance*(index_step-index_align);
		//console.log("item: "+index_step+" / angle:"+new_rotation)
		theitem = jQuery(this);
		if(theitem.attr("current_angle") != new_rotation){
			TweenMax.killTweensOf(theitem);
			TweenMax.set(theitem,{transition:"none"})
			TweenMax.to(theitem,anim_time, {rotation:new_rotation, ease:Power3.easeInOut,clearProps:"transition"})
			oposite_rotation = new_rotation*-1
			//TweenMax.set(jQuery(this).find(".not_rotated"),{transition:"none"})
			not_rotated_items = theitem.find(".not_rotated")
			TweenMax.killTweensOf(not_rotated_items);
			TweenMax.to(not_rotated_items,anim_time, {rotation:oposite_rotation, ease:Power3.easeInOut})
		}
		theitem.attr("current_angle", new_rotation)
	})
	cloneDummyItem = jQuery("#dummy_control_step_clone").html();
	valid_dummy_steps = jQuery(".dummy_control_steps .dummy_control_step")
	if(valid_dummy_steps.length == 0){
		jQuery(".dummy_control_steps").html("")
		for(idummy=0;idummy<total_items - total_nav_index ;idummy++){
			new_rotation = angle_distance*(total_nav_index + idummy - index_align);
			newItem = jQuery(cloneDummyItem)
			TweenMax.set(newItem, {rotation:new_rotation})
			jQuery(".dummy_control_steps").append(newItem)
		}
	}else{
		valid_dummy_steps.each(function(idummy){
			new_rotation = angle_distance*(total_nav_index + idummy - index_align);
			newItem = jQuery(this)
			if(newItem.attr("current_angle") != new_rotation){
				TweenMax.killTweensOf(newItem);
				TweenMax.to(newItem, anim_time, {rotation:new_rotation, ease:Power3.easeInOut})
			}
			newItem.attr("current_angle", new_rotation)
		})
	}

}
secIntroFunctionQueue.push(function(_currentsec){
	waitForFinalEvent(function(){
		setNavCirclePos(currentSection, true)
	}, 50, "setNavCirclePos");
})




/***

Vertival Navigation (Why Vault)

***/
jQuery(document).ready(function(){
	setVerticalScrolling()

})
function setVerticalScrolling(){
	jQuery(".vertical_scrolling_content").each(function(){
		content_items = jQuery(this).find(".vertical_scrolling_content_list li")
		nav_item_clone = jQuery(this).find(".vert_nav_item_clone").html();
		vert_nav = jQuery(this).find(".vert_nav_items")
		vert_nav.html("")
		content_items.each(function(cont_index){
			this_item = jQuery(this)
			TweenMax.set(this_item, {autoAlpha:0, position:"absolute"})

			new_nav_item = jQuery(nav_item_clone)
			new_nav_item.find(".vert_nav_number").html(cont_index)
			new_nav_item.find(".vert_nav_label").html(this_item.attr("nav_title"))

			new_nav_item.attr("index_open", cont_index)
			new_nav_item.on("click", function(){
				openVerticalScrollItem(parseInt(jQuery(this).attr("index_open")), jQuery(this).closest(".vertical_scrolling_content"))
			})

			vert_nav.append(new_nav_item)
		})


		jQuery(this).find(".vert_nav_arrows .arrowcontrol_left").on("click", function(){
			verticalScrollItemOpenNext(-1)
		})
		jQuery(this).find(".vert_nav_arrows .arrowcontrol_right").on("click", function(){
			verticalScrollItemOpenNext(1)
		})

		openVerticalScrollItem(0, jQuery(this))
	})
}
function openVerticalScrollItem(cont_index, context){

	current_index = getCurrentVertScrollingIndex();

	anim_dir = 1;
	if(cont_index == getTotalVertScrollingIndex()-1 && current_index < 2){ //from 0 to last
		anim_dir = -1
	}else if(Math.abs(current_index - cont_index) > 3){ //when difference is too high (from last to 0)
		anim_dir = 1
	}else if(current_index - cont_index > 0){ //when difference is positive
		anim_dir = -1
	}
	item_container = context.find(".vertical_scrolling_content_list");
	all_items = item_container.find("li");

	prev_item = context.find(".vertical_scrolling_content_list li.current_item");
	if(prev_item.length > 0){
		prev_item_h = prev_item.height();
		prev_item.removeClass("current_item")
		TweenMax.killTweensOf(prev_item)
		TweenMax.set(prev_item, {position:"absolute", top:0})
		TweenMax.to(prev_item, .7, {autoAlpha:0, top:-300*anim_dir, ease:Power3.easeInOut})

		TweenMax.killTweensOf(item_container)
		TweenMax.set(item_container, {height:prev_item_h})
	}
	new_item = all_items.eq(cont_index);


	new_item.addClass("current_item")
	TweenMax.killTweensOf(new_item)
	TweenMax.set(new_item, {autoAlpha:1, top:0, position:"relative"})

	new_item_h = new_item.height();


	TweenMax.from(new_item, .7, {autoAlpha:0, top:300*anim_dir, ease:Power3.easeInOut, delay:.05})

	TweenMax.killTweensOf(item_container)
	TweenMax.to(item_container, .7, {height:new_item_h, ease:Power3.easeInOut})



	nav_items = context.find(".vert_nav_items .vert_nav_item");
	nav_items.removeClass("current_item")
	context.find(".vert_nav_items .vert_nav_item[index_open="+cont_index+"]").addClass("current_item");

	nav_current_item_pos = 4;
	total_nav_items = nav_items.length;
	dif_items_bottom = 2;
	// setting up new positions of menu
	nav_items.each(function(nav_index){
		TweenMax.killTweensOf(jQuery(this))
		TweenMax.set(jQuery(this),{top:0, autoAlpha:1})

		jQuery(this).attr("prev_position", jQuery(this).attr("new_position"));

		new_order = nav_index;
		if(nav_index < cont_index - nav_current_item_pos){ //los de arriba se van abajo (caso 5 y 6)
			new_order = nav_index + total_nav_items - dif_items_bottom + 1;
		}else if(nav_index <= cont_index + dif_items_bottom){
			new_order = nav_index - (cont_index - total_nav_items + 1 + dif_items_bottom);
		}else{
			new_order = nav_index - cont_index - dif_items_bottom - 1;
		}

		TweenMax.set(jQuery(this),{order:new_order})




	})
	// animated after positioning so we can get prev position and new position with no errors
	index_fadein =0 ;
	nav_items.each(function(nav_index){
		new_position = jQuery(this).offset().top;
		prev_position = jQuery(this).attr("prev_position")

		if(prev_position != ""){

			if(Math.abs(prev_position - new_position) > 200 && !jQuery(this).hasClass("current_item")){
				if(prev_position - new_position > 0){
					anim_pos = -jQuery(this).outerHeight(true)*1.5;
					delay_anim = .3 - index_fadein*.1;
				}else{
					anim_pos = jQuery(this).outerHeight(true)*1.5;
					delay_anim = index_fadein*.1;
				}



				TweenMax.from(jQuery(this),1,{top: anim_pos ,autoAlpha: 0, ease:Power3.easeInOut, delay:delay_anim})
				//TweenMax.from(jQuery(this),.5,{autoAlpha: 0, ease:Power3.easeInOut, delay:index_fadein*.1})
				index_fadein++;
			}else{
				TweenMax.from(jQuery(this),.5,{top:prev_position - new_position, ease:Power3.easeInOut})
			}
		}
		jQuery(this).attr("new_position", new_position)
	})

}

function verticalScrollItemOpenNext_delay(direction){
	waitBeforeRepeatEvent(function(){
		verticalScrollItemOpenNext(direction);
    }, 400, "animToSection");


}
function verticalScrollItemOpenNext(direction){


	context = getCurrentSec();

	current_index = getCurrentVertScrollingIndex();
	next_index = current_index+direction;

	if(context.find(".vert_nav_items .vert_nav_item[index_open="+next_index+"]").length == 0){
		if(direction > 0){
			next_index = 0;
		}else{
			next_index = context.find(".vert_nav_items .vert_nav_item").length-1;
			if(next_index < 0) next_index = 0;
		}
	}
	openVerticalScrollItem(next_index, context)


}
function getCurrentVertScrollingIndex(){
	context = getCurrentSec();
	currentVertNavItem = context.find(".vert_nav_items .vert_nav_item.current_item");
	if(currentVertNavItem.length > 0){
		return parseInt(currentVertNavItem.attr("index_open"))
	}else{
		return false;
	}
}
function getTotalVertScrollingIndex(){
	context = getCurrentSec();
	return  context.find(".vert_nav_items .vert_nav_item").length;

}




secIntroFunctionQueue.push(animateRotateContent)
secOutFunctionQueue.push(animateRotateContentOut)

function animateRotateContent(_currentsec){
	affectedContent = _currentsec.find(".rotate_intro")
	direction = getCurrentSecAnimDirection();
	affectedContent.each(function(rotate_intro_index){
		this_content = jQuery(this)
		TweenMax.set(this_content,{clearProps:"rotation,opacity,visibility,transform"})
		offsetPosition = this_content.offset().left
		TweenMax.set(this_content, {transformOrigin: (- offsetPosition - jQuery(window).width()/2)+"px 50%"})
		_delay = rotate_intro_index*.05;
		if(direction == -1) _delay = (affectedContent.length - rotate_intro_index)*.05;
		TweenMax.from(this_content,1,{rotation:10*direction, autoAlpha:0,  ease:Power3.easeInOut, delay:_delay})
	})
	//console.log("animIn: direction:"+ direction +" prevSection: "+prevSection +" currentSection:"+currentSection)

}
function animateRotateContentOut(_prevsec){

	affectedContent = _prevsec.find(".rotate_intro")
	direction = getCurrentSecAnimDirection();
	affectedContent.each(function(rotate_intro_index2){
		this_content = jQuery(this)
		TweenMax.to(this_content,.7,{rotation:10*-direction,autoAlpha:0, ease:Power3.easeInOut})
	})
	//console.log("animOut: direction:"+ direction +" prevSection: "+prevSection +" currentSection:"+currentSection)
}



/*
secIntroFunctionQueue.push(animateFlatingImagesIn)
secOutFunctionQueue.push(animateFlatingImagesOut)

function animateFlatingImagesIn(_currentsec){
	image_what_1 = _currentsec.find(".wristband_what_1")
	TweenMax.set(image_what_1,{clearProps:"all"})

	direction = getCurrentSecAnimDirection();
	affectedContent.each(function(rotate_intro_index){
		this_content = jQuery(this)
		TweenMax.set(this_content,{clearProps:"rotation,opacity,visibility,transform"})
		offsetPosition = this_content.offset().left
		TweenMax.set(this_content, {transformOrigin: (- offsetPosition - jQuery(window).width()/2)+"px 50%"})
		_delay = rotate_intro_index*.05;
		if(direction == -1) _delay = (affectedContent.length - rotate_intro_index)*.05;
		TweenMax.from(this_content,1,{rotation:10*direction, autoAlpha:0,  ease:Power3.easeInOut, delay:_delay})
	})
	//console.log("animIn: direction:"+ direction +" prevSection: "+prevSection +" currentSection:"+currentSection)

}
function animateFlatingImagesOut(_prevsec){

	affectedContent = _prevsec.find(".rotate_intro")
	direction = getCurrentSecAnimDirection();
	affectedContent.each(function(rotate_intro_index2){
		this_content = jQuery(this)
		TweenMax.to(this_content,.7,{rotation:10*-direction,autoAlpha:0, ease:Power3.easeInOut})
	})
	//console.log("animOut: direction:"+ direction +" prevSection: "+prevSection +" currentSection:"+currentSection)
}*/
