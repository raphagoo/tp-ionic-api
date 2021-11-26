import { verifyJwt } from '../services/jwtVerification.js';
import { getSongById } from 'genius-lyrics-api';
const CLIENT_TOKEN = 'qavXPWKYl9ZF8c8RjJqrXfpOCzQNULCLqA4tizAJRzfLHbHYXi9uDG7eV7HfPxDu';
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


