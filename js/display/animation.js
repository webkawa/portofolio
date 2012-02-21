/*  animation.js
 *  ------------
 *  Liste des fonctions graphiques liées à l'animation.
 *  A charger après l'initialisation de la page et des variables avenantes. */

/* Calcule la taille du titre entrant */
function switchTitleIncoming() {
    /* Variables utiles */
    var x = $("div#page").width();
    var y = $("div#page > div.leaving").outerWidth(true) - x;
    
    /* Affectation */
    $("div#page > div.incoming").css("min-width", y + "px");
}
/* Affiche le titre suivant */
function switchTitle(slide) {
    /* Variables utiles */
    var p = centralSlideProperties(slide);
    var pl = centralSlideProperties("div#header > div.title");
    
    /* Variables de configuration */
    var l = $(co).find("slides > width > left").text();
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease").text();
    
    /* Variables générales */
    var b1 = 0;
    var b2 = 0;
    
    /* Création du titre quittant */
    $("div#header > div.title").addClass("leaving");
    
    /* Création du titre remplaçant */
    $('<div class="title incoming"><h1>Lorem ipsum dolor sit amet</h1></div>').insertAfter("div#header > div.title");
    if (true) {
        $('<p class="subtitle">Nulla cursus, dui ac congue </p>').insertAfter("div#header > div.incoming > h1");
    }
    
    /* Calcul de la taille occupée par le titre */
    var y = $("div#header").height();
    if($("div#header > div.incoming > p.subtitle").size() == 0) {
        z = getFontSizeFor($("div#header > div.incoming > h1"), y);
    } else {
        z = getFontSizeFor($("div#header > div.incoming > h1"), y - $("div#header > div.incoming > p.subtitle").outerHeight());
    }
    $("div#header > div.incoming > h1").css("font-size", z + "px");
    
    /* Animations */
    $("div#header > div.leaving").animate({
        "opacity"   : "0",
        "min-width" : "0px",
        "width"     : "0px"
    },{
        "duration"  : parseInt(s),
        "easing"    : e,
        "step"      : function() {
            switchTitleIncoming();
        }
    });
    $("div#header ").animate({
        "margin-left"   : p.left
    },{
        "duration"  : parseInt(s),
        "easing"    : e,
        "step"      : function() {
            b1 = parseFloat($("div#header").css("margin-left"));
            b2 = parseFloat($("div#header").css("margin-right"));
            $("div#header").css("width", ($(window).width() - (b1 + b2)) + "px");
            switchTitleIncoming();
        },
        "complete"  : function() {
            $("div#header > div.leaving").remove();
            $("div#header > div.incoming").toggleClass("incoming");
            $("div#header > div.title").css("width", p.width + "px");
        } 
    });
}

/* Affiche le slide suivant */
function switchSlideNext(slide, next) {
    /* Positionnement du slide suivant */
    var p = centralSlideProperties(next);
    
    /* Variables de configuration */
    var l = $(co).find("slides > width > left").text();
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease").text();
    
    /* Variables standard */
    var x = 0;
    
    /* Mise à jour du slide en cours */
    $(slide).toggleClass("selected");
    
    /* Animation du slide suivant */
    $(next).animate({
        "width"     : p.width
    }, {
        "duration"  : parseInt(s),
        "easing"    : e,
        "step"      : function(now) {
            /* Taille du contenu sortant */
            x = parseInt(l) + (p.width - now);
            $(slide).css("width", Math.ceil(x) + "px");
            
            /* Suppression du contenu
            if ($("page#core").width() < 1) {
                $(slide).remove("div#core");
            } */
        },
        "complete"  : function() {
            /* Mise à jour du style suivant */
            $(next).css({
                "left"  : p.left + "px",
                "right" : "auto"
            });
            
            /* Mise à jour du style en cours */
            $(slide).css({
                "width" : l + "px"
            });
                
            /* Changement de classe */
            $(next).addClass("selected");
        }
    })
}
/* Affiche le slide précédent */
function switchSlidePrev(slide, prev) {
    /* Positionnement des slides */
    var pc = centralSlideProperties(slide);
    var pp = centralSlideProperties(prev);
    
    /* Variables de configuration */
    var r = $(co).find("slides > width > right").text();
    var l = $(co).find("slides > width > left").text();
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease").text();
    
    /* Variables standard */
    var x = 0;
    
    /* Modification du slide en cours */
    $(slide).css({
        "left"  : "auto",
        "right" : pc.right + "px"
    });
    $(slide).toggleClass("selected");
    
    /* Animation du slide précédent */
    $(slide).animate({
        "width"     : r + "px"
    },{
        "duration"  : parseInt(s),
        "easing"    : e,
        "step"      : function(now) {
            x = pp.width - (now - parseInt(r));
            $(prev).css("width", Math.ceil(x) + "px");
        },
        "complete"  : function() {
            /* Mise à jour du slide précédent */
            $(prev).css("width", pp.width + "px");
                
            /* Changement de classe */
            $(prev).addClass("selected");
        }
    });
}

/* Change le slide en cours */
function switchSlide(slide, direction) {
    switchTitle(slide);
    if (direction) {
        switchSlideNext($(slide).prev(), slide);
    } else {
        switchSlidePrev($(slide).next(), slide);
    }
}