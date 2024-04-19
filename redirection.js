// ==UserScript==
// @name         Redirect to UNSW Library
// @namespace    https://github.com/Caikun-Peng/Redirect-to-UNSW-Library/blob/main/redirection.js
// @version      1.0
// @description  Redirect ACM, IEEE, Springer and ScienceDirect to UNSW Library.
// @author       Caikun-Peng
// @match        https://dl.acm.org/*
// @match        https://ieeexplore.ieee.org/*
// @match        https://link.springer.com/*
// @match        https://www.sciencedirect.com/*
// @grant        GM_xmlhttpRequest
// @license      MIT
// ==/UserScript==

(function(){
    'use strict';

    var origin
    var newURL
    var flag

    function main() {
        GM_xmlhttpRequest({ // Get IP address
            method: "GET",
            url: "https://api.ipify.org?format=json",
            onload: function(response) {
                var ip = JSON.parse(response.responseText).ip;
                if (ip.includes("129.94")) {
                    flag = 0;
                } else{
                    flag = 1;
                }
                if (flag) {
                    newURL = changeURL();
                    window.location.href = newURL;
                }
            }
        });
    }

    function changeURL(){
        if (origin.startsWith("https://dl.acm.org/")) {
            return origin.replace("https://dl.acm.org/", "https://dl-acm-org.wwwproxy1.library.unsw.edu.au/");
        }
        else if (origin.startsWith("https://ieeexplore.ieee.org/")) {
            return origin.replace("https://ieeexplore.ieee.org/", "https://ieeexplore-ieee-org.wwwproxy1.library.unsw.edu.au/");
        }
        else if (origin.startsWith("https://link.springer.com/")) {
            return origin.replace("https://link.springer.com/", "https://link-springer-com.wwwproxy1.library.unsw.edu.au/");
        }
        else if (origin.startsWith("https://www.sciencedirect.com/")) {
            return origin.replace("https://www.sciencedirect.com/", "https://www-sciencedirect-com.wwwproxy1.library.unsw.edu.au/");
        }
    }

    origin = window.location.href;
    main();

})();
