
const axios = require('axios')
const lastfmURL = `http://ws.audioscrobbler.com/2.0/`
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyDbupvgFW0HG7-8K2q4V_ZsRHQa6BujWn8');


var get = function (req, res) {

  axios.get(`http://ws.audioscrobbler.com/2.0/`, {
    params: {
      method: 'tag.gettoptracks',
      limit: 10,
      tag: 'happy',
      api_key: 'e9c7d3c632bfc12c58c2c258f2b52cbb',
      format: 'json'
    }
  })
  .then(response => {
    let tracks = response.data.tracks.track
    let idx = Math.floor(Math.random() * (tracks.length - 1)) + 1;
    let song = tracks[idx]
    let songTitle = `${song.artist.name} ${song.name}`
    youTube.search(songTitle, 1, function(error, result) {
      if (error) {
        res.send(error)
      }
      else {
        let response = {}
        response.status = `success`
        response.url = `https://www.youtube.com/watch?v=${result.items[0].id.videoId}`
        response.title = result.items[0].snippet.title
        res.send(response)
      }
    });
  })
  .catch(err => {
    res.send(err.message)
  })
}

module.exports = {
  get
}
