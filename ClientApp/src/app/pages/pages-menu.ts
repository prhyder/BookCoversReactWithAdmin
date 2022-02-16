import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Book Covers',
    icon: 'book-outline',
    link: '/pages/book-covers',
    home: true,
  },
  {
    title: 'Premades',
    icon: 'archive-outline',
    link: '/pages/premades',
    home: false,
  },
  {
    title: 'Genres',
    icon: 'map-outline',
    link: '/pages/genres',
    home: false,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
