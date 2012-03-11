/* 
    media.js
    --------
    Evènements liés à l'utilisation des médias.
 */

/* Evènements des galeries */
function doGalleryEvents() {
    /* Changement d'image */
    $("div#gallery div.infos ul li:not(.selected)").click(function() {
        
    });
}

/* Evènements des médias */
function doMediaEvents() {
    /* Dépendances */
    if($("div#gallery").size() > 0) {
        doGalleryEvents();
    }
}

