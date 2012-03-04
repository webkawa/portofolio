/* 
    core.js
    -------
    Fonctions d'animation liées au coeur de page.
 */

/* Affiche un coeur de page */
function showCore(target) {
    /* Injection du contenu */
    var lastchild = lastChild(target);
    injectContent(lastchild, "Lorem");
    injectMedia(lastchild, "Ipsum");
    
    /* Variables utiles */
    var duration = $(co).find("transitions core duration").text();
    var easing = $(co).find ("transition core easing").text();
    
    /* Apparition du contenu */
    $("div#content, div#media, div#page div.slide div.spacer div.loader").animate({
        "opacity" : "1"
    },{
        "duration" : parseInt(duration),
        "easing" : easing
    });
}

/* Dissimule un coeur de page */
function hideCore() {
    /* Variables utiles */
    var duration = $(co).find("transitions core duration").text();
    var easing = $(co).find ("transition core easing").text();
    
    /* Apparition du contenu */
    $("div#content, div#media, div#page div.slide div.spacer div.loader").animate({
        "opacity" : "0"
    },{
        "duration" : parseInt(duration),
        "easing" : easing
    });
}