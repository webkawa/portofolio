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
        /* Variables utiles */
        var sensibility = parseInt($(co).find("navigation scroll sensibility").text());
        
        /* Prise en compte du sens */
        if(delta < 1) {
            sensibility = -(sensibility);
        }
        
        /* Animation */
        var destination = 0;
        if($(this).is(":animated")) {
            /* Contenu en cours de mouvement */
            level++;
            destination = start + (level * sensibility);
            $(this).stop();
            scrollContent(destination);
        } else {
            /* Contenu à l'arrêt */
            level = 1;
            start = parseInt($(this).css("margin-top"));
            destination = start + sensibility;
            scrollContent(destination);
        }
    });
}
