import { Routes,provideRouter} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { UsersComponent } from './users/users.component';
import { ArrayFormsComponent } from './array-forms/array-forms.component';

export const routes: Routes = [
  {path:'',component:ArrayFormsComponent},
  {path:'service',component:UsersComponent},
  {path:'form',component:HomeComponent},
  {path:'about',component:AboutComponent}
];

// bootstrapApplication(AppComponent),{
//   providers: [provideRouter(routes)] // 
// }






