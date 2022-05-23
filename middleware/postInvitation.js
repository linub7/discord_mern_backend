const Joi = require('joi');

exports.postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().required(),
});

exports.inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});
