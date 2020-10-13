import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.open = !this.open;
  }

  onHome() {
    this.router.navigate(['home']).catch();
  }
}
