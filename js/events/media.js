/* 
    media.js
    --------
    Evènements liés à l'utilisation des médias.
 */

///* Inscription des évènements de zoom */
function doZoomingEvents() {
    /* Annulation des évènements */
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
        var b1 = ($("div#media div.data div.cage div.view:animated").size() != 0);
        var b2 = ($(this).attr("id") === $("div#media div.data div.cage div.links ul li.selected").attr("id"));
        if(!b1 && !b2) {
            switchView($(med).find("view#" + $(this).attr("id")));
        }
    });
}
/* Evènements de scrolling */
function doMediaScrollingEvents() {
    /* Effacement des fonctions précédentes */
    $("div#media div.data > div.cage div.view div.up").off();
    $("div#media div.data > div.cage div.view div.down").off();
    
    /* Liste des cibles possibles */
    var targets = $("div#text");
    
    /* Scroll vers le bas */
    $("div#media div.data > div.cage div.view div.down").click(function() {
        if($("div#media div.data > div.cage div.view:not(:animated)").size() == 1) {
            switchScroll(true, targets);
        }
    });
    /* Scroll vers le haut */
    $("div#media div.data > div.cage div.view div.up").click(function() {
        if($("div#media div.data > div.cage div.view:not(:animated)").size() == 1) {
            switchScroll(false, targets);
        }
    });
}
/* Evènements des galeries */
function doGalleryEvents() {
    /* Changement d'image */
    $("div#gallery div.infos ul li").click(function() {
        if(!$(this).hasClass("selected")) {
            switchPicture($(med).find("view#" + $("div#media div.data div.cage div.links ul li.selected").attr("id")), $(this));
        }
    });
}

/* Evènements des médias */
function doMediaEvents() {
    doZoomingEvents();
    doViewEvents();
    doMediaScrollingEvents();
    
    /* Dépendances */
    if($("div#gallery").size() > 0) {
        doGalleryEvents();
    }
}

