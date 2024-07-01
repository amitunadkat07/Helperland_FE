export interface ILogin extends IForgotPass {
    Password: string;
}

export interface IForgotPass {
    Email: string;
}

export interface IUrlCheck extends IForgotPass {
    ResetKey: string;
    Date: string;
}

export interface IResetPass extends ILogin {
    ConfPassword: string;
}

export interface ISignup extends ILogin {
    FirstName: string;
    LastName: string;
    ConfPassword: string;
    Contact: string;
    RoleId: number;
}

export interface IError {
    isError: boolean;
    errorMessage: string;
}

export interface IResLogin extends IError {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    token: string;
}

export interface IResForgotPass extends IError {
    email: string;
}

export interface IResSignup {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    token: string;
}

export interface IResGetUser extends IResSignup {
    resetKey: string;
}

export interface IResGetProfile extends IGetProfile, IError {
    
}

export interface IGetProfile {
    firstName: string;
    lastName: string;
    contact: string;
    language: string;
    dateOfBirth: Date;
    email: string;
}

export interface IPasswordChange {
    Email: string;
    OldPassword: string;
    NewPassword: string;
}

export interface IResPasswordChange extends IResForgotPass {
    
}

export interface IResGetAddress extends IError {
    addressId: number;
    street: string;
    house: string;
    zipCode: string
    city: string;
    contact: string;
}

export interface IAddress {
    AddressId: number;
    Email: string;
    Contact: string;
    Street: string;
    House: string;
    City: string;
    ZipCode: string;
}

export interface IOperationType {
    addressId: number;
    isEdit: boolean;
}

export interface IResponse<T> {
    data: T;
    isSuccess: boolean;
    statusCode: string;
    message: string;
}