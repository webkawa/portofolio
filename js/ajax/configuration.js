/*  configuration.js
 *  ----------------
 *  Charge la configuration.
 */

var request = jQuery.ajax(
    {
        type: "GET",
        dataType: "xml",
        url: "data/configuration/common.xml",
        async: false
    }
);
var co = jQuery.parseXML(request.responseText);

