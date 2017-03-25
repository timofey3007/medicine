"use strict";

window.langProp = {
    ru: {
        emptyInput: "поле не может быть пустым",
        invalidEmail: "email введен некорректно"
    }
};

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

    $(".medicine_facts_outer").animateCounter({
        selector: ".medicine_facts_outer_blocknum_number",
        duration: 1500
    });

    // ---- set/unset class for from input -----------------------------------------------------------------------------
    $(".medicine_form_group_input").on("focus", function(){
        var el = $(this);

        el.parent().addClass("focusing");
    });

    $(".medicine_form_group_input").on("blur", function(){
        var el = $(this);

        if ( !el.val() ) {
            el.parent().removeClass("focusing");
        }
    });
    // -----------------------------------------------------------------------------------------------------------------

    $("#medicine_form").validate({
        rules: {
            'form[name]': {
                required: true
            },
            'form[email]': {
                required: true,
                email: true
            },
            'form[message]': {
                required: true
            }
        },
        messages: {
            'form[name]': {
                required: langProp.ru.emptyInput
            },
            'form[email]': {
                required: langProp.ru.emptyInput,
                email: langProp.ru.invalidEmail
            },
            'form[message]': {
                required: langProp.ru.emptyInput
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parent().addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().removeClass(errorClass).addClass(validClass);
        },
        submitHandler: function(form){
            // put here code for success validation
            form.reset();
            alert("Все чики-бомбони");
            return false;
        }
    });

    $("#medicine_subscribe").validate({
        rules: {
            'form[email]': {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {

        },
        submitHandler: function(form){
            // put here code for success validation
            form.reset();
            alert("Все чики-бомбони");
            return false;
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

    $('#top_control_menu').scrollToFixed({
        marginTop: 0,
        limit: function() {
            var limit = $('.medicine_footer').offset().top - $('#top_control_menu').outerHeight(true) - 10;

            return limit;
        },
        zIndex: 999,
        /*preFixed: function() { $(this).find('.title').css('color', 'blue'); },
        preAbsolute: function() { $(this).find('.title').css('color', 'red'); },
        postFixed: function() { $(this).find('.title').css('color', ''); },
        postAbsolute: function() { $(this).find('.title').css('color', ''); }*/
        preFixed: function() { $(this).parent().before($(this)); },
        postFixed: function() { $(this).next('header').prepend($(this)); }
    });

    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false
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

/**
 * plugin for animate numbers
 * @param options
 */
$.fn.animateCounter = function(options){
    var settings = $.extend({
            selector: ".counter",
            offset: 0,
            duration: 2000,
            easing: 'swing'
            // didn't decide what to write
        }, options),
        _this = $(this),
        elems = _this.find(settings.selector),
        countElems = [],
        win = $(window);

    if ( elems.length > 0 ) {
        let count = 0;
        elems.each(function(){
            countElems[count++] = false;
        });

        win.on("scroll", () => {
            var pos = $(window).scrollTop(),
                winHeight = win.height();

            count = 0;
            elems.each( function() {
                let el = $(this),
                    index = count++;

                if ( !countElems[index] && ( el.offset().top - el.innerHeight() - settings.offset < pos + winHeight ) ) {
                    countElems[index] = true;

                    el.prop('Counter',0).animate({
                        Counter: getNumber(el.text())
                    }, {
                        duration: settings.duration,
                        easing: settings.easing,
                        step: function (now) {
                            el.text( el.text().replace(getNumber(el.text()), Math.ceil(now)));
                        }
                    });
                }
            });

            function getNumber(str) {
                let pattern = /\d+/;

                return str.match(pattern)[0];
            }
        });
    }
};