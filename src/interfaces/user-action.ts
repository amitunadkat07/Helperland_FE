export interface LoginInterface extends ForgotPassInterface {
    Password: string;
}

export interface ForgotPassInterface {
    Email: string;
}

export interface UrlCheckInterface extends ForgotPassInterface {
    ResetKey: string;
}

export interface ResetPassInterface extends LoginInterface {
    
}

export interface SignupInterface extends LoginInterface {
    FirstName: string;
    LastName: string;
    ConfPassword: string;
    Contact: string;
    RoleId: any;
}