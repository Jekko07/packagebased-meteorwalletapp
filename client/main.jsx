import React from "react";
import { Meteor } from "meteor/meteor";
import { createRoot } from "react-dom/client";
import { App } from "meteor/ui/client/views/App.jsx";
import "meteor/contacts/server/ContactsMethods";


Meteor.startup(() => {
  // Create a root using createRoot
  const root = createRoot(document.getElementById("react-target"));
  // Render the App component
  root.render(<App />);
});
