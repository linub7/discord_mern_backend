const express = require('express');
const { postInvite } = require('../controllers/friendInvitation');
const { verifyToken } = require('../middleware/authValidation');
const { postFriendInvitationSchema } = require('../middleware/postInvitation');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();

router.post(
  '/friend-invitation/invite',
  verifyToken,
  validator.body(postFriendInvitationSchema),
  postInvite
);

module.exports = router;
