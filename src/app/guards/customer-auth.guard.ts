import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const customerAuthGuard: CanActivateFn = (route, state) => {
 const router=inject(Router);
 const customer=localStorage.getItem('customer');
 if(customer){
  return true;
 }
 else{
  return router.navigate(['/']);
 }
};
