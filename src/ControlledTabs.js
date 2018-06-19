import React from 'react'
import PropTypes from 'prop-types'
import { callAllEventHandlers, generateId, noop, unwrapArray } from './utils'

class ControlledTabs extends React.Component {
  tabs = []
  tabPanels = []
  id = this.props.id || `retabbed-${generateId()}`
  focus = this.props.defaultFocus

  clearTabs = () => {
    this.tabs = []
  }

  clearTabPanels = () => {
    this.tabPanels = []
  }

  handleClickAtTabIndex = (index, event) => {
    event.preventDefault()
    const { onSelect, selectedIndex } = this.props
    if(selectedIndex !== index) {
      this.focus = true
      onSelect(index, selectedIndex, event)
    }
  }

  handleKeyPressAtTabIndex = (index, event) => {
    const { onSelect, selectedIndex } = this.props
    const { keyCode } = event
    const { getPrevTab, getNextTab, getFirstTab, getLastTab } = this

    const fn = {
      37: getPrevTab, // left
      39: getNextTab, // right
      38: getPrevTab, // up
      40: getNextTab, // down
      36: getFirstTab, // home
      35: getLastTab, // end
    }[keyCode]

    if (fn) {
      this.focus = true
      event.preventDefault()

      const newSelectedIndex = fn(index, event)
      onSelect && onSelect(newSelectedIndex, selectedIndex, event)
    }
  }

  getPrevTab = index => {
    let i = index
    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!this.getTab(i).disabled) {
        return i
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount()
    while (i-- > index + 1) {
      if (!this.getTab(i).disabled) {
        return i
      }
    }

    // No tabs are enabled, return index
    // istanbul ignore next
    return index
  }

  getNextTab = index => {
    const count = this.getTabsCount()

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      if (!this.getTab(i).disabled) {
        return i
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      if (!this.getTab(i).disabled) {
        return i
      }
    }

    // No tabs are enabled, return index
    return index
  }

  getFirstTab = () => {
    const count = this.getTabsCount()

    // Look for non disabled tab from the first tab
    for (let i = 0; i < count; i++) {
      // istanbul ignore else
      if (!this.getTab(i).disabled) {
        return i
      }
    }
    // istanbul ignore next
    return null
  }

  getLastTab = () => {
    let i = this.getTabsCount()

    // Look for non disabled tab from the last tab
    while (i--) {
      if (!this.getTab(i).disabled) {
        return i
      }
    }
    // istanbul ignore next
    return null
  }

  getTabListProps = rest => ({
    role: 'tablist',
    ...rest,
  })

  getTabPanelProps = ({ id, tabId, index: _index, ...rest }) => {
    const item = {}
    let index = _index

    if (index === undefined) {
      this.tabPanels.push(item)
      index = this.tabPanels.indexOf(item)
    } else {
      this.tabPanels[index] = item
    }

    return {
      role: 'tabpanel',
      id: id || `${this.id}-tabpanel-${index}`,
      'aria-hidden': index !== this.props.selectedIndex,
      'aria-labelledby': tabId || `${this.id}-tab-${index}`,
      ...rest,
    }
  }

  getTabProps = ({
    id,
    panelId,
    index: _index,
    onKeyDown,
    onClick,
    ...rest
  }) => {
    const { selectedIndex } = this.props

    let index = _index
    const item = { disabled: rest.disabled }
    if (index === undefined) {
      this.tabs.push(item)
      index = this.tabs.indexOf(item)
    } else {
      this.tabs[index] = item
    }

    const selected = !rest.disabled && selectedIndex === index

    const eventHandlers = selected
      ? {
          onKeyDown: callAllEventHandlers(
            onKeyDown,
            this.handleKeyPressAtTabIndex.bind(this, index),
          ),
        }
      : {}

    if (!rest.disabled) {
      eventHandlers.onClick = callAllEventHandlers(
        onClick,
        this.handleClickAtTabIndex.bind(this, index),
      )
    }

    // eslint-disable-next-line
    const tabIndex = selected
      ? { tabIndex: 0 }
      : !rest.disabled
        ? { tabIndex: -1 }
        : {}

    return {
      role: 'tab',
      id: id || `${this.id}-tab-${index}`,
      focus: selected && this.focus,
      'aria-selected': selected,
      'aria-disabled': rest.disabled,
      'aria-controls': panelId || `${this.id}-tab-${index}`,
      ...eventHandlers,
      ...tabIndex,
      ...rest,
    }
  }

  getTab(i) {
    return this.tabs[i]
  }

  getTabsCount() {
    return this.tabs.length
  }

  getStateAndHelpers() {
    const { id, getTabListProps, getTabPanelProps, getTabProps } = this
    const { selectedIndex } = this.props

    return {
      id,
      getTabListProps,
      getTabPanelProps,
      getTabProps,
      selectedIndex,
    }
  }

  render() {
    const children = unwrapArray(this.props.children, noop)
    // because the tabs are rerendered every time we call the children
    // we clear this out each render and it will be populated again as
    // getTabProps is called.
    this.clearTabs()
    // because the tabs are rerendered every time we call the children
    // we clear this out each render and it will be populated again as
    // getTabPanelProps is called.
    this.clearTabPanels()

    const element = unwrapArray(children(this.getStateAndHelpers()))
    return element
  }
}

ControlledTabs.propTypes = {
  id: PropTypes.string,
  defaultFocus: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
}

export default ControlledTabs
