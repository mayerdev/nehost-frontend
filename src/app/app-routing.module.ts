import { PayComponent } from './panel/pay/pay.component';
import { AdminVserversComponent } from './admin/admin-vservers/admin-vservers.component';
import { UserAbuseComponent } from './panel/abuse/abuse.component';
import { PortsComponent } from './vps/ports/ports.component';
import { ListComponent } from './vps/list/list.component';
import { VnatComponent } from './admin/vnat/vnat.component';
import { SubnetsComponent } from './admin/subnets/subnets.component';
import { VtariffsComponent } from './admin/vtariffs/vtariffs.component';
import { NodesComponent } from './admin/nodes/nodes.component';
import { LocationsComponent } from './admin/locations/locations.component';
import { PromocodesComponent } from './admin/promocodes/promocodes.component';
import { AbuseComponent } from './admin/abuse/abuse.component';
import { SupportComponent } from './admin/support/support.component';
import { UserSupportComponent } from './panel/support/support.component' ;
import { UsersComponent } from './admin/users/users.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { InvoicesComponent } from './panel/invoices/invoices.component';
import { PanelComponent } from './layouts/panel/panel.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: ':action', component: LoginComponent },
    ]
  },
  {
    path: 'panel',
    component: PanelComponent,
    data: { section: 'panel' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'support', component: UserSupportComponent },
      { path: 'abuse', component: UserAbuseComponent },
      { path: 'pay', component: PayComponent },
    ]
  },
  {
    path: 'vservers',
    component: PanelComponent,
    data: { section: 'vservers' },
    children: [
      { path: 'list', component: ListComponent },
      { path: 'vnat', component: PortsComponent },
    ]
  },
  {
    path: 'admin',
    component: PanelComponent,
    data: { section: 'admin' },
    children: [
      { path: 'invoices', component: InvoicesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'nodes', component: NodesComponent },
      { path: 'vtariffs', component: VtariffsComponent },
      { path: 'subnets', component: SubnetsComponent },
      { path: 'vnat', component: VnatComponent },
      { path: 'promocodes', component: PromocodesComponent },
      { path: 'abuse', component: AbuseComponent },
      { path: 'support', component: SupportComponent },
      { path: 'vservers', component: AdminVserversComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
