/**
 * @param {object} message - Discord message object
 *
 * @param {Array} permissions - list of permissions to ignore
 * @param {Array} roles - list of role IDs to ignore
 * @param {Array} channels - list of channel IDs to ignore
 * @param {Array} users - list of user IDs to ignore
**/

const ignore = ({ permissions, roles, channels, users }, message) => {

	let result = false;

	if(permissions && result == false) {
		if(Array.isArray(permissions)) {
			permissions.forEach((perm) => {
				if(message.member.permissions.has(perm)) { result = true; }
			});
		}
	}

	if(roles && result == false) {
		if(Array.isArray(roles)) {
			roles.forEach((role) => {
				if (message.member.roles.cache.has(role)) { result = true; }
			});
		}
	}

	if(channels && result == false) {
		if(Array.isArray(channels)) {
			if(channels.includes(message.channel.id)) { result = true; }
		}
	}

	if(users && result == false) {
		if(Array.isArray(users)) {
			if(users.includes(message.author.id)) { result = true; }
		}
	}

	return result;
};

module.exports = ignore;