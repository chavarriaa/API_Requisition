const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const prodBrand = require('../../clases/product/prod_brand');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 
const { query } = require('express');


const controllerName = 'PRODUCT BRAND';

router.get('/company/:company/product-brand',async(req,res)=>{
  try {

    let data = Object.assign(req.params,req.body,req.query)
    let ProdBrand = new prodBrand(data);
    
    let { prod_type } = req.query;

    let query = ProdBrand.queryGet
    if (prod_type != undefined) {
      query = `${ProdBrand.queryGet} ${ProdBrand.FilterByProdType}` 
    }

    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),ProdBrand.company)
    .input('prod_type',sql.Int,prod_type)
    .query(query);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/product-brand/:id',async(req,res)=>{
  try {
    let data = Object.assign(req.params,req.body)
    let ProdBrand = new prodBrand(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),ProdBrand.company)
      .input('id',sql.Int,ProdBrand.id)
      .query(ProdBrand.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/product-brand',[
  body('name').not().isEmpty().isLength({min:1,max:50}),
  body('prod_type').not().isEmpty().isInt({min:0})
  
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array())}
    
    let data = Object.assign(req.body,req.params)
    let ProdBrand = new prodBrand(data);
    let pool =  await sql.connect(config);

    let response = await pool.request()
      .input('company',sql.VarChar(3),ProdBrand.company)
      .input('prod_type',sql.Int,ProdBrand.prod_type)
      .input('name',sql.VarChar(50),ProdBrand.name)
      .query(ProdBrand.queryPost);

    res.json(successMessage(`${req.method} ${controllerName}` ,ProdBrand.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.put('/company/:company/product-brand/:id',[
  body('name').not().isEmpty().isLength({min:1,max:50}),
  body('prod_type').not().isEmpty().isInt({min:0})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let ProdBrand = new prodBrand(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,ProdBrand.id)
      .input('company',sql.VarChar(3),ProdBrand.company)
      .input('prod_type',sql.Int,ProdBrand.prod_type)
      .input('name',sql.VarChar(50),ProdBrand.name)
      .query(ProdBrand.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,ProdBrand.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/product-brand/:id',async(req,res)=>{
  try {
    let ProdBrand = new prodBrand(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,ProdBrand.id)
      .query(ProdBrand.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,ProdBrand.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;