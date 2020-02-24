'use strict';

var https = require('https'),
    async =require('async'),
    dotenv = require('dotenv'),
    xml2js = require('xml2js');


    dotenv.config();
    exports.fetchImages = function(req, res){
        async.waterfall([
            function(callback) {
                https.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.API_KEY}`, function(res) {
                    var response_data = '';
                    res.setEncoding('utf8');
                    res.on('data', function(chunk) {
                        console.log('Fetching images...');
                        response_data += chunk;
                    });
                    res.on('end', function() {
                        console.log('FETCHING ENDED!');
                        callback(null, response_data)
                    });
                    res.on('error', function(err) {
                        console.log('failure: ' + err.message);
                        callback(err);
                    });
                });
            },
            function(xml, callback) {
                var parser = new xml2js.Parser();
                parser.parseString(xml, function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }
                });
            }, 
            function(json, callback) {
                res.json(json);
                callback();
            }
        ], function(err, result) {
            if (err) {
                console.log('Got error');
                console.log(err);
            } else {
                console.log('FETCHING OF IMAGES SUCCESSFUL!');
            }
        });
        
    };