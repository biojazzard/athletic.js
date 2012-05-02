/*
 * by Alfredo Llanos. 2012
 */

jQuery(document).ready(function ($) {

	//global vars
	var scrollorama,
		myMargin;

	// Functions

	function resizeItems(){
		var myLMargin,
			myRMargin,
			myWinW;

		myWinW = $(window).width();

		myLMargin = (myWinW - ( $('#caostica-bl').width() + $('#caostica-br').width() )) / 2;

		myRMargin = ( myLMargin + $('#caostica-bl').width() );

		//$('#caostica-bl').css('margin-left', myLMargin + 'px');
		//$('#caostica-br').css('margin-right', myLMargin + 'px');

		scrollorama.animate('#caostica-bl',{ duration:1000, delay: 500, property:'margin-left', start:myLMargin, end: -500 });
		scrollorama.animate('#caostica-br',{ duration:1000, delay: 500, property:'margin-right', start:myLMargin, end: -500 });

		return myMargin;

	}

	/* My Functions */
	$('#footer div').tooltip({
		selector: "a[class=popup]",
		placement: "top",
		animation: true,
		delay: { show: 50, hide: 300 }
	});

	if ($('#mainbox').length > 0) {

		// initialize the plugin
		scrollorama = $.scrollorama({
			blocks:'.scrollblock',
			enablePin:false
		}); 

		myMargin = resizeItems();
				
		// animate
		scrollorama.animate('#caostica-a',{ duration:480, property:'zoom', start:1.0, end:1.2, easing: 'easeOutCubic'});
		scrollorama.animate('#caostica-a',{ duration:480, property:'margin-top', start:0, end:70, easing: 'easeOutCubic'});

		//scrollorama.animate('#caostica-br',{ duration:1000, property:'opacity', start:1, end:0.5 }); //easeOutExpo
		//scrollorama.animate('#caostica-bl',{ duration:1000, property:'opacity', start:1, end:0.5 });

		scrollorama.animate('#caostica-c',{ duration:900, delay: 700, property:'zoom', start:1.0, end:1.2, easing: 'easeOutCubic'});
		scrollorama.animate('#caostica-d',{ duration:1300, delay: 400, property:'zoom', start:1.0, end:1.2, easing: 'easeInCubic'});
		scrollorama.animate('#caostica-e',{ duration:600,  delay: 300, property:'zoom', start:1.0, end:1.2, easing: 'easeOutExpo'});
		scrollorama.animate('#caostica-ten',{ duration: 500, delay: 300, property:'rotate', start:360, end:0 });

		/* Lettering */
		$('#caostica').lettering();
		$('#caostica span').css('display','block').css('float','left');

		scrollorama.animate('#caostica',{ duration: 200, property:'zoom', end: 4 });
		$('#caostica span').each(function() {
			scrollorama.animate($(this),{ duration: 100, property:'top', end: Math.random()*160-180 });
			scrollorama.animate($(this),{ duration: 200, property:'rotate', start:0, end:Math.random()*720-360 });
		});

		$(window).resize(function() {
			resizeItems();
		});
	}


	/* Fit Texts */
	$("#pre-footer h3").fitText(2.5,{ minFontSize: 32, maxFontSize: '42px' });
	//$("#bizarre-text").fitText(1.0, { minFontSize: 86, maxFontSize: '104px' });
	//$("#bizarre-text").fitText(1.0, { minFontSize: 86, maxFontSize: '104px' });

	/* Tabs */
	/*
	if ($("#bases-pills").length > 0){
		$('#bases-pills').tab('show');
	}
	*/

});