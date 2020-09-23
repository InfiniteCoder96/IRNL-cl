import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedin: boolean;

  constructor() { }

  ngOnInit() {
    this.loggedin = JSON.parse(localStorage.getItem('loggedin'));
  }

  logout() {
    localStorage.setItem('loggedin', JSON.stringify(false));
    localStorage.removeItem('authorization');
    location.reload();
  }

}
