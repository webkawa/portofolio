/* 
    inject.js
    ---------
    Fonctions utiles à l'injection de code dans le DOM.
 */

/* Création d'un titre */
function injectTitle() {
    /* Mise à jour du contenu sortant */
    $("div#header div.title").addClass("leaving");
    
    /* Création du contenu entrant */
    var id = $(pge).find("id").text();
    var opt = '';
    if($(pge).find("subtitle").size() != 0) {
        opt = '<p>' + $(pge).find("subtitle").text() + '</p>';
    }
    var data = 
    '<div class="title incoming ' + id + '">' +
    '<h1>' + $(pge).find("title").text() + '</h1>' +
    opt +
    '</div>';
    $("div#header div.spacer").append(data);                             /* Prend en compte la bordure */
    
    /* Rafraichissement du titre entrant */
    refreshTitleSize($("div#header div.spacer div.title.incoming"));     /* Prend en compte la bordure */
    
    /* Mise en place de la police */
    Cufon.replace('div#header div.spacer div.title.incoming h1');
    Cufon.replace('div#header div.spacer div.title.incoming p');
    Cufon.now();
}

/* Création d'un coeur de page */
function injectContent(target, dom) {
    /* Création du contenu */
    var data =
    $('<div id="content" style="opacity: 0">' +
        '<div class="cage">' +
        '<div class="scroller"></div>' +
        '<div class="scrollbar">' +
        '<div class="scrollzone">' +
        '<div class="marker"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    
    /* Ajout des informations chargées */
    $(data).find("div.cage div.scroller").append(dom);
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Décoration de la scrollbar */
    addDecoration($("div#content div.scrollbar"), "corner", "tc", "small");
    addDecoration($("div#content div.scrollbar"), "corner", "bc", "small");
    
    /* Variables utiles */
    var core = $("div#page div.slide > div.spacer div.core");
    var content = $("div#content");
    var media = $("div#media");
    var cage = $("div#content div.cage");
    var scroller = $("div#content div.cage div.scroller");
    var scrollbar = $("div#content div.cage div.scrollbar");
    var scrollzone = $("div#content div.cage div.scrollbar div.scrollzone");
    var marker = $("div#content div.cage div.scrollbar div.scrollzone div.marker");
    
    /* Affectation des tailles */
    realHeight(content, $(core).height());
    realMaxWidth(content, $(core).width() - $(media).outerWidth());
    realHeight(cage, $(content).height());
    realWidth(cage, $(content).width());
    realHeight(scrollzone, $(scrollbar).height());
    realWidth(scroller, $(cage).width() - $(scrollbar).outerWidth());
    realHeight(marker, markerSize(cage, scroller, scrollzone));
    
    /* Mise en place des liens décorés */
    var b1, b2;
    $(scroller).find("a").each(function() {
        b1 = $(this).text();
        $(this).text("");
        $(this).append('<span class="medialk"><span>' + b1 + '</span></span>');
    });
    
    /* Décoration */
    addDecoration(content, "corner", "tr", "small");
    addDecoration(content, "corner", "br", "small");
    
    /* Déploiement du cùfon */
    Cufon.replace('div#content div.cage div.scroller h2');
    Cufon.now();
    
    /* Affichage du scroller */
    if($(cage).height() / $(scroller).height() > 1) {
        $(scrollbar).css("display", "none");
    } else {
        $(scrollbar).css("display", "block");
    }
}

/* Création d'une carte */
var global_map;
function injectMap(xml) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    var longitude = parseFloat($(xml).find("longitude").text());
    var latitude = parseFloat($(xml).find("latitude").text());
    var zoom = parseFloat($(xml).find("zoom").text());
    var id = $(pge).find("id").text();
    var alt = $(co).find("fields field#decoration-img-alt").text();
    
    /* Création du contenu */
    var data = 
    '<div id="gmap"></div>' +
    '<img src="css/img/' + id + '/corner_bl_small.png" alt="' + alt + '" class="corner bl" />' +
    '<img src="css/img/' + id + '/corner_br_small.png" alt="' + alt + '" class="corner br" />' +
    '<img src="css/img/' + id + '/corner_tr_small.png" alt="' + alt + '" class="corner tr" />' +
    '<img src="css/img/' + id + '/corner_tl_small.png" alt="' + alt + '" class="corner tl" />';
    
    /* Injection */
    $(target).append(data);
    
    /* Chargement de la carte */
    var options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    global_map = new google.maps.Map(document.getElementById("gmap"), options);
    
    /* Ajout des marqueurs */
    var lat, lng;
    $(xml).find("markers > marker").each(function() {
        /* Recherche des variables utiles */
        lat = parseFloat($(this).find("latitude").text());
        lng = parseFloat($(this).find("longitude").text());
        data = $(this).find("info").text();
        
        /* Création du marqueur */
        var marker = new google.maps.Marker({
            position : new google.maps.LatLng(lat, lng),
            map : global_map,
            title : $(this).find("title").text()
        });
            
        /* Création de l'info-bulle */
        var info = new google.maps.InfoWindow({
            content : data,
            maxWidth : 320
        })
        google.maps.event.addListener(marker, 'click', function() {
            info.open(global_map, marker);
        });
    });
}

