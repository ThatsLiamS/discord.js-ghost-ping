function perms(member, array) {
	let result = false;

	/* Checks if the array exists */
	if(!array || array === [] || (array instanceof Array == false)) { return result; }

	/* Loops through all permissions and checks them */
	array.forEach((permission) => {
		if(member.hasPermission(permission)) {
			result = true;
		}
	});

	/* returns a boolean */
	return result;
}

module.exports = {
	perms
};