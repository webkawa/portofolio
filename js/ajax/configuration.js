/* 
    configuration.js
    ----------------
    Fonctions liées au chargement de la configuration.
 */

function loadConfiguration() {
    var request = jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: "data/configuration/common.xml",
        async: false
    });
    return jQuery.parseXML(request.responseText);
}
