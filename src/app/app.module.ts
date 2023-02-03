import { UserAbuseComponent } from './panel/abuse/abuse.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { PanelComponent } from './layouts/panel/panel.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { InvoicesComponent } from './panel/invoices/invoices.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LocationsComponent } from './admin/locations/locations.component';
import { NodesComponent } from './admin/nodes/nodes.component';
import { VtariffsComponent } from './admin/vtariffs/vtariffs.component';
import { SubnetsComponent } from './admin/subnets/subnets.component';
import { VnatComponent } from './admin/vnat/vnat.component';
import { ListComponent } from './vps/list/list.component';
import { PromocodesComponent } from './admin/promocodes/promocodes.component';
import { AbuseComponent } from './admin/abuse/abuse.component';
import { SupportComponent } from './admin/support/support.component';
import { UserSupportComponent } from './panel/support/support.component';
import { SafePipe } from './safe.pipe';
import { PortsComponent } from './vps/ports/ports.component';
import { AdminVserversComponent } from './admin/admin-vservers/admin-vservers.component';
import { PayComponent } from './panel/pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PanelComponent,
    LoginComponent,
    InvoicesComponent,
    DashboardComponent,
    UsersComponent,
    LocationsComponent,
    NodesComponent,
    VtariffsComponent,
    SubnetsComponent,
    VnatComponent,
    ListComponent,
    PromocodesComponent,
    AbuseComponent,
    SupportComponent,
    UserSupportComponent,
    UserAbuseComponent,
    SafePipe,
    PortsComponent,
    AdminVserversComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
