import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
 
export class NavBarComponent implements OnInit {

  constructor() { }

  icone: string = 'lua';

  body: HTMLElement;

  ngOnInit(): void {

    this.body = document.querySelector('#body');
  }




  darkmode : boolean = false;

  alterarModoEscuro() {

    if (!this.darkmode) {
      this.body.classList.add('dark-mode');
      this.icone = 'sol'

    } else {

      this.body.classList.remove('dark-mode');
      this.icone = 'lua'

    }
    this.darkmode = !this.darkmode;
  }

  ngAfterViewInit(): void {
    this.mobileMenu(); // Call mobileMenu after the view is initialized
  }

  mobileMenu() {
    const navBarContainer = document.querySelector('.navbar-nav');
    const toggleButton = document.querySelector('.navbar-toggler');
  
    toggleButton.addEventListener('click', () => {
      navBarContainer.classList.toggle('active');
    });
  }
  
}
