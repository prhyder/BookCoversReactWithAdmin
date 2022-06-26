import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user = {};
  isAuthenticated: boolean = false;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private nbTokenService: NbTokenService,
              private router: Router  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        var payload = token.getPayload();
        this.user = { name: payload.name, picture: 'assets/images/favicon.png' };
      }
      else {
        this.user = {};
      }
    });

    this.authService.isAuthenticated().subscribe((value: boolean) => {
      this.isAuthenticated = value;
    });


  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    //this.userService.getUsers()
    //  .pipe(takeUntil(this.destroy$))
    //  .subscribe((users: any) => this.user = users.admin);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log out') {
        this.logout();
      }
    });
  }

  logout() {
    this.nbTokenService.clear();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
