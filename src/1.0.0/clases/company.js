
defaultData = {
  id:0,
  name:''
}

module.exports = class Company{
  constructor(data=defaultData){
    this.db = 'company';
    this.id = data.id;
    this.name = data.name;
    this.queryGet = `SELECT * FROM ${this.db}`;
    this.queryGetByID = `${this.queryGet} WHERE id=@id`;    
    this.queryPost = `INSERT INTO ${this.db} VALUES (@id, @name);`;
    this.queryPut = `UPDATE ${this.db} SET name=@name WHERE id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id`
    this.getJSON = data;
  }
}