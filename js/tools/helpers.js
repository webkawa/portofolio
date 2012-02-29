/* 
    helpers.js
    ----------
    Aides à l'affichage.
 */

/* Retourne un tableau contenant les slides dans leur ordre d'affichage */
function slideInOrder() {
    /* Variables utiles */
    var slides = $("div#page div.slide");
    var tsize = $(slides).size() - 1;
    var lsize = $(slides).filter("div.slide.left").size();
    var result = new Array();
    
    /* Tri */
    $(slides).each(function(i) {
        if($(this).hasClass("left")) {
            result[i] = $(this);
        }
        if($(this).hasClass("right")) {
            result[tsize + lsize - i] = $(this);
        }
    });
    
    /* Retour */
    return result;
}

/* Retourne les propriétés avancées d'un slide */
function slideProperties(target) {
    /* Variables retournées */
    var slides = slideInOrder();
    var lmargin = 0;
    var lcount = 0;
    var rmargin = 0;
    var rcount = 0;
    var lwidth = parseInt($("div#page div.slide.left:first").css("min-width"));
    var rwidth = parseInt($("div#page div.slide.right:last").css("min-width"));
    
    /* Calcul */
    var x = true;
    for(var i = 0; i < slides.length; i++) {
        if($(slides[i]).is(target)) {
            x = false;
        } else {
            if(x) {
                lmargin += lwidth;
                lcount ++;
            } else {
                rmargin += rwidth;
                rcount ++;
            }
        }
    }
    
    /* Renvoi */
    return {
        "lmargin" : lmargin,
        "lcount" : lcount,
        "rmargin" : rmargin,
        "rcount" : rcount,
        "width" : $("div#page").width() - lmargin - rmargin
    }
}

/* Permet l'ajout d'un coin à un bloc 
 * NON FONCTIONNEL A DATE !                     */
function addCorner(target, position, size, inv) {
    /* Dégradé inversé */
    var opt = "";
    if(inv) {
        opt = "inv";
    }
    
    /* Création du contenu */
    var data = $('<div class="corner ' + position + ' ' + size + ' ' + opt + '"></div>');
    
    /* Mise en place de l'arrière-plan */
    if(inv) {
        $(data).css("background-color", $(target).css("background-color"));
    }
    
    /* Mémorisation du parent et suppression de la cible du DOM */
    var parent = $(target).parent();
    $(target).remove();
    
    /* Injection de la cible dans le cadre englobant */
    $(data).append($(target));
    
    /* Ajout de la cible englobée au DOM */
    $(parent).append($(data));
}

/* Permet l'ajout de quatre coins à un bloc */
function addCorners(target, size, inv) {
    addCorner(target, "tl", size, inv);
    addCorner(target, "tr", size, inv);
    addCorner(target, "br", size, inv);
    addCorner(target, "bl", size, inv);
}