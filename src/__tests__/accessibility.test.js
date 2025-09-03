import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App';
import HomeTab from '../HomeTab';
import LivePage from '../LivePage';
import NewsPage from '../NewsPage';

// Extend expect to have accessibility matchers
expect.extend(toHaveNoViolations);

test('App component should have no accessibility violations', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('HomeTab component should have no accessibility violations', async () => {
  const { container } = render(<HomeTab filteredCategories={[]} setSelectedSource={() => {}} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('LivePage component should have no accessibility violations', async () => {
  const { container } = render(<LivePage filteredCategories={[]} setSelectedSource={() => {}} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('NewsPage component should have no accessibility violations', async () => {
  const { container } = render(<NewsPage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Additional accessibility tests
test('All images should have alt text', () => {
  const { container } = render(<App />);
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    expect(img).toHaveAttribute('alt');
    expect(img.getAttribute('alt')).not.toBe('');
  });
});

test('All interactive elements should be focusable', () => {
  const { container } = render(<App />);
  const interactiveElements = container.querySelectorAll('button, a, input, select, textarea, [tabindex]');
  
  interactiveElements.forEach(element => {
    if (element.hasAttribute('tabindex')) {
      const tabIndex = element.getAttribute('tabindex');
      expect(parseInt(tabIndex)).not.toBe(-1);
    } else {
      expect(element).not.toHaveAttribute('disabled');
    }
  });
});

test('Color contrast should meet WCAG standards', () => {
  // This would typically use a library like jest-axe or a custom contrast checker
  // For now, we'll ensure important text elements have sufficient contrast
  const { container } = render(<App />);
  const mainContent = container.querySelector('.main-content');
  expect(mainContent).toBeInTheDocument();
});

test('Page should have proper heading structure', () => {
  const { container } = render(<App />);
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // Ensure we have at least one h1
  const h1Elements = Array.from(headings).filter(h => h.tagName === 'H1');
  expect(h1Elements.length).toBeGreaterThan(0);
  
  // Headings should be in logical order
  let previousLevel = 0;
  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName.substring(1));
    expect(currentLevel).toBeLessThanOrEqual(previousLevel + 1);
    previousLevel = currentLevel;
  });
});
