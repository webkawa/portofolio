/* 
    media.js
    --------
    Animations liées aux médias.
 */

/* Modifie le média en cours */
function switchMedia(id) {
    /* Variables utiles */
    var media = $("div#media");
    var loader = $("div#media div.loader");
    var durationin = $(co).find("navigation media switch in duration").text();
    var easingin = $(co).find("navigation media switch in easing").text();
    var durationout = $(co).find("navigation media switch out duration").text();
    var easingout = $(co).find("navigation media switch out easing").text();
    var bwidth = $(media).outerWidth(true);
    var iwidth = $(loader).outerWidth(true);
    var sumwidth = bwidth + iwidth;
    
    /* Animation */
    $(loader).animate({
        "width" : (sumwidth - parseInt($(media).css("min-width"))) + "px"
    },{
        "duration" : parseInt(durationin),
        "easing" : easingin,
        "complete" : function() {
            // Clean/inject content there
        }
    }).animate({
        "width" : (sumwidth - parseInt($(media).css("max-width"))) + "px"
    },{
        "duration" : parseInt(durationout),
        "easing" : easingout
    });
}
