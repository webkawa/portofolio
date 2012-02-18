/*  animation.js
 *  ------------
 *  Liste des fonctions graphiques liées à l'animation.
 *  A charger après l'initialisation de la page et des variables avenantes. */

/* Décharge le contenu d'un slide */
function unloadSlide(slide) {
    
}

/* Charge le contenu d'un slide */
function loadSlide(slide) {
    
}

/* Durée du changement de slide */
var SLIDE_CHANGE_DURATION = 1500;
var SLIDE_CHANGE_EASE = "easeOutExpo";

/* Change le slide en cours */
function switchSlide(slide) {
    /* Animation */
    var x = false;
    var y = $("div#page > div.slide").size();
    $("div#page > div.slide").each(
        function(i) {
            if($(this).is(slide)) {
                var z = $("div#page").innerWidth() - (i * SLIDE_WIDTH_LEFT) - ((y - (i + 1)) * SLIDE_WIDTH_RIGHT);
                $(this).animate({width: Math.round(z) + "px"}, SLIDE_CHANGE_DURATION, SLIDE_CHANGE_EASE);
                x = true;
            } else {
                if (x) {
                    $(this).animate({width: SLIDE_WIDTH_RIGHT + "px"}, SLIDE_CHANGE_DURATION, SLIDE_CHANGE_EASE);
                } else {
                    $(this).animate({width: SLIDE_WIDTH_LEFT + "px"}, SLIDE_CHANGE_DURATION, SLIDE_CHANGE_EASE);
                }
            }
        }
    );
    
    /* Mise à jour des classes */
    $("div#page > div.slide.selected").toggleClass("selected");
    slide.toggleClass("selected");
}