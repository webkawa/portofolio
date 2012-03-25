/* 
    toolkit.js
    ----------
    Fonctions utilitaires.
 */

/* Calcule la différence entre largeur indiquée et largeur réelle pour un bloc */
function widthAdd(target) {
    return $(target).outerWidth(true) - $(target).width();
}
/* Calcule la différence entre hauteur indiquée et hauteur réelle pour un bloc */
function heightAdd(target) {
    return $(target).outerHeight(true) - $(target).height();
}

/* Attribue une largeur réelle à un objet */
function realWidth(target, width) {
    $(target).width(width - widthAdd(target));
}
/* Attribue une largeur maximale réelle à un objet */
function realMaxWidth(target, width) {
    $(target).css("max-width", (width - widthAdd(target)) + "px");
}
/* Attribue une hauteur réelle à un objet */
function realHeight(target, height) {
    $(target).height(height - heightAdd(target));
}
/* Attribue une hauteur maximale réelle à un objet */
function realMaxHeight(target, height) {
    $(target).css("max-height", (height - heightAdd(target)) + "px");
}

/* Adapte la taille d'une police pour une hauteur donnée */
function fontHeight(target, height) {
    /* Mise à zéro */
    $(target).css("font-size", "0px");
    
    /* Tests de sécurité */
    if($(target).size() == 1 && height > 0) {
        /* Calcul */
        var x = 0;
        while($(target).outerHeight(true) < height) {
            $(target).css("font-size", x + "px");
            x++;
        }
    }
}

/* Retourne le descendant le plus lointain des premiers enfants */
function lastChild(target) {
    var buff = target;
    while($(buff).children().size() > 0) {
        buff = $(buff).children(":first");
    }
    return buff;
}
