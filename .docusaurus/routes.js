import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '1d4'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5d9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'd29'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'e67'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '95a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '6d5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '13e'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '43e'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '8de'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a65'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'a4d'),
            routes: [
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '616'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/PC/SDPC',
                component: ComponentCreator('/docs/PC/SDPC', '733'),
                exact: true,
                sidebar: "wikiSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'aaf'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
