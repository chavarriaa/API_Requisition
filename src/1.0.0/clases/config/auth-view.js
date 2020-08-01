
defaultData = {
  company:'',
  id:0,
  view: '',
  role:0,
  C:0,
  R:0,
  U:0,
  D:0
}

module.exports = class authView{
  constructor(data=defaultData){
    this.db = 'auth_view';
    this.company=data.company;
    this.id =data.id;
    this.view= data.view;
    this.role=data.role;
    this.c=data.c;
    this.r=data.r;
    this.u=data.u;
    this.d=data.d;

    this.queryGet = `
      SELECT AV.*,
      V.nombre AS 'view_name',
      R.name AS 'role_name'
      from ${this.db} AS AV
      INNER JOIN [object] AS V ON AV.[view]= V.id
      INNER JOIN [role] AS R ON AV.[role]= R.id
      WHERE AV.company=@company
      AND AV.role=@role
    `;
    this.queryGetByID = `${this.queryGet} WHERE AV.id=@id`;
    this.queryPost = `
      INSERT INTO auth_view (company,[view],[role],c,r,u,d) VALUES (@company,@view,@role,@c,@r,@u,@d)
    `;
    this.queryPut = `UPDATE ${this.db}
      SET
      c=@c,
      r=@r,
      u=@u,
      d=@d
      WHERE  company=@company 
      AND id=@id;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.getJSON = data;
  }
}