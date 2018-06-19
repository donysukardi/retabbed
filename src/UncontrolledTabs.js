import React from 'react'
import PropTypes from 'prop-types'
import ControlledTabs from './ControlledTabs'

class UncontrolledTabs extends React.Component {
  state = {
    selectedIndex: this.props.defaultIndex,
  }

  handleSelect = (index, prevIndex, event) => {
    const { onSelect } = this.props
    onSelect(index, prevIndex, event)

    this.setState({
      selectedIndex: index,
    })
  }

  render() {
    return (
      <ControlledTabs
        {...this.props}
        onSelect={this.handleSelect}
        selectedIndex={this.state.selectedIndex}
      />
    )
  }
}

UncontrolledTabs.propTypes = {
  id: PropTypes.string,
  defaultFocus: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  defaultIndex: PropTypes.number,
}

UncontrolledTabs.defaultProps = {
  defaultIndex: 0,
}

export default UncontrolledTabs
