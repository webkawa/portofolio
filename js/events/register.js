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
    resizeSelectedSlide()
});
    
/* Actions à la sélection d'un slide */
$("div#page > div.slide.selected").next().add($("div#page > div.slide.selected").prev()).click(function() {
    switchSlide($(this));
});

