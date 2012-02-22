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
    
    /* Variables de configuration */
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease > next").text();
    
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

/* Affiche le slide suivant */
function switchSlideNext(slide, next) {
    /* Positionnement du slide suivant */
    var p = centralSlideProperties(next);
    
    /* Variables de configuration */
    var l = $(co).find("slides > width > left").text();
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease > next").text();
    var fistart = $(co).find("page > core > transition > fadein > right").text();
    var fistop = $(co).find("page > core > transition > fadein > left").text();
    var fostart = $(co).find("page > core > transition > fadeout > right").text();
    var fostop = $(co).find("page > core > transition > fadeout > left").text();
    
    /* Variables standard */
    var lcore = $(slide).children("div.core");
    var x = 0;
    var y;
    var z = $(lcore).outerWidth(true) - $(lcore).width();
    
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
            x = p.width - now;
            y = parseInt(l) + x;
            $(slide).css("width", Math.ceil(y) + "px");
            
            /* Animation du contenu sortant */
            $(slide).children("div.core").css({
                "max-width" : (p.width - z - now) + "px",
                "opacity"   : Math.min((x - fostop) / fostart, 1)
            });
            
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
    var e = $(co).find("slides > transition > ease > prev").text();
    var fostart = $(co).find("page > core > transition > fadeout > left").text();
    var fostop = $(co).find("page > core > transition > fadeout > right").text();
    
    /* Variables standard */
    var lcore = $(slide).children("div.core");
    var x = 0;
    var y;
    
    /* Injection du contenu */
    injectCore(prev);
    
    /* Modification du slide en cours */
    $(slide).css({
        "left"          : "auto",
        "right"         : pc.right + "px"
    });
    $(slide).toggleClass("selected");
    
    /* Modification du contenu pour disparition */
    $(slide).children("div.core").css("margin-right", "0px");
    $(slide).children("div.core").css({
        "right"         :  "0px",
        "margin-right"  : $(slide).width() - $(slide).children("div.core").outerWidth(true) + "px"
    });
    var z = $(lcore).outerWidth(true) - $(lcore).width();
    
    /* Animation du slide précédent */
    $(slide).animate({
        "width"         : r + "px"
    },{
        "duration"      : parseInt(s),
        "easing"        : e,
        "step"          : function(now) {
            /* Mise à jour du slide ouvert */
            x = now - parseInt(r);
            y = pp.width - x;
            $(prev).css("width", Math.ceil(y) + "px");
            
            /* Animation du contenu sortant */
            $(lcore).css({
                "width"     : (now - z) + "px",
                "opacity"   : 1 - Math.max((y - fostart) / fostop, 0)
            });
        },
        "complete"      : function() {
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