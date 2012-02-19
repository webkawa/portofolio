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
    var x = false;
    var y = $("div#page > div.slide").size();
    var z = 0;
    $("div#page > div.slide").each(
        function(i) {
            if($(this).hasClass("selected")) {
                z = i * $(co).find("slides > width > left").text();
                $(this).css("opacity", "0");
                $(this).css("width", $(co).find("slides > width > left").text() + "px");
                $(this).css("left", z + "px");
                $(this).css("height", $("div#page").innerHeight() + "px");
                x = true;
            } else {
                if (x) {
                    z = $("div#page").innerWidth() - (y - i) * $(co).find("slides > width > right").text();
                    $(this).css("width", $(co).find("slides > width > right").text() + "px");
                    $(this).css("left", z + "px");
                    $(this).css("height", $("div#page").innerHeight() + "px");
                    
                } else {
                    z = i * $(co).find("slides > width > left").text();
                    $(this).css("width", $(co).find("slides > width > left").text() + "px");
                    $(this).css("left", z);
                    $(this).css("height", $("div#page").innerHeight() + "px");
                }
            }
        }
    );
}

/* Affichage du coeur de page */
function displayPage() {
    var x = $(window).height() - ($("#header").outerHeight() + $("#footer").outerHeight());
    $("div#page").height(x);
    
    displaySlides();
}