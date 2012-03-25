/* 
    data.js
    -------
    Fonctions liées au chargement des contenus.
 */

/* Charge l'index */
function loadIndex() {
    var request = jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: "data/site/index.xml",
        async: false
    });
    return jQuery.parseXML(request.responseText);
}

/* Charge une page */
function loadPage(id) {
    var root = $(idx).find("page#" + id).attr("repertory");
    var request = jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: root + $(idx).find("page#" + id + " data").text(),
        async: false
    });
    return jQuery.parseXML(request.responseText);
}

/* Charge un média */
function loadMedia(id) {
    var root = $(idx).find("page#" + $(pge).find("id").text()).attr("repertory");
    var request = jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: root + $(idx).find("page#" + $(pge).find("id").text() + " media#" + id).text(),
        async: false
    });
    return jQuery.parseXML(request.responseText);
}