/* 
    contact.js
    ----------
    Fonctions liées à l'utilisation du formulaire de contact.
 */

/* Charge l'index */
function loadMailer(mail, subject, message) {
    try {
        var request = jQuery.ajax({
            type: "POST",
            dataType: "xml",
            url: "actions/send.php",
            async: false,
            data: {
                mail: mail,
                subject: subject,
                message: message
            }
        });
        return jQuery.parseXML(request.responseText);
    } catch(error) {
        injectError(loadError("formerror"));
        showError();
        refreshError();
    }
}