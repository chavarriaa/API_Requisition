const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const transaction = require('../../clases/transaction/transaction');
const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents') 

const controllerName = 'TRANSACTION';

router.get('/company/:company/transaction',async(req,res)=>{
  try {

    let data = Object.assign(req.params,req.body);
    let Transaction = new transaction(data,req.query);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Transaction.company)
    .input('trans_type',sql.Int,Transaction.filters.trans_type)
    .input('prod_type',sql.VarChar(2),Transaction.filters.prod_type)
    .input('department',sql.VarChar(2),Transaction.filters.department)
    .query(Transaction.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/transaction/:id',async(req,res)=>{
  try {

    let Transaction = new transaction(req.params,req.query);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(2),Transaction.id)
      .input('company',sql.VarChar(3),Transaction.company)
      .input('trans_type',sql.Int,Transaction.filters.trans_type)
      .input('prod_type',sql.VarChar(2),Transaction.filters.prod_type)
      .input('department',sql.VarChar(2),Transaction.filters.department)
      .query(Transaction.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/transaction',[

  body('department').not().isEmpty().isLength({min:2,max:2}),
  body('trans_type').not().isEmpty().withMessage('vacio?').isLength({min:2,max:2}),
  body('prod_type').not().isEmpty().isInt(),
  body('correlative').not().isEmpty().isInt(),
  body('print').not().isEmpty().isBoolean(),
  body('canceled').not().isEmpty().isBoolean(),
  body('status').not().isEmpty().isInt({min:1,max:5})
  
 /** PENDIENTE DE VALIDAD */

],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)

    let Transaction = new transaction(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int(),Transaction.id)
    .input('company',sql.VarChar(3),Transaction.company)
    .input('department',sql.VarChar(2),Transaction.department)
    .input('prod_type',sql.Int,Transaction.prod_type)
    .input('trans_type',sql.VarChar(2),Transaction.trans_type)
    .input('correlative',sql.Int,Transaction.correlative)
    .input('date',sql.Date,Transaction.date)
    .input('reference',sql.VarChar(50),Transaction.reference)
    .input('comment',sql.VarChar(sql.MAX),Transaction.comment)
    .input('print',sql.Bit,Transaction.print)
    .input('canceled',sql.Bit,Transaction.canceled)
    .input('status',sql.Int,Transaction.status)
    .query(Transaction.queryPost);
 
    res.json(successMessage(`${req.method} ${controllerName}` ,Transaction.getJSON));;
  } catch (err) {
   
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/transaction/:id',[
  
  body('department').not().isEmpty().isLength({min:2,max:2}),
  body('trans_type').not().isEmpty().isLength({min:2,max:2}),
  body('prod_type').not().isEmpty().isInt(),
  body('correlative').not().isEmpty().isInt(),
  body('print').not().isEmpty().isBoolean(),
  body('canceled').not().isEmpty().isBoolean(),
  body('status').not().isEmpty().isInt({min:1,max:5})
  
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)
    let Transaction = new transaction(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int(),Transaction.id)
      .input('date',sql.Date,Transaction.date)
      .input('reference',sql.VarChar(50),Transaction.reference)
      .input('comment',sql.VarChar(sql.MAX),Transaction.comment)
      .input('print',sql.Bit,Transaction.print)
      .input('canceled',sql.Bit,Transaction.canceled)
      .input('status',sql.Int,Transaction.status)
      .query(Transaction.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Transaction.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/transaction/:id',async(req,res)=>{
  try {
    let data = Object.assign(req.param,req.body)
    let Transaction = new transaction(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Transaction.company)
      .input('id',sql.VarChar(2),Transaction.id)
      .query(Transaction.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Transaction.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;