



jQuery(document).ready(function(){
	
	setTeam()
	
})
_current_memeber_index = -1;
function setTeam(){
	jQuery(".team_controls .arrowcontrol_holder_right").click(function(){
		teamOpenNext_delay(1);
	})
	jQuery(".team_controls .arrowcontrol_holder_left").click(function(){
		teamOpenNext_delay(-1);
	})
	team_items = jQuery("ul.team_list li")

	TweenMax.set(team_items, {autoAlpha:0, position:"absolute", left:0, top:0})
	
	background_team_image_items = jQuery(".background_team_proportion_holder")
	background_team_image_items.html("")
	
	team_nav_list = jQuery(".team_list_nav_list")
	team_nav_list.html("")
	
	
	team_items.each(function(index){						
								
		background_team_image_item = jQuery('\
						<div class="background_team_image_item" >\
							<div class="background_team_img_fallback" ></div>\
							<video muted autoplay preload="auto" webkit-playsinline="true" playsinline="true"  >\
							</video>\
						</div>')		
		background_team_image_item.attr("data_index",index)
		TweenMax.set(background_team_image_item, {autoAlpha: 0, className:"+=background_team_image_item_"+index})
		
		bg_team_img = background_team_image_item.find(".background_team_img_fallback")
		TweenMax.set(bg_team_img, {backgroundImage: 'url('+jQuery(this).find(".person_img").attr("src")+')'})
		
		
		print_number = index;
		//print_number = (index+1);
		//if(print_number < 10) print_number = "0"+print_number;
		//team_nav_item = jQuery('<li><span class="list_nav_name" >'+jQuery(this).find("h5").html()+'<span class="bottom_line_current"></span></span><span class="list_nav_number" >'+print_number+'<span class="bottom_line_current"></span></span></li>')
		team_nav_item = jQuery('<li><span class="list_nav_name" >'+jQuery(this).find("h5").html()+'</span><span class="list_nav_sep" ><span></span></span><span class="list_nav_number" >'+print_number+'</span></li>')
		team_nav_item.attr("data_index",index)

		

		background_team_image_items.append(background_team_image_item);
		team_nav_list.append(team_nav_item)
	})
	team_nav_list.append('<li class="last_item_invisible"></li>')

	jQuery("ul.team_list_nav_list li").click(function(){
		teamOpen(parseInt(jQuery(this).attr("data_index")), 1)
	})

	jQuery(".team_block").closest("section").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			teamOpenNext_delay(1);
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			teamOpenNext_delay(-1);
		},allowPageScroll:"vertical"
	});
	teamOpen(0, 1)
	
	_currentsec = fullScreenSections.eq(currentSec);
	if(_currentsec.find(".team_block").length == 0){
		stopAutoplayTeamSlider()
	}
	resizeTeamSection();
	waitForFinalEvent(function(){
		resizeTeamSection()
    }, 300, "resizeTeamSection");
}
function teamOpen(_index, direction){
	
	team_items = jQuery("ul.team_list li")
	if(_index < 0)
		_index = team_items.length-1
	else if(_index > team_items.length-1)
		_index = 0
	
	jQuery("ul.team_list_nav_list li.current").removeClass("current")
	jQuery("ul.team_list_nav_list li").eq(_index).addClass("current")
	
	
	_prev_member = jQuery("ul.team_list li.current_team")
	team_items.removeClass("current_team")
	
	bg_images = jQuery(".background_team_proportion_holder .background_team_image_item")
	_prev_bg_image = bg_images.eq(_current_memeber_index);
	_next_bg_image = bg_images.eq(_index);
	
	

	
	//console.log("_next_bg_image "+_next_bg_image.length)
	if(_prev_bg_image.length > 0){
		TweenMax.killTweensOf(_prev_bg_image)
		if(direction == 1) newleft = -50; else newleft = 50;
		TweenMax.set(_prev_bg_image, {className:"-=current_bg"})
		TweenMax.to(_prev_bg_image, 1, {left:newleft+"%",autoAlpha:0, ease:Power3.easeInOut})
	}
	TweenMax.killTweensOf(_next_bg_image)
	if(direction == 1) newleft = 50; else newleft = -50;
	TweenMax.set(_next_bg_image, {left:newleft+"%", autoAlpha:0, className:"+=current_bg"})
	TweenMax.to(_next_bg_image, 1, {left:0, autoAlpha:1,ease:Power3.easeInOut})
	


	
	
	
	TweenMax.set(_prev_member, {autoAlpha:0, position:"absolute",left:-100*direction+"px",scale:.9,rotationY:-30*direction, top:0})
	TweenMax.from(_prev_member,.3, {autoAlpha:1,left:0,scale:1,rotationY:0, ease:Power3.easeOut})
	
	TweenMax.set(".team_list", {perspective:600})
	
	_current_memeber_index = _index;
	_current_memeber = team_items.eq(_current_memeber_index);
	TweenMax.set(_current_memeber,{clearProps:"all"})
	
	TweenMax.from(_current_memeber,.5, {autoAlpha:0,left:100*direction+"px",scale:.9, rotationY:30*direction, ease:Power3.easeInOut})
	
	_current_memeber.addClass("current_team")

	jQuery(".background_team_proportion_holder video").html("")
	video_source = _current_memeber.find(".ref_vid_source")
	if(video_source.length > 0){
		team_video = _next_bg_image.find("video")
		team_video.html(video_source.html())
		team_video.get(0).currentTime = 0;	
		team_video.get(0).pause();
	
		TweenMax.killTweensOf(team_video)
		TweenMax.set(team_video,{autoAlpha:1})
		TweenMax.from(team_video,.5, {autoAlpha:0,delay:.7,ease:Power3.easeInOut, onComplete:startVideoTeam, onCompleteParams:[team_video]})
	
	
	}
	
	
	activateAutoplayTeamSlider()
	
}
function startVideoTeam(_team_video){
	_team_video.get(0).currentTime = 0;
	_team_video.get(0).play();
}
function teamOpenNext(direction){
	
	new_index = _current_memeber_index+direction;

	teamOpen(new_index, direction)
}
function teamOpenNext_delay(direction){
	
	waitBeforeRepeatEvent(function(){
		teamOpenNext(direction)
    }, 800, "animToSection");
}



