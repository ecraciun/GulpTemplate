import {User} from '../../../models/User';

export interface IUserRepository{
        Create(user: User) : User; // create
        Update(user: User) : User; // update
        Delete(id: string) : boolean; // delete
        FindById(id: string) : User; // find by id
        GetAll() : User[]; // get all
        CheckCredentials(username: string, password: string) : boolean; // check credentials
}