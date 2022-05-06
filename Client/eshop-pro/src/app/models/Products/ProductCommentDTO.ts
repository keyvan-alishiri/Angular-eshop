export class ProductCommentDTO{
  constructor(
    public id:number,
    public text: string,
    public userId,
    public userFullName,
    public createDate,
  ){}
}
