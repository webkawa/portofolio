/* 
    shortcuts.js
    ------------
    Fichier de définition des raccourcis.
    Doit être appelé avant les autres fichiers JS.
 */

/* Définition des variables */
var sc_header;
var sc_page;
var sc_footer;

/* Rafraichissement des variables */
function doShortcuts() {
    sc_header       = $("div#header");
    sc_page         = $("div#page");
    sc_footer       = $("div#footer");
}
