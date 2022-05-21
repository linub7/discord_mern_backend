const Joi = require('joi');

exports.postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().required(),
});
