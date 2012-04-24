/* 
    global.js
    ---------
    Evènements globaux utilisés par la page.
 */

/* Inscription des évènements globaux */
function doGlobalEvents() {
    /* Modification des dimensions de la fenêtre */
    $(window).resize(function() {
        refresh();
    });
}

/* Inscription des évènements des formulaires */
function doFormEvents() {
    /* Test d'un champ sujet */
    $("input.subject").change(function() {
        if($(this).attr("value").length > 3) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
    /* Test d'un champ e-mail */
    var regex = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
    $("input.mail").change(function() {
        if(regex.test($(this).attr("value"))) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
    /* Test d'un champ message */
    $("textarea.message").change(function() {
        if($(this).attr("value").length > 24) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
    /* Test des champs de contact */
    $("input:not(.submit), textarea").change(function() {
        var b = true;
        $("input:not(.submit), textarea").each(function() {
            if(!$(this).hasClass("ready")) {
                b = false;
            }
        });
        if(b) {
            $("input.submit").removeAttr("disabled");
        } else {
            $("input.submit").attr("disabled", "disabled");
        }
    });
}