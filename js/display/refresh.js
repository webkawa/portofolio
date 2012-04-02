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
    
    console.log(target);
    
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
    var sheight = $("div#page div.slide > div.spacer div.core").height();
    
    /* Hauteur des fenêtres de contenu et médias */
    realHeight("div#content", sheight);
    realHeight("div#media", sheight);
}

/* Rafraichissement du contenu */
function refreshContent() {
    /* Variables utiles */
    var core = $("div#page div.slide.open > div.spacer div.core");
    var content = $("div#content");
    var media = $("div#media");
    var cage = $("div#content > div.cage");
    var scroller = $("div#content > div.cage div.scroller");
    var scrollbar = $("div#content > div.cage div.scrollbar");
    var scrollzone = $("div#content > div.cage div.scrollbar div.scrollzone");
    var marker = $("div#content > div.cage div.scrollbar div.scrollzone div.marker");
    
    /* Calcul de la largeur */
    realMaxWidth(content, $(core).width() - $(media).outerWidth());
    
    /* Taille de la cage */
    realHeight(cage, $(content).height());
    realWidth(cage, $(content).width());
    
    /* Taille du scroller */
    realWidth(scroller, $(cage).width() - $(scrollbar).outerWidth());
    
    var sbheight = $(scrollbar).height();
    var diffscroll = Math.max($(scroller).height() - $(content).height(), 0);
    var diffmarker = $(scrollzone).height() - $(marker).height();
    realHeight(scrollzone, sbheight);
    $(marker).css({
        "height" : (markerSize(cage, scroller, scrollzone)) + "px",
        "top" : markerMargin(parseInt($(scroller).css("margin-top")), diffscroll, diffmarker)
    });
    
    /* Affichage du scroller */
    if($(cage).height() / $(scroller).height() > 1) {
        $(scrollbar).css("display", "none");
    } else {
        $(scrollbar).css("display", "block");
    }
}

/* Rafraichissement de la carte */
function refreshMap() {
    if(global_map != null) {
        try {
            google.maps.event.trigger(global_map, 'resize');
        } catch(err) {
            console.log("Error on map refresh");
        }
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
    var core = $("div#page div.slide.open > div.spacer div.core");
    var media = $("div#media");
    var mediatitle = $("div#media div.title");
    var mediah3 = $("div#media div.title h3");
    var mediadata = $("div#media div.data");
    var mediacage = $("div#media div.data div.cage");
    var mediaview = $("div#media div.data div.cage div.view");
    var medianotes = $("div#media div.notes");
    
    /* Hauteurs de la zone média */
    if($(media).hasClass("small")) {
        realWidth(media, $(core).height());
    }
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

/* Rafraichissement du message d'erreur */
function refreshError() {
    /* Variables utiles */
    var pheight = $(window).height();
    var cage = $("div#error > div.cage");
    var cheight = $(cage).outerHeight();
    
    /* Taille de la cage */
    $(cage).css({
        "margin-top" : Math.max(((pheight - cheight) / 2), 0) + "px"
    });
}

/* Rafraichissement général */
function refresh() {
    /* Dépendances */
    refreshTitle($("div#header div.title"));
    refreshPage();
    refreshCore();
    refreshMedia();
    refreshContent();
    refreshError();
    
    /* Variables utiles */
    var header = $("div#header");
    var hheight = $(header).outerHeight(false);
    var page = $("div#page");
    var pheight = $(page).outerHeight();
    var footer = $("div#footer");
    var fheight = $(footer).outerHeight();
    var wheight = $(window).height();
    
    /* Taille de l'en-tête */
    if(wheight > hheight + pheight + fheight) {
        $(header).css("padding-top", ((wheight - hheight - pheight - fheight) / 2) + "px");
    }
}
