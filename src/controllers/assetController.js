import * as fs from 'fs';
export const getAssetFile = (req, res) => {
    const filePath = "./.well-known/assetlinks.json"; // or any file format

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        res.status(200).send(json)
    });
};
