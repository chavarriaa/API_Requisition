
defaultData = {
  company:'',
  id:0,
  unity:0,
  type:0,
  brand:0,
  name:''
}

module.exports = class Product{
  constructor(data=defaultData){
    this.db = 'product';
    this.company = data.company;
    this.id = data.id;
    this.unity = data.unity;
    this.type = data.type;
    this.brand = data.brand
    this.name = data.name;
    this.queryGet = `SELECT P.*,
      U.name AS 'unity_name',
      T.name AS 'type_name',
      B.name AS 'brand_name'
      FROM ${this.db} AS P
      INNER JOIN unity AS U ON P.unity = U.id
      INNER JOIN prod_brand AS B ON P.brand = B.id
      INNER JOIN prod_type AS T ON P.type = T.id
      WHERE P.company = @company`;
    this.queryGetByID = `${this.queryGet} AND P.id=@id`;    
    this.queryPost = `INSERT INTO ${this.db} 
      (company,id,unity,type,brand,name) VALUES (@company,@id,@unity,@type,@brand,@name);`;
    this.queryPut = `UPDATE ${this.db}
      SET unity = @unity,
      type = @type,
      brand = @brand,
      name = @name
      WHERE  company = @company AND id= @id `;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.filterByType = `AND P.type = @type`
    this.getJSON = data;
  }
}