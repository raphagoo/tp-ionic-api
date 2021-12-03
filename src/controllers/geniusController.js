import { getSongById } from 'genius-lyrics-api';
const CLIENT_TOKEN = 'qavXPWKYl9ZF8c8RjJqrXfpOCzQNULCLqA4tizAJRzfLHbHYXi9uDG7eV7HfPxDu';
import https from 'https';
import SpotifyWebApi from "spotify-web-api-node";
const SPOT_CLIENT_ID = 'cc4fa3105f4543698ac3f440d66787cd';
const SPOT_CLIENT_SECRET = 'a7daf3855d9d4b61963e662cf0b3c500';
const SPOT_TOKEN = 'BQBto9_r0kTB2GlscnXkanQjX-XKvS5sUJeNSfKG5yGKCH1O6MaBW3OKu4kfDpHlKoxuWtz2_W5qKcPCiTiJhhsCF6GVGZHbdzL_5-dqCnIs39zw1fiytSHwJEETgwCOWUB_-Ya0risjimkT'



export const search = (req, res) => {
    let output = ''
    const options = {
        hostname: 'api.genius.com',
        port: 443,
        method: 'GET',
        path: '/search?q=' + encodeURIComponent(req.query.term),
        headers: {
            Authorization: 'Bearer ' + CLIENT_TOKEN
        }
    }

    const request = https.request(options, response => {
        response.on('data', function (chunk) {
            output += chunk
        });
        response.on('end', () => {
            res.status(200).send(output)
        });
    })
    request.on('error', error => {
        res.sendStatus(500)
    })

    request.end();
    output = '';
};

export const getSong = (req, res) => {
    let output = ''
    const options = {
        hostname: 'api.genius.com',
        port: 443,
        method: 'GET',
        path: '/songs/' + req.params.id,
        headers: {
            Authorization: 'Bearer ' + CLIENT_TOKEN
        }
    }

    const request = https.request(options, response => {
        response.on('data', function (chunk) {
            output += chunk
        });
        response.on('end', () => {
            getSongById(req.params.id, CLIENT_TOKEN)
                .then(song => {
                    let json = {geniusInfos: JSON.parse(output), song: song}
                    res.status(200).send(json)
                })
                .catch(error => {
                    console.log(error)
                })
        });
    })
    request.on('error', error => {
        res.sendStatus(500)
    })

    request.end();
    output = '';
};

export const stream = (req, res) => {

    // Create the api object with the credentials
    let spotifyApi = new SpotifyWebApi({
        clientId: SPOT_CLIENT_ID,
        clientSecret: SPOT_CLIENT_SECRET
    });


    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.getTrack(req.params.id).then(response => {
                console.log(response.body)
            })
        },
        function(err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
}

