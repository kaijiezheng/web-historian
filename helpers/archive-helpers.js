var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(path.join(__dirname, "../test/testdata/sites.txt"), function(err, data){
    if(err){console.log(err)}
    callback(data.toString().split('\n')); 
  });
};

exports.isUrlInList = function(url, callback) {
  var urlTable = {};
  fs.readFile(path.join(__dirname, "../test/testdata/sites.txt"), function(err, data){
    if(err){console.log(err)}

    var urls = data.toString().split('\n');
    urls.forEach(function(site) {
      urlTable[site] = 1;
    });
    callback(urlTable[url]);
  });
};

exports.addUrlToList = function(url, callback) {
   fs.appendFile(path.join(__dirname, '../test/testdata/sites.txt'), url+"\n");
   callback();
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(path.join(__dirname, "../test/testdata/sites/"+url), function(err, stats){
    if (err) {
      callback(stats)
    } else {
      callback(stats.isFile());
    }
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function(site){
    fs.writeFile(path.join(__dirname, "../test/testdata/sites/"+site), function(err, data){
      if (err) {
        console.log(err);
      } else {
        // fs.appendFile(path.join(__dirname, "../test/testdata/sites.txt", site + '\n'));
      }
    });
  });
};


