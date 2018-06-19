describe('Basic', () => {
  before(() => {
    cy.visitStory('Tabs', 'simple')
  })

  it('can click on a tab', () => {
    cy
      .getInStoryByTestId('tab-2')
      .click()
      .getInStoryByTestId('tab-2')
      .should(
        'have.attr',
        'aria-selected',
        'true'
      )
  })

  it('renders disabled tab', () => {
    cy
      .getInStoryByTestId('tab-1')
      .should(
        'have.attr',
        'aria-disabled',
        'true'
      )
      .click()
      .getInStoryByTestId('tab-1')
      .should(
        'not.have.attr',
        'aria-selected',
        'true'
      )
  })

  it('switches to next tab', () => {
    cy
      .getInStoryByTestId('tab-2')
      .click()
      .getInStoryByTestId('tab-2')
      .should(
        'have.attr',
        'aria-selected',
        'true'
      )
      .getInStoryByTestId('tab-2')
      .trigger('keydown', {
        keyCode: 37,
      })

    cy
      .getInStoryByTestId('tab-1')
      .should(
        'not.have.attr',
        'aria-selected',
        'true'
      )
      .getInStoryByTestId('tab-0')
      .should(
        'have.attr',
        'aria-selected',
        'true'
      )
  })
})
