
jQuery(document).ready(function(){

	setRoadmap()

})

function setRoadmap(){
	jQuery(".roadmap_arrowcontrols .arrowcontrol_right").click(function(){
		roadMapAnimToNext(1);
	})
	jQuery(".roadmap_arrowcontrols .arrowcontrol_left").click(function(){
		roadMapAnimToNext(-1);
	})
	roadMapAnimTo(0)

	jQuery(".roadmap_list_maskblock").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			roadMapAnimToNext(1);
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			roadMapAnimToNext(-1);
		}, allowPageScroll:"vertical"
	});

}
function roadMapAnimTo(index){



	roadmap_leftoffset = getRoadmapOffset();


	_currentsec = fullScreenSections.eq(currentSec);
	_roadmap_block = _currentsec.find(".roadmap_block")




	if(_roadmap_block.length > 0){

		_roadmap_blockanim = _roadmap_block.find(".roadmap_list_holder")
		_roadmap_items = _roadmap_block.find("ul.roadmap_list>li")

		min_to_show = getRoadmapMinToShow()

		if(index > _roadmap_items.length-min_to_show){
			index = _roadmap_items.length-min_to_show;
		}
		if(index < 0){
			index = 0;
		}


		_roadmap_item_to = _roadmap_items.eq(index);
		if(_roadmap_item_to.length == 0){
			_roadmap_item_to = _roadmap_items.eq(0);
		}

		if(
		index >= 2
		|| (index >= 1 && jQuery(window).width() < 768)
		){
			_roadmap_block.addClass("hide_roadmap_title")
		}else{
			_roadmap_block.removeClass("hide_roadmap_title")
		}

		item_pos = _roadmap_item_to.position()
		TweenMax.killTweensOf(_roadmap_blockanim)
		current_x = _roadmap_blockanim.position().left
		TweenMax.set(_roadmap_blockanim, {left:-item_pos.left+roadmap_leftoffset})
		updateActiveRoadmapItems(_currentsec)
		TweenMax.from(_roadmap_blockanim, .7, {left:current_x, ease:Power3.easeOut})

	}


}
function updateActiveRoadmapItems(_currentsec){
	_leftoffset = getRoadmapOffset()
	_roadmap_items = _currentsec.find("ul.roadmap_list>li")
	container_x = _roadmap_items.closest(".roadmap_list_holder").position().left
	container_w = _roadmap_items.closest(".roadmap_list_maskblock").width()
	_previtem = "";
	_roadmap_items.each(function(ind){
		this_x = jQuery(this).position().left
		this_x_relative = this_x + container_x - _leftoffset;
		this_w = jQuery(this).outerWidth();
		cord_limit_end = this_x + container_x + this_w ;
		
		if(this_x_relative + 20 > 0){
			//jQuery(this).removeClass("item_ofuscated")
			
			
				if(cord_limit_end > container_w 
					&&
					cord_limit_end - this_w <= container_w
				){
					jQuery(this).addClass("item_ofuscated_border_end")
					jQuery(this).addClass("item_ofuscated")
				}else if(cord_limit_end > container_w ){
					jQuery(this).removeClass("item_ofuscated_border_end")
					jQuery(this).addClass("item_ofuscated")
					
				}else{
					jQuery(this).removeClass("item_ofuscated_border_end")
					jQuery(this).removeClass("item_ofuscated")
				}
			
			
		}else{
			jQuery(this).addClass("item_ofuscated")
		}
		if(_previtem != ""){
			if(Math.abs(this_x_relative) < 20){
				_previtem.addClass("item_ofuscated_border")
			}else{
				_previtem.removeClass("item_ofuscated_border")
			}
		}
		_previtem = jQuery(this)
		
		

		
	})
}


function roadMapAnimToNext(direction){
	_leftoffset = getRoadmapOffset();
	_currentsec = fullScreenSections.eq(currentSec);
	_roadmap_blockanim = _currentsec.find(".roadmap_list_holder")
	_roadmap_items = _currentsec.find("ul.roadmap_list>li")

	container_x = _roadmap_items.closest(".roadmap_list_holder").position().left
	min_distance_x = 9999
	_roadmap_items.each(function(index){
		this_x = jQuery(this).position().left
		this_x_relative = this_x + container_x - _leftoffset;

		if(Math.abs(this_x_relative) < min_distance_x){
			min_distance_x = Math.abs(this_x_relative);
			current_index = index;
		}
	})

	itemsToMove = getRoadmapSteps();

	new_index = current_index+itemsToMove*direction;



	roadMapAnimTo(new_index)


}
function getRoadmapOffset(){
	win_w = jQuery(window).width();
	if(win_w > 767){
		return 250;
	}else {
		return 50;
	}

}
function getRoadmapSteps(){
	win_w = jQuery(window).width();
	if(win_w > 1350){
		return 3;
	}else if(win_w > 1000){
		return 2;
	}else{
		return 1;
	}

}
function getRoadmapMinToShow(){
	win_w = jQuery(window).width();
	if(win_w > 1500){
		return 4;
	}else if(win_w > 1000){
		return 3;
	}else{
		return 1;
	}
}



secIntroFunctionQueue.push(setRoadMapIn)

function setRoadMapIn(_currentsec){
	waitForFinalEvent(function(){
		if(_currentsec.find(".roadmap_block").length > 0){
			roadMapAnimTo(0)
		}
	}, 50, "roadMapAnimTo");

	fadeInDelay = .5
	roadm_hlines = _currentsec.find(".roadmap_hline .line_color_fill");
	TweenMax.killTweensOf(roadm_hlines)
	TweenMax.set(roadm_hlines, { transition:"none", clearProps:"width,height,left,top,opacity"})
	//TweenMax.staggerFrom(roadm_hlines, .2, {delay:fadeInDelay ,width:0, ease:Linear.easeNone}, .2)
	TweenMax.staggerFrom(roadm_hlines, .2, {delay:fadeInDelay ,width:0, ease:Linear.easeNone}, .2)
	TweenMax.staggerTo(roadm_hlines, .2, {delay:fadeInDelay+.2 ,clearProps:"all"}, .2)

	if(_currentsec.find(".roadmap_block").length > 0){
		roadMapAnimTo(0)
	}

	roadm_vlines = _currentsec.find(".roadmap_vline");
	TweenMax.killTweensOf(roadm_vlines)
	TweenMax.set(roadm_vlines, { transition:"none", clearProps:"scale,transform"})
	TweenMax.staggerFrom(roadm_vlines, .3, {delay:fadeInDelay ,scale:0, ease:Power3.easeOut, clearProps:"all"}, .1)


	roadm_numbs = _currentsec.find(".roadmap_topnumber");
	TweenMax.set(roadm_numbs.parent(), {perspective:600});
	TweenMax.killTweensOf(roadm_numbs)
	TweenMax.set(roadm_numbs, { transition:"none", clearProps:"scale,transform"})
	TweenMax.staggerFrom(roadm_numbs, .6, {delay:fadeInDelay ,rotationX:-90, opacity:0, ease:Power3.easeOut, clearProps:"all"}, .2)

	roadm_copy = _currentsec.find(".roadmap_copy");
	TweenMax.set(roadm_copy.parent(), {perspective:600});
	TweenMax.killTweensOf(roadm_copy)
	TweenMax.set(roadm_copy, { transition:"none", clearProps:"scale,transform,opacity,visibility"})
	TweenMax.staggerFrom(roadm_copy, .6, {delay:fadeInDelay ,scale:.7, autoAlpha:0, ease:Power3.easeOut, clearProps:"all"}, .2)


}