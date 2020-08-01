const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors');
const socket = require('socket.io');
const app = express();

//config
app.set('port','3333');
app.set('json spaces', 2);
app.use(cors());

//middelware
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

//routes 1.0.0

app.use(require('./1.0.0/routes/hello'));
app.use('/1.0.0',require('./1.0.0/routes/company'));
app.use('/1.0.0',require('./1.0.0/routes/department'));
app.use('/1.0.0',require('./1.0.0/routes/transaction/trans_type'));
app.use('/1.0.0',require('./1.0.0/routes/transaction/trans_status'));
app.use('/1.0.0',require('./1.0.0/routes/transaction/correlative'));
app.use('/1.0.0',require('./1.0.0/routes/transaction/transaction'));
app.use('/1.0.0',require('./1.0.0/routes/transaction/trans_detail'));
app.use('/1.0.0',require('./1.0.0/routes/product/prod_type'));
app.use('/1.0.0',require('./1.0.0/routes/product/prod_brand'));
app.use('/1.0.0',require('./1.0.0/routes/product/unity'));
app.use('/1.0.0',require('./1.0.0/routes/product/product'));
app.use('/1.0.0',require('./1.0.0/routes/inventory/location'));
app.use('/1.0.0',require('./1.0.0/routes/config/user'));
app.use('/1.0.0',require('./1.0.0/routes/config/role'));
app.use('/1.0.0',require('./1.0.0/routes/config/object'));
app.use('/1.0.0',require('./1.0.0/routes/config/auth-view'));
app.use('/1.0.0',require('./1.0.0/routes/config/auth-attribute'));
//listener
//listener


const server = app.listen(app.get('port'),(req,res)=>{
    console.log(`listening on port ${app.get('port')}`);
  });
  
  /**
  const io = socket.listen(server);
  
  io.on('connection',(socket)=>{
      
      socket.on('company:add',data=>socket.broadcast.emit('company:add',data));
      socket.on('company:update',data=> socket.broadcast.emit('company:update',data));
      socket.on('company:delete',data=> socket.broadcast.emit('company:delete',data));
      
      socket.on('role:add',data=>socket.broadcast.emit('role:add',data));
      socket.on('role:update',data=> socket.broadcast.emit('role:update',data));
      socket.on('role:delete',data=> socket.broadcast.emit('role:delete',data));
      
  }); */