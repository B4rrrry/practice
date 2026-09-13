import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import TestComponent from "../components/TestComponent/TestComponent";
import userEvent from '@testing-library/user-event'


test('test', async  () => {
  const user = userEvent.setup();

  render(<TestComponent />); 
  const h1 = screen.getByText('llo',{exact:false});
  const btn = screen.getByTestId('btn')
  const counter = screen.getByTestId('counter')
  expect(h1).toHaveTextContent('Hello');
  expect(counter).toHaveTextContent('0');
  console.log(counter.textContent)
  await user.click(btn);
 expect(counter).toHaveTextContent('1');
   console.log(counter.textContent)
  
})
  