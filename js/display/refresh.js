/* 
    refresh.js
    ----------
    Ensemble des fonctions liées au rafraichissement de la fenêtre.
 */

/* Taille de la police du titre */
function refreshTitleSize(target) {
    /* Variables utiles */
    var ih1 = $(target).children("h1");                     /* Titre */
    var ip = $(target).children("p");                       /* Sous-titre */
    
    /* Dimensionnement de la police */
    if($(ip).size() != 0) {
        fontHeight(ih1, $("div#header").height() - $(ip).outerHeight(true));
    } else {
        fontHeight(ih1, $("div#header").height());
    }
}

/* Rafraichissement du titre */
function refreshTitle(target) {
    /* Largeur */
    $(target).css("max-width", $("div#header").width());
    
    /* Police */
    refreshTitleSize(target);
}

/* Rafraichissement de la page */
function refreshPage() {
    /* Variables utiles */
    var wheight = $(window).height();                               /* Hauteur de la fenêtre */
    var hheight = $("div#header").outerHeight(true);                /* Hauteur de l'en-tête */
    var fheight = $("div#footer").outerHeight(true);                /* Hauteur du pied de page */
    var pwidth = $("div#page").width();                             /* Largeur de la page */
    var csprop = slideProperties($("div#page div.slide.open"));     /* Propriétés du slide ouvert */
    
    /* Hauteur de la page */
    realHeight("div#page", wheight - hheight - fheight);
    
    /* Hauteur des slides */
    realHeight("div#page div.slide", $("div#page").height());
    
    /* Largeur du slide ouvert */
    realMaxWidth("div#page div.slide.open", pwidth - csprop.lmargin - csprop.rmargin)
    
    /* Hauteur du gestionnaire d'espacement */
    realHeight("div#page div.slide div.spacer", $("div#page").height());
}

/* Rafraichissement du cœur de page */
function refreshCore() {
    /* Variables utiles */
    var sheight = $("div#page div.spacer div.core").height();
    var cheight = $("div#content").height();
    
    /* Hauteur des fenêtres de contenu et médias */
    realHeight("div#content, div#media", sheight);
    
    /* Hauteur de la scrollbar */
    realHeight("div#content div.scrollbar", cheight);
}

/* Rafraichissement général */
function refresh() {
    refreshTitle($("div#header div.title"));
    refreshPage();
    refreshCore();
}
