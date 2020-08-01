const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const product = require('../../clases/product/product');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 


const controllerName = 'PRODUCT';

router.get('/company/:company/product',async(req,res)=>{
  try {
    let { type } = req.query;

    let data = Object.assign(req.body,req.params)
    let Product = new product(data);
    
    let query  = Product.queryGet;
    if (type  != undefined){
       query = `${query} ${Product.filterByType}`
    } 
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Product.company)
    .input('type',sql.Int,type)
    .query(query);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/product/:id',async(req,res)=>{
  try {
    let data = Object.assign(req.params,req.body)
    let Product = new product(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Product.company)
    .input('type',sql.Int,Product.type) 
    .input('id',sql.Int,Product.id)
    .query(Product.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/product/',[
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array())}
    let data = Object.assign(req.params,req.body);

    let Product = new product(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Product.company)
      .input('id',sql.VarChar(7),Product.id)
      .input('brand',sql.Int,Product.brand)
      .input('type',sql.Int,Product.type)
      .input('unity',sql.Int,Product.unity)
      .input('name',sql.VarChar(50),Product.name)
      .query(Product.queryPost);

    res.json(successMessage(`${req.method} ${controllerName}` ,Product.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.put('/company/:company/product/:id',[
  body('name').not().isEmpty().trim().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let Product = new product(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Product.company)
    .input('id',sql.VarChar(7),Product.id)
    .input('brand',sql.Int,Product.brand)
    .input('type',sql.Int,Product.type)
    .input('unity',sql.Int,Product.unity)
    .input('name',sql.VarChar(50),Product.name)
      .query(Product.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Product.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/product/:id',async(req,res)=>{
  try {
    let data = Object.assign(req.params,req.body)
    let Product = new product(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Product.company)
      .input('type',sql.Int,Product.type)
      .input('id',sql.Int,Product.id)
      .query(Product.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Product.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;