module.exports=  class Inventory {
  constructor (data=dataDefault){
    this.db = 'inventory'
    this.company = data.company;
    this.prod_type = data.prod_type;
    this.location = data.location;
    this.qty = data.qty;

    this.queryGet=` SELECT I.*, 
      P.name AS 'product_name',
      L.name AS 'location_name'
      FROM ${this.db} AS I
      INNER JOIN product AS P ON I.product = P.id
      INNER JOIN location AS L ON I.location = L.id
      WHERE company = @company `;
    this.queryGetByID=`${ this.queryGet} AND product = @product`;
    this.queryPost=`INSERT INTO ${this.db}
     VALUES(@company,@prod_type,@location,@product,@qty)`;
    this.queryPut=`UPDATE ${this.db} SET qty = qty - @qty 
    WHERE company = @company 
    location = @location
    product = @product`;

  }




}