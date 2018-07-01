import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import * as NProgress from 'nprogress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  closeSidebar = true;
  pagesRoute = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((obj: any) => {
      this.pagesRoute = (!!obj.url && obj.url.includes('/pages')) ? true : false;
      if (obj instanceof RouteConfigLoadStart) {
        NProgress.start();
        NProgress.set(0.4);
      } else if (obj instanceof RouteConfigLoadEnd) {
        NProgress.set(0.9);
        setTimeout(() => {
          NProgress.done();
          NProgress.remove();
        }, 500);
      }
    });
  }

  navBarEvent(event) {
    this.closeSidebar = event;
  }

}
