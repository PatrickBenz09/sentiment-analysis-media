const LastFM = require('last-fm')
const lastfm = new LastFM('e9c7d3c632bfc12c58c2c258f2b52cbb', { userAgent: 'MyApp/1.0.0 (http://example.com)' })

lastfm.trackSearch({ track: 'the greatest' }, (err, data) => {
  if (err) console.error(err)
  else console.log(data)
})
