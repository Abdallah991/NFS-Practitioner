import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPractitionerComponent } from './screens/register-practitioner/register-practitioner.component';

const routes: Routes = [{ path: '', component: RegisterPractitionerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
