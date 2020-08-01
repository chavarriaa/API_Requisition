const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const prodType = require('../../clases/product/prod_type');
const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents') 

const controllerName = 'PRODUCT TYPE';

router.get('/product-type',async(req,res)=>{
  try {
    let ProdType = new prodType();
    let pool =  await sql.connect(config);
    let response = await pool.query(ProdType.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/product-type/:id',async(req,res)=>{
  try {
    let ProdType = new prodType(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,ProdType.id)
      .query(ProdType.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/product-type',[
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let ProdType = new prodType(req.body);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('name',sql.VarChar(50),ProdType.name)
      .query(ProdType.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,ProdType.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/product-type/:id',[
  body('name').not().isEmpty().trim().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let ProdType = new prodType(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,ProdType.id)
      .input('name',sql.VarChar(50),ProdType.name)
      .query(ProdType.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,ProdType.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/product-type/:id',async(req,res)=>{
  try {
    let ProdType = new prodType(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,ProdType.id)
      .query(ProdType.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,ProdType.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;