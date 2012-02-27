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
}
