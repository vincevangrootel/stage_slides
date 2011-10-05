$(document).ready(function()	{ 
	
	$(".dino").live(
		'mouseenter',
		function()	{
			$(".dino span").css('visibility', 'visible');
		});

	$(".dino").live(
		'mouseleave',
		function()	{
			$(".dino span").css('visibility', 'hidden');
		});
});

var Slides = {
	colours : ["#ff4c87", "#ff653F", "#E8423A"],
   	totalSlides : '',
   	slideWidth : '',
   	translateAmount : 0,
   	currentSlide : 0,
   	container : $('#slides'),
	colourCount : -1,
	

   
   init : function(totalSlides) {
      if ( !totalSlides ) throw new Error('Please pass the total number of slides');
      Slides.totalSlides = ~~totalSlides;
      Slides.loadContent();
      Slides.setSlideWidth(); 
      Slides.keyPress();

		Slides.pickNextColour(Slides.colours);

      if ( /#slide-\d{1,3}/i.test( location.hash ) ) { 
         Slides.currentSlide = ~~location.hash.split('-')[1];
         Slides.goto();
      }
   },

	pickNextColour : function(obj) {
		if(Slides.colourCount == 2)
		{
			Slides.colourCount = 0;
		}
		else
		{
			Slides.colourCount++;
		}
		console.log(Slides.colours[Slides.colourCount] + " " + Slides.colourCount);
	   return Slides.colours[Slides.colourCount];
	},

   loadContent : function() {
      Slides.container.hide();
      for ( var i = 0; i < Slides.totalSlides; i++ ) {
         $('<div id="#slide-"' + i + '"></div>')
            .load('slides/' + i + '.html')
            .appendTo( Slides.container );
      }              
      Slides.container.show();
   },

   setSlideWidth : function() {
      var each = Slides.container.children('div');
      Slides.slideWidth = each.width() + ( parseInt( each.css('margin-right'), 10 ) );
   },

   keyPress : function() {
      $( document.body ).keydown(function(e) {
         if ( e.keyCode === 37 || e.keyCode === 39 ) {
            e.preventDefault();
            ( e.keyCode === 39 ) ? Slides.next() : Slides.prev();
         }
      });
   },

   next : function() {
      if ( Slides.currentSlide >= Slides.totalSlides - 1 ) return;
      Slides.translateAmount -= Slides.slideWidth;
      ++Slides.currentSlide;
      Slides.updateHash();
      Slides.animate();
	$("body").css("background-color", Slides.pickNextColour(Slides.colours));

   },

   prev : function() {
      if ( Slides.currentSlide <= 0 ) return;

      Slides.translateAmount += Slides.slideWidth;
      --Slides.currentSlide;
      Slides.updateHash();
      Slides.animate();
	$("body").css("background-color", Slides.pickNextColour(Slides.colours));

   }, 

   goto : function(  ) {
      Slides.translateAmount = -Slides.slideWidth * Slides.currentSlide;  
      Slides.animate();
   },

   animate : function() {
      Slides
         .container
         .children()
            .css('-webkit-transform', 'translateX(' + Slides.translateAmount + 'px)');
			if(Slides.currentSlide == 1)	{
				$(".dino img").show();
			}
			else
			{
				$(".dino img").hide();
			}
   },

   updateHash : function() {
      location.hash = '#slide-' + Slides.currentSlide;
   },

/*
	changeBackground : function()	{
		$("body").css("background-color", Slides.pickRandomProperty(Slides.colours));
	}
	*/
};

// Let's do this!
// Pass the total number of slides as an argument.
Slides.init(13);