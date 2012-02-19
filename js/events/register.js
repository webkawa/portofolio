/*  register.js
 *  -----------
 *  Enregistre les évènements associés à la page. */

/* Actions à la fin du chargement du DOM */
$(document).ready(function() {
    displayHeader();
    displayPage();
});

/* Actions au redimensionnement de la fenêtre */
$(window).resize(function() {
    displayHeader();
    displayPage();
});
    
/* Actions à la sélection d'un slide */
$("div#page div.slide").mouseover(function() {
    /* Animation */
    if ($(this).next().hasClass("selected")) {
        switchSlide($(this), false);
    }
    if ($(this).prev().hasClass("selected")) {
        switchSlide($(this), true);
    }
});