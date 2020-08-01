
defaultData = {
  company:'',
  id:0,
  name:''
}

module.exports = class Department{
  constructor(data=defaultData){
    this.db = 'department';
    this.company=  data.company
    this.id = data.id;
    this.name = data.name;
    this.queryGet = `SELECT * FROM ${this.db} WHERE company=@company`;
    this.queryGetByID = `${this.queryGet} AND id=@id`;
    this.queryPost = `INSERT INTO ${this.db} VALUES (@company, @id, @name);`;
    this.queryPut = `UPDATE ${this.db} SET name=@name WHERE company=@company AND id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.getJSON = data;
  }
}