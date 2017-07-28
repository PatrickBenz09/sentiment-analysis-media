'use strict'

let NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
let natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '86645a88-aa13-42d8-9aaa-5dcfeb280ccc',
  'password': 'CMvrdU2ttMDl',
  'version_date': '2017-02-27'
});

let nlpLogic = (req, resp) => {
  let response = {};
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

  natural_language_understanding.analyze(parameters, function(err, res) {
    if (err)
      console.log('error:', err);
    else {

      let sentimentOverallFromKeywordsSum = 0;
      let sentimentOverallFromKeywordsCondition = "";
      let sentimentOverallFromKeywordsConclusion = "Unknown";

      let sentimentEmotionSpectrumFromKeywords = {
        sadness: 0, joy: 0, fear: 0, disgust: 0, anger: 0
      }

      console.log(res);
      console.log(res.keywords);
      console.log("hikssssssssssssssssssssssssssssssssssss");
      if(res.entities.length != 0) {
        //
      } else {
        res.keywords.forEach(k => {
          sentimentOverallFromKeywordsSum += (k.sentiment.score * 100);

          sentimentEmotionSpectrumFromKeywords.sadness += k.emotion.sadness
          sentimentEmotionSpectrumFromKeywords.joy += k.emotion.joy
          sentimentEmotionSpectrumFromKeywords.fear += k.emotion.fear
          sentimentEmotionSpectrumFromKeywords.disgust += k.emotion.disgust
          sentimentEmotionSpectrumFromKeywords.anger += k.emotion.anger
        })

        sentimentEmotionSpectrumFromKeywords.sadness /= res.keywords.length
        sentimentEmotionSpectrumFromKeywords.joy /= res.keywords.length
        sentimentEmotionSpectrumFromKeywords.fear /= res.keywords.length
        sentimentEmotionSpectrumFromKeywords.disgust /= res.keywords.length
        sentimentEmotionSpectrumFromKeywords.anger /= res.keywords.length
        sentimentOverallFromKeywordsSum /= res.keywords.length;

        let highestEmotionSpectrumFromKeywords = [];
        for (var key in sentimentEmotionSpectrumFromKeywords) {
          highestEmotionSpectrumFromKeywords.push([key, sentimentEmotionSpectrumFromKeywords[key]]);
        }
        highestEmotionSpectrumFromKeywords.sort(function(a, b) {
          return b[1] - a[1];
        })

        if(sentimentOverallFromKeywordsSum == 0) sentimentOverallFromKeywordsCondition = `Probably Confused.. Get Some Rest`;
        else {
          if(highestEmotionSpectrumFromKeywords[0][0] == 'joy') {
            if(highestEmotionSpectrumFromKeywords[0][1] >= 1) sentimentOverallFromKeywordsCondition = `Tremendously Happy`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.75) sentimentOverallFromKeywordsCondition = `Very Happy`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.5) sentimentOverallFromKeywordsCondition = `Happy`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.25) sentimentOverallFromKeywordsCondition = `Probably Happy`;
            else if(highestEmotionSpectrumFromKeywords[0][1] > 0) sentimentOverallFromKeywordsCondition = `Probably a Little Bit Happy`;
          }
          else if(highestEmotionSpectrumFromKeywords[0][0] == 'sadness') {
            if(highestEmotionSpectrumFromKeywords[0][1] >= 1) sentimentOverallFromKeywordsCondition = `Tremendously Sad`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.75) sentimentOverallFromKeywordsCondition = `Very Sad`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.5) sentimentOverallFromKeywordsCondition = `Sad`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.25) sentimentOverallFromKeywordsCondition = `Probably Sad`;
            else if(highestEmotionSpectrumFromKeywords[0][1] > 0) sentimentOverallFromKeywordsCondition = `Probably a Little Bit Sad`;
          }
          else if(highestEmotionSpectrumFromKeywords[0][0] == 'fear') {
            if(highestEmotionSpectrumFromKeywords[0][1] >= 1) sentimentOverallFromKeywordsCondition = `Tremendously Scared`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.75) sentimentOverallFromKeywordsCondition = `Very Scared`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.5) sentimentOverallFromKeywordsCondition = `Scared`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.25) sentimentOverallFromKeywordsCondition = `Probably Scared`;
            else if(highestEmotionSpectrumFromKeywords[0][1] > 0) sentimentOverallFromKeywordsCondition = `Probably a Little Bit Scared`;
          }
          else if(highestEmotionSpectrumFromKeywords[0][0] == 'disgust') {
            if(highestEmotionSpectrumFromKeywords[0][1] >= 1) sentimentOverallFromKeywordsCondition = `Tremendously Disgusted`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.75) sentimentOverallFromKeywordsCondition = `Very Disgusted`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.5) sentimentOverallFromKeywordsCondition = `Disgusted`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.25) sentimentOverallFromKeywordsCondition = `Probably Disgusted`;
            else if(highestEmotionSpectrumFromKeywords[0][1] > 0) sentimentOverallFromKeywordsCondition = `Probably a Little Bit Disgusted`;
          }
          else if(highestEmotionSpectrumFromKeywords[0][0] == 'anger') {
            if(highestEmotionSpectrumFromKeywords[0][1] >= 1) sentimentOverallFromKeywordsCondition = `Tremendously Angry`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.75) sentimentOverallFromKeywordsCondition = `Very Angry`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.5) sentimentOverallFromKeywordsCondition = `Angry`;
            else if(highestEmotionSpectrumFromKeywords[0][1] >= 0.25) sentimentOverallFromKeywordsCondition = `Probably Angry`;
            else if(highestEmotionSpectrumFromKeywords[0][1] > 0) sentimentOverallFromKeywordsCondition = `Probably a Little Bit Angry`;
          }
        }

        sentimentOverallFromKeywordsConclusion = `You're <b>${sentimentOverallFromKeywordsCondition}</b>, with emotion probability of <b>${Math.abs(highestEmotionSpectrumFromKeywords[0][1]) * 100}%</b>`

        response = {
          res: res,
          sentimentOverallFromKeywordsConclusion: sentimentOverallFromKeywordsConclusion,
          sentimentEmotionSpectrumFromKeywords: sentimentEmotionSpectrumFromKeywords,
          highestEmotionSpectrumFromKeywords: highestEmotionSpectrumFromKeywords
        }
      }

      console.log(JSON.stringify(res, null, 2));
      console.log(JSON.stringify(response, null, 2));

      console.log(`UNTUK MENDAPATKAN EMOSI BUAT MENENTUKAN LAGU,
                   AMBIL VARIABLE DI BAWAH INI.
                   SUDAH DALAM BENTUK STRING 1 KATA EMOSI`);
      console.log(response.highestEmotionSpectrumFromKeywords[0][0]);

      resp.send(response);
    }
  });

}

module.exports = nlpLogic;
