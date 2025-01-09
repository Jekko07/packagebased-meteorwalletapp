import React from "react";
import { ContactsCollection } from "../lib/collections/ContactsCollection";
import { useTracker } from "meteor/react-meteor-data";

export const ContactList = () => {
  const contacts = useTracker(() => {
    const handle = Meteor.subscribe("contacts.all");
    if (!handle.ready()) {
      return [];
    }

    return ContactsCollection.find({}).fetch(); //Tracker
  }, []);

  // const contacts = useTracker(() => {
  //   const handle = Meteor.subscribe("contacts.all");
  //   console.log("Subscription handle ready:", handle.ready()); // Debug log

  //   if (!handle.ready()) {
  //     return []; // Wait for subscription to be ready
  //   }

  //   const result = ContactsCollection.find({}).fetch();
  //   console.log("Fetched contacts:", result); // Debug log
  //   return result;
  // }, []);


  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contacts.map((person, personIdx) => (
            <li
              key={personIdx}
              className="py-4 flex items-center justify-between space-x-3"
            >
              <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {person.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {person.email}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
