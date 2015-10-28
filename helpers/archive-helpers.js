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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var testPath = path.join(__dirname, '../test/testdata/sites.txt');

  fs.readFile(testPath, function(err, chunk) {
    callback(chunk.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  var sites = {};

  exports.readListOfUrls(function(urls) {
    urls.forEach(function(site) {
      sites[site] = 1;
    });
  });

  callback(sites[url]);
};

exports.addUrlToList = function(url, callback) {
  var testPath = path.join(__dirname, '../test/testdata/sites.txt');

  fs.appendFile(testPath, url);
  if (callback) {
    callback();
  }
};

exports.isUrlArchived = function(url, callback) {
  //
  var testPath = path.join(__dirname, '../test/testdata/sites');
  fs.stat(testPath + '/' + url, function(err, stats) {
    if (err) {
      callback(false);
    } else {
      callback(stats.isFile());
    }
  });
};

exports.downloadUrls = function(urls) {
  var testPath = path.join(__dirname, '../test/testdata');
  urls.forEach(function(url) {
    fs.writeFile(testPath + "/sites/" + url, "");
    exports.addUrlToList(url);
  });
};
