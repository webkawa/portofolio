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
    
    /* [!] A optimiser ! Nombre magique */
    var lwidth = 10;
    var rwidth = 20;
    
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

/* Permet l'ajout d'une décoration (bordure ou coin) à un bloc */
function addDecoration(target, type, position, theme) {
    $(target).each(function() {
        /* Création de l'élément */
        var data = $('<div class="' + type + ' ' + position + ' ' + theme + '"></div>');
    
        /* Sauvegarde du contenu */
        var childs = $(this).children();
    
        /* Nettoyage */
        $(childs).remove();
    
        /* Ré-insertion */
        $(data).append($(childs));
        $(this).append($(data));
    })
}

/* Permet l'ajout de quatre coins à un bloc */
function addCorners(target, theme) {
    addDecoration(target, "corner", "tl", theme);
    addDecoration(target, "corner", "tr", theme);
    addDecoration(target, "corner", "br", theme);
    addDecoration(target, "corner", "bl", theme);
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