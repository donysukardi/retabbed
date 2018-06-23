/* eslint-disable react/prop-types */
import React from 'react'
import { cleanup, render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import Tabs, { createFocusableComponent, resetIdCounter } from '../index'

const FocusableTab = createFocusableComponent('div')
const fireClick = node =>
  fireEvent(
    node,
    new MouseEvent('click', {
      bubbles: true, // click events must bubble for React to see it
      cancelable: true,
    }),
  )

const fireKeyDown = (node, config) =>
  fireEvent(
    node,
    new KeyboardEvent('keydown', {
      ...config,
      bubbles: true,
      cancelable: true,
    }),
  )

const TabsExample = ({ tabs, tabsDisabled, ...props }) => (
  <Tabs {...props}>
    {({
      id,
      getTabListProps,
      getTabProps,
      getTabPanelProps,
      selectedIndex,
    }) => (
      <div data-testid="tabWrapper" data-id={id}>
        <div {...getTabListProps()}>
          {tabs.map((tab, index) => (
            <FocusableTab
              {...getTabProps({
                key: index,
                disabled: tabsDisabled[index],
                index,
              })}
              data-testid={`tab-${index}`}
            >
              {tab}
            </FocusableTab>
          ))}
        </div>
        {tabs.map((tab, index) => (
          <div
            {...getTabPanelProps({
              key: index,
              index,
            })}
            data-testid={`tabPanel-${index}`}
          >
            {index === selectedIndex && tab}
          </div>
        ))}
      </div>
    )}
  </Tabs>
)

afterEach(cleanup)

describe('Tabs', () => {
  test('works with no parameters', () => {
    const childrenSpy = jest.fn(
      ({ getTabListProps, getTabProps, getTabPanelProps }) => (
        <div>
          <ul {...getTabListProps()}>
            <li {...getTabProps()}>Tab 1</li>
          </ul>
          <section {...getTabPanelProps()}>Panel 1</section>
        </div>
      ),
    )

    render(<Tabs id="my-tabs">{childrenSpy}</Tabs>)

    expect(childrenSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'my-tabs',
        selectedIndex: 0,
      }),
    )
  })

  it('renders without any error', () => {
    const selectSpy = jest.fn()
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    const { container } = render(
      <TabsExample
        selectedIndex={0}
        onSelect={selectSpy}
        tabs={tabs}
        tabsDisabled={tabsDisabled}
      />,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with default focus', () => {
    const selectSpy = jest.fn()
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    const { getByTestId } = render(
      <TabsExample
        defaultFocus
        selectedIndex={0}
        onSelect={selectSpy}
        tabs={tabs}
        tabsDisabled={tabsDisabled}
      />,
    )

    expect(document.activeElement).toBe(getByTestId('tab-0'))
  })

  it('works without assigning index', () => {
    const selectSpy = jest.fn()
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    const CustomTabsExample = ({ tabs, tabsDisabled, ...props }) => (
      <Tabs {...props}>
        {({
          id,
          getTabListProps,
          getTabProps,
          getTabPanelProps,
          selectedIndex,
        }) => (
          <div data-testid="tabWrapper" data-id={id}>
            <div {...getTabListProps()}>
              {tabs.map((tab, index) => (
                <FocusableTab
                  {...getTabProps({
                    key: index,
                    disabled: tabsDisabled[index],
                  })}
                  data-testid={`tab-${index}`}
                >
                  {tab}
                </FocusableTab>
              ))}
            </div>
            {tabs.map((tab, index) => (
              <div
                {...getTabPanelProps({
                  key: index,
                })}
                data-testid={`tabPanel-${index}`}
              >
                {index === selectedIndex && tab}
              </div>
            ))}
          </div>
        )}
      </Tabs>
    )

    const { container } = render(
      <CustomTabsExample
        onSelect={selectSpy}
        tabs={tabs}
        tabsDisabled={tabsDisabled}
      />,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('changes selectedIndex onClick', () => {
    const selectSpy = jest.fn()
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    const { getByTestId } = render(
      <TabsExample
        onSelect={selectSpy}
        tabs={tabs}
        tabsDisabled={tabsDisabled}
      />,
    )

    fireClick(getByTestId('tab-1'))

    expect(document.activeElement).toBe(getByTestId('tab-1'))
  })

  it("shouldn't call onSelect if the same tab is clicked", () => {
    const selectSpy = jest.fn()
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    const { getByTestId } = render(
      <TabsExample
        onSelect={selectSpy}
        tabs={tabs}
        tabsDisabled={tabsDisabled}
      />,
    )

    fireClick(getByTestId('tab-1'))
    expect(document.activeElement).toBe(getByTestId('tab-1'))

    selectSpy.mockClear()
    fireClick(getByTestId('tab-1'))
    expect(selectSpy).not.toHaveBeenCalled()
  })

  it('changes selectedIndex onKeyDown', () => {
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, true, false, false]

    const { getByTestId } = render(
      <TabsExample defaultIndex={0} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    fireKeyDown(getByTestId('tab-0'), { keyCode: 37 }) // left
    expect(document.activeElement).toBe(getByTestId('tab-4'))

    fireKeyDown(getByTestId('tab-4'), { keyCode: 39 }) // right
    expect(document.activeElement).toBe(getByTestId('tab-0'))

    fireKeyDown(getByTestId('tab-0'), { keyCode: 39 }) // right
    fireKeyDown(getByTestId('tab-1'), { keyCode: 40 }) // down
    expect(document.activeElement).toBe(getByTestId('tab-3'))

    fireKeyDown(getByTestId('tab-3'), { keyCode: 36 }) // home
    expect(document.activeElement).toBe(getByTestId('tab-0'))

    fireKeyDown(getByTestId('tab-0'), { keyCode: 38 }) // up
    expect(document.activeElement).toBe(getByTestId('tab-4'))

    fireKeyDown(getByTestId('tab-4'), { keyCode: 35 }) // end
    expect(document.activeElement).toBe(getByTestId('tab-4'))

    fireKeyDown(getByTestId('tab-4'), { keyCode: 37 }) // left
    fireKeyDown(getByTestId('tab-3'), { keyCode: 37 })
    expect(document.activeElement).toBe(getByTestId('tab-1'))
  })

  it('changes selectedIndex onKeyDown (disabled)', () => {
    const tabs = [1, 2, 3, 4, 5]
    let tabsDisabled = [false, true, true, true, true]
    let getByTestId

    const { getByTestId: getByTestId1 } = render(
      <TabsExample defaultIndex={0} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId1

    fireKeyDown(getByTestId('tab-0'), { keyCode: 37 }) // left
    expect(document.activeElement).toBe(getByTestId('tab-0'))

    fireKeyDown(getByTestId('tab-0'), { keyCode: 39 }) // right
    expect(document.activeElement).toBe(getByTestId('tab-0'))

    fireKeyDown(getByTestId('tab-0'), { keyCode: 36 }) // home
    expect(document.activeElement).toBe(getByTestId('tab-0'))

    fireKeyDown(getByTestId('tab-0'), { keyCode: 35 }) // end
    expect(document.activeElement).toBe(getByTestId('tab-0'))

    tabsDisabled = [true, true, false, true, true]

    cleanup()

    const { getByTestId: getByTestId2 } = render(
      <TabsExample defaultIndex={2} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId2

    fireKeyDown(getByTestId('tab-2'), { keyCode: 37 }) // left
    expect(document.activeElement).toBe(getByTestId('tab-2'))

    tabsDisabled = [true, false, false, true, true]

    cleanup()

    const { getByTestId: getByTestId3 } = render(
      <TabsExample defaultIndex={2} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId3

    fireKeyDown(getByTestId('tab-2'), { keyCode: 37 }) // left
    expect(document.activeElement).toBe(getByTestId('tab-1'))

    tabsDisabled = [true, true, false, true, false]

    cleanup()

    const { getByTestId: getByTestId4 } = render(
      <TabsExample defaultIndex={2} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId4

    fireKeyDown(getByTestId('tab-2'), { keyCode: 37 }) // left
    expect(document.activeElement).toBe(getByTestId('tab-4'))

    tabsDisabled = [true, false, false, false, true]

    cleanup()

    const { getByTestId: getByTestId5 } = render(
      <TabsExample defaultIndex={3} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId5

    fireKeyDown(getByTestId('tab-3'), { keyCode: 39 }) // right
    expect(document.activeElement).toBe(getByTestId('tab-1'))

    tabsDisabled = [true, true, false, false, false]

    cleanup()

    const { getByTestId: getByTestId6 } = render(
      <TabsExample defaultIndex={4} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId6

    fireKeyDown(getByTestId('tab-4'), { keyCode: 36 }) // home
    expect(document.activeElement).toBe(getByTestId('tab-2'))

    tabsDisabled = [true, false, false, false, true]

    cleanup()

    const { getByTestId: getByTestId7 } = render(
      <TabsExample defaultIndex={2} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    getByTestId = getByTestId7

    fireKeyDown(getByTestId('tab-2'), { keyCode: 35 }) // end
    expect(document.activeElement).toBe(getByTestId('tab-3'))
  })

  it('resets idCounter correctly', () => {
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    resetIdCounter()

    const comp1 = render(
      <TabsExample tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    resetIdCounter()

    const comp2 = render(
      <TabsExample tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    const id1 = comp1.getByTestId('tabWrapper').getAttribute('data-id')
    const id2 = comp2.getByTestId('tabWrapper').getAttribute('data-id')

    expect(id1).toEqual(id2)
  })

  it("shouldn't respond to other keyDown", () => {
    const spy = jest.fn()
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]
    const { getByTestId } = render(
      <TabsExample defaultIndex={0} tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    fireKeyDown(getByTestId('tab-0'), { keyCode: 121 })
    expect(spy).not.toHaveBeenCalled()
  })

  it('throws error when changing from uncontrolled to controlled', () => {
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]

    const bak = global.console.error
    global.console.error = () => {}

    const { rerender } = render(
      <TabsExample tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    const fn = () =>
      rerender(
        <TabsExample
          selectedIndex={1}
          tabs={tabs}
          tabsDisabled={tabsDisabled}
        />,
      )

    expect(fn).toThrowErrorMatchingSnapshot()

    global.console.error = bak
  })

  it('should not throw error when changing from uncontrolled to controlled in production', () => {
    const tabs = [1, 2, 3, 4, 5]
    const tabsDisabled = [false, false, false, false, false]
    const bak = global.process.env.NODE_ENV
    global.process.env.NODE_ENV = 'production'

    const { rerender } = render(
      <TabsExample tabs={tabs} tabsDisabled={tabsDisabled} />,
    )

    const fn = () =>
      rerender(
        <TabsExample
          selectedIndex={1}
          tabs={tabs}
          tabsDisabled={tabsDisabled}
        />,
      )

    expect(fn).not.toThrow()

    global.process.env.NODE_ENV = bak
  })
})
