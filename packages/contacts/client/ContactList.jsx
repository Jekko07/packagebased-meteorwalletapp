import React, { memo } from "react";
import { ContactsCollection } from "../lib/collections/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ErrorAlert } from "../../shared/client/components/ErrorAlert";
import { Meteor } from "meteor/meteor";
import { Loading } from "meteor/shared/client/components/Loading";

export const ContactList = () => {
  const isLoading = useSubscribe("contacts");

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


  const ContactItem = memo(({ contact }) => {
    return (
      <li className="flex items-center justify-between py-4 space-x-3">
        <div className="flex items-center flex-1 min-w-0 space-x-3">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full"
              src={contact.imageUrl}
              alt=""
            />
          </div>
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

  if (isLoading()) {
    return <Loading />
  }
  
  return (
    <div>
      {remove && <ErrorAlert message={remove} />}
      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
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
