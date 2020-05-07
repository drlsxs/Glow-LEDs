import React from 'react';
import emailjs from 'emailjs-com';
import { EditorInput, Label, ButtonWord, Title } from '../components/UtilityComponents';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';
// import "./form.css";

export default function Form() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('default_service', 'portfolio_email_template', e.target, 'user_9nPtsTdb3HAOWUZJUb04Q')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <BlockContainer>
      <FlexContainer styles={{ width: "100%", justifyContent: "center" }}>
        <Title styles={{ fontSize: 40 }} >Contact</Title>
      </FlexContainer>
      <form style={{ display: "flex", flexDirection: "column" }} className="contact-form" onSubmit={sendEmail}>
        <input className="zoom_f input_i" type="hidden" name="contact_number" />
        <label>Name</label>
        <input className="zoom_f input_i" type="text" name="user_name" placeholder="Name" />
        <label>Email</label>
        <input className="zoom_f input_i" type="email" name="user_email" placeholder="Email" />
        <label>Message</label>
        <textarea className="zoom_f input_i" name="message" placeholder="Enter Message Here" />
        <input className="zoom_b" id="button" type="submit" value="Send" />
      </form>
    </BlockContainer>
  );
}