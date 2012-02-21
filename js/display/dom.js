/*  dom.js
 *  ------
 *  Fonctions utilitaires liées au DOM. */

/* Ajout de coins */
function addRoundedCorner(container, bg, pos, size, inv) {
    var x = "round " + pos + " s" + size;
    if(inv) {
        x += " inv";
    }
    var y = $('<div class="' + x + '"></div>');
    y.insertAfter($(container).children(":last"));
    y.css("background-color", bg);
}

/* Enrichissement initial */
var core = $("div#core");
var corebg = $("div.slide.selected").css("background-color");
addRoundedCorner(core, corebg, "tr", 25, false);
addRoundedCorner(core, corebg, "tl", 25, false);
addRoundedCorner(core, corebg, "bl", 25, false);
addRoundedCorner(core, corebg, "br", 25, false);