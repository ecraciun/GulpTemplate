import {User} from '../../models/User';
import {IUserRepository} from './interfaces/RepositoryInterfaces';

export class UserRepository implements IUserRepository{
        Create(user: User) : User{
            return null;   
        }
        
        Update(user: User) : User{
            return null;
        }
        
        Delete(id: string) : boolean{
            return null;
        }
        
        FindById(id: string) : User{
            return null;
        }
        
        GetAll() : User[]{
            return null;
        }
        
        CheckCredentials(username: string, password: string) : boolean{
            return null;
        }
}