/* Création d'une galerie */
function injectGallery(dom) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    var picture = $(dom).find("picture:first");
    var id = $(picture).attr("id");
    var idpage = $(pge).find("id").text();
    var induration = parseInt($(co).find("media gallery in duration").text());
    var ineasing = $(co).find("media gallery in easing").text();
    var alt = $(co).find("fields field#decoration-img-alt").text();
    
    /* Création de l'image principale */
    var img = '<img style="opacity: 0;" src="data/medias/img/' + $(picture).find("files image").text() + '" alt="' + $(picture).find("alt").text() + '" />' ;
    var legend = $(picture).find("legend").text();
    var text = $(picture).find("text").text();
    
    /* Création des liens */
    var links = '';
    $(dom).children("picture").each(function() {
        links += '<li id="' + $(this).attr("id") + '" />'; 
    });
    
    /* Création de la galerie */
    var data =
    $('<div id="gallery">' +
        '<div class="picture">' +
        img +
        '</div>' +
        '<div class="infos">' +
        '<ul>' +
        links +
        '</ul>' + 
        '<div class="legend">' +
        '<h4>' +
        legend +
        '</h4>' +
        '<p>' +
        text +
        '</p>' +
        '</div>' +
        '</div>' +
        '<img src="css/img/' + idpage + '/corner_bl_small.png" alt="' + alt + '" class="corner bl" />' +
        '<img src="css/img/' + idpage + '/corner_br_small.png" alt="' + alt + '" class="corner br" />' +
        '<img src="css/img/' + idpage + '/corner_tr_small.png" alt="' + alt + '" class="corner tr" />' +
        '<img src="css/img/' + idpage + '/corner_tl_small.png" alt="' + alt + '" class="corner tl" />' +
        '</div>');
    
    /* Injection */
    $(target).append(data);
    
    /* Chargement de l'image */
    var image = $(target).find("div#gallery div.picture img");
    $(image).load(function() {
        /* Affichage */ 
        $(image).animate({
            "opacity" : "1"
        },{
            "duration" : induration,
            "easing" : ineasing
        });
    });
    
    /* Taille de la ligne */
    realHeight($("div#gallery div.picture"), $("div#gallery").height());
    realMaxHeight($("div#gallery div.picture img"), $("div#gallery div.picture").height());
    realMaxWidth($("div#gallery div.picture img"), $("div#gallery div.picture").width());
    $("div#gallery div.picture").css("line-height", $("div#gallery div.picture").height() + "px");
    
    /* Post-traitement */
    var icons = $("div#gallery div.infos ul li");
    $(icons).each(function() {
        $(this).css("background-image", "url('data/medias/img/" + $(dom).find("picture#" + $(this).attr("id") + " files icon").text() + "')");
    });
    $("div#gallery div.infos ul li:first").addClass("selected");
}

/* Création d'un texte */
function injectText(view) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    
    /* Contenu */
    var data =
    '<div id="text">' +
    $(view).find("core").text() +
    '</div>' +
    '<div class="down" style="display: none;"></div>' +
    '<div class="up" style="display: none;"></div>';
    
    /* Injection */
    $(target).append(data);
    
    /* Décoration */
    addCorners(target, "small");
}

/* Injection d'une vue */
function injectView(view) {
    var type = $(view).find("type").text();
    if(type === "map") {
        injectMap(view);
    } else if(type === "gallery") {
        injectGallery(view);
    } else if(type === "text") {
        injectText(view);
    }
    $("div#media div.data > div.cage div.links ul li#" + $(view).attr("id")).addClass("selected");
}

