/*  organize.js
 *  -----------
 *  Liste des fonctions graphiques liées à la page */

/* HEADER
 * ------ */

/* Affichage du titre */
function displayH1() {
    /* Taille à appliquer */
    var x;
    var y = $("div#header").height();
    if($("div#header > div > h2").size() == 0) {
        x = getFontSizeFor($("div#header > div > h1"), y);
    } else {
        x = getFontSizeFor($("div#header > div > h1"), y - $("div#header > div > h2").outerHeight());
    }
    
    /* Application */
    $("div#header > div > h1").css("font-size", x + "px");
}
/* Affichage de l'en-tête */
function displayHeader() {
    /* Propriétés du slide en cours */
    var p = centralSlideProperties($("div#page > div.slide.selected"));
    
    /* Calcul de base */
    var x = Math.max($(window).height() / 10, 120);
    $("div#header").height(Math.round(x) + "px");
    $("div#header").css({
        "margin-left"  : p.left + "px"
    });
    $("div#header > div.title").css("min-width", p.width);
    
    /* Calcul du titre */
    displayH1();
}

/* COEUR DE PAGE
 * ------------- */
/* Affichage inial des composants */ 
function displaySlides() {
    /* Variables globales */
    var x = false;
    var y = $("div#page div.slide").size();
    var z = $("div#page").innerHeight();
    
    /* Variables de configuration */
    var l = $(co).find("slides > width > left").text();
    var r = $(co).find("slides > width > right").text();
    
    /* Parcours des éléments */
    $("div#page div.slide").each(function(index) {
        $(this).css("height", z);
        if ($(this).hasClass("selected")) {
            /* Propriétés de l'élément central */
            var p = centralSlideProperties($(this));
            $(this).css({
               "left"   : p.left + "px",
               "width"  : p.width + "px"
            });
            
            /* Variable de repérage */
            x = true;
        } else {
            if (x) {
                /* Propriétés de l'élément à droite */
                $(this).css({
                    "right" : ((y - (index + 1)) * r) + "px",
                    "width" : r + "px"
                })
            } else {
                /* Propriétés de l'élément à gauche */
                $(this).css({
                    "left"  : (l * index) + "px",
                    "width" : l + "px"
                });
            }
        }
    });
}

/* Affichage du coeur de page */
function displayPage() {
    var x = $(window).height() - ($("#header").outerHeight() + $("#footer").outerHeight());
    $("div#page").height(x);
    
    displaySlides();
}