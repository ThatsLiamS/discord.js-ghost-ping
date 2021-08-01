module.exports = {
	ignore: (object, message) => {

		let result = false;

		if(object && object.ignore) {

			const ignore = object.ignore;

			if(ignore && ignore.permissions && result == false) {

				if(Array.isArray(ignore.permissions)) {
					ignore.permissions.forEach((perm) => {
						if(message.member.permissions.has(perm)) { result = true; }
					});
				}

			}
			if(ignore && ignore.roles && result == false) {

				if(Array.isArray(ignore.roles)) {
					ignore.roles.forEach((role) => {
						if (message.member.roles.cache.has(role)) { result = true; }
					});
				}

			}

			if(ignore && ignore.channels && result == false) {

				if(Array.isArray(ignore.channels)) {
					if(ignore.channels.includes(message.channel.id)) { result = true; }
				}

			}

			if(ignore && ignore.users && result == false) {

				if(Array.isArray(ignore.users)) {
					if(ignore.users.includes(message.author.id)) { result = true; }
				}

			}
		}

		return result;

	}
};