const User = require('../users/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController{
    async login(req,res,next){
        try{
            let email = req.body.email
            let password = req.body.password
            let user = await User.findOne({email});
            if(user!==null){
                let pass = await bcrypt.compare(password, user.password);
                if(pass){
                    let token = jwt.sign({name: user.name, email: user.email, _id: user._id,role:user.role,company_id:user.company_id,branch_id:user.branch_id}, 'Inventory', {expiresIn: "24h"})
                   return res.json({
                        message: 'Login Successfully.',
                        token
                    })
                }else{
                    return res.status(401).json({
                        message: 'Login Faild. password doesn\'t matched!'
                    })
                }
            }else{
                return res.status(400).json({
                    message: 'User not found!'
                })
            }


        }catch(e){
            res.status(500).json(e)
        }
    }

    async addNewUser(req,res,next){

        try{
            let password =await bcrypt.hash('123456', 10)
            let user = await User.create({name:'System Admin',email:'support@leamtech.com',password:password,mobile:"018",role:"system",company_id:null,branch_id:null});
            return res.json(user)
        }catch(e){
            res.status(500).json(e)
        }

    }
}
module.exports = new AuthController