
defaultData = {
  id:0,
  transaction:0,
  product:'',
  prod_name:'',
  unit_requested:0.0,
  qty_requested:0,
  unit_received:0,
  qty_received:0.0
}

module.exports = class transDetail{
  constructor(data=defaultData){
    this.db = 'trans_detail';
    this.id = data.id;
    this.transaction = data.transaction
    this.product = data.product
    this.prod_name = data.prod_name
    this.unit_requested = data.unit_requested,
    this.qty_requested = data.qty_requested;
    this.unit_received = data.unit_received;
    this.qty_received = data.qty_received;
    
    this.queryGet = `SELECT * FROM ${this.db} 
    WHERE [transaction] = @transaction `;

    this.queryGetByID = `${this.queryGet} AND id = @id`;

    this.queryPost = `INSERT INTO ${this.db} 
    ([transaction],product,prod_name,unit_requested,qty_requested)
      VALUES
      (@transaction,@product,@prod_name,@unit_requested,@qty_requested)`;
    this.queryPut = `UPDATE ${this.db}
     SET
     product =@product,
     prod_name= @prod_name, 
     unit_requested = @unit_requested,
     qty_requested = @qty_requested,
     unit_received = @unit_received,
     qty_received = @qty_received
     WHERE id=@id
     AND [transaction] = @transaction;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id`
    this.getJSON = data;
  }
}