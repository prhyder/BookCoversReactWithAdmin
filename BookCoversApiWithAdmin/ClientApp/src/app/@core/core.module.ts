import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService, SeoService } from './utils';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';

const socialLinks = [
  {
    url: '',
    target: '_blank',
    icon: 'github',
  },
  {
    url: '',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: '',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },

        baseEndpoint: '',
        login: {
          // ...
          endpoint: '/api/accounts/login',
          method: 'post',
        },
        register: {
          // ...
          endpoint: '/api/accounts/registration',
          method: 'post',
        },
        logout: {
          endpoint: '/auth/sign-out',
          method: 'post',
        },
        requestPass: {
          endpoint: '/auth/request-pass',
          method: 'post',
        },
        resetPass: {
          endpoint: '/auth/reset-pass',
          method: 'post',
        },
      }),
      //NbDummyAuthStrategy.setup({
      //  name: 'email',
      //  delay: 3000,
      //}),
    ],
    forms: {
      login: {
        //socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  SeoService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
