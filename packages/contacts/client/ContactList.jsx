import React, { memo } from "react";
import { ContactsCollection } from "../lib/collections/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ErrorAlert } from "../../shared/client/components/ErrorAlert";
import { Meteor } from "meteor/meteor";

export const ContactList = () => {
  const isLoading = useSubscribe("allContacts");

  const contacts = useFind(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } });
  });

  const [remove, setRemove] = React.useState("");

  const showRemove = ({ message }) => {
    setRemove(message);
    setTimeout(() => {
      setRemove("");
    }, 4000);
  };

  const removeContact = (event, _id) => {
    event.preventDefault();
    Meteor.call("contacts.remove", { contactId: _id });
    showRemove({ message: "Contact deleted" });
  };

  if (isLoading()) {
    return (
      <div>
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Loading...
          </h3>
        </div>
      </div>
    );
  }

  const ContactItem = memo(({ contact }) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
        <div className="min-w-0 flex-1 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={contact.imageUrl}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {contact.name}
            </p>
            <p className="text-sm font-medium text-gray-500 truncate">
              {contact.email}
            </p>
          </div>
          <div>
            <a
              href="#"
              onClick={(event) => removeContact(event, contact._id)}
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Remove
            </a>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      {remove && <ErrorAlert message={remove} />}
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
        </ul>
      </div>
    </div>
  );
};
