
defaultData = {
  id:0,
  company:'',
  department:'',
  prod_type:0,
  trans_type:'',
  correlative:0,
  date:'',
  reference:'',
  comment:'',
  print:'F',
  canceled:'F',
  status:0
}


module.exports = class transType{
  constructor(data=defaultData,filters={}){
    this.db = '[transaction]';
    this.id = data.id;
    this.company = data.company;
    this.department = data.department;
    this.prod_type = data.prod_type;
    this.trans_type = data.trans_type;
    this.correlative = data.correlative;
    this.date = data.date;
    this.reference = data.reference;
    this.comment = data.comment;
    this.print = data.print;
    this.canceled = data.canceled;
    this.status = data.status;
    this.filters = filters;
    this.queryGet = `SELECT T.*, 
    D.name AS 'department_name',
    TT.name AS 'trans_type_name',
    S.name AS 'status_name' 
    FROM ${this.db} as T
    INNER JOIN trans_type AS TT ON T.[trans_type] = TT.id
    INNER JOIN trans_status AS S ON T.[status] = S.id
    INNER JOIN department AS D ON T.department = D.id
    WHERE T.company = @company`;

    this.queryGetByID = `${this.queryGet} AND T.id=@id`;  
      
    this.queryPost = `INSERT INTO ${this.db}
    (company,department,prod_type,trans_type,correlative,date,reference,comment,[print],canceled,status)
    VALUES 
    (@company,@department,@prod_type,@trans_type,@correlative,@date,@reference,@comment,@print,@canceled,@status)
    ;`;
    this.queryPut = `UPDATE ${this.db} SET 
    date = @date,
    reference = @reference,
    comment = @comment,
    [print] = @print,
    canceled = @canceled, 
    status =  @status
    WHERE id=@id
    AND company = @company;`;
    this.queryDelete = `DELETE FROM ${this.db} WHERE id=@id AND company=@company`
    this.getJSON = data;
    this.filterByTransType = ` AND T.trans_type = @trans_type`;
    this.filterByProdType = ` AND T.prod_type = @prod_type`;
    this.filterByDepartment = ` AND T.department = @department`;

  
    if (filters != {}  ){
      if (filters.trans_type != undefined){
        this.queryGet = this.queryGet + this.filterByTransType

      
      }

      if (filters.prod_type != undefined){
        this.queryGet = this.queryGet + this.filterByProdType
      
      }

      if (filters.department != undefined){
        this.queryGet = this.queryGet + this.filterByDepartment
      }
    }
  }
}