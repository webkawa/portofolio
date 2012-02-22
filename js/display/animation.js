/*  animation.js
 *  ------------
 *  Liste des fonctions graphiques liées à l'animation.
 *  A charger après l'initialisation de la page et des variables avenantes. */

/* Actualise la taille du titre entrant */
function refreshTitleIncoming() {
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
    injectTitle("div#header > div.title");
    
    /* Animations */
    $("div#header > div.leaving").animate({
        "opacity"   : "0",
        "min-width" : "0px",
        "width"     : "0px"
    },{
        "duration"  : parseInt(s),
        "easing"    : e,
        "step"      : function() {
            refreshTitleIncoming();
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
            refreshTitleIncoming();
        },
        "complete"  : function() {
            $("div#header > div.leaving").remove();
            $("div#header > div.incoming").toggleClass("incoming");
            $("div#header > div.title").css("width", p.width + "px");
        } 
    });
}

/* Actualise le contenu d'un slide en train de disparaître */
function refreshSlideLeaving(slide, opacity_start, opacity_end) {
    /* Variables utiles */
    var core = $(slide).children("div.core");
    
    /* Traitement */
    if($(core).outerWidth(true) > $(slide).width()) {
        /* Variables spécifiques */
        var y = $(slide).width() - ($(core).outerWidth(true) - $(core).width());
        console.log("lol " + (($(slide).width() - opacity_end) / opacity_start));
        var z = Math.min((($(slide).width() - opacity_end) / opacity_start), 1);
        
        /* Application */
        $(core).css({
            "width"     : y + "px",
            "opacity"   : z
        });
    }
}
/* Affiche le slide suivant */
function switchSlideNext(slide, next) {
    /* Positionnement du slide suivant */
    var p = centralSlideProperties(next);
    
    /* Variables de configuration */
    var l = $(co).find("slides > width > left").text();
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease").text();
    var os = $(co).find("page > transition > core > fade > start").text();
    var oe = $(co).find("page > transition > core > fade > end").text();
    
    /* Variables standard */
    var x = 0;
    
    /* Injection du contenu */
    injectCore(next);
    
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
            
            /* Animation des contenus entrants et sortants */
            refreshSlideLeaving($(slide), parseInt(os), parseInt(oe));
            //refreshSlideCore($(next), w);
        },
        "complete"  : function() {
            /* Mise à jour du slide suivant */
            $(next).css({
                "left"  : p.left + "px",
                "right" : "auto"
            });
            
            /* Mise à jour du slide en cours */
            $(slide).css({
                "width" : l + "px"
            });
            $(slide).children("div.core").remove();
                
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
    var os = $(co).find("page > transition > core > fade > start").text();
    var oe = $(co).find("page > transition > core > fade > end").text();
    
    /* Variables standard */
    var x = 0;
    
    /* Injection du contenu */
    injectCore(prev);
    
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
            /* Mise à jour du slide ouvert */
            x = pp.width - (now - parseInt(r));
            $(prev).css("width", Math.ceil(x) + "px");
            
            /* Animation des contenus entrants et sortants */
            refreshSlideLeaving($(slide), parseInt(os), parseInt(oe));
            //refreshSlideCore($(prev), w);
        },
        "complete"  : function() {
            /* Mise à jour du slide précédent */
            $(prev).css("width", pp.width + "px");
                
            /* Suppression du coeur en trop */
            $(slide).children("div.core").remove();
                
            /* Changement de classe */
            $(prev).addClass("selected");
        }
    });
}

/* Change le slide en cours */
function switchSlide(slide, direction) {
    /* Animation du titre */
    switchTitle(slide);
    
    /* Animation du slide */
    if(direction) {
        switchSlideNext($(slide).prev(), slide);
    } else {
        switchSlidePrev($(slide).next(), slide);
    }
}