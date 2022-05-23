const express = require('express');
const {
  postInvite,
  rejectInvite,
  acceptInvite,
} = require('../controllers/friendInvitation');
const { verifyToken } = require('../middleware/authValidation');
const {
  postFriendInvitationSchema,
  inviteDecisionSchema,
} = require('../middleware/postInvitation');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();

router.post(
  '/friend-invitation/invite',
  verifyToken,
  validator.body(postFriendInvitationSchema),
  postInvite
);
router.post(
  '/friend-invitation/accept',
  verifyToken,
  validator.body(inviteDecisionSchema),
  acceptInvite
);
router.post(
  '/friend-invitation/reject',
  verifyToken,
  validator.body(inviteDecisionSchema),
  rejectInvite
);

module.exports = router;
