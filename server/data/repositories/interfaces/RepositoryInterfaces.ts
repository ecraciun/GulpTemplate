import {IUser} from '../../../models/IUser';

export interface IUserRepository{
        Create(user: IUser) : IUser; // create
        Update(user: IUser) : IUser; // update
        Delete(id: string) : boolean; // delete
        FindById(id: string) : IUser; // find by id
        GetAll() : IUser[]; // get all
        CheckCredentials(username: string, password: string) : boolean; // check credentials
}