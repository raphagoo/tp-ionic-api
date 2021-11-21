import { verifyJwt } from '../services/jwtVerification.js';
const CLIENT_TOKEN = 'snERP8Zl8xvQorLhQs_-uUGVx0OXl2bR_Ng1u2JPURL-pnYgIQFoURCVV3gTH6M7';
import https from 'https'

export const search = (req, res) => {
    if(verifyJwt(req) === true){
        let output = ''
        const options = {
            hostname: 'api.genius.com',
            port: 443,
            method: 'GET',
            path: '/search?q=' + req.query.term,
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

        request.end()
    }
    else{
        res.sendStatus(403);
    }
};


