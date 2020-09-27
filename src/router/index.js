import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import { PERIODS } from '../store/constants';
import dashboardRoutes from './dashboard';

Vue.use(Router);
Vue.use(Meta);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        hasBanner: true,
      },
      // For SEO concern, we want to have period slugs as a root route
      children: PERIODS.map(period => ({
        path: period.slug,
        component: Home,
        meta: {
          period: period.type,
          hasBanner: true,
          scroll: true,
        },
      })),
    },
    {
      path: '/ilan-ekle',
      name: 'AddJob',
      redirect: '/hesabim/ilanlarim/ekle',
    },
    {
      path: '/ilanlar/:slug',
      name: 'JobDetails',
      component: () => import('@/components/pages/JobDetails'),
    },
    {
      path: '/ilanlar',
      name: 'JobList',
      component: () => import('@/components/pages/JobList'),
    },
    {
      path: '/ilanlar/sayfa/:page',
      props: true,
      name: 'JobList',
      component: () => import('@/components/pages/JobList'),
    },
    {
      path: '/etiket/:slug',
      name: 'TagPosts',
      component: () => import('@/components/pages/TagPosts'),
    },
    {
      path: '/ilan-ara',
      name: 'Search',
      component: () => import('@/components/pages/Search'),
      children: [
        {
          path: '?type=1',
          alias: 'tam-zamanli',
        },
        {
          path: '?type=2',
          alias: 'yari-zamanli',
        },
        {
          path: '?type=3',
          alias: 'stajyer',
        },
        {
          path: '?type=4',
          alias: 'freelance',
        },
      ],
    },
    {
      path: '/ilan/dogrulandi',
      name: 'Confirmation',
      component: () => import('@/components/pages/Confirmation'),
    },
    {
      path: '/firmalar/:slug',
      name: 'CompanyPosts',
      component: () => import('@/components/pages/CompanyPosts'),
    },
    {
      path: '/abone-ol',
      name: 'Subscribe',
      component: () => import('@/components/pages/SubscribeLanding'),
    },
    {
      path: '/kayit-ol',
      name: 'SignUp',
      component: () => import('@/components/pages/SignUp'),
    },
    {
      path: '/giris',
      name: 'Login',
      component: () => import('@/components/pages/Login'),
    },
    {
      path: '/eposta-dogrula',
      name: 'VerifyEmail',
      component: () => import('../components/pages/VerifyEmail'),
    },
    {
      path: '/parolami-unuttum',
      name: 'ForgotPassword',
      component: () => import('../components/pages/ForgotPassword'),
    },
    {
      path: '/hesabim',
      name: 'Hesabım',
      component: () => import('../components/pages/dashboard/MyAccount'),
      children: dashboardRoutes,
    },
    {
      path: '/paketler',
      component: () => import('../components/pages/PackageList'),
    },
    {
      path: '/developer-ara',
      component: () => import('../components/pages/SearchDeveloper'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/components/pages/NotFound'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scroll) {
      const element = document.querySelector('.router-link-exact-active');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        return {};
      }
    }

    return savedPosition || { x: 0, y: 0 };
  },
});

export default router;
