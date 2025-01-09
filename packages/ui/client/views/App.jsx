import React from "react";
import { ContactForm } from "meteor/contacts/client/ContactForm";
import { ContactList } from "meteor/contacts/client/ContactList";
import { Header } from "./Header";

export const App = () => (
  <div>
    <Header />
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto p-2">
        <ContactForm />
        <ContactList />
      </div>
    </div>
  </div>
);
