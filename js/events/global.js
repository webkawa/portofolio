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

/* Inscription des évènements des formulaires */
function doFormEvents() {
    /* Test d'un champ sujet */
    $("input.subject").keyup(function() {
        if($(this).attr("value").length > 3) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
}