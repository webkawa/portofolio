/*  organize.js
 *  -----------
 *  Liste des fonctions graphiques liées à la page */

/* HEADER
 * ------ */
/* Affichage du titre */
function displayH1() {
    var i = 1;
    if ($("div#header > h2").size() > 0) {
        i = 1.5;
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
    var s = $("div#page > div.slide").size();
    alert(s);
}

/* Affichage du coeur de page */
function displayPage() {
    var x = $(window).height() - ($("#header").outerHeight() + $("#footer").outerHeight());
    $("div#page").height(x);
}