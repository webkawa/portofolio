/* 
    cleanup.js
    ----------
    Fonctions utiles au nettoyage du code dans le DOM.
 */

/* Nettoyage du titre */
function cleanupTitle() {
    /* Sélection */
    var ltitle = $("div#header div.title.leaving");             /* Titre sortant */
    var ititle = $("div#header div.title.incoming");                    /* Titre entrant */
    
    /* Suppression du titre sortant */
    $(ltitle).remove();
    
    /* Mise à jour du titre entrant */
    $(ititle).toggleClass("incoming");
}

/* Nettoyage de la vue */
function cleanupView() {
    $("div#media div.data > div.cage div.view *").remove();
    $("div#media div.data > div.cage div.links ul li.selected").toggleClass("selected");
}

/* Nettoyage du média */
function cleanupMedia() {
    $("div#media").remove();
}

/* Nettoyage du contenu */
function cleanupCore() {
    /* Nettoyage */
    $("div#content, div#media").remove();
    global_map = null;
}

/* Nettoyage de l'erreur */
function cleanupError() {
    $("div#error > div.cage").remove();
}

/* Nettoyage de la page */
function cleanupPage() {
    /* Nettoyage */
    $("div#page div.slide.close > div.spacer").remove();
}