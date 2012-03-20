/* 
    inject.js
    ---------
    Fonctions utiles à l'injection de code dans le DOM.
 */

/* Initialise la page */
function init() {
    
}

/* Création d'un titre */
function injectTitle(title, subtitle) {
    /* Mise à jour du contenu sortant */
    $("div#header div.title").addClass("leaving");
    
    /* Création du contenu entrant */
    var opt = '';
    if(subtitle != null) {
        opt = '<p>' + subtitle + '</p>';
    }
    var data = 
        '<div class="title incoming">' +
            '<h1>' + title + '</h1>' +
            opt +
        '</div>';
    $(data).insertAfter("div#header div.title.leaving");
    
    /* Rafraichissement du titre entrant */
    refreshTitleSize($("div#header div.title.incoming"));
}

/* Création d'une page */
function injectPage(target) {
    /* Création du contenu entrant */
    var data = 
        $('<div class="spacer">' +
            '<div class="core" style="opacity: 0;"></div>' +
        '</div>');
    
    /* Création des coins */
    addCorners($(data).children("div.core"), "medium");
    
    /* Ajout au conteneur */
    $(target).append($(data));
    
    /* Affectation de la taille */
    realHeight($(data), $("div#page").height());
}

/* Création d'un coeur de page */
function injectContent(target, dom) {
    /* Création du contenu */
    var data =
        $('<div id="content" style="opacity: 0">' +
            '<div class="cage">' +
                '<div class="scroller">' +
                    dom +
                '</div>' +
                '<div class="scrollbar">' +
                    '<div class="scrollzone">' +
                        '<div class="marker"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Décoration de la scrollbar */
    addDecoration($("div#content div.scrollbar"), "corner", "tc", "small");
    addDecoration($("div#content div.scrollbar"), "corner", "bc", "small");
    
    /* Variables utiles */
    var core = $("div#page div.slide > div.spacer div.core");
    var content = $("div#content");
    var cage = $("div#content > div.cage");
    var scroller = $("div#content > div.cage div.scroller");
    var scrollbar = $("div#content > div.cage div.scrollbar");
    var scrollzone = $("div#content > div.cage div.scrollbar div.scrollzone");
    var marker = $("div#content > div.cage div.scrollbar div.scrollzone div.marker");
    
    /* Affectation des tailles */
    realHeight(content, $(core).height());
    realHeight(cage, $(content).height());
    realHeight(scrollzone, $(scrollbar).height());
    realHeight(marker, markerSize(cage, scroller, scrollzone));
}

/* Création de la zone média */
function injectMedia(target, dom) {
    /* Création du contenu */
    var data =
        $('<div id="media" class="small" style="opacity: 0">' +
            '<div class="loader"></div>' +
            '<div class="title"></div>' +
            '<div class="data">' +
                '<div class="cage">' +
                    '<div class="links">' +
                        '<ul>' +
                            '<li>a</li>' +
                            '<li>b</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="view">' +
                        ' aa' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="notes">' +
                '<div class="spacer">' +
                    '<p>Pas de m&eacute;dia affich&eacute;</p>' +
                '</div>' +
            '</div>' +
        '</div>');
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Variables utiles */
    var media = $("div#media");
    var mediatitle = $("div#media div.title");
    var mediadata = $("div#media div.data");
    var mediacage = $("div#media div.data > div.cage");
    var mediaview = $("div#media div.data > div.cage div.view");
    var medianotes = $("div#media div.notes");
    
    /* Ajout des décorations */
    addDecoration($(mediatitle), "border", "bc", "small");
    addDecoration($(medianotes), "border", "tc", "small");
    
    /* Hauteur de la zone média */
    realHeight(mediadata, $(media).height() - $(mediatitle).outerHeight(true) - $(medianotes).outerHeight(true));
    realHeight(mediacage, $(mediadata).height());
    realHeight(mediaview, $(mediacage).height());
}

/* Création d'une carte */
var global_map;
function injectMap(dom) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    
    /* Injection */
    $(target).append('<div id="map"></div>');
    
    /* Chargement de la carte */
    var options = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    global_map = new google.maps.Map(document.getElementById("map"), options)
}

/* Création d'une galerie */
function injectGallery(dom) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    
    /* Création de la galerie */
    var data =
        $('<div id="gallery">' +
            '<div class="picture">' +
                '<img />' +
            '</div>' +
            '<div class="infos">' +
                '<h4>Lorem ipsum</h4>' +
                '<p>Dolor sit amet</p>' +
                '<ul>' +
                    '<li id="fry" />' +
                    '<li id="zoidberg" class="selected" />' +
                    '<li id="bender" />' +
                '</ul>' +
            '</div>' +
        '</div>');
    
    /* Injection */
    $(target).append(data);
    
    /* Taille de la ligne */
    realHeight($("div#gallery div.picture"), $("div#gallery").height());
    realMaxHeight($("div#gallery div.picture img"), $("div#gallery div.picture").height());
    realMaxWidth($("div#gallery div.picture img"), $("div#gallery div.picture").width());
    $("div#gallery div.picture").css("line-height", $("div#gallery div.picture").height() + "px");
    
    /* Post-traitement (temporaire) */
    var img = $("div#gallery div.picture img");
    var selection = $("div#gallery div.infos ul li.selected");
    var icons = $("div#gallery div.infos ul li");
    
    $(icons).each(function() {
        $(this).css("background-image", "url('data/site/img/" + $(this).attr("id") +"_small.png')");
    });
    $(img).attr("src", "data/site/img/" + $(selection).attr("id") +".png");
}