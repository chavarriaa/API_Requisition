const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const user = require('../../clases/config/user');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 
const { query } = require('express');

const controllerName = 'user';

router.get('/company/:company/user',async(req,res)=>{
  try {
    let User = new user(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),User.company)
    .query(User.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/user/:id',async(req,res)=>{
  try {
   
    let User = new user(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),User.company)
      .input('id',sql.VarChar(2),User.id)
      .query(User.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/user',[
  body('id').not().isEmpty().isLength({max:6}),
  body('name').not().isEmpty().isLength({max:40}),
  body('password').not().isEmpty(),
  body('role').not().isEmpty().isInt()
  
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() ){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let User = new user(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),User.company)
      .input('id',sql.VarChar(6),User.id)
      .input('name',sql.VarChar(40),User.name)
      .input('password',sql.VarChar(100),User.password)
      .input('role',sql.Int,User.rol)
      .query(User.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,User.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/user/:id',[
  body('id').not().isEmpty().isLength({max:6}),
  body('name').not().isEmpty().isLength({max:40}),
  body('password').not().isEmpty(),
  body('role').not().isEmpty().isInt()

]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let User = new user(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),User.company)
      .input('id',sql.VarChar(6),User.id)
      .input('name',sql.VarChar(40),User.name)
      .input('password',sql.VarChar(100),User.password)
      .input('role',sql.Int,User.rol)
      .query(User.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,User.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/user/:id',async(req,res)=>{
  try {
    let User = new user(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),User.company)
      .input('id',sql.VarChar(3),User.id)
      .query(User.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,user.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;