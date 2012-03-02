/* 
    content.js
    ----------
    Animations du contenu.
 */

/* Effectue une action de scroll dans le contenu */
function scrollContent(destination) {
    /* Variables utiles */
    var content = $("div#content");
    var scroller = $("div#content div.scroller");
    var tolerance = parseInt($(co).find("navigation scroll tolerance").text());
    var mduration = parseInt($(co).find("navigation scroll move duration").text());
    var measing = $(co).find("navigation scroll move easing").text();
    var bduration = parseInt($(co).find("navigation scroll callback duration").text());
    var beasing = $(co).find("navigation scroll callback easing").text();
    var min = $(content).height() - $(scroller).height() - tolerance;
    var max = tolerance;
    var margin = Math.max(Math.min(destination, max), min);
    
    /* Animation */
    var percent;
    $(scroller).animate({
        "margin-top" : margin + "px"
    },{
        "duration" : mduration,
        "easing" : measing,
        "step" : function(now) {
            percent = (now - min) / (min + max);
            console.log(percent);
        }, "complete" : function() {
            if(margin < min + tolerance) {
                $(scroller).animate({
                    "margin-top" : (min + tolerance) + "px"
                },{
                    "duration" : bduration,
                    "easing" : beasing
                });
            }
            if(margin > 0) {
                $(scroller).animate({
                    "margin-top" : 0 + "px"
                },{
                    "duration" : bduration,
                    "easing" : beasing
                });
            }
        }
    });
}