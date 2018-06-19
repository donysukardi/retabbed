import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SimpleTabs from './examples/SimpleTabs'
import UncontrolledTabs from './examples/UncontrolledTabs'
import ReactRouterTabs from './examples/ReactRouterTabs'

storiesOf('Tabs', module)
  .add('simple', () => <SimpleTabs onSelect={action('onSelect')} />)
  .add('uncontrolled', () => <UncontrolledTabs onSelect={action('onSelect')} />)
  .add('with React Router', () => <ReactRouterTabs onSelect={action('onSelect')} />)
