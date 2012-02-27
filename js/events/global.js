/* 
    global.js
    ---------
    Evènements globaux utilisés par la page.
 */

/* Inscription des évènements globaux */
function doGlobalEvents() {
    /* Modification des dimensions de la fenêtre */
    $(window).resize(function() {
        refresh();
    });
}