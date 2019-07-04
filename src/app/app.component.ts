import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router) { }
  title = 'assignment';
  tabs: any[] = [
    { title: 'Dashboard', state: 'dashboard' },
    { title: 'New Order', state: 'order' },
    { title: 'Status', state: 'ordermanagement' },
  ];


  onSelectTab(data: any): void {
    if(data && data.state){
    this.router.navigate([data.state]);
    }
  }
}
