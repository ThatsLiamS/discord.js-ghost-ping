function checkPerms(member, perms){
    let result = false

    /* Checks if the array exists */
    if(!perms || perms === [] || (typeof perms !== 'array')) return result

    /* Loops through all permissions and checks them */
    perms.forEach((permission) => {
        if(member.hasPermission(permission)){
            result = true
        }
    })

    /* returns a boolean */
    return result
}

module.exports = {
    checkPerms
}