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

/* Adapte la taille d'une police pour une hauteur donnée */
function fontHeight(target, height) {
    /* Mise à zéro */
    $(target).css("font-size", "0px");
    
    /* Calcul */
    var x = 0;
    while($(target).outerHeight(true) < height) {
        $(target).css("font-size", x + "px");
        x++;
    }
}
