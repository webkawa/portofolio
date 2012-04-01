/* 
    data.js
    -------
    Fonctions liées au chargement des contenus.
 */

/* Charge l'index */
function loadIndex() {
    try {
        var request = jQuery.ajax({
            type: "GET",
            dataType: "xml",
            url: "data/site/index.xml",
            async: false
        });
        return jQuery.parseXML(request.responseText);
    } catch(error) {
        injectError(loadError("filenotfound"));
        showError();
        refreshError();
    }
}

/* Charge une page */
function loadPage(id) {
    try {
        var root = $(idx).find("page#" + id).attr("repertory");
        var request = jQuery.ajax({
            type: "GET",
            dataType: "xml",
            url: root + $(idx).find("page#" + id + " data").text(),
            async: false
        });
        return jQuery.parseXML(request.responseText);
    } catch(error) {
        injectError(loadError("filenotfound"));
        showError();
        refreshError();
    }
}

/* Charge un média */
function loadMedia(id) {
    try {
        var root = $(idx).find("page#" + $(pge).find("id").text()).attr("repertory");
        var request = jQuery.ajax({
            type: "GET",
            dataType: "xml",
            url: root + $(idx).find("page#" + $(pge).find("id").text() + " media#" + id).text(),
            async: false
        });
        return jQuery.parseXML(request.responseText);
    } catch(error) {
        injectError(loadError("filenotfound"));
        showError();
        refreshError();
        return $("");
    }
}

/* Charge une erreur */
function loadError(id) {
    var root = $(idx).find("errors").attr("repertory");
    var request = jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: root + $(idx).find("errors error#" + id).text(),
        async: false
    });
    return jQuery.parseXML(request.responseText);
}