/* Création de la zone média */
function injectMedia(target, xml) {
    /* Variables utiles */
    var views = $(xml).find("view");
    
    /* Création des variables par défaut */
    var list = '';
    var title = '';
    var view = '';
    var notes = '';
    var data = '';
    if($(views).size() != 0) {
        /* Titre */
        title = $(xml).find("root > title").text();
        
        /* Liens */
        list += '<div class="links"><ul>';
        $(views).each(function() {
            list += '<li id="' + $(this).attr("id") + '" class="' + $(this).find("type").text() + '"></li>';
        });
        list += '</ul></div>';
        
        /* Vue */
        view = '<div class="view"></div>';
        
        /* Notes */
        if($(xml).find("root > notes").size() > 0) {
            notes = 
                '<div class="notes">' +
                '<div class="spacer">' +
                $(xml).find("root > notes").text() +
                '</div>' +
                '</div>';
        }
        
        /* Création du contenu */
        data =
        $('<div id="media" class="small" style="opacity: 0">' +
            '<div class="loader"></div>' +
            '<div class="title">' +
            title +
            '</div>' +
            '<div class="data">' +
            '<div class="cage">' +
            list +
            view +
            '</div>' +
            '</div>' +
            notes +
            '</div>');
    } else {
        /* Variables utiles */
        var nomediaalt = $(co).find("fields field#no-media-alt").text();
        var nomediaerror = $(co).find("fields field#no-media-error").text();
        
        /* Création de la zone vide */
        data =
        $('<div id="media" class="small">' +
            '<div class="loader"></div>' +
            '<div class="layer">' +
            '<div class="initial">' +
            '<p>' +
            '<img src="data/medias/img/media_empty.png" alt="' + nomediaalt + '" />' +
            '<span>' + nomediaerror + '</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>');
    }
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Injection de la vue */
    if($(views).size() != 0) {
        injectView($(views).get(0));
        fontHeight($("div#media div.title h3"), $("div#media div.title").height() - $("div#media div.title p").outerHeight());
    }
    
    /* Variables utiles */
    var core = $("div#page div.slide.open > div.spacer div.core");
    var media = $("div#media");
    var initiallayer = $("div#media div.layer");
    var initial = $("div#media div.layer div.initial");
    var loader = $("div#media div.loader");
    var mediatitle = $("div#media div.title");
    var mediadata = $("div#media div.data");
    var mediacage = $("div#media div.data > div.cage");
    var mediaview = $("div#media div.data > div.cage div.view");
    var medialinks = $("div#media div.data > div.cage div.links ul li");
    var medianotes = $("div#media div.notes");
    var medianotesspacer = $("div#media div.notes div.spacer");
    
    /* Ajout des décorations */
    addDecoration($(mediatitle), "corner", "br", "small");
    addDecoration($(mediatitle), "corner", "bl", "small");
    addDecoration($(mediatitle), "corner", "tl", "small");
    addDecoration($(mediatitle), "border", "bc", "media");
    addDecoration($(medianotes), "corner", "tr", "small");
    addDecoration($(medianotes), "corner", "bl", "small");
    addDecoration($(medianotes), "corner", "tl", "small");
    addDecoration($(medianotes), "border", "tc", "media");
    addCorners($(medialinks), "small");
    if($(initial).size() == 1) {
        addDecoration($(initiallayer), "corner", "bl", "small");
        addDecoration($(initiallayer), "corner", "tl", "small");
    }
    
    /* Largeur de la zone média */ 
    realWidth(media, Math.min($(core).height(), ($(core).width() / 2)));
    
    /* Largeur de la zone loader */
    $(loader).css("width", $(loader).css("min-width"));
    
    /* Dimensions de la zone initiale */
    realWidth(initiallayer, $(media).width() - $(loader).outerWidth());
    realHeight(initiallayer, $(media).height());
    
    /* Alignement du contenu vide */
    $(initial).css({
        "padding-top" : (($(initiallayer).height() - $(initial).height())/ 2) + "px",
        "padding-left" : (($(initiallayer).width() - $(initial).width())/ 2) + "px"
    });
    
    /* Hauteur de la zone média */
    realHeight(mediadata, $(media).height() - $(mediatitle).outerHeight(true) - $(medianotes).outerHeight(true));
    realHeight(mediacage, $(mediadata).height());
    realHeight(mediaview, $(mediacage).height());
    
    /* Verrouillage de la zone notes */
    realWidth(medianotesspacer, $(medianotes).width());
    
    /* Déploiement du cùfon */
    Cufon.replace('div#media div.title h3');
    Cufon.now();
}

