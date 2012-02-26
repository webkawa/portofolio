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
    
    /* Navigation */
    $("div#page div.slide").click(function() {
        var open = $("div#page div.slide.open");
        var x1 = $("div#page div.slide:last").is($(this));
        var x2 = $(open).prev().is($(this));
        if($(open).size() == 1 && (x1 || x2)) {
            switchSlide(open, $(this));
        }
    });
    
    /* Temporaire */
    $("div#header").click(function() {
        switchTitle("lol", "lol");
    })
}