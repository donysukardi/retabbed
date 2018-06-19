import React from 'react'
import PropTypes from 'prop-types'
import getDisplayName from 'react-display-name'

const focusablePropTypes = {
  focus: PropTypes.bool,
}

function createFocusableComponent(BaseComponent, refKey = 'ref') {
  class FocusableComponent extends React.Component {
    node = null

    setRef = ref => {
      this.node = ref
    }

    checkFocus() {
      if (this.props.focus) {
        this.node.focus()
      }
    }

    componentDidMount() {
      this.checkFocus()
    }

    componentDidUpdate() {
      this.checkFocus()
    }
    render() {
      const { focus, ...props } = this.props
      const refProps = {
        [refKey]: this.setRef,
      }
      return <BaseComponent {...refProps} {...props} />
    }
  }

  FocusableComponent.propTypes = focusablePropTypes
  FocusableComponent.displayName = `Focusable(${getDisplayName(BaseComponent)}`

  return FocusableComponent
}

export default createFocusableComponent