/* Création d'une page */
function injectPage(target) {
    /* Création du contenu entrant */
    var data = 
    $('<div class="spacer">' +
        '<div class="core" style="opacity: 0;"></div>' +
        '</div>');
    
    /* Création des coins */
    addCorners($(data).children("div.core"), "medium");
    
    /* Ajout au conteneur */
    $(target).append(data);
    
    /* Affectation de la taille */
    realHeight($("div#page div.slide > div.spacer"), $("div#page").height());
    
    /* Mise à jour du pied de page */
    $("div#footer").removeAttr("class");
    $("div#footer").addClass($(pge).find("id").text());
}

/* Création d'une erreur */
function injectError(xml) {
    if($("div#error > div.cage").size() == 0) {
        /* Variables utiles */
        var core = $(xml).find("core").text();
        var exit = $(xml).find("exit").text();
        var pheight = $(window).height();

        var exitlk = '';
        if(exit === "true") {
            exitlk = '<p class="exit"><a onclick="hideError(); cleanupError();" alt="Ignorer">Ignorer ce message</a></p>';
        }

        /* Création de l'erreur */
        var data =
        '<div class="cage">' +
        core +
        exitlk +
        '</div>';

        /* Insertion */
        $("div#error").append(data);

        /* Taille de la cage */
        var cage = $("div#error > div.cage");
        var cheight = $(cage).outerHeight(false);
        $(cage).css({
            "margin-top" : Math.max(((pheight - cheight) / 2), 0) + "px"
        });
    }
}

/* Initialise la page */
function injectDom() {
    /* Sélection de l'identifiant */
    var id = $(pge).find("id").text();
    var left = true;
    var page = $("div#page");
    
    /* Crée la liste des slides */
    $(idx).find("page").each(function() {
        if($(this).attr("id") === id) {
            /* Si identifiant atteint */
            $(page).append('<div class="slide left open" id="' + $(this).attr("id") + '"></div>');
            left = false;
        } else {
            if(left) {
                /* Si à gauche */
                $(page).append('<div class="slide left close" id="' + $(this).attr("id") + '"></div>');
            } else {
                /* Si à droite */
                $("div#page div.slide.left.open").after('<div class="slide right close" id="' + $(this).attr("id") + '"></div>');
            }
        }
    });
    $("div#page div.slide.right.close:last").addClass("next");
    $("div#page div.slide.left.close:last").addClass("back");
    
    /* Informations sur les slides */
    var prop = slideProperties($("div.slide.open"));
    
    /* Définition de la largeur maximale */
    realMaxWidth($("div#page div.slide.open"), $("div#page").width() - prop.lmargin - prop.rmargin);
    
    /* Hauteur de la page */
    realHeight(page, $(window).height() - $("div#header").outerHeight() - $("div#footer").outerHeight());
    realHeight($("div#page div.slide"), $(page).height());
    
    /* Injecte le titre */
    addDecoration($("div#header"), "border", "bc", "smallshadow");
    realHeight($("div#header div.spacer"), $("div#header").height());
    $("div#header div.spacer").css({
        "padding-left" : prop.lmargin + "px",
        "padding-right" : prop.rmargin + "px"
    });
    injectTitle();
    realMaxWidth($("div#header div.spacer div.title"), prop.width);
    
    /* Injecte le coeur de page */
    injectPage($("div#page div.slide.open"));
    
    /* Injecte les conteneurs */
    var target = lastChild("div#page div.slide.open > div.spacer div.core");
    injectMedia(target, med);
    injectContent(target, $(pge).find("core").text());
    
    /* Décoration du pied de page */
    addDecoration($("div#footer"), "border", "tc", "smallshadow")
    
    /* Mises à jours liées à la non-animation des contenus */
    $("div#header div.title").toggleClass("incoming");
    $("div#page div.slide.open > div.spacer div.core, div#content, div#media").css("opacity", "inherit");
    
    /* Taille de l'en-tête */
    var hheight = $("div#header").outerHeight(false);
    var pheight = $(page).outerHeight();
    var footer = $("div#footer");
    var fheight = $(footer).outerHeight();
    var wheight = $(window).height();
    if(wheight > hheight + pheight + fheight) {
        $("div#header").css("padding-top", ((wheight - hheight - pheight - fheight) / 2) + "px");
    }
}
