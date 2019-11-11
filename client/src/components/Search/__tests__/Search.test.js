import { render, fireEvent, wait } from '@testing-library/react';
import React from "react";
import Search from '../Search';

const setup = (onSearch) => {
  const utils = render(
    <Search onSearch={onSearch} />
  );
  const input = utils.container.querySelector('input[name="searchInput"]')
  return {
    input,
    ...utils,
  }
}

describe('Search', () => {
  it('should render component', async () => {
    const onSearch = jest.fn();
    const { container, input } = setup(onSearch);
    expect(container).toMatchSnapshot();

    fireEvent.change(input, {target: {value: 'abcdef'}});
    expect(input.value).toBe('abcdef');
    await wait(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('abcdef');
    });
  });
});
