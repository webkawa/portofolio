/*  animation.js
 *  ------------
 *  Liste des fonctions graphiques liées à l'animation.
 *  A charger après l'initialisation de la page et des variables avenantes. */

/* Affiche le titre suivant */
function switchTitle(slide) {
    /* Variables utiles */
    var p = centralSlideProperties(slide);
    
    /* Variables de configuration */
    var l = $(co).find("slides > width > left").text();
    var s = $(co).find("slides > transition > speed").text();
    var e = $(co).find("slides > transition > ease").text();
    
    /* Création du titre quittant */
    $("div#header > div").addClass("leaving");
    
    /* Création du titre remplaçant */
    $('<div class="incoming"><h1>Foo !</h1></div>').insertAfter("div#header > div");
    if (true) {
        $("<h2>Foofoo !</h2>").insertAfter("div#header > div.incoming > h1");
    }
    
    /* Calcul de la taille occupée par le titre */
    var y = $("div#header").height();
    if($("div#header > div.incoming > h2").size() == 0) {
        z = getFontSizeFor($("div#header > div.incoming > h1"), y);
    } else {
        z = getFontSizeFor($("div#header > div.incoming > h1"), y - $("div#header > div.incoming > h2").outerHeight());
    }
    $("div#header > div.incoming > h1").css("font-size", z + "px");
    
    /* Animation */
    $("div#header > div.leaving").animate({
            "opacity"   : "0",
            "width"     : "0px"
        },{
            "duration"  : parseInt(s),
            "easing"    : e,
            "step"      : function(now) {
                $("div#header > div.incoming").css("width", ($("div#header").width() - now) + "px");
            },
            "complete"  : function() {
                $("div#header > div.leaving").remove();
                $("div#header > div.incoming").toggleClass("incoming");
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
            x = parseInt(l) + (p.width - now);
            $(slide).css("width", Math.ceil(x) + "px");
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