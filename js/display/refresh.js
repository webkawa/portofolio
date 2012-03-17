/* 
    refresh.js
    ----------
    Ensemble des fonctions liées au rafraichissement de la fenêtre.
 */

/* Taille de la police du titre */
function refreshTitleSize(target) {
    /* Variables utiles */
    var ih1 = $(target).children("h1");                     /* Titre */
    var ip = $(target).children("p");                       /* Sous-titre */
    
    /* Dimensionnement de la police */
    if($(ip).size() != 0) {
        fontHeight(ih1, $("div#header").height() - $(ip).outerHeight(true));
    } else {
        fontHeight(ih1, $("div#header").height());
    }
}

/* Rafraichissement du titre */
function refreshTitle(target) {
    /* Largeur */
    $(target).css("max-width", $("div#header").width());
    
    /* Police */
    refreshTitleSize(target);
}

/* Rafraichissement de la page */
function refreshPage() {
    /* Variables utiles */
    var wheight = $(window).height();                               /* Hauteur de la fenêtre */
    var hheight = $("div#header").outerHeight(true);                /* Hauteur de l'en-tête */
    var fheight = $("div#footer").outerHeight(true);                /* Hauteur du pied de page */
    var pwidth = $("div#page").width();                             /* Largeur de la page */
    var csprop = slideProperties($("div#page div.slide.open"));     /* Propriétés du slide ouvert */
    
    /* Hauteur de la page */
    realHeight("div#page", wheight - hheight - fheight);
    
    /* Hauteur des slides */
    realHeight("div#page div.slide", $("div#page").height());
    
    /* Largeur du slide ouvert */
    realMaxWidth("div#page div.slide.open", pwidth - csprop.lmargin - csprop.rmargin)
    
    /* Hauteur du gestionnaire d'espacement */
    realHeight("div#page div.slide > div.spacer", $("div#page").height());
}

/* Rafraichissement du cœur de page */
function refreshCore() {
    /* Variables utiles */
    var sheight = $("div#page div.spacer div.core").height();
    
    /* Hauteur des fenêtres de contenu et médias */
    realHeight("div#content", sheight);
    realHeight("div#media", sheight);
}

/* Rafraichissement du contenu */
function refreshContent() {
    /* Variables utiles */
    var content = $("div#content");
    var cage = $("div#content > div.cage");
    var scroller = $("div#content > div.cage div.scroller");
    var scrollbar = $("div#content > div.cage div.scrollbar");
    var scrollzone = $("div#content > div.cage div.scrollbar div.scrollzone");
    var marker = $("div#content > div.cage div.scrollbar div.scrollzone div.marker");
    
    /* Hauteur de la zone contenu */
    var cheight = $(content).height();
    realHeight(cage, cheight);
    var sbheight = $(scrollbar).height();
    var diffscroll = Math.max($(scroller).height() - $(content).height(), 0);
    var diffmarker = $(scrollzone).height() - $(marker).height();
    realHeight(scrollzone, sbheight);
    $(marker).css({
        "height" : (markerSize(cage, scroller, scrollzone)) + "px",
        "top" : markerMargin(parseInt($(scroller).css("margin-top")), diffscroll, diffmarker)
    });
}

/* Rafraichissement de la carte */
function refreshMap() {
    if(global_map != null) {
        google.maps.event.trigger(global_map, 'resize');
    }
}
/* Rafraichissement de la gallerie */
function refreshGallery() {
    if($("div#gallery").size() > 0) {
        realHeight($("div#gallery div.picture"), $("div#gallery").height());
        realMaxHeight($("div#gallery div.picture img"), $("div#gallery div.picture").height());
        realMaxWidth($("div#gallery div.picture img"), $("div#gallery div.picture").width());
        $("div#gallery div.picture").css("line-height", $("div#gallery div.picture").height() + "px");
    }
}
/* Rafraichissement des médias */
function refreshMedia() {
    /* Variables utiles */
    var media = $("div#media");
    var mediatitle = $("div#media div.title");
    var mediah3 = $("div#media div.title h3");
    var mediadata = $("div#media div.data");
    var mediacage = $("div#media div.data div.cage");
    var mediaview = $("div#media div.data div.cage div.view");
    var medianotes = $("div#media div.notes");
    
    /* Hauteurs de la zone média */
    realHeight(mediadata, $(media).height() - $(mediatitle).outerHeight(true) - $(medianotes).outerHeight(true));
    realHeight(mediacage, $(mediadata).height());
    realHeight(mediaview, $(mediadata).height());
    
    /* Taille du titre */ 
    if($(mediah3).size() > 0) {
        fontHeight($(mediatitle).find("h3"), $(mediatitle).height() - $(mediatitle).find("p").outerHeight(true)); 
    }
    
    /* Dépendances */
    refreshMap();
    refreshGallery();
}

/* Rafraichissement général */
function refresh() {
    refreshTitle($("div#header div.title"));
    refreshPage();
    refreshCore();
    refreshContent();
    refreshMedia();
}
