/* 
    contact.js
    ----------
    Fonctions liées à l'utilisation du formulaire de contact.
 */

/* Charge l'index */
function loadIndex() {
    try {
        var request = jQuery.ajax({
            type: "POST",
            dataType: "xml",
            url: "data/site/index.xml",
            async: false
        });
        return jQuery.parseXML(request.responseText);
    } catch(error) {
        injectError(loadError("formerror"));
        showError();
        refreshError();
    }
}