/*  organize.js
 *  -----------
 *  Liste des fonctions graphiques liées à la page */

/* HEADER
 * ------ */

/* Affichage du titre */
function displayH1() {
    var i = 1;
    if ($("div#header > h2").size() > 0) {
        i = $(co).find("header > h1 > occupation").text();
    }
    
    var x = $("div#header").height() / i;
    $("div#header > h1").css("height", Math.round(x) + "px");
    $("div#header > h1").css("font-size", Math.round(x) + "px");
}

/* Affichage du sous-titre */
function displayH2() {
    var x = $("div#header").height() - ($("div#header > h1").outerHeight(true));
    $("div#header > h2").css("height", Math.round(x) + "px");
    $("div#header > h2").css("font-size", Math.round(x) + "px");
}

/* Affichage de l'en-tête */
function displayHeader() {
    /* Calcul de base */
    var x = Math.max($(window).height() / 10, 120);
    $("div#header").height(Math.round(x) + "px");
    
    displayH1();
    displayH2();
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