import React from 'react';
import App from '../App';

import { render } from '@testing-library/react';

test("should render App correctly and display welcome text after determining if 'output' contains data", () => { 
   const {container} = render(<App/>);
   expect(container.innerHTML).toMatch("Welcome! Please enter a search term above and click 'Search'.");
})