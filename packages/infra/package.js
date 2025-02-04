Package.describe({
<<<<<<< HEAD
  name: "infra",
  version: "0.0.2",
  summary: ""
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use(["ecmascript", "react-meteor-data"]);

  api.addFiles(["server/CustomError.js"], "server");

  api.export(["CustomError", "server"]);
});
=======
  name: 'infra',
  version: '0.0.1',
  summary: '',
});

Package.onUse(function(api) {
  api.versionsFrom('2.7');
  api.use(["ecmascript", "react-meteor-data"]);

  api.addFiles(["server/CustomError.js"] , ["server"])

  api.export(["CustomError", "server"]);
  
});


>>>>>>> 95e6e2e95b0b52215b90974c7cb8a20404e747bc