var timerTeamSlider;
function activateAutoplayTeamSlider(){
	stopAutoplayTeamSlider();
	timerTeamSlider = setTimeout(function(){teamOpenNext(1)}, 6000);
}
function stopAutoplayTeamSlider(){
	if(timerTeamSlider != undefined){
		clearTimeout(timerTeamSlider);
	}
}
jQuery(window).resize(function(){
	waitForFinalEvent(function(){
		resizeTeamSection()
    }, 100, "resizeTeamSection");
})

function resizeTeamSection(){
	_teamsec = jQuery("#team")
	bg_block = _teamsec.find(".background_team")
	content_block = _teamsec.find(".team_left_block")
	bg_proportion_block = _teamsec.find(".background_team_proportion_holder")
	
	TweenMax.set(bg_block,{clearProps:"bg_block"});
	
	if(content_block.outerWidth() < jQuery(window).width()){
		
		
		block_w = _teamsec.width() - content_block.outerWidth();
		
		_teamsec.removeClass("color_alternate");

	}else{
		block_w = content_block.outerWidth();
		_teamsec.addClass("color_alternate");
		if(fullScreenSections.eq(currentSection).attr("id") == "team")		
			jQuery("body").addClass("controls_light_color");
	}
	if(_teamsec.hasClass("current_section")){
			currentSec = -1;
			setCurrentSec();
	}
	
	TweenMax.set(bg_block,{clearProps:"bg_block"});
	TweenMax.set(bg_block,{width:block_w});
	block_h = bg_block.outerHeight();
	vid_prop = 1015/920
	
	vid_new_w = block_w;
	vid_new_h = vid_new_w/vid_prop;
	if(vid_new_h < block_h){
		vid_new_h = block_h;
		vid_new_w = vid_new_h*vid_prop;
	}
	vid_new_y = (block_h-vid_new_h)/2
	vid_new_x = (block_w-vid_new_w)/2
	TweenMax.set(bg_proportion_block,{width:vid_new_w, height:vid_new_h, left:vid_new_x, top:vid_new_y});
}