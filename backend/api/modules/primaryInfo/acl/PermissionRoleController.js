const PermissionRole = require('./PermissionRole')
const Role = require('./Role')
const fs = require('fs');
async function writeAclJson(){
    const acl=[];
    try{
        var allData = await PermissionRole.find()
        allData.forEach(data=>{
            data.permissions.forEach( function(d, i) {
                if (d.methods[0] === "*" ){
                    data.permissions[i].methods = "*"
                }
                data.permissions[i].resource = d.resource + "/*"
            })
            data.permissions.push( {
                "resource": "frontend/*",
                "methods": "*",
                "action": "allow"
            })
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
    }catch(err){
        return "Error";
    }
}
class PermissionRoleController{
//View all Data
    index(req,res,next){
        PermissionRole.find()
            .then(allData => {
                res.json(allData)
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//single user show
    async show(req,res,next){
        let role = await Role.findById(req.params.id)
        let perm = {}
       let data = await PermissionRole.findOne({group:role.slug})
        if(data != null) {
            let lng = data.permissions.length
            let i =0
            for(i=0;i<lng;i++){
                perm[data.permissions[i].resource] = data.permissions[i].methods
            }
        }
        res.status(200).json({group:role.slug,permissions:perm})
    }
//Store Data into DB
    store(req,res,next){
        let newInput = req.body
        let perms=[];
        /*newInput.permissions.forEach(function(perm, slug) {
            perms.push({
                resource:slug,
                methods:perm,
                action:"allow"
            })
        })*/
        if(Array.isArray(newInput.resource)){
            newInput.resource.forEach(function(slug) {
                let p =newInput.methods
                perms.push({
                    resource:slug,
                    methods:newInput['methods_'+slug],
                    action:"allow"
                })
            })
        }else{
            perms.push({
                resource:newInput.resource,
                methods:newInput['methods_'+newInput.resource],
                action:"allow"
            })
        }

        let input = {
            group:newInput.group,
            permissions:perms
        }
        PermissionRole.findOne({group:newInput.group}).then(result=>{
            if(result==null){
                const role = new PermissionRole(input)
                role.save().then(data=>{
                    writeAclJson();
                    res.status(201).json({
                        message:'Data successfully inserted.',
                        result:data
                    })
                }).catch(err1 => {
                    res.status(500).json({
                        message:'Some Error found!',
                        error:err1
                    })
                })
            }else{
                PermissionRole.findByIdAndUpdate(result._id,{$set:input})
                    .then(data=>{
                        writeAclJson();
                        res.status(201).json({
                            message:'Data successfully Updated.',
                            result:data
                        })
                    })
                    .catch(err2=>{
                        res.status(500).json({
                            message:'Something error founds!',
                            error:err2
                        })
                    })
            }
        }).catch(errors=>{
            res.status(500).json({
                message:'Something errors found!',
                error:errors
            })
        })


    }
    //Delete data
    delete(req, res,next) {
        PermissionRole.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }



}
module.exports = new PermissionRoleController;