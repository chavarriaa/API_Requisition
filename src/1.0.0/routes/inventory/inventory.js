const express = require('express');
const router = express.Router();
const sql = require('mssql')
const config = require('../../../config')



router.post('/company/:company/inventory',async(req,res)=>{
  const pool = await sql.connect(config);
sql.NVarChar
  const data = [
    {val1:'a',val2:'b'},
    {val1:'c',val2:'d'},
    {val1:'a',val2:'z'}
  ]
  const table = new sql.Table('data')

  table.columns.add('val1',sql.VarChar(10))
  table.columns.add('val2',sql.VarChar(10))
  
data.forEach((val) =>{
  table.rows.add(val.val1,val.val2)
})
  const response = pool.Request()
  .input(table.)

})