/* 
    media.js
    --------
    Animations liées aux médias.
 */

/* Modifie le média en cours */
function switchMedia() {
    /* Variables utiles */
    var media = $("div#media");
    var initiallayer = $("div#media div.layer");
    var loader = $("div#media div.loader");
    var mediacomponents = $("div#media div.data > div.cage, div#media div.title h3, div#media div.title p, div#media div.notes div.spacer p");
    var durationin = $(co).find("navigation media switch in duration").text();
    var easingin = $(co).find("navigation media switch in easing").text();
    var durationout = $(co).find("navigation media switch out duration").text();
    var easingout = $(co).find("navigation media switch out easing").text();
    var multi = parseInt($(co).find("navigation media switch multi").text());
    var medwidth = $(media).width();
    var minwidth = parseInt($(loader).css("min-width"));
    var maxwidth = medwidth;
    var backmargin = parseInt($(mediacomponents).css("margin-left"));
    
    /* Animation */
    $(loader).animate({
        "width" : maxwidth + "px"
    },{
        "duration" : parseInt(durationin),
        "easing" : easingin,
        "step" : function(now) {
            $(mediacomponents).css("margin-left", ((multi * (now - minwidth)) + backmargin)  + "px");
            realWidth(initiallayer, medwidth - now);
        }, 
        "complete" : function() {
            /* Nettoyage et injection */
            cleanupMedia();
            injectMedia($("div#content").parent(), med);
            
            /* Rafraichissement des composants */
            media = $("div#media");
            loader = $("div#media div.loader");
            mediacomponents = $("div#media div.data > div.cage, div#media div.title h3, div#media div.title p, div#media div.notes div.spacer p");
            
            /* Mise à jour des styles */
            $(media).css("opacity", "inherit");
            $(loader).css("width", maxwidth + "px");
            
            /* Animation de retour */
            $(loader).animate({
                "width" : minwidth + "px"
            },{
                "duration" : parseInt(durationout),
                "easing" : easingout,
                "step" : function(now) {
                    $(mediacomponents).css("margin-left", (multi * (now - minwidth)) + backmargin + "px");
                    refreshGallery();
                }, 
                "complete" : function() {
                    /* Rétablissement de la taille en pixels */
                    $(loader).css("width", minwidth + "px");
                    
                    /* Réinscription des évènements */
                    doMediaEvents();
                    doFormEvents();
                    
                    /* Rafraichissement des sous-composants */
                    refreshMap();
                    refreshText();
                }
            });
        }
    });
}

/* Zoome sur le média en cours */
function switchZoom(direction) {
    /* Variables utiles */
    var core = $("div#page div.slide.open > div.spacer div.core");
    var content = $("div#content");
    var media = $("div#media");
    var mediaview = $("div#media div.data > div.cage div.view");
    var initiallayer = $("div#media div.layer");
    var initial = $("div#media div.layer div.initial");
    var loader = $("div#media div.loader");
    var picture = $("div#gallery div.picture");
    var img = $("div#gallery div.picture img");
    var duration = $(co).find("media zoom in duration").text();
    var easing = $(co).find("media zoom in easing").text();
    var corewidth = $(core).width();
    var coreheight = $(core).height();
    var loaderwidth = $(loader).outerWidth();
    var initialwidth = $(initial).width();
    var objective;
    var isgal = false, isempty = false;
    
    /* Cas du média vide */
    if($(initial).size() == 1){
        isempty = true;
    }
    
    /* Cas des galeries */
    if($(img).size() > 0) {
        isgal = true;
    }
    
    /* Calcul de l'objectif */
    if(direction) {
        objective = $(content).css("min-width");
    } else {
        objective = corewidth - Math.max(parseInt($(media).css("min-width")), Math.min(coreheight, (corewidth / 2)));
    }
    
    /* Animation */
    var i = 0, j = 0;
    $(content).animate({
        "max-width" : objective
    },{
        "duration" : parseInt(duration),
        "easing" : easing,
        "step" : function(now) {
            /* Calcul de la largeur de la zone média */
            i = corewidth - now;
            
            /* Redimentionnement de la zone média */
            $(media).css("width", i + "px");
            
            /* Centrage du média vide */
            if(isempty) {
                /* Calcul de la largeur du cadre de la zone vide */
                j = i - loaderwidth;
                
                /* Redimensionnement du cadre de la zone vide */
                realWidth(initiallayer, j);
                
                /* Centrage de la zone texte */
                $(initial).css("padding-left", ((j - initialwidth) / 2) + "px");
            }
            
            /* Centrage de la galerie */
            if(isgal) {
                realMaxWidth(img, $(picture).width());
            }
        }, 
        "complete" : function() {
            /* Changements de classe */
            if(direction) {
                $(media).toggleClass("small");
                $(media).addClass("large");
            } else {
                $(media).toggleClass("large");
                $(media).addClass("small");
            }
            
            /* Ré-inscription des évènements */
            doZoomingEvents();
            
            /* Rafraichissements nécessaires */
            refreshMedia();
        }
    });
}

