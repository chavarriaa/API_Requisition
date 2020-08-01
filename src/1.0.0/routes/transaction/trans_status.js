const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const transStatus = require('../../clases/transaction/trans_status');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 


const controllerName = 'TRANSACTION STATUS ';

router.get('/transaction-status',async(req,res)=>{
  try {
    let TransStatus = new transStatus();
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .query(TransStatus.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/transaction-status/:id',async(req,res)=>{
  try {
    let TransStatus = new transStatus(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,TransStatus.id)
      .query(TransStatus.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/transaction-status/',[
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array())}
    let TransStatus = new transStatus(req.body);
    let pool =  await sql.connect(config);

    let response = await pool.request()
      .input('name',sql.VarChar(50),TransStatus.name)
      .query(TransStatus.queryPost);

    res.json(successMessage(`${req.method} ${controllerName}` ,TransStatus.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.put('/transaction-status/:id',[
  body('name').not().isEmpty().trim().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let TransStatus = new transStatus(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,TransStatus.id)
      .input('name',sql.VarChar(50),TransStatus.name)
      .query(TransStatus.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,TransStatus.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/transaction-status/:id',async(req,res)=>{
  try {
    let TransStatus = new transStatus(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,TransStatus.id)
      .query(TransStatus.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,TransStatus.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;