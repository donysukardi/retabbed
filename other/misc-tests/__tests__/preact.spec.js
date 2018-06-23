// Tell Babel to transform JSX into preact.h() calls:
/** @jsx preact.h */
/*
eslint-disable
react/prop-types,
no-console,
react/display-name,
import/extensions,
import/no-unresolved
*/

/*
Testing the preact version is a tiny bit complicated because
we need the preact build (the one that imports 'preact' rather
than 'react') otherwise things don't work very well.
So there's a script `test.build` which will run the cjs build
for preact before running this test.
 */

import preact from 'preact'
import render from 'preact-render-to-string'
import Tabs from '../../../preact'

test('works with preact', () => {
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
  const ui = <Tabs id="my-tabs">{childrenSpy}</Tabs>
  render(ui)
  expect(childrenSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 'my-tabs',
      selectedIndex: 0,
    }),
  )
})
