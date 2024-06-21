import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = [
    'Helperland/Login',
    'Helperland/Signup',
    'Helperland/ForgotPass',
    'Helperland/ResetPassLink',
    'Helperland/ResetPass'
  ];
  if (!excludedUrls.includes(req.url)) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`
      },
      url: `${environment.baseURL}` + req.url
    });
    return next(authReq);
  }
  else {
    const authReq = req.clone({
      url: `${environment.baseURL}` + req.url
    });
    return next(authReq);
  }
};
