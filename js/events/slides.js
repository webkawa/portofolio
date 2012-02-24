/*  slides.js
 *  ------------
 *  Liste des fonctions graphiques liées à l'animation des slides.
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
    $("div#header > div.title:not(div.incoming)").addClass("leaving");
    
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
    
    /* Variables utiles */
    var lcore = $(slide).children("div.core");
    var icore = $(next).children("div.core");
    var mlcore = $(lcore).outerWidth(true) - $(lcore).width();
    var fostart = parseInt($(lcore).css("margin-left")) + $(lcore).outerWidth(false);
    var fostop = parseInt(l) + mlcore;
    
    /* Variables standard */
    var x = 0, y, z = 1;
    
    /* Mise à jour du slide en cours */
    $(slide).toggleClass("selected");
    
    /* Modification du contenu pour apparition */
    $(icore).css({
        
    });
    
    /* Animation du slide suivant */
    $(next).animate({
        "width"     : p.width - 1
    }, {
        "duration"  : parseInt(s),
        "easing"    : e,
        "step"      : function(now) {
            /* Taille du contenu sortant */
            x = p.width - now;
            y = parseInt(l) + x;
            $(slide).css("width", Math.ceil(y) + "px");
            
            /* Animation du contenu sortant */
            if(x < fostart && z != 0) {
                z = (x - fostop) / fostart; 
                if (z < 0) {
                    z = 0;
                }
            }
            $(lcore).css({
                "max-width" : (p.width - mlcore - now) + "px",
                "opacity"   : z
            });
            
            /* Animation du contenu entrant */
            $(icore).css({
                "opacity"   : 1 - z
            });
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
    
    /* Variables utiles */
    var lcore = $(slide).children("div.core");
    var icore = $(prev).children("div.core");
    var micore = $(icore).outerWidth(true) - $(icore).width();
    
    /* Variables standard */
    var x = 0, y, z = 1;
    
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
    var mcore = $(lcore).outerWidth(true) - $(lcore).width();
    var mllcore = parseInt($(lcore).css("margin-left"));
    var fostop = mcore;
    
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
            if(z != 0) {
                z = (x + mllcore - fostop) / (pc.width - fostop);
                if(z < 0) {
                    z = 0;
                }
            }
            $(lcore).css({
                "width"     : (now - mcore) + "px",
                "opacity"   : z
            });
            
            /* Animation du contenu entrant */
            $(icore).css({
                "max-width" : Math.max((pp.width - micore - x), 0) + "px",
                "opacity"   : 1 - z
            });
            /*console.log(pp.width + " " + micore + " " + now + " " + r);
            if (pp.width - micore - now > 0) {
                console.log("plop : " + pp.width + " " + micore + " " + now);
            }*/
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
    injectTitle("div#header > div.title");
    switchTitle(slide);
    
    /* Animation du slide */
    injectCore(slide);
    if(direction) {
        switchSlideNext($(slide).prev(), slide);
    } else {
        switchSlidePrev($(slide).next(), slide);
    }
}