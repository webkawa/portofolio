/* 
    helpers.js
    ----------
    Aides à l'affichage.
 */

/* Retourne les propriétés avancées d'un slide */
function slideProperties(target) {
    /* Variables retournées */
    var lmargin = 0;
    var lcount = 0;
    var rmargin = 0;
    var rcount = 0;
    
    /* Calcul */
    var x = true;
    $("div#page div.slide").each(function () {
        if($(this).hasClass("open")) {
            x = false;
        } else {
            if(x) {
                lmargin += $(this).outerWidth(true);
                lcount ++;
            } else {
                rmargin += $(this).outerWidth(true);
                rcount ++;
            }
        }
    });
    
    /* Renvoi */
    return {
        "lmargin" : lmargin,
        "lcount" : lcount,
        "rmargin" : rmargin,
        "rcount" : rcount
    }
}
