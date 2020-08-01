const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const unity = require('../../clases/product/unity');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 


const controllerName = 'TRANSACTION STATUS ';

router.get('/product-unity',async(req,res)=>{
  try {
    let Unity = new unity();
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .query(Unity.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/product-unity/:id',async(req,res)=>{
  try {
    let Unity = new unity(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,Unity.id)
      .query(Unity.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/product-unity',[
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array())}
    let Unity = new unity(req.body);
    let pool =  await sql.connect(config);

    let response = await pool.request()
      .input('name',sql.VarChar(50),Unity.name)
      .query(Unity.queryPost);

    res.json(successMessage(`${req.method} ${controllerName}` ,Unity.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.put('/product-unity/:id',[
  body('name').not().isEmpty().trim().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let Unity = new unity(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,Unity.id)
      .input('name',sql.VarChar(50),Unity.name)
      .query(Unity.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Unity.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/product-unity/:id',async(req,res)=>{
  try {
    let Unity = new unity(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,Unity.id)
      .query(Unity.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Unity.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;