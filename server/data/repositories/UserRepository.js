"use strict";
var mongoose = require("mongoose");
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
var User = mongoose.model("User", userSchema);
module.exports = User;
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
