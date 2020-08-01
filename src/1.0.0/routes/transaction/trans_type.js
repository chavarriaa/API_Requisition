const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const transType = require('../../clases/transaction/trans_type');
const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents') 

const controllerName = 'TRANSACTION TYPE';

router.get('/transaction-type',async(req,res)=>{
  try {
    let TransType = new transType();
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .query(TransType.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/transaction-type/:id',async(req,res)=>{
  try {
    let TransType = new transType(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(2),TransType.id)
      .query(TransType.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/transaction-type/',[
  body('id').not().isEmpty().isLength({min:2,max:3}),
  body('name').not().isEmpty().isLength({min:1,max:50}),
  body('nature').not().isEmpty().isIn(['S','R']).isLength({min:1,max:1})

],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let TransType = new transType(req.body);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(2),TransType.id)
      .input('name',sql.VarChar(50),TransType.name)
      .input('nature',sql.VarChar(1),TransType.nature)
      .query(TransType.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,TransType.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/transaction-type/:id',[
  body('name').not().isEmpty().trim().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let TransType = new transType(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(2),TransType.id)
      .input('name',sql.VarChar(50),TransType.name)
      .query(TransType.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,TransType.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/transaction-type/:id',async(req,res)=>{
  try {
    let TransType = new transType(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(2),TransType.id)
      .query(TransType.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,TransType.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;