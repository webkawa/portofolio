/* 
    media.js
    --------
    Animations liées aux médias.
 */

/* Modifie le média en cours */
function switchMedia(id) {
    /* Variables utiles */
    var media = $("div#media");
    var loader = $("div#page div.slide div.spacer div.loader");
    var durationin = $(co).find("navigation media switch in duration").text();
    var easingin = $(co).find("navigation media switch in easing").text();
    var durationout = $(co).find("navigation media switch out duration").text();
    var easingout = $(co).find("navigation media switch out easing").text();
    var bwidth = $(media).outerWidth(true);
    var iwidth = $(loader).outerWidth(true);
    var sumwidth = bwidth + iwidth;
    
    /* Animation */
    $(media).animate({
        "width" : $(media).css("min-width")
    },{
        "duration" : parseInt(durationin),
        "easing" : easingin,
        "step" : function(now) {
            realWidth(loader, sumwidth - now);
        }, "complete" : function() {
            // Clean/inject content there
        }
    }).animate({
        "width" : $(media).css("max-width")
    },{
        "duration" : parseInt(durationout),
        "easing" : easingout,
        "step" : function(now) {
            realWidth(loader, sumwidth - now);
        }
    });
}
