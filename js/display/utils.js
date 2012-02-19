/*  utils.js
 *  --------
 *  Utilitaires utilisés pour simplifier l'affichage. */

/* Calcul de la taille de police pour un conteneur */
function getFontSizeFor(text, height) {
    var x = 0;
    while($(text).outerHeight(true) < height) {
        x = parseInt($(text).css("font-size")) + 1;
        $(text).css("font-size", x + "px");
    }
    $(text).css("font-size", (x-1) + "px");
}

/* Calcul des variables de position pour un slide centré */ 
function centralSlideProperties(slide) {
    /* Variables générales */
    var x = false;
    
    /* Variables de résultat */
    var w   = $("div#page").width();
    var wl  = 0;
    var wr  = 0;
    
    /* Variables de configuration */
    var l = parseInt($(co).find("slides > width > left").text());
    var r = parseInt($(co).find("slides > width > right").text());
    
    /* Calcul */
    $("div#page > div.slide").each(function() {
        if ($(this).is(slide)) {
            x = true;
        } else {
            if (x) {
                w  -= r;
                wr += r;
            } else {
                w  -= l;
                wl += l;
            }
        }
    });
    
    /* Retour */
    return {
        "width" : w,
        "left"  : wl,
        "right" : wr
    };
}
