/* 
    content.js
    ----------
    Animations du contenu.
 */

/* Effectue une action de scroll dans le contenu */
function scrollContent(destination) {
    /* Variables utiles */
    var content = $("div#content");
    var hcontent = $(content).height();
    var scroller = $("div#content div.scroller");
    var hscroller = $(scroller).height();
    var diffscroll = Math.max(hscroller - hcontent, 0);
    var scrollzone = $("div#content div.scrollbar div.scrollzone");
    var hscrollzone = $(scrollzone).height();
    var marker = $("div#content div.scrollbar div.scrollzone div.marker");
    var hmarker = $(marker).height();
    var diffmarker = hscrollzone - hmarker;
    var tolerance = parseInt($(co).find("navigation scroll tolerance").text());
    var mduration = parseInt($(co).find("navigation scroll move duration").text());
    var measing = $(co).find("navigation scroll move easing").text();
    var bduration = parseInt($(co).find("navigation scroll callback duration").text());
    var beasing = $(co).find("navigation scroll callback easing").text();
    var min = hcontent - hscroller - tolerance;
    var max = tolerance;
    var margin = Math.max(Math.min(destination, max), min);
    
    /* Animation */
    var buff;
    $(scroller).animate({
        "margin-top" : margin + "px"
    },{
        "duration" : mduration,
        "easing" : measing,
        "step" : function(now) {
            $(marker).css("top", markerMargin(now, diffscroll, diffmarker) + "px");
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