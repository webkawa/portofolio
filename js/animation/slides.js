/* 
    slides.js
    ---------
    Comportements liés aux slides.
 */

/* Effectue une transition de slide */
function switchSlide(origin, destination) {
    /* Injection */
    injectPage(destination);
    
    /* Variables utiles */
    var oprop = slideProperties(origin);                                        /* Propriétés du slide ouvert */
    var dprop = slideProperties(destination);                                   /* Propriétés du slide à ouvrir */
    var slides = $("div#page div.slide");                                       /* Liste des slides */
    var direction = $(slides).index(destination) > $(slides).index(origin);     /* Sens de navigation : true pour droite, false pour gauche */
    var space = $(origin).outerWidth(true) + $(destination).outerWidth(true);   /* Espace total occupé */
    var duration, easing;                                                       /* Informations sur le mouvement */
    var lspacer = $(origin).children("div.spacer");                              /* Espacement du contenu fermant */
    var lcore = $(origin).find("div.spacer div.core");                          /* Coeur fermant */
    var lcoreminw = parseInt($(lcore).css("min-width"));                        /* Largeur minimale du coeur fermant */
    var lcoremaxw = parseInt($(lcore).css("max-width"));                        /* Largeur maximale du coeur fermant */
    var icore = $(destination).find("div.spacer div.core");                     /* Coeur ouvrant */
    var icoreminw = parseInt($(icore).css("min-width"));                        /* Largeur minimale du coeur ouvrant */
    var icoremaxw = Math.min(parseInt($(icore).css("max-width")), dprop.width); /* Largeur maximale du coeur ouvrant */
    var margin;                                                                 /* Marge ajoutée pour la transition */
    var waiter = $(co).find("transitions core duration").text();                /* Temps de transition du cœur */

    /* Taggage du slide entrant */
    $(destination).toggleClass("close");
    $(destination).addClass("open");
    
    /* Mise à jour de l'arrière-plan (tweak) */
    $("div#page").css("background-color", $(destination).css("background-color"));
    
    /* Actions spécifiques à chaque sens */
    if (direction) {
        /* Création de la marge */
        margin = dprop.width - $(lcore).outerWidth(true) - parseInt($(destination).css("min-width"));
        $(destination).children("div.spacer").css("margin-right", margin + "px");
        
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
        margin = $(lspacer).width() - $(lcore).outerWidth(true);
        $(origin).children("div.spacer").css("margin-right", margin + "px");
        
        /* Informations sur le mouvement */
        duration = $(co).find("transitions slides prev duration").text();
        easing = $(co).find("transitions slides prev easing").text();
    }
    
    /* Dissimulation du coeur sortant */
    hideCore();
    
    /* Mouvement */
    var lbuff, ibuff, tbuff = $(icore).width();
    $(origin).delay(parseInt(waiter)).animate({
        "max-width" : $(origin).css("min-width")
    },{
        "duration" : parseInt(duration),
        "easing" : easing,
        "step" : function(now) {
            /* Apparition et disparition des contenus */
            ibuff = $(icore).width();
            if(ibuff != tbuff) {
                lbuff = $(lcore).width();
                $(icore).css("opacity", ibuff / (icoremaxw - icoreminw));
                $(lcore).css("opacity", lbuff / (lcoremaxw - lcoreminw));
            }
            
            /* Taille du slide ouvrant */
            realMaxWidth($(destination), space - now - widthAdd(origin));
        },
        "complete" : function() {
            /* Taggage du slide sortant */
            $(origin).toggleClass("open");
            $(origin).addClass("close");
            
            /* Gestion de l'opacité du contenu entrant */
            $(icore).css("opacity", "1");
            
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
                
                /* Suppression de la marge */
                $(destination).children("div.spacer").css("margin-right", "auto");
            }
            
            /* Nettoyage */
            cleanupPage();
            
            /* Affichage du contenu */
            showCore($(icore));
            
            /* Ré-inscription des évènements */
            doNavigationEvents();
        }
    });
}