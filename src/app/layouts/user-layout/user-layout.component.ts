import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  // constructor(private router:Router){}

  // @HostListener('window:keydown',['$event'])
  // handleShortcut(event:KeyboardEvent){
  //   if( event.altKey && event.key.toLowerCase() ==='a'){
  //     console.log('Shortcut triggered');
  //     this.router.navigate(['/admin/login']);
  //   }
  // }
  constructor(private router:Router){}
  @HostListener('window:keydown',['$event'])
  loadShortCut(event:KeyboardEvent){
    if(event.altKey && event.key.toLowerCase()==='a'){
      console.log("shortcut triggered");
      this.router.navigate(['/admin/login']);
    }
  }

}
