# Understanding Questions:
1. What are some possible tests for this application?
* [x] The component correctly renders.
* [x] the component renders the contact form component without errors.
* [x] the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content.
* [x] the component renders ONE error message if the user enters less than 4 characters into the firstname field. Make sure to use async / await and the correct screen method to account for state change.
* [x] the component renders THREE error messages if the user submits without filling in any values.
* [x] the component renders ONE error message if the user submits without filling in the email field.
* [x] the component renders the text *"email must be a valid email address"* if an invalid email address is typed into the email field.
* [x] the component renders the text *"lastName is a required field"* the form is submitted without a last name.
* [x] the component renders the firstname, lastname and email text when submitted with valued fields and does **not** render a message value when one is not entered into the message field.
* [x] renders all fields when the user submits with valid text filled in for all fields.