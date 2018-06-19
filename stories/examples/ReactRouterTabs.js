import React, { Fragment } from 'react'
import { MemoryRouter, Switch, Route } from 'react-router-dom'

import Tabs from '../../src/index'
import {
  CornerBox,
  CornerBoxWrapper,
  TabList,
  TabPanel,
  TabListItem,
  TabRouterLink,
  TabContent,
} from './styles'
import { tabs } from './misc'

const findSelectedTabIndex = (tabs, path) => {
  const index = tabs.findIndex(x => x.path === path)
  return index < 0 ? 0 : index
}

class ReactRouterTabs extends React.Component {
  state = {
    selectedIndex: findSelectedTabIndex(
      tabs,
      `/${this.props.match.params.page}`,
    ),
  }

  onSelect = (...args) => {
    this.props.onSelect && this.props.onSelect(...args)
    const idx = args[0]
    if (idx !== this.state.selectedIndex) {
      this.props.history.push(tabs[idx].path)
    }
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props.match.params
    if (page !== prevProps.match.params.page) {
      this.setState({
        selectedIndex: findSelectedTabIndex(
          tabs,
          `/${page}`,
        ),
      })
    }
  }

  render() {
    const { page } = this.props.match.params
    return (
      <div>
        <Tabs
          {...this.props}
          onSelect={this.onSelect}
          selectedIndex={this.state.selectedIndex}
        >
          {({
            getTabListProps,
            getTabProps,
            getTabPanelProps,
            selectedIndex,
          }) => (
            <Fragment>
              <TabList {...getTabListProps()}>
                {tabs.map((aTab, index) => {
                  // We don't assign onClick on the Router Link
                  // and leave it to React Router to update current location
                  // and we catch it in componentDidUpdate
                  const { onClick, ...tabProps} = getTabProps({
                    index,
                    disabled: aTab.disabled,
                  })

                  const selected = index === selectedIndex
                  const ContentComp = aTab.disabled ? TabContent : TabRouterLink

                  return (
                    <TabListItem
                      key={index}
                      role="presentation"
                      selected={selected}
                    >
                      <ContentComp
                        {...tabProps}
                        selected={selected}
                        disabled={aTab.disabled}
                        to={aTab.path}
                      >
                        {aTab.name}
                      </ContentComp>
                    </TabListItem>
                  )
                })}
              </TabList>
              {tabs.map((aTab, index) => (
                <TabPanel
                  {...getTabPanelProps({
                    key: index,
                    index,
                  })}
                >
                  {index === selectedIndex && aTab.content}
                </TabPanel>
              ))}
            </Fragment>
          )}
        </Tabs>
        <CornerBoxWrapper>
          <CornerBox>
            {`Current Page: ${page}`}
          </CornerBox>
        </CornerBoxWrapper>
      </div>
    )
  }
}

const ReactRouterApp = props => (
  <MemoryRouter initialEntries={['/mario']} initialIndex={0}>
    <Switch>
      <Route path="/:page" render={routeProps => (
        <ReactRouterTabs {...routeProps} {...props} />
        )}  />
    </Switch>
  </MemoryRouter>
)

export default ReactRouterApp
