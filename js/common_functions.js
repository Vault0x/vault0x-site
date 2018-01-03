
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



var waitBeforeRepeatEvent = (function () {
  var time_func = {};

  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
	var d = new Date();
	var t = d.getTime();
	var new_t = d.getTime() + ms;
    if ( ( time_func[uniqueId] && time_func[uniqueId] < t ) || !time_func[uniqueId]) {
		time_func[uniqueId] = new_t;
		callback();
    }
    
  };
})();


jQuery(document).ready(function(){
	setupVideosBg()
	secIntroFunctionQueue.push(printVideosBg);
	secOutFunctionQueue.push(removeBgVideos);
})

function setupVideosBg(){
	jQuery(".l-section-video video").each(function(){
		jQuery(this).get(0).pause();
		TweenMax.set(jQuery(this), {display:"none"})
	});
}
function printVideosBg(_currentsec){
	_currentsec.find(".l-section-video").each(function(){
		_video = jQuery(this).find("video")
		_source = jQuery(this).find(".video_source_dynamicload").html();

		if(_source.length > 0){
			_video.html(_source);
		}
		TweenMax.killTweensOf(_video)
		TweenMax.set(_video, {clearProps:"all"})
		TweenMax.set(_video, {autoAlpha:0})
		TweenMax.to(_video, .5,{delay:fadeInDelay, autoAlpha:1, ease:Power1.easeOut})
		_video.get(0).play();
	});
}

function removeBgVideos(_prevsec){
	
		_prevsec.find(".l-section-video").each(function(){
			_video = jQuery(this).find("video")
			_video.get(0).pause();
			TweenMax.killTweensOf(_video)
			TweenMax.to(_video, .3,{delay:.3,autoAlpha:0, ease:Power3.easeOut, onComplete:hideVideo, onCompleteParams:[_video]})

		});
}
function hideVideo(_video){

	TweenMax.set(_video, {display:"none"})
	_source = _video.parent().find(".video_source_dynamicload");

	if(_source.length > 0){
		_video.html("");
	}
}
