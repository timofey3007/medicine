"use strict";

$(document).ready(() => {
    var mainParallaxSlider = new parallaxSlider({
            wrapperid: 'myparallaxslider', //ID of DIV on page to house slider
            displaymode: {type:'manual', pause:3000, cycles:2, stoponclick:true, pauseonmouseover:true},
            delaybtwdesc:  500, // delay in milliseconds between the revealing of each description layer inside a slide
            navbuttons: ['fa fa-chevron-left', 'fa fa-chevron-right'], // path to nav images
            activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
            orientation: 'h', //Valid values: "h" or "v"
            persist: true, //remember last viewed slide and recall within same session?
            slideduration: 1000 //transition duration (milliseconds)
        }),
        youTubeFrame = $(".vidosiki"),
        wow = new WOW().init();// init wow effects

    if ( youTubeFrame.length > 0 ) {
        // загружаем асинхронно api youtube
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // init parallax effects
    $('#parallax_medicine_transform').parallax({
        limitY: 35
    });
});

var onYouTubeIframeAPIReady = () => {
    var vidosiki = $(".vidosiki");

    if ( vidosiki.length > 0 ) {
        vidosiki.each(function(){
            let el = $(this);

            el.youTubeLoader().initVideoFrame();
        });
    }
}

/**
 *  Plugin for youTube frame video
 * @param options
 * @returns {{players: Array, initVideoFrame: initVideoFrame}}
 */
$.fn.youTubeLoader = function(options) {
    var settings = $.extend({
            // didn't decide what to write
        }, options),
        player = null,
        _this = this[0],
        jBlock = $(_this.parentNode);

    function onPlayerReady(event) {
        //event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            jBlock.addClass('play').removeClass('pause');
        } else if ( event.data == YT.PlayerState.PAUSED ) {
            jBlock.addClass('pause');
        } else if ( event.data == YT.PlayerState.ENDED ) {
            jBlock.removeClass('play pause');
        }
    }

    return {
        initVideoFrame: function (){

            player = new YT.Player(_this, {
                height: '100%',
                width: '100%',
                videoId: _this.dataset.videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

            jBlock.find(".btn-play").on("click", () => {
                this.playVideo();
            });
        },
        stopVideo: () => {
            player.stopVideo();
        },
        playVideo: () => {
            player.playVideo();
        }
    };
};
