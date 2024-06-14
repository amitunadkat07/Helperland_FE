import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = [
    'https://localhost:44374/api/Helperland/Login',
    'https://localhost:44374/api/Helperland/Signup',
    'https://localhost:44374/api/Helperland/ForgotPass',
    'https://localhost:44374/api/Helperland/ResetPassLink',
    'https://localhost:44374/api/Helperland/ResetPass'
  ];
  if (!excludedUrls.includes(req.url)) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
