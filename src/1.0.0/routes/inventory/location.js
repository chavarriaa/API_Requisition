const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const location = require('../../clases/inventory/location');
const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 
const { query } = require('express');

const controllerName = 'location';

router.get('/company/:company/location',async(req,res)=>{
  try {
    let data = Object.assign(req.param,req.body)
    let Location = new location(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Location.company)
    .query(Location.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/location/:id',async(req,res)=>{
  try {
   
    let Location = new location(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Location.company)
      .input('id',sql.VarChar(2),Location.id)
      .query(Location.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/location',[
  body('name').not().isEmpty().isLength({min:1,max:50}),
  body('prod_type').not().isEmpty().withMessage('Campo prod_type no debe ser nulo')
  
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() ){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let Location = new location(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Location.company)
      .input('prod_type',sql.Int,Location.prod_type)
      .input('name',sql.VarChar(50),Location.name)
      .query(Location.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,Location.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/location/:id',[
  body('name').not().isEmpty().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let Location = new location(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Location.company)
      .input('id',sql.VarChar(2),Location.id)
      .input('name',sql.VarChar(50),Location.name)
      .query(Location.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Location.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/location/:id',async(req,res)=>{
  try {
    let Location = new location(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Location.company)
      .input('id',sql.VarChar(3),Location.id)
      .query(Location.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,location.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;