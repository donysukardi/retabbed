# retabbed

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![downloads][downloads-badge]][npmcharts] [![version][version-badge]][package]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]

[![Supports React and Preact][react-badge]][react]
[![size][size-badge]][unpkg-dist] [![gzip size][gzip-badge]][unpkg-dist]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]

Primitive to build simple and flexible sticky React header components

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
npm install --save retabbed
```

## Usage

```jsx
import React, { Component } from 'react'

import Tabs, { createFocusableComponent } from 'retabbed'

const FocusableTab = createFocusableComponent('div')

const tabs = [
  {
    title: 'Mario',
    content: (
      <p>
        <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (<i>
          English: /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]
        </i>)
      </p>
    ),
  },
  {
    title: 'Luigi',
    disabled: true,
    content: (
      <p>
        <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (<i>
          English: /luˈiːdʒi/; Italian: [luˈiːdʒi]
        </i>)
      </p>
      <p>
        Source:{' '}
        <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
          Wikipedia
        </a>
      </p>
    ),
  }
]

class Example extends Component {
  state = {
    selectedIndex: 0
  }

  handleSelect = idx => {
    this.setState({
      selectedIndex: idx
    })
  }

  render() {
    return (
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={this.handleSelect}
      >
        {({
          id,
          getTabListProps,
          getTabProps,
          getTabPanelProps,
          selectedIndex
        }) => (
          <div id={id}>
            <div {...getTabListProps()}>
              {tabs.map((tab, index) => (
                <FocusableTab
                  {...getTabProps({
                    key: index,
                    disabled: tab.disabled,
                    index
                  })}
                >
                  {tab.title}
                </FocusableTab>
              ))}
            </div>
            {tabs.map((tab, index) => (
              <div
                {...getTabPanelProps({
                  key: index,
                  index
                })}
              >
                {index === selectedIndex && tab.content}
              </div>
            ))}
          </div>
        )}
      </Tabs>
    );
  }
}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/410792?v=4" width="100px;"/><br /><sub><b>Dony Sukardi</b></sub>](http://dsds.io)<br />[💻](https://github.com/donysukardi/retabbed/commits?author=donysukardi "Code") [📖](https://github.com/donysukardi/retabbed/commits?author=donysukardi "Documentation") [💡](#example-donysukardi "Examples") [🤔](#ideas-donysukardi "Ideas, Planning, & Feedback") [👀](#review-donysukardi "Reviewed Pull Requests") [⚠️](https://github.com/donysukardi/retabbed/commits?author=donysukardi "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [donysukardi](https://github.com/donysukardi)

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/donysukardi/retabbed.svg?style=flat-square
[build]: https://travis-ci.org/donysukardi/retabbed
[coverage-badge]: https://img.shields.io/codecov/c/github/donysukardi/retabbed.svg?style=flat-square
[coverage]: https://codecov.io/github/donysukardi/retabbed
[version-badge]: https://img.shields.io/npm/v/retabbed.svg?style=flat-square
[package]: https://www.npmjs.com/package/retabbed
[downloads-badge]: https://img.shields.io/npm/dm/retabbed.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/retabbed
[license-badge]: https://img.shields.io/npm/l/retabbed.svg?style=flat-square
[license]: https://github.com/donysukardi/retabbed/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[react-badge]: https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-(p)react-00d8ff.svg?style=flat-square
[react]: https://facebook.github.io/react/
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/retabbed/dist/retabbed.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/retabbed/dist/retabbed.umd.min.js?label=size&style=flat-square
[unpkg-dist]: https://unpkg.com/retabbed/dist/
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
