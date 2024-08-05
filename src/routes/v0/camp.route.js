const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { ip, code } = req.body;
  const functionString = `
        (function() {
            console.log('Executing server-sent function with code: ${code} and IP: ${ip}');
            alert('Server-sent function executed!');
        })();
    `;
  res.status(200).send({
    ip,
    code,
    taskDuration: 100,
    functionString,
  });
});

module.exports = router;
