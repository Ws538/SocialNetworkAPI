const router = require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  removeReaction,
  addReaction,
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThought)
.post(createThought)

router.route('/:thoughtsId')
.get(getSingleThought)
.delete(deleteThought)

router.route('/:thoughtsId/reactions')
.post(addReaction)

router.route('/:thoughtsId/reactions/:reactionId')
.delete(removeReaction)
module.exports = router;