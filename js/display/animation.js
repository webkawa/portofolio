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

/* Change le slide en cours */
function switchSlide(open) {
    /* Propriétés de l'animation */
    var x = {
        "duration"  :   $(co).find("slides > transition > speed").text(),
        "ease"      :   $(co).find("slides > transition > ease").text()
    };
     
    /* Nombre total d'éléments */
    var y = $("div#page > div.slide").size();
    
    /* Nombre d'éléments précédents et suivants */
    var z1 = $(open).nextAll("div.slide").size();
    var z2 = $(open).prevAll("div.slide").size();
    
    /* Largeur finale de l'élement ouvert */
    var o = $("div#page").innerWidth() - (z1 * $(co).find("slides > width > left").text() + z2 * $(co).find("slides > width > right").text());
    
    /* Slide précédente */
    if ($(open).next().hasClass("selected")) {
        $(open).animate({
            "opacity"   :   "0",
            "width"     :   o + "px"
        }, x);
        $(open).next().animate({
            "opacity"   :   "1",
            "width"     :   $(co).find("slides > width > right").text() + "px",
            "left"      :   $("div#page").innerWidth() - (z1 * $(co).find("slides > width > right").text()) + "px"
        }, x);
    } 
    /* Slide suivante */
    else {
        $(open).animate({
            "opacity"   :   "0",
            "width"     :    o + "px",
            "left"      :   ($(co).find("slides > width > left").text() * z2) + "px"
        }, x);
        $(open).prev().animate({
            "opacity"   :   "1",
            "width"     :   $(co).find("slides > width > left").text(),
            "left"      :   ($(co).find("slides > width > left").text() * (z2 - 1)) + "px"
        }, x);
    }
    
    /* Attribution des classes */
    $("div#page > div.slide.selected").toggleClass("selected");
    $(open).addClass("selected");
}