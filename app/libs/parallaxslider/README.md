# Parallax Slider #

*Description:* Parallax Slider incorporates a parallax scrolling effect where each slide and its contents glide into view at different speeds, creating a captivating visual experience. The slider is responsive in nature, and supports other nifty features such as manual or automatic mode, stop rotating after x cycles, persistence of the last shown slide, and more.

## Directions ##

*Step 1:* This script uses the following external files:

+ jQuery 1.10 or above (served via Google CDN)
+ parallaxslider.css
+ parallaxslider.js
+ jquery.velocity.min.js
+ jquery.touchSwipe.min.js
+ Images for UI

*Step 2:* Add the below code to the HEAD section of your page:

	<link rel="stylesheet" type="text/css" href="parallaxslider.css" />
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="jquery.velocity.min.js"></script>
	<script type="text/javascript" src="jquery.touchSwipe.min.js"></script>
	
	<script src="parallaxslider.js" type="text/javascript">
	
	/***********************************************
	* Parallax Slider- © Dynamic Drive (www.dynamicdrive.com)
	* This notice MUST stay intact for legal use
	* Visit http://www.dynamicdrive.com/ for this script and 100s more.
	***********************************************/
	
	</script>
	
	<script type="text/javascript">
	
	var firstparallaxslider=new parallaxSlider({
		wrapperid: 'myparallaxslider', //ID of DIV on page to house slider
		displaymode: {type:'manual', pause:3000, cycles:2, stoponclick:true, pauseonmouseover:true},
		delaybtwdesc:  500, // delay in milliseconds between the revealing of each description layer inside a slide
		navbuttons: ['left.png', 'right.png', 'up.png', 'down.png'], // path to nav images
		activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
		orientation: 'h', //Valid values: "h" or "v"
		persist: true, //remember last viewed slide and recall within same session?
		slideduration: 1000 //transition duration (milliseconds)
	})
	
	</script>


*Step 3:* Then, add the below sample markup to your page:

	<div id="myparallaxslider" class="parallaxslider">
	
	<div class="slide">
		<div class="bgoverlay" data-bgimage="zenrocks.jpg"></div>
		<div class="desc">A cairn is a man-made pile (or stack) of stones, used as trail markers in many parts of the world. -Wikipedia</div>
		<div class="desc">
			<div style="position:absolute; bottom:15px; left:30px; width:250px; background:black; font:normal 105% Germand; padding:10px; font-style:italic; border-radius:10px; line-height:1.4em;">
			“Letting go is the lesson. Letting go is always the lesson. Have you ever noticed how much of our agony is all tied up with craving and loss?” <br />- Susan Gordon Lydon 
			</div>
		</div>
	</div>
	
	<div class="slide">
		<div class="bgoverlay" data-bgimage="callalilies.jpg"></div>
		<div class="desc">
			<div style="position:absolute; width:150px; right:10px; line-height:1.5em; background:#E2AF16; padding:10px; border-radius:7px">“The things I carry are my thoughts. That's it. They are the only weight. My thoughts determine whether I am free and light or burdened.” <br /><br />- Kamal Ravikant
			</div>
		</div>
		<div class="desc">
			<div style="position:absolute; bottom:1em">Cally Lily is a perennial plant, evergreen where rainfall and temperatures are adequate. -Wikipedia
			</div>
		</div>
	</div>
	
	<div class="slide">
		<div class="bgoverlay" data-bgimage="leaf.jpg"></div>
		<div class="desc">
			<div style="position:absolute; top:40%; background:#754B08; font:normal 100% Germand; padding:10px; font-style:italic; border-radius:10px">
			“Problems that remain persistently insoluble should always be suspected as questions asked in the wrong way” <br /><br />Alan Wilson Watts
			</div>
		</div>
	</div>
	
	<div class="slide">
		<div class="bgoverlay" data-bgimage="rowan.jpg"></div>
		<div class="desc" style="padding:0">
			<img src="strip1.jpg" style="position:absolute; top:0; opacity:0.9" />
		</div>
		<div class="desc" style="padding:0">
			<img src="strip2.jpg" style="position:absolute; top:135px; opacity:0.9" />
		</div>
		<div class="desc" style="padding:0">
			<img src="strip3.jpg" style="position:absolute; top:259px; opacity:0.9" />
		</div>
	</div>
	
	</div>
	
	<a href="javascript:firstparallaxslider.navigate('back')">Back</a> | <a href="javascript:firstparallaxslider.navigate('forth')">Forth</a>

## Parallax Slider set up ##

See script project page for additional details on setup and documentation: <http://www.dynamicdrive.com/dynamicindex17/parallaxslider/index.htm>
