const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const authAttribute = require('../../clases/config/auth-attribute');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 


const controllerName = 'auth-attribute';

router.get('/company/:company/role/:role/auth-attribute',async(req,res)=>{
  try {
    let AuthAttribute = new authAttribute(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),AuthAttribute.company)
    .input('role',sql.Int,AuthAttribute.role)
    .query(AuthAttribute.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/role/:role/auth-attribute/:id',async(req,res)=>{
  try {
    let AuthAttribute = new authAttribute(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),AuthAttribute.company)
      .input('role',sql.Int,AuthAttribute.role)
      .input('id',sql.VarChar(2),AuthAttribute.id)
      .query(AuthAttribute.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/role/:role/auth-attribute',[  
 
  body('role').not().isEmpty().isInt(),
  body('object').not().isEmpty().isInt(),
  body('visible').not().isEmpty()
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty() ){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let AuthAttribute = new authAttribute(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),AuthAttribute.company)
      .input('role',sql.Int,AuthAttribute.role)
      .input('object',sql.Int,AuthAttribute.object)
      .input('visible',sql.Int,AuthAttribute.visible)
      .query(AuthAttribute.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,AuthAttribute.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/role/:role/auth-attribute/:id',[
  body('visible').not().isEmpty().isBoolean()
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let AuthAttribute = new authAttribute(data);
    let pool =  await sql.connect(config);
    console.log(AuthAttribute.queryPut)
    let response = await pool.request()
      .input('id',sql.Int,AuthAttribute.id)
      .input('company',sql.VarChar(3),AuthAttribute.company)
      .input('role',sql.Int,AuthAttribute.role)
      .input('visible',sql.Int,AuthAttribute.visible)
      .query(AuthAttribute.queryPut);
      
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,AuthAttribute.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

  router.delete('/company/:company/role/:role/auth-attribute/:id',async(req,res)=>{
    try {
      let AuthAttribute = new authAttribute(req.params);
      let pool =  await sql.connect(config);
      let response = await pool.request()
        .input('company',sql.VarChar(3),AuthAttribute.company)
        .input('id',sql.VarChar(3),AuthAttribute.id)
        .query(AuthAttribute.queryDelete);
        if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
      res.json(successMessage(`${req.method} ${controllerName}` ,authAttribute.getJSON));;
    } catch (err) {
      res.json(failMessage(`${req.method} ${controllerName}` ,err));
    }
  });

module.exports = router;