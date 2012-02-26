/* 
    header.js
    ---------
    Ensemble de fonctions d'animation liées à l'en-tête.
 */

/* Changement de titre */
function switchTitle(title, subtitle) {
    /* Injection */
    injectTitle(title, subtitle);

    /* Variables utiles */
    var ltitle = $("div#header div.title.leaving");         /* Titre sortant */
    var ititle = $("div#header div.title.incoming");        /* Titre entrant */
    var space = $("div#header").width();                    /* Espace disponible */
    
    /* Animation */
    $(ltitle).animate({
        "max-width" : "0px"
    },{
        "duration"  : $(co).find("transition title duration").text(),
        "easing"    : $(co).find("transition title easing").text(),
        "step"      : function(now) {
            /* Mise à jour du titre entrant */
            $(ititle).css("max-width", space - now)
        },
        "complete"  : function() {
            /* Nettoyage */
            cleanupTitle();
        }
    });
}
