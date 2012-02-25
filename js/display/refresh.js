/* 
    refresh.js
    ----------
    Ensemble des fonctions liées au rafraichissement de la fenêtre.
 */

/* Taille de la police du titre */
function refreshTitleSize(target) {
    /* Variables utiles */
    ih1 = $(target).children("h1");                     /* Titre */
    ip = $(target).children("p");                       /* Sous-titre */
    
    /* Dimensionnement de la police */
    if($(ip).size() != 0) {
        fontHeight(ih1, $(sc_header).height() - $(ip).outerHeight(true));
    } else {
        fontHeight(ih1, $(sc_header).height());
    }
}

/* Rafraichissement du titre */
function refreshTitle(target) {
    /* Largeur */
    $(target).css("max-width", $(sc_header).width());
    
    /* Police */
    refreshTitleSize(target);
}

/* Rafraichissement du coeur de page */
function refreshPage() {
    /* Variables utiles */
    var wheight = $(window).height();                   /* Hauteur de la fenêtre */
    var hheight = $(sc_header).outerHeight(true);       /* Hauteur de l'en-tête */
    var fheight = $(sc_footer).outerHeight(true);       /* Hauteur du pied de page */
    
    /* Hauteur du coeur de page */
    realHeight(sc_page, wheight - hheight - fheight);
}

/* Rafraichissement général */
function refresh() {
    refreshTitle($("div#header div.title"));
    refreshPage();
}
