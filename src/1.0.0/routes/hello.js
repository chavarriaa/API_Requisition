const express = require('express');
const router = express.Router();
const sql = require('mssql')
const config = require('../../config')
const async = require("async")
router.get('/hello',(req,res)=>{
res.json({title:"Hola Mundo!"})
})

router.post('/hello',async(req,res)=>{
 //let data =   [{val1:"C",val2:"d"},{val1:"a"}]

    let pool = await sql.connect(config);
    const transaction = new sql.Transaction(pool);

    let request = new sql.Request(transaction)
     await transaction.begin()
    let queries =[`INSERT INTO test VALUES ('A','B')`,`INSERT INTO test VALUES ('C','D')`];
    async.eachSeries(queries,
      function iterator(item,callback){
        console.log(item);
        request.query(item,callback)
      },
      function(err, results) {

        if (err) {
          console.error('Error in queries, rolling back', err);
          transaction.rollback();
        }
        transaction.commit(function(err) {
          if (err) {
             console.error('Error in commit', err);
          }
          console.log("Transaction commited.");

        });
      }
    );
res.send('done')        

})


/*
router.post('/hello',async(req,res)=>{
  try {
    const data = req.body.data
    const pool = await sql.connect(config);

    const table = new sql.Table('test');

    table.columns.add('testt',sql.VarChar(10))
    table.columns.add('testa',sql.VarChar(10))

    data.forEach(val => {
      table.rows.add(val.testt, val.testa)
    });

    const response = await pool.request()
    response.bulk(table)

    
    res.json(response);
  
  } catch (error) {
    res.json(error)
  }
 
})


*/ 
module.exports = router;