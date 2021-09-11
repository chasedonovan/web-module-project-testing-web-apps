import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
  render(<ContactForm/>)
  const header = screen.getByText(/contact form/i)

  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>)
  const firstName = screen.getByLabelText(/first name/i)
  userEvent.type(firstName, 'one')

  const errMsg = await screen.findAllByTestId('error')
  expect(errMsg).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>)
  const submit = screen.getByRole('button')
  userEvent.click(submit)

  const errMsg = await screen.findAllByTestId('error')
  expect(errMsg).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>)
  const first = screen.getByLabelText(/first name/i)
  userEvent.type(first, 'Chase')
  const last = screen.getByLabelText(/last name/i)
  userEvent.type(last, 'Donovan')
  const email = screen.getByLabelText(/email/i)
  userEvent.type(email, '')
  
  const submit=screen.getByRole('button')
  userEvent.click(submit)

  const errMsg = await screen.findAllByTestId('error')
  expect(errMsg).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>)
  const email = screen.getByLabelText(/email/i)
  userEvent.type(email, 'invalid email')
  const errMsg = await screen.findByText(/must be a valid email address./i)
  expect(errMsg).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>)
  const submit=screen.getByRole('button')
  userEvent.click(submit)

  const errMsg = await screen.findByText(/lastName is a required field/i)
  expect(errMsg).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm/>)
  const firstName = screen.getByLabelText(/first name/i); 
  const lastName = screen.getByLabelText(/last name/i); 
  const email = screen.getByLabelText(/email/i); 

  userEvent.type(firstName, 'Chase');
  userEvent.type(lastName, 'Donovan');
  userEvent.type(email, 'email@email.com');

  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    const firstDisplay = screen.getByText(/chase/i);
    const lastDisplay = screen.getByText(/donovan/i);
    const emailDisplay = screen.getByText(/email@email.com/i);
    const messageDisplay = screen.queryByTestId('message');

      expect(firstDisplay).toBeInTheDocument();
      expect(lastDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(messageDisplay).not.toBeInTheDocument();
    })   
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm/>)
  const firstName = screen.getByLabelText(/first name/i); 
  const lastName = screen.getByLabelText(/last name/i); 
  const email = screen.getByLabelText(/email/i); 
  const message = screen.getByLabelText(/message/i); 


  userEvent.type(firstName, 'Chase');
  userEvent.type(lastName, 'Donovan');
  userEvent.type(email, 'email@email.com');
  userEvent.type(message, 'doe');

  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    const firstDisplay = screen.getByText(/chase/i);
    const lastDisplay = screen.getByText(/donovan/i);
    const emailDisplay = screen.getByText(/email@email.com/i);
    const messageDisplay = screen.getAllByText(/doe/i);

      expect(firstDisplay).toBeInTheDocument();
      expect(lastDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(messageDisplay[1]).toBeInTheDocument();
  })   
});