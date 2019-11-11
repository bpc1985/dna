import { render } from '@testing-library/react';
import React from "react";
import Loading from '../Loading';

describe('Loading', () => {
  it('should render component', () => {
    const { container } = render(
      <Loading />
    );
    expect(container).toMatchSnapshot();
  });
});
