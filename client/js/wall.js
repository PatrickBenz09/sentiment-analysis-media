$(function() {
  //let socket = io.connect();

  //GET
  let $post_collection = $('#postCollection');
  let $username = $('#username')
  $username.html(localStorage.getItem('nameUser'));

  axios.get('http://localhost:3000/users')
  .then(res => {
    console.log(res);
    console.log('aaaaaaaaaaaaaaaaaaaaaaa');
    res.data.forEach(r => {
      $post_collection.prepend(`
        <div>name: ${r.nama}</div>
        <div>email: ${r.email}</div>`);
    })

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


  $processForm.submit(function(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/nlp', {
      post: $processed.val(),
      username: $username.html()
    })
    .then(res => {

      console.log(res.data);
      $post_collection.html(`
        <div>Your Feeling: <br>${res.data.sentimentOverallFromKeywordsConclusion}</div>`)
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
        aria-valuenow="${res.data.sentimentEmotionSpectrumFromKeywords.sadness * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${res.data.sentimentEmotionSpectrumFromKeywords.sadness * 100}%">
          ${res.data.sentimentEmotionSpectrumFromKeywords.sadness * 100}%
        </div>
      </div>

      <label>JOY</label>
      <div class="progress">
        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
        aria-valuenow="${res.data.sentimentEmotionSpectrumFromKeywords.joy * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${res.data.sentimentEmotionSpectrumFromKeywords.joy * 100}%">
          ${res.data.sentimentEmotionSpectrumFromKeywords.joy * 100}%
        </div>
      </div>

      <label>FEAR</label>
      <div class="progress">
        <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
        aria-valuenow="${res.data.sentimentEmotionSpectrumFromKeywords.fear * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${res.data.sentimentEmotionSpectrumFromKeywords.fear * 100}%">
          ${res.data.sentimentEmotionSpectrumFromKeywords.fear * 100}%
        </div>
      </div>

      <label>DISGUST</label>
      <div class="progress">
        <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
        aria-valuenow="${res.data.sentimentEmotionSpectrumFromKeywords.disgust * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${res.data.sentimentEmotionSpectrumFromKeywords.disgust * 100}%">
          ${res.data.sentimentEmotionSpectrumFromKeywords.disgust * 100}%
        </div>
      </div>

      <label>ANGER</label>
      <div class="progress">
        <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
        aria-valuenow="${res.data.sentimentEmotionSpectrumFromKeywords.anger * 100}" aria-valuemin="0" aria-valuemax="100" style="width:${res.data.sentimentEmotionSpectrumFromKeywords.anger * 100}%">
          ${res.data.sentimentEmotionSpectrumFromKeywords.anger * 100}%
        </div>
      </div>
      `);

      $postForm.submit(function(e) {
        e.preventDefault();

        console.log(`${res.data.highestEmotionSpectrumFromKeywords[0][0]}: ${res.data.highestEmotionSpectrumFromKeywords[0][1]}`);

        axios.post('http://localhost:3000/song', {
          emotion: res.data.highestEmotionSpectrumFromKeywords[0][0]
        })
        .then(result => {
          $post_collection.append(`
          <div class="item">
            <h2>${result.data.title}</h2>
            <iframe class="video w100" width="640" height="360" src="${result.data.url}" frameborder="0" allowfullscreen></iframe>
          </div>
            `);
          console.log(result);
          return axios.post('http://localhost:3000/posts', {
            post: $processed.val(),
            emotion: res.data.highestEmotionSpectrumFromKeywords[0][0],
            song: result.data.url,
            email: localStorage.getItem('emailUser')
          })
          .then(result2 => {
            console.log(result2.data);
          })
          .catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
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
