import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { createElement } from 'react'
import ReactDOMServer from 'react-dom/server'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<ResolvedComponent>('../pages/**/*.tsx', {
        eager: true,
      })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => createElement(App, props),
  }),
)
