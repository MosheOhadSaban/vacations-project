const express = require("express");
const router = express.Router();

router.post("/upload", (request, response   ) => {
    const newpath = __dirname + "/../files/";
    const file = request.files.file;
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            response.status(500).send({ message: "File upload failed", code: 445 });
            return
        }
        let filePath = `http://127.0.0.1:3001/${filename}`
        response.json(filePath)
    });
});

module.exports = router;
