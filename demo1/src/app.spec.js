import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { ldHook } from './utils';

import App from "./App";
import DetailPanel from './DetailPanel';

jest.mock('./DetailPanel', () => () => {
  return <div data-testid="detailPanel">This is the mocked panel</div>
});

jest.mock('./utils', () => {
  return {
    ldHook: jest.fn(),
  }
});

describe('App', () => {
  beforeEach(() => {
    ldHook.mockImplementation(() => {
      return {
        disabled: true,
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(<App />);
  });

  it('should load on immediete render' ,() => {
    const { getByText } = render(<App />);

    getByText('Loading...');
  })

  it("should show an undefined name if no prop is passed", async () => {
    const { getByText, findByText } = render(<App />);

    await findByText('Hi, my name is undefined', undefined, {timeout: 2500});
  });

  it("should render their name if passed in alternating caps", async () => {
    const { findByText, queryByText } = render(<App name="nathan" />);

    await findByText("Hi, my name is NaThAn", undefined, {timeout: 2500});
    
    expect(queryByText("Hi, my name is undefined")).not.toBeInTheDocument();
  });

  it('should change text on button click', async () => {
    const { getByText, findByText } = render(<App name="nathan" />);

    await findByText('default', undefined, {timeout: 2500});

    userEvent.click(getByText("Click Me"));

    getByText('not default');
  });

  describe('DetailPanel inside app', () => {
    it('should show detail panel if not disabled', async () => {
      const { findByTestId } = render(<App />);

      ldHook.mockImplementation(() => {
        return {disabled: false};
      });

      await findByTestId('detailPanel', undefined, {timeout: 2200});
    });

    it('should not show detail panel if disabled', async () => {
      const { findByText, queryByTestId } = render(<App />);

      ldHook.mockImplementation(() => {
        return {disabled: true};
      });

      await findByText('default', undefined, {timeout: 2500});

      expect(queryByTestId('detailPanel')).not.toBeInTheDocument();
    });
  });
});