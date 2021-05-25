function checkPerms(member, perms){
    let result = false

    if(!perms || perms == []) return result

    perms.forEach((permission) => {
        if(member.hasPermission(permission)){
            result = true
        }
    })

    return result
}

module.exports = {
    checkPerms
}