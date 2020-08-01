
defaultData = {
  company:'',
  id:0,
  department:0,
  trans_type:0,
  correlative:0
}

module.exports = class Correlative{
  constructor(data=defaultData){
    this.db = 'correlative';
    this.company=  data.company
    this.id = data.id;
    this.department = data.department;
    this.trans_type = data.trans_type;
    this.correlative = data.correlative;
    this.queryGet = `SELECT 
    C.*, 
    D.name AS 'department_name',
    TT.name AS 'trans_type_name'
    FROM ${this.db} AS C
    INNER JOIN department AS D ON C.department = D.id
    INNER JOIN trans_type AS TT ON C.trans_type = TT.id
    WHERE C.company=@company`;
    this.queryGetByID = `${this.queryGet} AND C.id=@id`;
    this.queryPost = `INSERT INTO ${this.db} 
      (company,department,trans_type,correlative) 
      VALUES 
      (@company, @department,@trans_type,@correlative);`;
    this.queryPut = `UPDATE ${this.db} SET 
    correlative = @correlative
    WHERE company = @company 
    AND department = @department
    AND id = @id;`;
    this.queryDelete = `DELETE FROM ${this.db} 
    WHERE company=@company 
    AND department=@department
    AND id = @id`;

    this.queryPreviusCorrelative=`SELECT 
    correlative from correlative where company = @company AND department=@department AND id=@id`

    this.getJSON = data;
  }
}