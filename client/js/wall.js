$(function() {
  //let socket = io.connect();

  //GET
  let $username = $('#username')

  axios.get('/wall')
  .then(res => {
    console.log(res);
    $username.html('hay');
  })
  .catch(err => {
    console.log(err);
  })

  // POST
  let $processForm = $('#processForm');
  let $processed = $('#processed');

  let $postForm = $('#postForm');
  let $postReview = $('#postReview');
  let $emotionSpectrums = $('#emotionSpectrums');
  let $post_collection = $('#postCollection');

  $processForm.submit(function(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/nlp', {
      post: $processed.val(),
      username: $username.html()
    })
    .then(res => {
      let sentimentOverallFromKeywordsSum = 0;
      let sentimentOverallFromKeywordsCondition = "";
      let sentimentOverallFromKeywordsConclusion = "Unknown";

      let sentimentEmotionSpectrumFromKeywords = {
        sadness: 0, joy: 0, fear: 0, disgust: 0, anger: 0
      }

      console.log(res);
      if(res.data.entities.length != 0) {
        //
      } else {
        res.data.keywords.forEach(k => {
          sentimentOverallFromKeywordsSum += (k.sentiment.score * 100);

          sentimentEmotionSpectrumFromKeywords.sadness += k.emotion.sadness
          sentimentEmotionSpectrumFromKeywords.joy += k.emotion.joy
          sentimentEmotionSpectrumFromKeywords.fear += k.emotion.fear
          sentimentEmotionSpectrumFromKeywords.disgust += k.emotion.disgust
          sentimentEmotionSpectrumFromKeywords.anger += k.emotion.anger
        })

        sentimentEmotionSpectrumFromKeywords.sadness /= res.data.keywords.length
        sentimentEmotionSpectrumFromKeywords.joy /= res.data.keywords.length
        sentimentEmotionSpectrumFromKeywords.fear /= res.data.keywords.length
        sentimentEmotionSpectrumFromKeywords.disgust /= res.data.keywords.length
        sentimentEmotionSpectrumFromKeywords.anger /= res.data.keywords.length
        sentimentOverallFromKeywordsSum /= res.data.keywords.length;

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
      }

      $post_collection.html(`
        <div>Your Feeling: <br>${sentimentOverallFromKeywordsConclusion}</div>`)
      // console.log(res.data.post);
      // $post_collection.prepend(`
      //   <div>${res.data.post}</div>
      //   <div>posted by ${res.data.username}</div>`)
      //socket.emit('create post', res.data.username, res.data.post);

      $emotionSpectrums.html(
      `
      <label>SADNESS</label>
      <div class="progress">
        <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
        aria-valuenow="${sentimentEmotionSpectrumFromKeywords.sadness * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${sentimentEmotionSpectrumFromKeywords.sadness * 100}%">
          ${sentimentEmotionSpectrumFromKeywords.sadness * 100}%
        </div>
      </div>

      <label>JOY</label>
      <div class="progress">
        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
        aria-valuenow="${sentimentEmotionSpectrumFromKeywords.joy * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${sentimentEmotionSpectrumFromKeywords.joy * 100}%">
          ${sentimentEmotionSpectrumFromKeywords.joy * 100}%
        </div>
      </div>

      <label>FEAR</label>
      <div class="progress">
        <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
        aria-valuenow="${sentimentEmotionSpectrumFromKeywords.fear * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${sentimentEmotionSpectrumFromKeywords.fear * 100}%">
          ${sentimentEmotionSpectrumFromKeywords.fear * 100}%
        </div>
      </div>

      <label>DISGUST</label>
      <div class="progress">
        <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
        aria-valuenow="${sentimentEmotionSpectrumFromKeywords.disgust * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${sentimentEmotionSpectrumFromKeywords.disgust * 100}%">
          ${sentimentEmotionSpectrumFromKeywords.disgust * 100}%
        </div>
      </div>

      <label>ANGER</label>
      <div class="progress">
        <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
        aria-valuenow="${sentimentEmotionSpectrumFromKeywords.anger * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${sentimentEmotionSpectrumFromKeywords.anger * 100}%">
          ${sentimentEmotionSpectrumFromKeywords.anger * 100}%
        </div>
      </div>
      `);

      $postForm.submit(function(e) {
        e.preventDefault();

        console.log(`${highestEmotionSpectrumFromKeywords[0][0]}: ${highestEmotionSpectrumFromKeywords[0][1]}`);

        axios.post('http://localhost:3000/song', {
          highest_emotion_from_keywords: highestEmotionSpectrumFromKeywords[0][0]
        })
        .then(result => {
          console.log(result);
        })
        .catch();
      })
    })
    .catch(err => {
      console.log(err);
    })
  })

  // socket.on('new post', (data) => {
  //   $post_collection.prepend(`
  //     <div>${data.post}</div>
  //     <div>posted by ${data.username}</div>`)
  // })

})
