/* 
    error.js
    --------
    Définit les évènements liés à des erreurs.
 */

/* Vérifie la résolution */
function checkResolution() {
    /* Variables utiles */
    var hcomponents = $("div#header, div#page, div#footer");
    var minh = 0;
    $(hcomponents).each(function() {
        minh += $(this).outerHeight();
    })
    var minw = parseInt($("div#media").css("min-width")) * 2;
        
    /* Résolution trop faible */
    if($(window).height() < minh || $(window).width() < minw) {
        injectError(loadError("badresolution"));
        showError();
    }
}

function doErrorEvents() {
    $(window).resize(function() {
        checkResolution();
    });
    $(document).ready(function() {
        checkResolution();
        refreshError();
    });
}