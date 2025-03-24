import { Routes,provideRouter} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent}
];

// bootstrapApplication(AppComponent),{
//   providers: [provideRouter(routes)] // 
// }






