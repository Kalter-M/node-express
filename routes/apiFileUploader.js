const express = require('express');
const router = express.Router();
const fs = require('fs');
const { pipeline } = require('stream');

const dir = './files/';

//MAIN
router.get('/', function(req, res) {
    fs.readdir(dir ,function (err, files) {
        if(err) {
            res.status(500).send('something wrong');
            console.log(err);
        } else res.json(files);
    });
});

//DOWNLOAD FILE
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
                            res.status(500).send('something wrong');
                            console.error(err);
                        }
                    }
                )
            }
        }
    });
});

//DELETE FILE
router.post('/:fileId', function (req,res) {
    const path = dir + req.params.fileId;
    fs.unlink(path, function (err) {
        if (err) {
            res.status(500).send('something wrong');
            console.log(err);
        }
    });
    res.status(200).send('file deleted')
});

//UPLOAD FILE
router.post('/', function(req, res) {
    if(req.query.name.indexOf('/') === -1) {
        const path = dir + req.query.name;
        pipeline(
            req,
            fs.createWriteStream(path),
            function (err) {
                if(err) {
                    res.status(500).send('something wrong');
                    console.error(err);
                } else res.status(200).send('file uploaded');
            });
    } else res.status(500).send('give normal name');

});
module.exports = router;
