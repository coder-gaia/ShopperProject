import express from 'express';
const router = express();

router.get("/", (req, res) => {
  res.send("API route is working sucessfully!");
});

module.exports = router;