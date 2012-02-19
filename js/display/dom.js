/*  dom.js
 *  ------
 *  Fonctions utilitaires liées au DOM. */

/* Ajoute un dégradé sur le coté gauche */
function addLeftFade(div) {
    if($(div).find("div.leftFade").size() == 0) {
        $('<div class="leftFade"></div>').insertAfter($(div).children(":last"));
        $(div).children("div.leftFade").css("height", $(div).height() + "px");
    }
}

/* Ajoute un dégradé sur le coté droit */
function addRightFade(div) {
    if($(div).find("div.rightFade").size() == 0) {
        $('<div class="rightFade"></div>').insertBefore($(div).children(":first"));
        $(div).children("div.rightFade").css("height", $(div).height() + "px");
    }
}

