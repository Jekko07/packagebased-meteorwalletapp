Package.describe({
  name: "ui",
  version: "0.0.2",
  summary: "UI components for the Meteor Wallet App"
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use(["ecmascript", "contacts"]); //depend on `contacts` package
  api.mainModule("client/views/App.jsx", "client"); //Entry point of the package

  api.addFiles(["client/views/Header.jsx"], "client");

  // Export App for use in other parts of the app
  api.export("App", "client");

});
