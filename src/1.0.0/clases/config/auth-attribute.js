
defaultData = {
  company:'',
  id:0,
  role:0,
  object:0,
  visible:0 
}

module.exports = class authAttribute{
  constructor(data=defaultData){
    this.db = 'auth_attribute';
    this.company=data.company;
    this.id=data.id;
    this.role=data.role;
    this.object=data.object;
    this.visible=data.visible; 

    this.queryGet = `
    SELECT AA.*,
    R.name AS 'role_name',
    O.name AS 'object_name'
    from ${this.db} AS AA
    INNER JOIN [role] AS R ON AA.[role] = R.id
    INNER JOIN [object] AS O ON AA.[object] = O.id
    WHERE AA.company=@company
    AND AA.role=@role
    `;
    this.queryGetByID = `${this.queryGet} WHERE AA.id=@id`;
    this.queryPost = `
    INSERT INTO ${this.db} (company,[role],[object],visible) VALUES (@company,@role,@object,@visible)
    `;
    this.queryPut = `UPDATE ${this.db}
      SET [visible]=@visible
      WHERE company=@company 
      AND [role]=@role
      AND id=@id
      ;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE company=@company AND id=@id`
    this.getJSON = data;
  }
}