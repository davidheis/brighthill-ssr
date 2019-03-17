import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../src/app/admin/admin.service';
import { AuthGuard } from '../../../src/app/admin/guards/auth.guard';
import { IsAdminGuard } from '../../../src/app/admin/guards/is-admin.guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
   // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule,
    RouterModule.forChild([])
  ],
  declarations: [],
  providers: [
    AdminService,
    AuthGuard,
    IsAdminGuard,
    // ProductFilterPipe
  ],
})
export class AdminModule { }
