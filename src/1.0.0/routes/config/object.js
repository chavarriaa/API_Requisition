const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const objectt = require('../../clases/config/object');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 
const { query } = require('express');

const controllerName = 'object';

router.get('/company/:company/object',async(req,res)=>{
  try {
    let Objectt = new objectt(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Objectt.company)
    .query(Objectt.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/object/:id',async(req,res)=>{
  try {
    let Objectt = new objectt(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Objectt.company)
      .input('id',sql.VarChar(2),Objectt.id)
      .query(Objectt.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/object',[
  body('name').not().isEmpty().isLength({max:50}),
  body('type').not().isEmpty().isLength({max:14}),
  body('nombre').not().isEmpty().isLength({max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() ){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let Objectt = new objectt(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('name',sql.VarChar(50),Objectt.name)
      .input('type',sql.VarChar(12),Objectt.type)
      .input('view',sql.Int,Objectt.view)
      .input('nombre',sql.VarChar(50),Objectt.nombre)
      .query(Objectt.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,Objectt.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/object/:id',[
  body('name').not().isEmpty().isLength({max:50}),
  body('type').not().isEmpty().isLength({max:14}),
  body('nombre').not().isEmpty().isLength({max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)
    let Objectt = new objectt(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int, Objectt.id)
    .input('name',sql.VarChar(50),Objectt.name)
    .input('type',sql.VarChar(12),Objectt.type)
    .input('view',sql.Int,Objectt.view) 
    .input('nombre',sql.VarChar(50),Objectt.nombre)
      .query(Objectt.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Objectt.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/object/:id',async(req,res)=>{
  try {
    let Objectt = new objectt(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Objectt.company)
      .input('id',sql.VarChar(3),Objectt.id)
      .query(Objectt.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,objectt.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;