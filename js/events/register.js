/*  register.js
 *  -----------
 *  Enregistre les évènements associés à la page. */

/* Actions à la fin du chargement du DOM */
$(document).ready(
    function() {
        displayHeader();
        displayPage();
    }
);

/* Actions au redimensionnement de la fenêtre */
$(window).resize(
    function() {
        displayHeader();
        displayPage();
    }
);