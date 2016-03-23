export interface IUser{
    Id: string;
    Username: string;
    Password: string;
    PasswordHash: string;
    Salt: string;
    Email: string;
    CreatedAt: Date;
    FirstName: string;
    LastName: string;
    LastLoginAttempt: Date;
    FailedLoginAttempts: number;
    IsLocked: boolean;
    IsActive: boolean;
}