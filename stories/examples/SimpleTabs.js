import React, { Fragment } from 'react'
import Tabs from '../../src/index'
import { TabList, TabItem, TabPanel, TabContent } from './styles'
import { tabs } from './misc'

class SimpleTabs extends React.Component {
  state = {
    selectedIndex: 0,
  }

  onSelect = (...args) => {
    this.props.onSelect && this.props.onSelect(...args)
    this.setState({
      selectedIndex: args[0],
    })
  }

  render() {
    return (
      <Tabs
        {...this.props}
        onSelect={this.onSelect}
        selectedIndex={this.state.selectedIndex}
      >
        {({
          id,
          getTabListProps,
          getTabProps,
          getTabPanelProps,
          selectedIndex,
        }) => (
          <Fragment>
            <div data-testid="tabWrapper">
              <TabList {...getTabListProps()}>
                {tabs.map((aTab, index) => {
                  const tabProps = getTabProps({
                    key: index,
                    index,
                    disabled: aTab.disabled,
                  })

                  const selected = index === selectedIndex

                  return (
                    <TabItem
                      {...tabProps}
                      selected={selected}
                      disabled={aTab.disabled}
                      data-testid={`tab-${index}`}
                    >
                      {aTab.name}
                    </TabItem>
                  )
                })}
              </TabList>
              {tabs.map((aTab, index) => (
                <TabPanel
                  {...getTabPanelProps({
                    key: index,
                    index,
                  })}
                  data-testid={`tabPanel-${index}`}
                >
                  {index === selectedIndex && aTab.content}
                </TabPanel>
              ))}
            </div>
          </Fragment>
        )}
      </Tabs>
    )
  }
}

export default SimpleTabs
