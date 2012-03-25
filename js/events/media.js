/* 
    media.js
    --------
    Evènements liés à l'utilisation des médias.
 */

/* Inscription des évènements de zoom */
function doZoomingEvents() {
    /* Effacement des fonctions précédentes */
    $("div#media div.loader").off();
    
    /* Zoom sur un média */
    $("div#media.small div.loader").click(function() {
        switchZoom(true);
    });
    /* Dézoomage d'un média */
    $("div#media.large div.loader").click(function() {
        switchZoom(false);
    });
}
/* Evènements des liens internes */
function doViewEvents() {
    /* Changement de média */
    $("div#media div.data div.cage div.links ul li").click(function() {
        switchView();
    });
}
/* Evènements des galeries */
function doGalleryEvents() {
    /* Changement d'image */
    $("div#gallery div.infos ul li").click(function() {
        switchPicture($(this));
    });
}

/* Evènements des médias */
function doMediaEvents() {
    doZoomingEvents();
    doViewEvents();
    
    /* Dépendances */
    if($("div#gallery").size() > 0) {
        doGalleryEvents();
    }
}

