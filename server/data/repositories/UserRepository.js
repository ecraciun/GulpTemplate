"use strict";
const mongoose = require('../helpers/mongoHelper');
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
var User = mongoose.model("User", userSchema);
class UserRepository {
    Create(user) {
        return null;
    }
    Update(user) {
        return null;
    }
    Delete(id) {
        return null;
    }
    FindById(id) {
        return null;
    }
    GetAll() {
        return new Promise((resolve, reject) => {
            User.find(function (err, users) {
                if (err) {
                    reject(err);
                }
                resolve(users);
            });
        });
    }
    CheckCredentials(username, password) {
        return null;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map