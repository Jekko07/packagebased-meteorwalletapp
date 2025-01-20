import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "meteor/ui/client/views/App.jsx";
import "meteor/contacts/server/ContactsMethods";


Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));
});
