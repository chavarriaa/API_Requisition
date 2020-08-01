
defaultData = {
  id:0,
  name:'',
}

module.exports = class transType{
  constructor(data = defaultData){
    this.db = 'prod_type';
    this.id = data.id;
    this.name = data.name;  
    this.queryGet = `SELECT * FROM ${this.db} `;
    this.queryGetByID = `${this.queryGet} WHERE id=@id`;    
    this.queryPost = `INSERT INTO ${this.db} VALUES (@name);`;
    this.queryPut = `UPDATE ${this.db} SET name=@name WHERE id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id`
    this.getJSON = data;
  }
}