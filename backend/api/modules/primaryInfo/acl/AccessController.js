const PermissionRole = require('./PermissionRole')
const fs = require('fs');
class AccessController{

    async index(req,res){
        const acl=[];
        try{
            var allData = await PermissionRole.find()
            allData.forEach(data=>{
                acl.push({
                    group: data.group,
                    permissions: data.permissions
                })
            })
            let data = JSON.stringify(acl, null, 2);
            fs.writeFile('nacl.json', data, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
            res.json(acl)
        }catch(err){
            return [];
        }
        //return acl;
    }
    test(req,res,next){
        let newInput = {
            role:"admin",
            permissions:[
                {
                    resource:"users",
                    methods:["POST", "GET", "PUT"]
                },
                {
                    resource:"menu",
                    methods:["POST"]
                }
            ]
        }
        let perms=[];
        newInput.permissions.forEach(perm=>{
            perms.push({
                resource:perm.resource,
                methods:perm.methods,
                action:"allow"
            })
        })
        let input = {
            group:newInput.role,
            permissions:perms
        }
        res.json(input);

    }
}
module.exports = new AccessController;