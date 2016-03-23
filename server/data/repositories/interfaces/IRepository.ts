export interface IRepository<T>{
        Create(user: T) : T; // create
        Update(user: T) : T; // update
        Delete(id: string) : boolean; // delete
        FindById(id: string) : T; // find by id
        GetAll() : Promise<T[]>; // get all
}