import {IUser} from '../../../models/IUser';
import {IRepository} from './IRepository';

export interface IUserRepository extends IRepository<IUser>{
        CheckCredentials(username: string, password: string) : boolean; // check credentials
}