/**
 * @param {object} message - Discord message object
 *
 * @param {array} permissions - list of permissions to ignore
 * @param {array} roles - list of role IDs to ignore
 * @param {array} channels - list of channel IDs to ignore
 * @param {array} users - list of user IDs to ignore
 *
 * @returns {boolean}
**/
const ignore = ({ permissions, roles, channels, users }, message) => {

	let result = false;

	if((permissions && Array.isArray(permissions)) && result == false) {
		permissions.forEach((perm) => {
			if(message.member.permissions.has(perm)) result = true;
		});
	}

	if((roles && Array.isArray(roles)) && result == false) {
		roles.forEach((role) => {
			if (message.member.roles.cache.has(role)) result = true;
		});
	}

	if((channels && Array.isArray(channels)) && result == false) {
		if(channels.includes(message.channel.id)) return true;
	}

	if((users && Array.isArray(users)) && result == false) {
		if(users.includes(message.author.id)) return true;
	}

	return result;
};

module.exports = ignore;