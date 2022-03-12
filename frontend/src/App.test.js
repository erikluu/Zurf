import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";

test('App renders Zurf Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Zurf/);
  expect(linkElement).toBeInTheDocument();
});

test('App renders nav bar home', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/);
  expect(linkElement).toBeInTheDocument();
});

test('App renders nav bar account', () => {
  render(<App />);
  const linkElement = screen.getByText(/Account/);
  expect(linkElement).toBeInTheDocument();
});

test('App renders nav bar support', () => {
  render(<App />);
  const linkElement = screen.getByText(/Support/);
  expect(linkElement).toBeInTheDocument();
});

test('App renders nav bar loc1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Location 1/);
  expect(linkElement).toBeInTheDocument();
});

test('App renders nav bar loc 2', () => {
  render(<App />);
  const linkElement = screen.getByText(/Location 2/);
  expect(linkElement).toBeInTheDocument();
});


//need to test react hooks in App

// const mockSetState = jest.fn();

// jest.mock('react', () => ({
//   useState: initial => [initial, mockSetState]
// }));

// test('can update user', () => {
//   const [_, setUser] = App.getUser();
//   App.getUser("dave");
//   expect(mockSetState).toHaveBeenCalledWith("dave");
// });
