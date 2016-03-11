import {User} from '../../../models/User';

module RepositoryInterfaces{
    export interface IUserRepository{
        (user: User) : User; // create
        (user: User) : User; // update
        (id: string) : boolean; // delete
        (id: string) : User; // find by id
        () : User[]; // get all
        (username: string, password: string) : boolean; // check credentials
    }
}

export = RepositoryInterfaces;