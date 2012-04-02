/* 
    navigation.js
    -------------
    Evènements liés à la navigation.
 */

/* Inscription des évènements de navigation */
function doNavigationEvents() {
    $("div#page div.slide.close").mouseover(function() {
        /* Variables utiles */
        var open = $("div#page div.slide.open");
        var x1 = $("div#page div.slide:last").is($(this));
        var x2 = $(open).prev().is($(this));
        var x3 = $(this).is(":not(:animated)");
        /* Changement */
        if($(open).size() == 1 && (x1 || x2) && x3) {
            /* Mise à jour des variables de navigation */
            pge = loadPage($(this).attr("id"));
            med = $("head");
            
            /* Modification du titre */
            switchTitle($(this));
            switchSlide(open, $(this));
        }
    });
    /* Gestion du scrolling dans le coeur de page */
    var start, level;
    $("div#content div.scroller").mousewheel(function(event, delta) {
        if($(this).height() > $("div#content").height()) {
            /* Variables utiles */
            var sensibility = parseInt($(co).find("navigation scroll sensibility").text());
            var factor = parseFloat($(co).find("navigation scroll factor").text());
        
            /* Prise en compte du sens */
            if(delta < 1) {
                sensibility = -(sensibility);
            }
        
            /* Animation */
            var destination = 0;
            if($(this).is(":animated")) {
                /* Contenu en cours de mouvement */
                level++;
                destination = start + (level * factor * sensibility);
                $(this).stop();
                scrollContent(destination);
            } else {
                /* Contenu à l'arrêt */
                level = 1;
                start = parseInt($(this).css("margin-top"));
                destination = start + sensibility;
                scrollContent(destination);
            }
        }
    });
    /* Gestion du scrolling au clic */
    $("div#content > div.cage div.scrollbar div.scrollzone div.marker").draggable({
        axis : "y",
        containment : "div#content > div.cage div.scrollbar div.scrollzone",
        start : function() {
            $(this).addClass("used");
        }, 
        drag : function() {
            /* Variables utiles */
            var scrollzone = $("div#content > div.cage div.scrollbar div.scrollzone");
            var diffmarker = $(scrollzone).height() - $(this).height();
            var scroller = $("div#content div.scroller");
            var diffscroller = Math.min($("div#content > div.cage").height() - $(scroller).height(), 0);
            var margin = (parseInt($(this).css("top")) / diffmarker) *  diffscroller;
            
            /* Attribution */
            $(scroller).css("margin-top", margin + "px");
        }, 
        stop : function() {
            $(this).toggleClass("used");
        }
    });
    /* Affichage des médias */
    $("div#content div.scroller a").click(function() {
        if($("div#media div.loader:animated").size() == 0) {
            med = loadMedia($(this).attr("href"));
            switchMedia($(this).attr("href"));
        }
    });
}