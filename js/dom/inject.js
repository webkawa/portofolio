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
function injectPage(target, dom) {
    /* Création du contenu entrant */
    var data = 
        $('<div class="spacer">' +
            '<div class="core" style="opacity: 0;">' +
                '<div class="scroller">' +
                    dom +
                '</div>' +
            '</div>' +
        '</div>');
    
    
    /* Ajout au conteneur */
    $(target).append($(data));
    
    /* Affectation de la taille */
    realHeight($(data), $("div#page").height());
    
}