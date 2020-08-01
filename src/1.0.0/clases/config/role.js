
defaultData = {
  company:'',
  id:0,
  name:'',
  password:'',
  role:''
}

module.exports = class Role{
  constructor(data=defaultData){
    this.db = '[role]';
    this.company =  data.company
    this.id = data.id;
    this.name = data.name;
    this.prod_type=data.prod_type;
    this.queryGet = `SELECT *
      FROM ${this.db} 
      WHERE company = @company
     `;
    this.queryGetByID = `${this.queryGet} AND id=@id`;
    this.queryPost = `INSERT INTO ${this.db} (company,name) VALUES (@company,@name);`;
    this.queryPut = `UPDATE ${this.db}
      SET
      name=@name
      WHERE company=@company
      AND id=@id
     ;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.getJSON = data;
  }
}