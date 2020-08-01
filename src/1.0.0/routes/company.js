const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../config');
const company = require('../clases/company');
const {
  successMessage,
  failMessage
} = require('../libraries/handleEvents') 

const controllerName = 'company';

router.get('/company',async(req,res)=>{
  try {
    let Company = new company();
    let pool =  await sql.connect(config);
    let response = await pool.query(Company.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:id',async(req,res)=>{
  try {
    let Company = new company(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(3),Company.id)
      .query(Company.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company',[
  body('id').not().isEmpty().isLength({min:2,max:3}),
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let Company = new company(req.body);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(3),Company.id)
      .input('name',sql.VarChar(50),Company.name)
      .query(Company.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,Company.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:id',[
  body('name').not().isEmpty().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let Company = new company(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(3),Company.id)
      .input('name',sql.VarChar(50),Company.name)
      .query(Company.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Company.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:id',async(req,res)=>{
  try {
    let Company = new company(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(3),Company.id)
      .query(Company.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,company.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;