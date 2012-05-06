/* 
    header.js
    ---------
    Ensemble de fonctions d'animation liées à l'en-tête.
 */

/* Changement de titre */
function switchTitle(target) {
    /* Injection */
    injectTitle();

    /* Variables utiles */
    var spacer = $("div#header div.spacer");                        /* Gestionnaire d'espacement */
    var ltitle = $("div#header div.spacer div.title.leaving");      /* Titre sortant */
    var ititle = $("div#header div.spacer div.title.incoming");     /* Titre entrant */
    var space;                                                      /* Espace disponible */
    var duration = $(co).find("transitions title duration").text(); /* Vitesse */
    var easing = $(co).find("transitions title easing").text();     /* Courbe */
    var infos = slideProperties(target);
    
    /* Animation des marges */
    $(spacer).animate({
        "padding-left" : infos.lmargin + "px",
        "padding-right" : infos.rmargin + "px"
    }, {
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
            space = $(spacer).width() - now - 0.1;
            
            /* Mise à jour de l'opacité */
            $(ltitle).css("opacity", now / space);
            
            /* Mise à jour du titre entrant */
            $(ititle).css("max-width", space + "px")
        },
        "complete"  : function() {
            /* Attribution de la valeur finale */
            $(ititle).css("max-width", $(spacer).width() + "px")
            
            /* Nettoyage */
            cleanupTitle();
        }
    });
}
