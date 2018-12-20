const jwt = require('jsonwebtoken')
const acl = require('express-acl')
const Auth  =require('./modules/primaryInfo/auth/AuthController')
let FrontendController = require('./modules/frontend/FrontendController')
acl.config({
    filename: 'nacl.json',
    baseUrl: 'api',
    yml: true
});
module.exports = function (app, express) {
    var ROUTER = express.Router();
    app.get('/', (req,res) => {
        res.json('Documentation is coming soon')
    });
    app.get('/add-new-user',Auth.addNewUser)
    app.post('/api/login',Auth.login)
    /* Auth Middleware */
    ROUTER.use(function (req, res, next) {
        try {
            let token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return next(new Error('No token Provided'));
            }

            jwt.verify(token, 'Inventory', function (err, decoded) {
                if (err) {
                    return res.status(401).json(err);
                }
                req.decoded = decoded;
                return next();
            });
        } catch (e) {
            res.status(401).json({
                message: 'Authentication Faild!'
            })
        }
    });
    app.get('/api/frontend/info', FrontendController.primaryInfo);
    app.get('/api/nmb', FrontendController.nmb);
    //ROUTER.use(acl.authorize);
    /* All route under Middleware */
    ROUTER.use('/company',require('./modules/company/CompanyRoute'));
    ROUTER.use('/branch',require('./modules/company/branch/BranchRoute'));
    ROUTER.use('/users',require('./modules/primaryInfo/users/UserRoute'));
    ROUTER.use('/primary-info',require('./modules/primaryInfo/info/PrimaryInfoRouter'));
    ROUTER.use('/frontend',require('./modules/frontend/FrontendRoute'));
    ROUTER.use('/module', require('./modules/primaryInfo/menu/ModuleRoute'));
    ROUTER.use('/menu', require('./modules/primaryInfo/menu/MenuRoute'));
    ROUTER.use('/sub-menu', require('./modules/primaryInfo/menu/SubMenuRoute'));
    ROUTER.use('/roles', require('./modules/primaryInfo/acl/RoleRoute'));
    ROUTER.use('/permissions', require('./modules/primaryInfo/acl/PermissionRoute'));
    ROUTER.use('/permission-role', require('./modules/primaryInfo/acl/PermissionRoleRoute'));
    ROUTER.use('/depot', require('./modules/inventory/depot/DepotRoute'));
    ROUTER.use('/area', require('./modules/primaryInfo/area/AreaRoute'));
    ROUTER.use('/category', require('./modules/inventory/category/CategoryRoute'));
    ROUTER.use('/units', require('./modules/inventory/units/UnitsRoute'));
    ROUTER.use('/product', require('./modules/inventory/product/ProductRoute'));
    ROUTER.use('/vendor', require('./modules/inventory/vendor/VendorRoute'));
    /* HR Route */
    ROUTER.use('/designation', require('./modules/hr/designation/DesignationRoute'));
    ROUTER.use('/section', require('./modules/hr/section/SectionRoute'));
    ROUTER.use('/employee', require('./modules/hr/employee/EmployeeRoute'));

    app.use('/api', ROUTER);
}