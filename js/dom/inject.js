/* 
    inject.js
    ---------
    Fonctions utiles à l'injection de code dans le DOM.
 */

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
            '<div class="scroller">' +
                dom +
            '</div>' +
            '<div class="scrollbar">' +
                '<div class="scrollzone">' +
                    '<div class="marker"></div>' +
                '</div>' +
            '</div>' +
        '</div>');
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Décoration de la scrollbar */
    addDecoration($("div#content div.scrollbar"), "corner", "tc", "small");
    addDecoration($("div#content div.scrollbar"), "corner", "bc", "small");
    
    /* Variables utiles */
    var content = $("div#content");
    var core = $("div#page div.spacer div.core");
    var scroller = $("div#content div.scroller");
    var scrollbar = $("div#content div.scrollbar");
    var scrollzone = $("div#content div.scrollbar div.scrollzone");
    var marker = $("div#content div.scrollbar div.scrollzone div.marker");
    
    /* Affectation des tailles */
    realHeight(content, $(core).height());
    realHeight(scrollzone, $(scrollbar).height());
    realHeight(marker, markerSize(content, scroller, scrollzone));
}

/* Création du contenu */
function injectMedia(target, dom) {
    /* Création du contenu */
    var data =
        $('<div id="media" style="opacity: 0">' +
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
    var mediacage = $("div#media div.data div.cage");
    var mediaview = $("div#media div.data div.cage div.view");
    var medianotes = $("div#media div.notes");
    
    /* Ajout des décorations */
    addDecoration($(mediatitle), "border", "bc", "small");
    addDecoration($(medianotes), "border", "tc", "small");
    
    /* Hauteur de la zone média */
    realHeight(mediadata, $(media).height() - $(mediatitle).outerHeight(true) - $(medianotes).outerHeight(true));
    realHeight(mediacage, $(mediadata).height());
    realHeight(mediaview, $(mediacage).height());
}