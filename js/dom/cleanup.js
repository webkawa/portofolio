/* 
    cleanup.js
    ----------
    Fonctions utiles au nettoyage du code dans le DOM.
 */

function cleanupTitle() {
    /* Sélection */
    var ltitle = $("div#header div.title.leaving");             /* Titre sortant */
    var ititle = $("div#header div.title.incoming");            /* Titre entrant */
    
    /* Suppression du titre sortant */
    $(ltitle).remove();
    
    /* Mise à jour du titre entrant */
    $(ititle).toggleClass("incoming");
}