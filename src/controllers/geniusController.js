import { verifyJwt } from '../services/jwtVerification.js';
import { getSongById } from 'genius-lyrics-api';
const CLIENT_TOKEN = 'eyniE5IjwThnas75VN8w0oCwESDZXu4rhA-FIfpN41ZJi6Vr2TwpI8RJsQA2frI2';
import https from 'https'

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
   getSongById(req.params.id, CLIENT_TOKEN)
       .then(song => {
           res.status(200).send(song)
       })
       .catch(error => {
           console.log(error)
       })
};


