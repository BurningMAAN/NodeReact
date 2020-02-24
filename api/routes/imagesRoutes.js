'use strict';

module.exports = function(app) {
    var imageList = require('../controllers/ImagesController');


    app.route('/fetch')
        .get(imageList.fetchImages);
};