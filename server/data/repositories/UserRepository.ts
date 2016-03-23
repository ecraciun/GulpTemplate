"use strict";

import {IUser} from '../../models/IUser';
import {IUserRepository} from './interfaces/IUserRepository';
import * as mongoose from '../helpers/mongoHelper';
import * as logger from '../../helpers/logger';

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId
    },
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


export class UserRepository implements IUserRepository{
    Create(user: IUser) : IUser{
        return null;   
    }
    
    Update(user: IUser) : IUser{
        return null;
    }
    
    Delete(id: string) : boolean{
        return null;
    }
    
    FindById(id: string) : IUser{
        return null;
    }
    
    GetAll() : Promise<IUser[]>{
        return new Promise<IUser[]>((resolve, reject) =>{
            User.find(function(err, users){
                if(err){
                    reject(err);
                }
                resolve(users);                    
            });    
        });
    }
    
    CheckCredentials(username: string, password: string) : boolean{
        return null;
    }
}