/* Modifie le type de média affiché */
function switchView(xml) {
    /* Variables utiles */
    var view = $("div#media div.data div.cage div.view");
    var min = $(view).css("min-height");
    var max = $(view).height();
    var induration = parseInt($(co).find("media view in duration").text());
    var ineasing = $(co).find("media view in easing").text();
    var outduration = parseInt($(co).find("media view out duration").text());
    var outeasing = $(co).find("media view out easing").text();
    
    /* Tweak pour le problème de largeur */
    $(view).css("width", $(view).width());
    
    /* Animation */
    $(view).animate({
        "height" : min
    },{
        "duration" : induration,
        "easing" : ineasing,
        "step" : function() {
            refreshGallery();
        }, 
        "complete" : function() {
            /* Modification du DOM */
            cleanupView();
            
            /* Injection de la vue */
            injectView(xml);
        }
    }).animate({
        "height" : max + "px"
    },{
        "duration" : outduration,
        "easing" : outeasing,
        "step" : function() {
            refreshGallery();
        }, 
        "complete" : function() {
            /* Désactivation du tweak */
            $(view).css("width", "auto");
            
            /* Rafraichissement de la carte */
            refreshMap();
            refreshText();
            
            /* Mise en place des évènements */
            doMediaEvents();
            doFormEvents();
        }
    });
}

/* Défilement du contenu média */
function switchScroll(direction, target) {
    var mediacage = $("div#media div.data div.cage");
    var cageheight = $(mediacage).height();
    var targetheight = $(target).height();
    var duration = parseInt($(co).find("media scroll duration").text());
    var easing = $(co).find("media scroll easing").text();
    var objective = 0;
    
    var top = 0;
    if($(target).css("top") != "auto") {
        top = Math.abs(parseInt($(target).css("top")));
    }
    
    /* Définition de l'objectif */
    if(direction) {
        /* Dépassement */
        if(top + (cageheight * 2) > targetheight) {
            objective = targetheight - cageheight;
        } else {
            objective = top + cageheight;
        }
    } else {
        /* Dépassement */
        if(top - cageheight < 0) {
            objective = 0;
        } else {
            objective = top - cageheight;
        }
    }
    
    /* Défilement */
    $(target).animate({
        "top" : (-objective) + "px"
    },{
        "duration" : duration,
        "easing" : easing,
        "complete" : function() {
            doMediaScrollingEvents();
            refreshText();
        }
    });
}

/* Modifie l'image affichée dans la galerie */
function switchPicture(dom, target) {
    /* Variables utiles */
    var picture = $("div#gallery div.picture img");
    var img = $("div#gallery div.picture img");
    var text = $("div#gallery div.infos h4, div#gallery div.infos p");
    var induration = parseInt($(co).find("media gallery in duration").text());
    var ineasing = $(co).find("media gallery in easing").text();
    var outduration = parseInt($(co).find("media gallery out duration").text());
    var outeasing = $(co).find("media gallery out easing").text();
    var id = $(target).attr("id");
    var newpic = $(dom).find("picture#" + id);
    
    /* Mémorisation de la taille maximale à l'ouverture */
    var initwidth = $(picture).css("max-width");
    
    /* Modification de l'image sélectionnée */
    $("div#gallery div.infos ul li.selected").toggleClass("selected");
    $(target).addClass("selected");
    
    /* Animation */
    $(text).animate({
        "opacity" : "0"
    },{
        "duration" : induration,
        "easing" : ineasing
    });
    $(img).animate({
        "max-width" : "0px",
        "opacity" : "0"
    },{
        "duration" : induration,
        "easing" : ineasing,
        "complete" : function() {
            /* Modification de l'image */
            $(img).attr("src", "data/medias/img/" + $(newpic).find("files image").text());
            $(img).attr("alt", $(newpic).find("alt").text());
            
            /* Modification des textes */
            $("div#media div.infos h4").text($(newpic).find("legend").text());
            $("div#media div.infos p").text($(newpic).find("text").text());
            
            /* Attente du chargement complet */
            $(img).off('load');
            $(img).load(function() {
                /* Modification du lien sélectionné */
                $("div#media div.infos ul li").removeClass("selected");
                $(target).addClass("selected");
                
                /* Ré-apparition du contenu */
                $(text).animate({
                    "opacity" : "1"
                },{
                    "duration" : outduration,
                    "easing" : outeasing
                });
                $(img).animate({
                    "max-width" : initwidth,
                    "opacity" : "1"
                },{
                    "duration" : outduration,
                    "easing" : outeasing,
                    "complete" : function() {
                        /* Rétablissement de la largeur */
                        $(img).css("width", "auto");
                    }
                });
            });
        }
    });
}
