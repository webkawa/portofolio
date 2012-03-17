/* 
    media.js
    --------
    Animations liées aux médias.
 */

/* Modifie le média en cours */
function switchMedia(id) {
    /* Variables utiles */
    var media = $("div#media");
    var mediacomponents = $("div#media div.data > div.cage, div#media div.title h3, div#media div.title p, div#media div.notes > div.spacer");
    var loader = $("div#media div.loader");
    var durationin = $(co).find("navigation media switch in duration").text();
    var easingin = $(co).find("navigation media switch in easing").text();
    var durationout = $(co).find("navigation media switch out duration").text();
    var easingout = $(co).find("navigation media switch out easing").text();
    var bwidth = $(media).outerWidth(true);
    var iwidth = $(loader).outerWidth(true);
    var multi = bwidth / parseInt($(loader).css("max-width"));
    
    /* Animation */
    $(loader).animate({
        "width" : $(loader).css("max-width")
    },{
        "duration" : parseInt(durationin),
        "easing" : easingin,
        "step" : function(now) {
            $(mediacomponents).css("margin-left", (multi * (now - iwidth)) + "px");
        }, 
        "complete" : function() {
        // Clean/inject content there
        }
    }).animate({
        "width" : $(loader).css("min-width")
    },{
        "duration" : parseInt(durationout),
        "easing" : easingout,
        "step" : function(now) {
            $(mediacomponents).css("margin-left", (multi * (now - iwidth)) + "px");
        }
    });
}

/* Zoome sur le média en cours */
function switchZoom(direction) {
    /* Variables utiles */
    var core = $("div#page div.slide.open > div.spacer div.core");
    var content = $("div#content");
    var media = $("div#media");
    var picture = $("div#gallery div.picture");
    var img = $("div#gallery div.picture img");
    var duration = $(co).find("media zoom in duration").text();
    var easing = $(co).find("media zoom in easing").text();
    var corewidth = $(core).width();
    var objective;
    var isgal = false;
    
    /* Cas des galeries */
    if($(img).size() > 0) {
        isgal = true;
    }
    
    /* Calcul de l'objectif */
    if(direction) {
        objective = $(content).css("min-width");
    } else {
        objective = $(content).css("max-width");
    }
    
    /* Animation */
    $(content).animate({
        "width" : objective
    },{
        "duration" : parseInt(duration),
        "easing" : easing,
        "step" : function(now) {
            $(media).css("width", corewidth - now + "px")
            
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
function switchView(dom) {
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
        "complete" : function() {
            /* Insérer le DOM ici */
        }
    }).animate({
        "height" : max + "px"
    },{
        "duration" : outduration,
        "easing" : outeasing,
        "complete" : function() {
            /* Désactivation du tweak */
            $(view).css("width", "auto");
        }
    });
}

/* Modifie l'image affichée dans la galerie */
function switchPicture(target) {
    /* Variables utiles */
    var gallery = $("div#gallery");
    var picture = $("div#gallery div.picture img");
    var img = $("div#gallery div.picture img");
    var induration = parseInt($(co).find("media gallery in duration").text());
    var ineasing = $(co).find("media gallery in easing").text();
    var outduration = parseInt($(co).find("media gallery out duration").text());
    var outeasing = $(co).find("media gallery out easing").text();
    
    /* Mémorisation de la taille maximale à l'ouverture */
    var initwidth = $(picture).css("max-width");
    
    /* Modification de l'image sélectionnée */
    $("div#gallery div.infos ul li.selected").toggleClass("selected");
    $(target).addClass("selected");
    
    /* Animation */
    $(img).animate({
        "max-width" : "0px",
        "opacity" : "0"
    },{
        "duration" : induration,
        "easing" : ineasing,
        "complete" : function() {
            /* Insérer le DOM ici */
            
            /* Modification de l'image */
            $(img).attr("src", "data/site/img/" + $(target).attr("id") + ".png");
        }
    }).animate({
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
}