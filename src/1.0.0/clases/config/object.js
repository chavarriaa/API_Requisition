
defaultData = {

  id:0,
  view:'',
  type:'',
  nombre:'',
  name:''
}

module.exports = class Objectt{
  constructor(data=defaultData){
    this.db = '[object]';
    this.id = data.id;
    this.view = data.view;
    this.type = data.type;
    this.name=data.name;
    this.nombre=data.nombre;

    this.queryGet = `
      SELECT O.*,
      OO.nombre AS 'view_name'
      from [object] AS O
      LEFT JOIN [object] AS OO ON OO.id = O.[view] 
    `;
    this.queryGetByID = `${this.queryGet} WHERE O.id=@id`;
    this.queryPost = `INSERT INTO ${this.db} (name,type,[view],nombre) VALUES(@name,@type,@view,@nombre)`;
    this.queryPut = `UPDATE ${this.db}
      SET
      name=@name,
      type=@type,
      [view]=@view,
      nombre=@nombre
      WHERE id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE AND id=@id`
    this.getJSON = data;
  }
}