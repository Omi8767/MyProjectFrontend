import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { customerAuthGuard } from './guards/customer-auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { SellerLayoutComponent } from './layouts/seller-layout/seller-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: '', loadComponent: () => import('./components/user/home/home.component').then(m => m.HomeComponent) },
            { path: 'enquiry', loadComponent: () => import('./components/user/enquiry/enquiry.component').then(n => n.EnquiryComponent) },
            { path: 'signUp', loadComponent: () => import('./components/user/customer/customer.component').then(m => m.CustomerComponent) },
            { path: 'signUpSeller', loadComponent: () => import('./components/user/seller/seller.component').then(m => m.SellerComponent) },
            { path: 'login', loadComponent: () => import('./components/user/login/login.component').then(m => m.LoginComponent) },
            { path: 'forgot-password', loadComponent: () => import('./components/user/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
            { path: 'usrProducts', loadComponent: () => import('./components/user/usrproducts/usrproducts.component').then(m => m.UsrproductsComponent) },
            { path: 'product/:id', loadComponent: () => import('./components/user/product-details/product-details.component').then(m => m.ProductDetailsComponent) }

        ]
    },
    {
        path: 'customer',
        component: CustomerLayoutComponent,
        canActivate: [customerAuthGuard],
        children: [
            { path: 'home', loadComponent: () => import('./components/customer/home/home.component').then(m => m.HomeComponent) },
            { path: 'feedback', loadComponent: () => import('./components/customer/feedback/feedback.component').then(m => m.FeedbackComponent) },
            { path: 'buyproducts', loadComponent: () => import('./components/customer/products/products.component').then(m => m.ProductsComponentimplements) },
            { path: 'product/:id', loadComponent: () => import('./components/customer/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
            { path: 'cart', loadComponent: () => import('./components/customer/cart/cart.component').then(m => m.CartComponent) },
            { path: 'payment', loadComponent: () => import('./components/customer/payment/payment.component').then(m => m.PaymentComponent) },
            { path: 'payment-success', loadComponent: () => import('./components/customer/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent) },
            { path: 'payment-failed', loadComponent: () => import('./components/customer/payment-failed/payment-failed.component').then(m => m.PaymentFailedComponent) },
            { path: 'myOrder',loadComponent:()=>import('./components/customer/my-order/my-order.component').then(m=>m.MyOrderComponent)},
        ]
    },
    {
        path: 'admin/login',
        component: AdminLoginComponent
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: 'category', loadComponent: () => import('./components/admin/category/category.component').then(m => m.CategoryComponent) },
            { path: 'dashboard', loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            {path:'orders',loadComponent:()=>import('./components/admin/orders/orders.component').then(m=>m.OrdersComponent)},
            {path:'report/:type',loadComponent:()=>import('./components/admin/report/report.component').then(m=>m.ReportComponent)}
        ]
    },
    {
        path: 'seller',
        component: SellerLayoutComponent,
        children: [
            { path: 'home', loadComponent: () => import('./components/Seller/home/home.component').then(m => m.HomeComponent) },
            { path: 'addproduct', loadComponent: () => import('./components/Seller/product/product.component').then(m => m.ProductComponent) },
            { path: 'sellerdashboard', loadComponent: () => import('./components/Seller/seller-dashboard/seller-dashboard.component').then(m => m.SellerDashboardComponent) }
        ]
    }
];
