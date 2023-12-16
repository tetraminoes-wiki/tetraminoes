import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '43e'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'c22'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'd4d'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'bac'),
            routes: [
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '616'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/docs/tutorial-basics/congratulations', '8d0'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '7e0'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/docs/tutorial-basics/create-a-document', '1ac'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/docs/tutorial-basics/create-a-page', '60c'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', '1fd'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/docs/tutorial-basics/markdown-features', 'd93'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', '362'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/docs/tutorial-extras/translate-your-site', 'd93'),
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
