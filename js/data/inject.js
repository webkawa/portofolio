/*  inject.js
 *  ---------
 *  Fonctions permettant l'injection de code. */

/* Injection du titre */
function injectTitle(current) {
    /* Injection du contenu initial */
    $('<div class="title incoming"><h1>Lorem ipsum dolor sit amet</h1></div>').insertAfter($(current));
    if (true) {
        $('<p class="subtitle">Nulla cursus, dui ac congue </p>').insertAfter("div#header > div.incoming > h1");
    }
    
    /* Calcul de la taille occupée par le titre */
    var y = $("div#header").height();
    if($("div#header > div.incoming > p.subtitle").size() == 0) {
        z = getFontSizeFor($("div#header > div.incoming > h1"), y);
    } else {
        z = getFontSizeFor($("div#header > div.incoming > h1"), y - $("div#header > div.incoming > p.subtitle").outerHeight());
    }
    $("div#header > div.incoming > h1").css("font-size", z + "px");
}

/* Injection du coeur de slide */
function injectCore(target) {
    /* Injection du contenu initial */
    $(target).append('<div class="core"><div class="scroller">Lalala</div></div>');
    
    /* Sélection */
    var core = $(target).children("div.core");
    
    /* Calcul de la hauteur */
    var x = $(core).outerHeight(true) - $(core).height();
    $(core).css({
        "height"    : ($("div#page").height() - x) + "px",
        "width"     : ($(co).find("core > width").text() + "px")
    });
    
    /* Création des coins */
    var corebg = $(target).css("background-color");
    addRoundedCorner(core, corebg, "tr", 25, false);
    addRoundedCorner(core, corebg, "tl", 25, false);
    addRoundedCorner(core, corebg, "bl", 25, false);
    addRoundedCorner(core, corebg, "br", 25, false);
}
