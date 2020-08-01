
defaultData = {
  id:0,
  name:'',
  nature:'S'
}

module.exports = class transType{
  constructor(data=defaultData){
    this.db = 'trans_type';
    this.id = data.id;
    this.name = data.name;
    this.nature = data.nature;    
    this.queryGet = `SELECT * FROM ${this.db} `;
    this.queryGetByID = `${this.queryGet} WHERE id=@id`;    
    this.queryPost = `INSERT INTO ${this.db} VALUES (@id, @name, @nature);`;
    this.queryPut = `UPDATE ${this.db} SET name=@name WHERE id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id`
    this.getJSON = data;
  }
}