# react-nest

Tired of nesting your context providers, try `react-nest`!

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/reaktivo/react-nest/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-nest.svg?style=flat)](https://www.npmjs.com/package/react-nest)
[![CircleCI Status](https://circleci.com/gh/reaktivo/react-nest.svg?style=shield)](https://circleci.com/gh/reaktivo/react-nest)
[![Coverage](https://img.shields.io/codecov/c/github/reaktivo/react-nest.svg)](https://codecov.io/gh/reaktivo/react-nest)
[![gzip size](https://img.badgesize.io/https://unpkg.com/react-nest/dist/react-nest.es.production.js?compression=gzip)](https://unpkg.com/react-nest/dist/react-nest.es.production.js)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/reaktivo/react-nest/compare)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install react-nest
    $ yarn add react-nest

## 😤 The problem

At one point in a complex application your root component might look like the following:

```jsx
function App() {
  return (
    <AsyncComponentProvider asyncContext={asyncContext}>
      <JobProvider jobContext={jobContext}>
        <StaticRouter location={request.url}>
          <Provider store={store}>
            <IntlProvider>
              <App />
            </IntlProvider>
          </Provider>
        </StaticRouter>
      </JobProvider>
    </AsyncComponentProvider>
  );
}
```

## 💡The solution

`react-nest` helps you make your nested providers and consumers more readable and succinct by allowing you do the following:

```jsx
import Nest from 'react-nest';

function App() {
  return (
    <Nest>
      <AsyncComponentProvider asyncContext={asyncContext} />
      <JobProvider jobContext={jobContext} />
      <StaticRouter location={request.url} />
      <Provider store={store} />
      <IntlProvider />
      <App />
    </Nest>
  );
}
```

## License

react-nest is open source software [licensed as MIT](https://github.com/reaktivo/react-nest/blob/master/LICENSE).
