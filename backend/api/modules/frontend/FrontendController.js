const Module=require('../primaryInfo/menu/Module')
const mongoose = require('mongoose')
const Menu=require('../primaryInfo/menu/Menu')
const SubMenu=require('../primaryInfo/menu/SubMenu')
const PrimaryInfo =require('../primaryInfo/info/PrimaryInfo')
const PermissionRole = require('../primaryInfo/acl/PermissionRole')
const District = require('../primaryInfo/districts/District')
class FrontendController {
    primaryInfo(req,res,next){
        PrimaryInfo.findOne().then(info=>{
            res.status(200).json(info)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    activeDistricts (req, res,next) {
        District.find({ status: 1 },'_id district')
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    async module(req,res,next){
        let role = req.decoded.role
        let permission = await PermissionRole.findOne({group:role})
        let perms = []
        let a = 0;
        for (a = 0; a < permission.permissions.length; a++){
            perms.push(permission.permissions[a].resource)
        }
        let Mainmenus = []
        let i = 0;
        let modules = await Module.find({status:1});
        for (i = 0; i < modules.length; i++){
            let modCom = compareArr(perms,modules[i].slug)
            if(modCom.length>0){
                let j=0;
                let myMenu = await Menu.find({module_id:modules[i]._id,status:1});
                let allData = {module:modules[i], menus:[],}
                for (j = 0; j < myMenu.length; j++){
                    let subCom = compareArr(perms,myMenu[j].slug)
                    if(subCom.length>0){
                        let subMenu = await SubMenu.find({menu_id:myMenu[j]._id,status:1});
                        let k = 0;
                        let subMenus = []
                        for(k=0;k<subMenu.length;k++){
                            let subSubCom = compareArr(perms,subMenu[k].slug)
                            if(subSubCom.length>0){
                                subMenus.push(subMenu[k])
                            }
                        }
                        allData.menus.push({menu:myMenu[j], subMenu:subMenus})
                    }
                }
                Mainmenus.push(allData)
            }
        }
       res.json(Mainmenus)
    }
    nmb(req,res,next){
        res.json('Testing Json: NM Babor')
    }
}
function compareArr(arr1,arr2){
    const finalArr = []
    arr1.forEach((e1)=>arr2.forEach((e2)=>{
        if(e1==e2){
            finalArr.push(e1)
        }
    }))
    return finalArr;
}
module.exports = new FrontendController