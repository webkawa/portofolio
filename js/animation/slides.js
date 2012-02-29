/* 
    slides.js
    ---------
    Comportements liés aux slides.
 */

/* Effectue une transition de slide */
function switchSlide(origin, destination) {
    /* Injection */
    injectPage(destination, "Lorem");
    
    /* Variables utiles */
    var oprop = slideProperties(origin);                                        /* Propriétés du slide ouvert */
    var dprop = slideProperties(destination);                                   /* Propriétés du slide à ouvrir */
    var slides = $("div#page div.slide");                                       /* Liste des slides */
    var direction = $(slides).index(destination) > $(slides).index(origin);     /* Sens de navigation : true pour droite, false pour gauche */
    var space = $(origin).outerWidth(true) + $(destination).outerWidth(true);   /* Espace total occupé */
    var duration, easing;                                                       /* Informations sur le mouvement */
    var lcore = $(origin).find("div.spacer div.core");                          /* Coeur fermant */
    var lcoreminw = parseInt($(lcore).css("min-width"));                        /* Largeur minimale du coeur fermant */
    var lcoremaxw = parseInt($(lcore).css("max-width"));                        /* Largeur maximale du coeur fermant */
    var icore = $(destination).find("div.spacer div.core");                     /* Coeur ouvrant */
    var icoreminw = parseInt($(icore).css("min-width"));                        /* Largeur minimale du coeur ouvrant */
    var icoremaxw = parseInt($(icore).css("max-width"));                        /* Largeur maximale du coeur ouvrant */
    var spacer = $(origin).children("div.spacer");                              /* Espacement du contenu fermant */
    var core = $(spacer).children("div.core");                                  /* Coeur du contenu fermant */

    /* Taggage du slide entrant */
    $(destination).toggleClass("close");
    $(destination).addClass("open");
    
    /* Mise à jour de l'arrière-plan (tweak) */
    $("div#page").css("background-color", $(destination).css("background-color"));
    
    /* Actions spécifiques à chaque sens */
    if (direction) {
        /* Création de la marge */
        $(destination).children("div.spacer").css("margin-right", (dprop.width - $(core).outerWidth(true)) + "px");
        
        /* Informations sur le mouvement */
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
        
        /* Création de la marge */
        $(origin).children("div.spacer").css("margin-right", ($(spacer).width() - $(core).outerWidth(true)) + "px");
        
        /* Informations sur le mouvement */
        duration = $(co).find("transitions slides prev duration").text();
        easing = $(co).find("transitions slides prev easing").text();
    }
    console.log("----");
    /* Mouvement */
    var lbuff, ibuff;
    $(origin).animate({
        "max-width" : $(origin).css("min-width")
    },{
        "duration" : parseInt(duration),
        "easing" : easing,
        "step" : function(now) {
            /* Apparition et disparition des contenus */
            lbuff = $(lcore).width();
            ibuff = $(icore).width();
            $(icore).css("opacity", ibuff / (icoremaxw - icoreminw));
            $(lcore).css("opacity", lbuff / (lcoremaxw - lcoreminw));
            console.log(ibuff / (icoremaxw - icoreminw));
            /* Taille du slide ouvrant */
            realMaxWidth($(destination), space - now - widthAdd(origin));
        },
        "complete" : function() {
            /* Taggage du slide sortant */
            $(origin).toggleClass("open");
            $(origin).addClass("close");
            
            /* Actions spécifiques au déplacement droit */
            if(direction) {
                /* Déplacement */
                $(destination).remove();
                $("div#page div.slide.left:last").after(destination);
        
                /* Changement de coté */
                $(destination).toggleClass("right");
                $(destination).addClass("left");
        
                /* Calcul de la taille */
                realMaxWidth($(destination), $("div#page").width() - dprop.lmargin - dprop.rmargin);
            }
            
            /* Nettoyage */
            cleanupPage();
            
            /* Ré-inscription des évènements */
            doNavigationEvents();
        }
    });
} 
