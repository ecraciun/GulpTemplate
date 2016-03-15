System.register(['./interfaces/RepositoryInterfaces'], function(exports_1) {
    var RepositoryInterfaces_1;
    var UserRepository;
    return {
        setters:[
            function (RepositoryInterfaces_1_1) {
                RepositoryInterfaces_1 = RepositoryInterfaces_1_1;
            }],
        execute: function() {
            class UserRepository extends RepositoryInterfaces_1.default.IUserRepository {
            }
            UserRepository = UserRepository;
        }
    }
});
