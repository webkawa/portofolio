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
    $("*").stop(true, true);
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

/* Action au scroll dans le contenu */
$("div#page div.slide.selected div.core").mousewheel(function(event, delta) {
    if(delta > 0) {
        
    } else {
        
    }
});