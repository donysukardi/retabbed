import React from 'react'
import PropTypes from 'prop-types'
import UncontrolledTabs from './UncontrolledTabs'
import ControlledTabs from './ControlledTabs'
import { noop } from './utils'

class Tabs extends React.Component {
  static inUncontrolledMode(props) {
    return typeof props.selectedIndex === 'undefined'
  }

  componentDidUpdate(prevProps) {
    if (
      process.env.NODE_ENV !== 'production' &&
      this.uncontrolledMode !== Tabs.inUncontrolledMode(prevProps)
    ) {
      throw new Error(
        `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`Tabs\`.
For more information about controlled and uncontrolled mode of react-tabs see the README.`,
      )
    }
  }

  render() {
    this.uncontrolledMode = Tabs.inUncontrolledMode(this.props)
    return this.uncontrolledMode ? (
      <UncontrolledTabs {...this.props} />
    ) : (
      <ControlledTabs {...this.props} />
    )
  }
}

Tabs.propTypes = {
  id: PropTypes.string,
  defaultFocus: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  defaultIndex: PropTypes.number,
  selectedIndex: PropTypes.number,
}

Tabs.defaultProps = {
  onSelect: noop
}

export default Tabs
