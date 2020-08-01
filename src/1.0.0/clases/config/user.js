
defaultData = {
  company:'',
  id:0,
  name:'',
  password:'',
  role:''
}

module.exports = class User{
  constructor(data=defaultData){
    this.db = '[user]';
    this.company =  data.company
    this.id = data.id;
    this.name = data.name;
    this.prod_type=data.prod_type;
    this.queryGet = `SELECT U.*,
      R.name AS 'role_name'
      from ${this.db} AS U
      INNER JOIN [role] AS R ON U.[role] = R.id
      WHERE U.company = @company 
     `;
    this.queryGetByID = `${this.queryGet} AND id=@id`;
    this.queryPost = `INSERT INTO ${this.db} (company,id,name,password,role) VALUES (@company,@id,@name,@password,@role);`;
    this.queryPut = `UPDATE ${this.db}
      SET
      id=@id,
      name=@name,
      password=@password
      role=@role
      WHERE company=@company
      AND id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.getJSON = data;
  }
}