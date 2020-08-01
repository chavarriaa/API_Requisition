const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const correlative = require('../../clases/transaction/correlative');
const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents') 

const controllerName = 'correlative';

router.get('/company/:company/department/:department/correlative',async(req,res)=>{
  try {
    let Correlative = new correlative(req.params);
    let pool =  await sql.connect(config);

    let response = await pool.request()
    .input('company',sql.VarChar(3),Correlative.company)
    .query(Correlative.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/department/:department/correlative/:id',async(req,res)=>{
  try {
    let Correlative = new correlative(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Correlative.company)
      .input('department',sql.VarChar(2),Correlative.department)
      .input('id',sql.Int,Correlative.id)
      .query(Correlative.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/department/:department/correlative',[
  body('trans_type').not().isEmpty().isLength({min:2}).withMessage('trans_type debe tener formato 00')

],async(req,res)=>{ 
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let Correlative = new correlative(data);
  
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Correlative.company)
      .input('department',sql.VarChar(2),Correlative.department)
      .input('trans_type',sql.VarChar(2),Correlative.trans_type)
      .input('correlative',sql.Int,Correlative.correlative)
      .query(Correlative.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,Correlative.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.post('/company/:company/department/:department/correlative/:id/increment', async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params);
    let Correlative = new correlative(data);

    let pool = await sql.connect(config);
    let PreviusCorrelative = await pool.request()
    .input('company',sql.VarChar(3),Correlative.company)
    .input('id',sql.Int,Correlative.id)
    .input('department',sql.VarChar(2),Correlative.department)
    .query(Correlative.queryPreviusCorrelative);


    res.json(successMessage(`${req.method} ${controllerName}` ,PreviusCorrelative.recordsets));
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.put('/company/:company/department/:department/correlative/:id',[
  body('correlative').not().isEmpty().isInt({min:1})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()) }

    let data = Object.assign(req.params,req.body)

    let Correlative = new correlative(data);
  
    let pool =  await sql.connect(config);
    
    let response = await pool.request()
      .input('id',sql.Int,Correlative.id)
      .input('company',sql.VarChar(3),Correlative.company)
      .input('department',sql.VarChar(2),Correlative.department)
      .input('correlative',sql.Int,Correlative.correlative)
      .query(Correlative.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Correlative.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/department/:department/correlative/:id',async(req,res)=>{
  try {
    let Correlative = new correlative(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Correlative.company)
      .input('department',sql.VarChar(2),Correlative.department)
      .input('id',sql.VarChar(3),Correlative.id)
      .query(Correlative.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Correlative.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;