const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const role = require('../../clases/config/role');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 
const { query } = require('express');

const controllerName = 'role';

router.get('/company/:company/role',async(req,res)=>{
  try {
    let Role = new role(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Role.company)
    .query(Role.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/role/:id',async(req,res)=>{
  try {
    let Role = new role(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Role.company)
      .input('id',sql.VarChar(2),Role.id)
      .query(Role.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/role',[
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let Role = new role(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Role.company)
      .input('name',sql.VarChar(40),Role.name)
      .query(Role.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,Role.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/role/:id',[
  body('name').not().isEmpty().isLength({max:40})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let Role = new role(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Role.company)
      .input('id',sql.VarChar(6),Role.id)
      .input('name',sql.VarChar(40),Role.name)
      .query(Role.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Role.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/role/:id',async(req,res)=>{
  try {
    let Role = new role(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Role.company)
      .input('id',sql.VarChar(3),Role.id)
      .query(Role.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,role.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;