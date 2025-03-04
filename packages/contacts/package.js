Package.describe({
  name: "contacts",
  version: "0.0.2",
  summary: "provides contact related components"
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use(["ecmascript", "mongo", "react-meteor-data", "shared"]);

  api.mainModule("client/ContactForm.jsx", "client"); //entry point of the package

  api.addFiles(["server/ContactsMethods.js", "server/ContactsPublications.js"], "server");
  api.addFiles(["client/ContactList.jsx"], "client");

  api.addFiles(["lib/collections/ContactsCollection.js"], ["client", "server"]);

  //Export the ContactForm component
  api.export("ContactsCollection", ["client", "server"]);
  api.export("ContactForm", "client");
  api.export("ContactList", "client");
  api.export("ContactMethods", "server");
  api.export("ContactsPublications", "server");
});
