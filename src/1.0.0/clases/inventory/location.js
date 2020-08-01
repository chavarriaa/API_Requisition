
defaultData = {
  company:'',
  id:0,
  name:''
}

module.exports = class Location{
  constructor(data=defaultData){
    this.db = 'location';
    this.company=  data.company
    this.id = data.id;
    this.name = data.name;
    this.prod_type=data.prod_type;
    this.queryGet = `SELECT L.*, PT.name as 'prod_type_name'  FROM ${this.db} AS L
     INNER JOIN prod_type AS PT ON L.prod_type = PT.id 
     WHERE L.company=@company 
     `;
    this.queryGetByID = `${this.queryGet} AND id=@id`;
    this.queryPost = `INSERT INTO ${this.db} (company,name) VALUES (@company, @name);`;
    this.queryPut = `UPDATE ${this.db} SET name=@name,prod_type=@prod_type WHERE company=@company AND id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.getJSON = data;
  }
}