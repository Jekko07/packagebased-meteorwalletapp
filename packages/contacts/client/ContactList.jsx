import { Meteor } from "meteor/meteor";
import React, { memo, useState } from "react";
import { ContactsCollection } from "../lib/collections/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ErrorAlert } from "../../shared/client/components/ErrorAlert";
import { Loading } from "meteor/shared/client/components/Loading";
import { ContactForm } from "./ContactForm";

const ContactItem = memo(({ contact, onUpdate, onRemove }) => {
  return (
    <li className="flex items-center justify-between py-4 space-x-3">
      <div className="flex items-center flex-1 min-w-0 space-x-3">
        {contact.imageUrl && (
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full"
              src={contact.imageUrl}
              alt=""
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {contact.name}
          </p>
          <p className="text-sm font-medium text-gray-500 truncate">
            {contact.email}
          </p>
          <p className="text-sm font-medium text-gray-500 truncate">
            Wallet ID: {contact.walletId}
          </p>
        </div>
        <div>
          {/* Edit and Remove buttons for each contact */}
          <button
            onClick={(event) => onUpdate(event, contact)}
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={(event) => onRemove(event, contact._id)}
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
});

export const ContactList = () => {
  const isLoading = useSubscribe("contacts");

  const contacts = useFind(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } });
  });

  const [remove, setRemove] = React.useState("");
  // State to store the selected contact for editing
  const [selectedContact, setSelectedContact] = useState(null); //state for selected contact

  const showRemove = ({ message }) => {
    setRemove(message);
    setTimeout(() => {
      setRemove("");
    }, 4000);
  };

  const removeContact = (event, _id) => {
    event.preventDefault();
    Meteor.call("contacts.remove", { contactId: _id }, (error) => {
      if (error) {
        console.error("Error removing contact:", error);
      } else {
        showRemove({ message: "Contact Removed" });
      }
    });
  };

  // Function to select a contact for updating and display the ContactForm in edit mode
  const updateContact = (event, contact) => {
    event.preventDefault();
    console.log("Editing contact:", contact);
    setSelectedContact(contact); // Set the contact to be updated
  };

  // Function that will reset the form and the button back to "Save Contact"
  const resetSelectedContact = () => {
    setSelectedContact(null);
  };

  if (isLoading()) {
    return <Loading />;
  }

  return (
    <div>
      {remove && <ErrorAlert message={remove} />}

      {/* Pass the resetSelectedContact function to the ContactForm */}
      <ContactForm
        selectedContact={selectedContact}
        resetSelectedContact={resetSelectedContact}
      />

      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contacts.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onRemove={removeContact}
              onUpdate={updateContact}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
