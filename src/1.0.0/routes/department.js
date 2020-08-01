const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { body, validationResult } = require('express-validator');

const config = require('../../config');
const department = require('../clases/department');
const {
  successMessage,
  failMessage
} = require('../libraries/handleEvents') 

const controllerName = 'department';

router.get('/company/:company/department',async(req,res)=>{
  try {
    let Department = new department(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
    .input('company',sql.VarChar(3),Department.company)
    .query(Department.queryGet);
    if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.get('/company/:company/department/:id',async(req,res)=>{
  try {
    let Department = new department(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Department.company)
      .input('id',sql.VarChar(2),Department.id)
      .query(Department.queryGetByID);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
        res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets));;
  } catch (err) {
    res.json(failMessage(`${req.method} BY ID ${controllerName}` ,err));
  }
});

router.post('/company/:company/department',[

  body('id').not().isEmpty().isLength({min:2,max:2}),
  body('name').not().isEmpty().isLength({min:1,max:50})
],async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }
    let data = Object.assign(req.params,req.body)

    let Department = new department(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Department.company)
      .input('id',sql.VarChar(2),Department.id)
      .input('name',sql.VarChar(50),Department.name)
      .query(Department.queryPost);
    res.json(successMessage(`${req.method} ${controllerName}` ,Department.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});


router.put('/company/:company/department/:id',[
  body('name').not().isEmpty().isLength({min:1,max:50})
]
,async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ throw JSON.stringify(errors.array()); }

    let data = Object.assign(req.params,req.body)
    let Department = new department(data);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Department.company)
      .input('id',sql.VarChar(2),Department.id)
      .input('name',sql.VarChar(50),Department.name)
      .query(Department.queryPut);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,Department.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

router.delete('/company/:company/department/:id',async(req,res)=>{
  try {
    let Department = new department(req.params);
    let pool =  await sql.connect(config);
    let response = await pool.request()
      .input('company',sql.VarChar(3),Department.company)
      .input('id',sql.VarChar(3),Department.id)
      .query(Department.queryDelete);
      if (response.rowsAffected <= 0){ throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,department.getJSON));;
  } catch (err) {
    res.json(failMessage(`${req.method} ${controllerName}` ,err));
  }
});

module.exports = router;