import {IUser} from '../../models/IUser';
import {IUserRepository} from './interfaces/RepositoryInterfaces';
var mongoose = require("mongoose");

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    Id: String,
    Username: String,
    PasswordHash: String,
    Salt: String,
    Email: String,
    CreatedAt: Date,
    FirstName: String,
    LastName: String,
    LastLoginAttempt: Date,
    FailedLoginAttempts: Number,
    IsLocked: Boolean,
    IsActive: Boolean
});


var User = mongoose.model<IUserModel>("User", userSchema);

export = User;

// export class UserRepository implements IUserRepository{
//         Create(user: IUser) : IUser{
//             return null;   
//         }
        
//         Update(user: IUser) : IUser{
//             return null;
//         }
        
//         Delete(id: string) : boolean{
//             return null;
//         }
        
//         FindById(id: string) : IUser{
//             return null;
//         }
        
//         GetAll() : IUser[]{
//             return null;
//         }
        
//         CheckCredentials(username: string, password: string) : boolean{
//             return null;
//         }
// }