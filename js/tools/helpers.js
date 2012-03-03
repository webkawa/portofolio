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

/* Permet l'ajout d'un coin à un bloc */
function addCorner(target, position, theme) {
    /* Création de l'élément */
    var data = $('<div class="corner ' + position + ' ' + theme + '"></div>');
    
    /* Sauvegarde du contenu */
    var childs = $(target).children();
    
    /* Nettoyage */
    $(childs).remove();
    
    /* Ré-insertion */
    $(data).append($(childs));
    $(target).append($(data));
}

/* Permet l'ajout de quatre coins à un bloc */
function addCorners(target, theme) {
    addCorner(target, "tl", theme);
    addCorner(target, "tr", theme);
    addCorner(target, "br", theme);
    addCorner(target, "bl", theme);
}

/* Donne la hauteur à attribuer à une barre de scroll */
function markerSize(container, scroller, scrollzone) {
    return Math.min($(container).height() / $(scroller).height(), 1) * $(scrollzone).height();
}

/* Donne la marge haute à attribuer à une barre de scroll */
function markerMargin(margin, diffscroll, diffmarker) {
    var buff = (margin / diffscroll) * diffmarker;
    if(margin > 0) {
        buff = 0;
    } else if(margin < -(diffscroll)) {
        buff = diffmarker;
    } else {
        buff = -(buff);
    }
    return buff;
}