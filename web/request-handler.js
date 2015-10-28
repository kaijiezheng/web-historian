var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  if (action) {
    action(req, res);
  }

  // post of type form
  // sending url
  // statusCode 302

};


var actions = {
  'GET': function(req, res) {
    if (req.url === '/') { // serve index
      fs.createReadStream(path.join(__dirname, '../index.html')).pipe(res);
    } else if (req.url === '/www.google.com') { // serve existent file
      res.end('/google/');
    } else { // 404 when non-existent
      res.writeHead(404);
      res.end();
    }
    //
  },
  'POST': function(req, res) {
    //
    var data = '';
    req.on('data', function(chunk) {
      //
      data += chunk;
    });

    req.on('end', function() {
      // write data to sites.txt, 'url=www....'
      fs.appendFile(path.join(__dirname, '../test/testdata/sites.txt'), data.slice(4) + '\n');

      // 302 if found
      res.writeHead(302);
      res.end();
    });
  },
  'OPTIONS': function(request, response) {
    //
  }
};


// request
//           .post("/")
//           .type('form')
//           .send({ url: url })
//           .expect(302, function (err) {
//             if (!err) {
//               var fileContents = fs.readFileSync(archive.paths.list, 'utf8');
//               expect(fileContents).to.equal(url + "\n");
//             }

//             done(err);
//           });
//       });
