/* 
    core.js
    -------
    Fonctions d'animation liées au coeur de page.
 */

/* Affiche un coeur de page */
function showCore(target) {
    /* Injection du contenu */
    var lastchild = lastChild(target);
    injectMedia(lastchild);
    injectContent(lastchild, $(pge).find("core").text());
    
    /* Variables utiles */
    var duration = $(co).find("transitions core in duration").text();
    var easing = $(co).find ("transition core in easing").text();
    
    /* Apparition du contenu */
    $("div#content, div#media").animate({
        "opacity" : "1"
    },{
        "duration" : parseInt(duration),
        "easing" : easing
    });
}

/* Dissimule un coeur de page */
function hideCore() {
    /* Variables utiles */
    var duration = $(co).find("transitions core out duration").text();
    var easing = $(co).find ("transition core out easing").text();
    
    /* Apparition du contenu */
    $("div#content, div#media").animate({
        "opacity" : "0"
    },{
        "duration" : parseInt(duration),
        "easing" : easing
    });
}