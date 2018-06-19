import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { createFocusableComponent } from '../../src/index'

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  border-bottom: 1px solid #aaa;
  margin: 0 0 10px;
`

const BaseTabItem = createFocusableComponent('li')
const BaseTabLink = createFocusableComponent('a')
const BaseRouterLink = createFocusableComponent(Link, 'innerRef')

const tabStyle = css`
  color: #222;
  text-decoration: none;
  padding: 6px 12px;
  display: block;
  border: 1px solid transparent;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  cursor: pointer;

  ${props =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `} ${props =>
    props.selected &&
    `
    font-weight: bold;
    background: #fff;
    border-color: #aaa;
    color: black;
    border-radius: 5px 5px 0 0;
  `}

  &:after {
    content: '';
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: #fff;
    opacity: 0;
  }

  &:focus {
    box-shadow: 0 0 5px #0188fe;
    border-color: #0188fe;
    outline: none;
    &:after {
      opacity: 1;
    }
  }
`

const TabContent = styled.span`
  ${tabStyle};
`

const TabLink = TabContent.withComponent(BaseTabLink)
const TabRouterLink = TabContent.withComponent(BaseRouterLink)

const TabListItem = styled.li`
  display: inline-block;
  /*& + {() => TabListItem} {
    margin-left: 16px;
  }*/
`

const TabItem = TabListItem.withComponent(BaseTabItem).extend`
  ${tabStyle}
  display: inline-block;
`

const TabPanel = styled.div`
  ${props =>
    props['aria-hidden'] &&
    `
    display: none;
  `};
`

const CornerBoxWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
`

const CornerBox = styled.div`
  padding: 12px;
  background-color: rgba(256, 256, 256, 0.75);
  border: 1px solid #ccc;
`

export {
  CornerBoxWrapper,
  CornerBox,
  TabList,
  TabLink,
  TabItem,
  TabListItem,
  TabPanel,
  TabContent,
  TabRouterLink,
}
