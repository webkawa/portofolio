/* 
    inject.js
    ---------
    Fonctions utiles à l'injection de code dans le DOM.
 */

/* Création d'un titre */
function injectTitle(title, subtitle) {
    /* Mise à jour du contenu sortant */
    $("div#header div.title").addClass("leaving");
    
    /* Création du contenu entrant */
    var opt = '';
    if(subtitle != null) {
        opt = '<p>' + subtitle + '</p>';
    }
    var data = 
        '<div class="title incoming">' +
            '<h1>' + title + '</h1>' +
            opt +
        '</div>';
    $("div#header").append(data);
    
    /* Rafraichissement du titre entrant */
    refreshTitleSize($("div#header div.title.incoming"));
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
    var cage = $("div#content > div.cage");
    var scroller = $("div#content > div.cage div.scroller");
    var scrollbar = $("div#content > div.cage div.scrollbar");
    var scrollzone = $("div#content > div.cage div.scrollbar div.scrollzone");
    var marker = $("div#content > div.cage div.scrollbar div.scrollzone div.marker");
    
    /* Affectation des tailles */
    realHeight(content, $(core).height());
    realHeight(cage, $(content).height());
    realHeight(scrollzone, $(scrollbar).height());
    realHeight(marker, markerSize(cage, scroller, scrollzone));
}

/* Création d'une carte */
var global_map;
function injectMap(dom) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    
    /* Injection */
    $(target).append('<div id="map"></div>');
    
    /* Chargement de la carte */
    var options = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    global_map = new google.maps.Map(document.getElementById("map"), options);
}

/* Création d'une galerie */
function injectGallery(dom) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    
    /* Création de la galerie */
    var data =
        $('<div id="gallery">' +
            '<div class="picture">' +
                '<img />' +
            '</div>' +
            '<div class="infos">' +
                '<h4>Lorem ipsum</h4>' +
                '<p>Dolor sit amet</p>' +
                '<ul>' +
                    '<li id="fry" />' +
                    '<li id="zoidberg" class="selected" />' +
                    '<li id="bender" />' +
                '</ul>' +
            '</div>' +
        '</div>');
    
    /* Injection */
    $(target).append(data);
    
    /* Taille de la ligne */
    realHeight($("div#gallery div.picture"), $("div#gallery").height());
    realMaxHeight($("div#gallery div.picture img"), $("div#gallery div.picture").height());
    realMaxWidth($("div#gallery div.picture img"), $("div#gallery div.picture").width());
    $("div#gallery div.picture").css("line-height", $("div#gallery div.picture").height() + "px");
    
    /* Post-traitement (temporaire) */
    var img = $("div#gallery div.picture img");
    var selection = $("div#gallery div.infos ul li.selected");
    var icons = $("div#gallery div.infos ul li");
    
    $(icons).each(function() {
        $(this).css("background-image", "url('data/site/img/" + $(this).attr("id") +"_small.png')");
    });
    $(img).attr("src", "data/site/img/" + $(selection).attr("id") +".png");
}

/* Création d'un texte */
function injectText(view) {
    /* Variables utiles */
    var target = $("div#media div.data > div.cage div.view");
    
    /* Injection */
    $(target).append($(view).find("core").text());
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
}

/* Création de la zone média */
function injectMedia(target, xml) {
    /* Variables utiles */
    var views = $(xml).find("view");
    
    /* Création des variables par défaut */
    var list = '';
    var title = '';
    var view = '';
    var notes = $(co).find("fields field#no-media").text();
    if($(views).size() != 0) {
        /* Titre */
        title = $(xml).find("title").text();
        
        /* Liens */
        list += '<div class="links"><ul>';
        $(views).each(function() {
            list += '<li id="' + $(this).attr("id") + '" class="' + $(this).find("type").text() + '"></li>';
        });
        list += '</ul></div>';
        
        /* Vue */
        view = '<div class="view"></div>';
        
        /* Notes */
        notes = $(xml).find("notes").text();
    }
    
    /* Création du contenu */
    var data =
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
            '<div class="notes">' +
                '<div class="spacer">' +
                    '<p>' +
                        notes +
                    '</p>' +
                '</div>' +
            '</div>' +
        '</div>');
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Injection de la vue */
    if($(views).size() != 0) {
        injectView($(views).get(0));
        fontHeight($("div#media div.title h3"), $("div#media div.title").height() - $("div#media div.title p").outerHeight());
    }
    
    /* Variables utiles */
    var media = $("div#media");
    var mediatitle = $("div#media div.title");
    var mediadata = $("div#media div.data");
    var mediacage = $("div#media div.data > div.cage");
    var mediaview = $("div#media div.data > div.cage div.view");
    var medianotes = $("div#media div.notes");
    
    /* Ajout des décorations */
    addDecoration($(mediatitle), "border", "bc", "small");
    addDecoration($(medianotes), "border", "tc", "small");
    
    /* Hauteur de la zone média */
    realHeight(mediadata, $(media).height() - $(mediatitle).outerHeight(true) - $(medianotes).outerHeight(true));
    realHeight(mediacage, $(mediadata).height());
    realHeight(mediaview, $(mediacage).height());
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
    $(target).append($(data));
    
    /* Affectation de la taille */
    realHeight($(data), $("div#page").height());
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
    
    /* Injecte le titre */
    injectTitle($(pge).find("title").text(), $(pge).find("subtitle").text());
    
    /* Injecte le coeur de page */
    injectPage($("div#page div.slide.open"));
    
    /* Injecte les conteneurs */
    var target = lastChild("div#page div.slide.open > div.spacer div.core");
    injectContent(target, $(pge).find("core").text());
    injectMedia(target, med);
    
    /* Mises à jours liées à la non-animation */
    $("div#header div.title").toggleClass("incoming");
    $("div#page div.slide.open > div.spacer div.core, div#content, div#media").css("opacity", "inherit");
}