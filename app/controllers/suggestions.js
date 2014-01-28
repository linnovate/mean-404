'use strict';

/**
 * Module dependencies.
 */
var Levenshtein = require('levenshtein')

var routes = {};

/**
 * Find suggestions
 */
exports.find = function(req, res) {
    var hash = req.query.url;
    hash = hash.split('/');
    hash.shift();

    var routes = req.query.routes;

    try {
        routes = JSON.parse(routes);

    } catch (e) {
        return res.json({
            success: false,
            errDesc: "Failed to parse routes"
        });
    }

    var matches = {};

    for (var path in routes) {
        var components = routes[path].components;


        distance(hash, path, components)
    }

    function distance(hash, path, components) {

        if (components.indexOf('') != -1) {
            components.splice(components.indexOf(''));
        }
        matches[path] = {
            url: path,
            score: (hash.length != components.length) ? Math.abs(hash.length-components.length)*3 : 0
        };

        components.forEach(function(component, index) {
            if (component) {
                if (component.indexOf(':') == -1) {
                    calculate(path, hash[index], (component != '') ? component : 'asd', function(distance) {
                        //not really needed as no io just logic
                    });
                } else {
                    if (matches[path].url) {
                        matches[path].url = matches[path].url.replace(component, hash[index]);
                    }
                }
            }

        });
    }

    function calculate(path, a, b, callback) {
        if (!a || !b) {
            matches[path] = matches[path] + 2;
            return callback(2);
        }    
        var lev = new Levenshtein(a, b);
        matches[path].score = matches[path].score + lev.distance;
        callback(lev.distance);
    }

    //find best macth before returning values

    var best = {
        score: 999,
        url: null
    }

    for (var index in matches) {
        if (matches[index].score < best.score) {        
            best.score = matches[index].score;
            best.url = matches[index].url;
        }
        //for now we take first if there is more than one match
        //code below would do extra checking
        /*else if (matches[index].score == best.score) {
            var levBest = new Levenshtein(best.url, path);
            var levMatch = new Levenshtein(matches[index].url, path);

            if (levMatch.distance < levBest.distance) {
                best.score = matches[index].score;
                best.url = matches[index].url;
            }

        }*/
    }

    res.json({
        match: best
    });
}