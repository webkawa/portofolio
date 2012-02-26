/* 
    slides.js
    ---------
    Comportements liés aux slides.
 */

/* Effectue une transition de slide */
function switchSlide(origin, destination) {
    /* Variables utiles */
    var oprop = slideProperties(origin);                                        /* Propriétés du slide ouvert */
    var dprop;                                                                  /* Propriétés du slide à ouvrir */
    var slides = $("div#page div.slide");                                       /* Liste des slides */
    var direction = $(slides).index(destination) > $(slides).index(origin);     /* Sens de navigation : true pour droite, false pour gauche */
    var space = $(origin).outerWidth(true) + $(destination).outerWidth(true);   /* Espace total occupé */
    var target, side, duration, easing;                                         /* Cible du mouvement */
    
    /* Taggage du slide entrant */
    $(destination).toggleClass("close");
    $(destination).addClass("open");
    
    /* Actions spécifiques à chaque sens */
    if (direction) {
        /* Affectation de la cible */
        target = origin;
        side = destination;
        duration = $(co).find("transitions slides next duration").text();
        easing = $(co).find("transitions slides next easing").text();
    } else {
        /* Déplacement */
        $(origin).remove();
        $("div#page div.slide:last").after(origin);
        
        /* Changement de coté */
        $(origin).toggleClass("left");
        $(origin).addClass("right");
        
        /* Calcul de la taille */
        realMaxWidth($(origin), $("div#page").width() - oprop.lmargin - oprop.rmargin);
        
        /* Affectation de la cible */
        target = destination;
        side = origin;
        duration = $(co).find("transitions slides prev duration").text();
        easing = $(co).find("transitions slides prev easing").text();
    }
    
    console.log(duration);
    
    /* Mouvement */
    $(target).animate({
        "max-width" : "0px"
    },{
        "duration" : duration,
        "easing" : easing,
        "step" : function(now) {
            realMaxWidth($(side), space - now - widthAdd(target));
        },
        "complete" : function() {
            /* Taggage du slide sortant */
            $(origin).toggleClass("open");
            $(origin).addClass("close");
            
            if(destination) {
                /* Déplacement */
                $(destination).remove();
                $("div#page div.slide.left:last").after(destination);
        
                /* Changement de coté */
                $(destination).toggleClass("right");
                $(destination).addClass("left");
        
                /* Calcul de la taille */
                dprop = slideProperties(destination);
                realMaxWidth($(destination), $("div#page").width() - dprop.lmargin - dprop.rmargin);
            }
        }
    });
}
