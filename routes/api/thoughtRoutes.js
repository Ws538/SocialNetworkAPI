const router = require('express').Router();

const {
  getThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThought);

module.exports = router;