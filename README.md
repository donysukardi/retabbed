# retabbed

[![travis build](https://img.shields.io/travis/donysukardi/retabbed.svg?style=flat-square)](https://travis-ci.org/donysukardi/retabbed)
[![version](https://img.shields.io/npm/v/retabbed.svg?style=flat-square)](http://npm.im/retabbed)
[![downloads](https://img.shields.io/npm/dm/retabbed.svg?style=flat-square)](http://npm-stat.com/charts.html?package=retabbed&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/retabbed.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

Primitive to build simple and flexible sticky React header components

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [retabbed](#retabbed)
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
