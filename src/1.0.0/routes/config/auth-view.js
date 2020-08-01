const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../../config');
const authView = require('../../clases/config/auth-view');

const {
  successMessage,
  failMessage
} = require('../../libraries/handleEvents'); 
const { query } = require('express');

const controllerName = 'auth-view';

router.get('/company/:company/role/:role/auth-view',async(req,res)=>{
  try {
    let AuthView = new authView(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),AuthView.company)
    .input('role',sql.Int,AuthView.role)
    .query(AuthView.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/role/:role/auth-view/:id',async(req,res)=>{
  try {
    let AuthView = new authView(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),AuthView.company)
      .input('role',sql.Int,AuthView.role)
      .input('id',sql.VarChar(2),AuthView.id)
      .query(AuthView.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/role/:role/auth-view',[  
  body('view').not().isEmpty().isInt(),
  body('role').not().isEmpty().isInt(),
  body('c').not().isEmpty().isBoolean(),
  body('r').not().isEmpty().isBoolean(),
  body('u').not().isEmpty().isBoolean(),
  body('d').not().isEmpty().isBoolean()
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty() ){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let AuthView = new authView(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),AuthView.company)
      .input('view',sql.Int,AuthView.view)
      .input('role',sql.Int,AuthView.role)
      .input('c',sql.Int,AuthView.c)
      .input('r',sql.Int,AuthView.r)
      .input('u',sql.Int,AuthView.u)
      .input('d',sql.Int,AuthView.d)
      .query(AuthView.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,AuthView.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/role/:role/auth-view/:id',[
  body('view').not().isEmpty().isInt(),
  body('role').not().isEmpty().isInt(),
  body('c').not().isEmpty().isBoolean(),
  body('r').not().isEmpty().isBoolean(),
  body('u').not().isEmpty().isBoolean(),
  body('d').not().isEmpty().isBoolean()
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let AuthView = new authView(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('id',sql.Int,AuthView.id)
      .input('company',sql.VarChar(3),AuthView.company)
      .input('view',sql.Int,AuthView.view)
      .input('role',sql.Int,AuthView.role)
      .input('c',sql.Int,AuthView.c)
      .input('r',sql.Int,AuthView.r)
      .input('u',sql.Int,AuthView.u)
      .input('d',sql.Int,AuthView.d)
      .query(AuthView.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,AuthView.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

  router.delete('/company/:company/role/:role/auth-view/:id',async(req,res)=>{
    try {
      let AuthView = new authView(req.params);
      let pool =  await sql.connect(config);
      let response = await pool.request()
        .input('company',sql.VarChar(3),AuthView.company)
        .input('id',sql.VarChar(3),AuthView.id)
        .query(AuthView.queryDelete);
        if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
      res.json(successMessage(`${req.method} ${controllerName}` ,authView.getJSON));;
    } catch (err) {
      res.json(failMessage(`${req.method} ${controllerName}` ,err));
    }
  });

module.exports = router;