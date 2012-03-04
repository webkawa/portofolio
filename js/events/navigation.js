/* 
    navigation.js
    -------------
    Evènements liés à la navigation.
 */

/* Inscription des évènements de navigation */
function doNavigationEvents() {
    /* Gestion de la navigation entre les slides */
    $("div#page div.slide.close").mouseover(function() {
        /* Variables utiles */
        var open = $("div#page div.slide.open");
        var x1 = $("div#page div.slide:last").is($(this));
        var x2 = $(open).prev().is($(this));
        
        /* Changement */
        if($(open).size() == 1 && (x1 || x2)) {
            /* Modification du titre */
            switchTitle({
                "title" : "Lorem ipsum",
                "subtitle" : "Dolor sit amet"
            }, $(this));
            
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
    $("div#content div.scrollbar div.scrollzone div.marker").draggable({
        axis : "y",
        containment : "div#content div.scrollbar div.scrollzone",
        drag : function() {
            /* Variables utiles */
            var scrollzone = $("div#content div.scrollbar div.scrollzone");
            var diffmarker = $(scrollzone).height() - $(this).height();
            var scroller = $("div#content div.scroller");
            var diffscroller = Math.min($("div#content").height() - $(scroller).height(), 0);
            var margin = (parseInt($(this).css("top")) / diffmarker) *  diffscroller;
            
            /* Attribution */
            $(scroller).css("margin-top", margin + "px");
        }
    });
}
