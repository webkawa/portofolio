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
    $("input#subject").bind("change keyup", function() {
        if($(this).attr("value").length > 3) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
    /* Test d'un champ e-mail */
    var regex = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
    $("input#mail").bind("change keyup", function() {
        if(regex.test($(this).attr("value"))) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
    /* Test d'un champ message */
    $("textarea#message").bind("change keyup", function() {
        if($(this).attr("value").length > 24) {
            $(this).addClass("ready");
        } else {
            $(this).removeClass("ready");
        }
    });
    /* Test des champs de contact */
    $("input:not(.submit), textarea").bind("change keyup", function() {
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

/* Envoie un message */
function doMessage() {
    /* Sélection des variables utiles */
    var mail = $("input#mail").attr("value");
    var subject = $("input#subject").attr("value");
    var message = $("textarea#message").attr("value");
    
    /* Exécution */
    var res = loadMailer(mail, subject, message);
    console.info(res);
    
    /* Affichage du résultat */
    if ($(res).find("result").text() === "SUCCESS") {
        $("div.contact").children().remove();
        $("div.contact").append("<p>" + $(co).find("root fields field#message-ok").text() + "</p>");
    } else {
        injectError(loadError("messagefailed"));
        showError();
        refreshError();
    }
}