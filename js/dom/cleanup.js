/* 
    cleanup.js
    ----------
    Fonctions utiles au nettoyage du code dans le DOM.
 */

/* Nettoyage du titre */
function cleanupTitle() {
    /* Sélection */
    var ltitle = $("div#header div.title.leaving");             /* Titre sortant */
    var ititle = $("div#header div.title.incoming");            /* Titre entrant */
    
    /* Suppression du titre sortant */
    $(ltitle).remove();
    
    /* Mise à jour du titre entrant */
    $(ititle).toggleClass("incoming");
}

/* Nettoyage de la page */
function cleanupPage() {
    /* Nettoyage */
    $("div#page div.slide.close > div.spacer").remove();
}

/* Nettoyage du contenu */
function cleanupCore() {
    /* Nettoyage */
    $("div#content, div#media").remove();
}