import * as express from "express";


// import Authentication from "../Controllers/auth/Authentication.js";
import Login from "../Controllers/auth/Login.js";

import Users from '../Controllers/users/Users.js';
// import Products from "./Controllers/product";

const router = express.Router()

router.get('/', (req, res) => {
    res.send('API esta online')
})

// rota.use("/public", express.static("./public"));

router.post('/login',Login)
         

router.route('/users')
      .get(Users.get)
      .post(Users.post)





export default router;