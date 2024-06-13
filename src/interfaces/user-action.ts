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
    RoleId: number;
}

export interface ErrorInterface {
    isError: boolean;
    errorMessage: string;
}

export interface ResLoginInterface extends ErrorInterface {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    token: string;
}

export interface ResForgotPassInterface extends ErrorInterface {
    email: string;
}

export interface ResSignupInterface {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
}

export interface ResGetUserInterface extends ResSignupInterface {
    resetKey: string;
}