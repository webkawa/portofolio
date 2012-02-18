/*  organize.js
 *  -----------
 *  Liste des fonctions graphiques liées à la page */

/* HEADER
 * ------ */
/* Indice d'occupation du titre */
var H1_HEIGHT = 1.5;

/* Affichage du titre */
function displayH1() {
    var i = 1;
    if ($("div#header > h2").size() > 0) {
        i = H1_HEIGHT;
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
/* Largeur des slides fermés (gauche et droite) */
var SLIDE_WIDTH_LEFT = 20;
var SLIDE_WIDTH_RIGHT = 40;
    
/* Affichage inial des composants */
function displaySlides() {
    var x, y;
    x = false;
    y = $("div#page > div.slide").size();
    
    $("div#page > div.slide").each(
        function(i) {
            if($(this).hasClass("selected")) {
                var z = $("div#page").innerWidth() - (i * SLIDE_WIDTH_LEFT) - ((y - (i + 1)) * SLIDE_WIDTH_RIGHT);
                $(this).css("width", z);
                x = true;
            } else {
                if (x) {
                    $(this).css("width", SLIDE_WIDTH_RIGHT + "px");
                } else {
                    $(this).css("width", SLIDE_WIDTH_LEFT + "px");
                }
            }
            $(this).css("width", x + "px");
        }
    );
}

/* Affichage du coeur de page */
function displayPage() {
    var x = $(window).height() - ($("#header").outerHeight() + $("#footer").outerHeight());
    $("div#page").height(x);
    
    displaySlides();
}