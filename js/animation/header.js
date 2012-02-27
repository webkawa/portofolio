/* 
    header.js
    ---------
    Ensemble de fonctions d'animation liées à l'en-tête.
 */

/* Changement de titre */
function switchTitle(data, target) {
    /* Injection */
    injectTitle(data.title, data.subtitle);

    /* Variables utiles */
    var ltitle = $("div#header div.title.leaving");                 /* Titre sortant */
    var ititle = $("div#header div.title.incoming");                /* Titre entrant */
    var space;                                                      /* Espace disponible */
    var duration = $(co).find("transitions title duration").text(); /* Vitesse */
    var easing = $(co).find("transitions title easing").text();     /* Courbe */
    var iprop = slideProperties(target);                            /* Propriétés du slide arrivant */
    
    /* Animation des marges */
    $("div#header").animate({
        "padding-left" : iprop.lmargin + "px",
        "padding-right" : iprop.rmargin + "px"
    },{
        "duration" : parseInt(duration),
        "easing" : easing
    });
    
    /* Animation du titre */
    $(ltitle).animate({
        "max-width" : "0px"
    },{
        "duration"  : parseInt(duration),
        "easing"    : easing,
        "step"      : function(now) {
            /* Recherche de l'espace disponible */
            space = $("div#header").width() - now; 
            
            /* Mise à jour de l'opacité */
            $(ltitle).css("opacity", now / space);
            
            /* Mise à jour du titre entrant */
            $(ititle).css("max-width", space)
        },
        "complete"  : function() {
            /* Nettoyage */
            cleanupTitle();
        }
    });
}
