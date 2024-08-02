const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { ip, code } = req.body;
  res.status(200).send({
    ip,
    code,
    taskDuration: 100,
  });
});

module.exports = router;
