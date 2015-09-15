var _ = require('underscore'),
    join = require('path').join,
    fs = require('fs-extra');

module.exports = function(directoryArray, basePath, Handlebars) {
    return new Promise(function(resolve, reject) {
        var templatesPromiseArray = [],
            directoriesPromiseArray = [];


        // build a list of partials and register them
        _.each(directoryArray, function(directory) {
            
            // console.log(13, 'partial directory',directory);
            // iterate through directories
            directoriesPromiseArray.push(new Promise(function(resolve, reject) {
                fs.readdir(join(basePath, directory), function(err, filenames) {


                    if (err) {
                        console.log('\n[partialsPromise] ',err);
                        reject(err);
                    } else {
                        _.each(filenames, function(filename) {
                            
                            // iterate through files                    
                            if (filename.indexOf('.hbs') !== -1) {
                                templatesPromiseArray.push(new Promise(function(resolve, reject) {
                                    fs.readFile(join(basePath, directory, filename), function(err, template) {
                                        if (err) {
                                            console.log('\n[partialsPromise] ',err);
                                            reject(err);
                                        } else {

                                           // DEBUG:  console.log('\n[partialsPromise] pre-compiled', filename.replace(/\.hbs/, '').trim(), template.toString().substr(0, 10));

                                            // register each partial
                                            Handlebars.registerPartial(filename.replace(/\.hbs/, '').trim(), template.toString());
                                            resolve(template);
                                        }
                                    });
                                }));
                            }
                        });
                        resolve(filenames);
                    }
                });
            }));
        });

        // execute the promises and resolve when all complete
        Promise.all(directoriesPromiseArray).then(function() {
            Promise.all(templatesPromiseArray).then(function(templates) {
                resolve(templates);
            }).catch(function(err) {
                console.log('\n[partialsPromise] ',err);
                reject(err);
            });
        }).catch(function(err) {
            console.log('\n[partialsPromise] ',err);
            reject(err);
        });
    });
};
