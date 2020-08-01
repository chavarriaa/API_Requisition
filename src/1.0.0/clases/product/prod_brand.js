
defaultData = {
  id:0,
  company:'',
  prod_type:0,
  name:'',
  filter:''
}

module.exports = class Prodbrand{
  constructor(data=defaultData){
    this.db = 'prod_brand';
    this.id = data.id;
    this.company = data.company;
    this.prod_type = data.prod_type;
    this.name = data.name;
   

 
    this.queryGet = `SELECT PB.*, 
    PT.name as 'prod_type_name'
    FROM ${this.db} AS PB
    INNER JOIN prod_type AS PT ON PB.prod_type = PT.id
    WHERE PB.company = @company `;
    this.queryGetByID = `${this.queryGet} AND PB.id = @id`;    
    this.queryPost = `INSERT INTO ${this.db} 
    (company,prod_type,name)
    VALUES (@company,@prod_type,@name);`;
    this.queryPut = `UPDATE ${this.db} SET 
    prod_type=@prod_type,
    name=@name 
    WHERE company = @company 
    AND id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id`
    this.FilterByProdType = `AND PB.prod_type =@prod_type`
    this.getJSON = data;
  }
  
}