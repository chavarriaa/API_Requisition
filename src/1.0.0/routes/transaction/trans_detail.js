const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const transDetail = require('../../clases/transaction/trans_detail');
const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents') 

const controllerName = 'TRANSACTION DETAIL';

router.get('/company/:company/transaction/:transaction/detail',async(req,res)=>{
  try {
    let data = Object.assign(req.params,req.body)

    let TransDetail = new transDetail(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('transaction',sql.Int,TransDetail.transaction)
    .query(TransDetail.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/transaction/:transaction/detail/:id',async(req,res)=>{
  try {
    let TransDetail = new transDetail(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('transaction',sql.Int,TransDetail.transaction)
      .input('id',sql.VarChar(2),TransDetail.id)
      .query(TransDetail.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/transaction/:transaction/detail',[

  body('product').not().isEmpty().isLength({min:7,max:8 }),
  body('prod_name').not().isEmpty().isLength({max:100}),
  body('unit_requested').not().isEmpty().isInt(),
  body('qty_requested').not().isEmpty().isDecimal({force_decimal: false, decimal_digits: '4,4'})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)
    let TransDetail = new transDetail(data);
    let pool =  await sql.connect(config);

    let response = await pool.request()

      .input('transaction',sql.Int,TransDetail.transaction)
      .input('product',sql.VarChar(8),TransDetail.product)
      .input('prod_name',sql.VarChar(100),TransDetail.prod_name)
      .input('unit_requested',sql.Int,TransDetail.unit_requested)
      .input('qty_requested',sql.Decimal(12,4),TransDetail.qty_requested)
      .query(TransDetail.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,TransDetail.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.put('/company/:company/transaction/:transaction/detail/:id',[
  body('product').not().isEmpty().isLength({min:7,max:8 }),
  body('prod_name').not().isEmpty().isLength({max:100}),
  body('unit_requested').not().isEmpty().isInt(),
  body('qty_requested').not().isEmpty().isDecimal({force_decimal: false, decimal_digits: '4,4'}),
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let TransDetail = new transDetail(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,TransDetail.id)
      .input('transaction',sql.Int,TransDetail.transaction)
      .input('product',sql.VarChar(8),TransDetail.product)
      .input('prod_name',sql.VarChar(100),TransDetail.prod_name)
      .input('unit_requested',sql.Int,TransDetail.unit_requested)
      .input('qty_requested',sql.Decimal(12,4),TransDetail.qty_requested)
      .input('unit_received',sql.Int,TransDetail.unit_received)
      .input('qty_received',sql.Decimal(12,4),TransDetail.qty_received) 
      .query(TransDetail.queryPut);

      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,TransDetail.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/transaction/:trans_id/detail/:id',async(req,res)=>{
  try {
    let TransDetail = new transDetail(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.VarChar(2),TransDetail.id)
      .query(TransDetail.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,TransDetail.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;