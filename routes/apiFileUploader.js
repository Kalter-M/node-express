const express = require('express');
const router = express.Router();
const fs = require('fs');
const { pipeline } = require('stream');

const dir = './storage/';

//get file list
router.get('/', function(req, res) {
    fs.readdir(dir ,function (err, files) {
        if(err) {
            res.status(500).send('Unable to get file list');
            console.log(err);
        } else res.json(files);
    });
});

//download file
router.get('/:fileId', function(req, res) {
    fs.readdir(dir ,function (err, files) {
        if(err) {
            console.log(err)
        } else {
            if (files.indexOf(req.params.fileId) != null){
                const path = dir + req.params.fileId;
                pipeline(
                    fs.createReadStream(path),
                    res,
                    function (err) {
                        if(err) {
                            res.status(500).send('File read error');
                            console.error(err);
                        }
                    }
                )
            }
        }
    });
});

//delete file
router.post('/:fileId', function (req,res) {
    const path = dir + req.params.fileId;
    fs.unlink(path, function (err) {
        if (err) {
            res.status(500).send('File delete error');
            console.log(err);
        }
    });
    res.status(200).send('Deleted')
});

//upload file
router.post('/', function(req, res) {
    if(!console.error(req.query.hasOwnProperty("name"))) {
        if (req.query.name.indexOf('/') === -1) {
            const path = dir + req.query.name;
            pipeline(
                req,
                fs.createWriteStream(path),
                function (err) {
                    if (err) {
                        res.status(500).send('File loading error');
                        console.error(err);
                    } else res.status(200).send('Uploaded');
                });
        } else res.status(400).send('Bad parameter "name"');
    } else res.status(400).send('Parameter "name" not defined');
});
module.exports = router;
