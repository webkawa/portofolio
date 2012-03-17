/* 
    media.js
    --------
    Evènements liés à l'utilisation des médias.
 */

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
    doViewEvents();
    
    /* Dépendances */
    if($("div#gallery").size() > 0) {
        doGalleryEvents();
    }
}

