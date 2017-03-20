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
    })
});