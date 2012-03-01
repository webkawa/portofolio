/* 
    content.js
    ----------
    Animations du contenu.
 */

/* Permet une action de scroll dans le contenu */
function scrollContent(destination) {
    /* Variables utiles */
    var content = $("div#content");
    var scroller = $("div#content div.scroller");
    var tolerance = parseInt($(co).find("navigation scroll tolerance").text());
    var duration = parseInt($(co).find("navigation scroll duration").text());
    var easing = $(co).find("navigation scroll easing").text();
    var min = $(content).outerHeight(true) - $(scroller).height() - tolerance;
    var max = tolerance;
    var margin = Math.max(Math.min(destination, max), min);
    console.log(min);
    /* Animation */
    $(scroller).animate({
        "margin-top" : margin + "px"
    },{
        "duration" : duration,
        "easing" : easing,
        "complete" : function() {
            if(margin < min + tolerance) {
                $(scroller).animate({
                    "margin-top" : (min + tolerance) + "px"
                },{
                    "duration" : duration,
                    "easing" : easing
                });
            }
            if(margin > 0) {
                $(scroller).animate({
                    "margin-top" : 0 + "px"
                },{
                    "duration" : duration,
                    "easing" : easing
                });
            }
        }
    });
}
