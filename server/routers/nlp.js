'use strict'

const express = require('express');
const router = express.Router();

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '86645a88-aa13-42d8-9aaa-5dcfeb280ccc',
  'password': 'CMvrdU2ttMDl',
  'version_date': '2017-02-27'
});

router.post('/', (req, res) => {
  var parameters = {
    'text': req.body.post,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  }

  natural_language_understanding.analyze(parameters, function(err, response) {
    if (err)
      console.log('error:', err);
    else {
      console.log(JSON.stringify(response, null, 2));
      res.send(response);
    }
  });

});

module.exports = router;
