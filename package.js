Package.describe({
  name:'parhelium:templating-ractive',
  summary: "Allows ractive templates to be defined in .ract files",
  version: "1.0.2"
});

Package._transitional_registerBuildPlugin({
    name: "compileRactiveTemplates",
    use: ['parhelium:ractive'],
    sources: [
        'templating-ractive.js',
        'plugin/compile-ractive-templates.js'
    ]
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');
  api.use('parhelium:ractive');

  api.addFiles('templating-ractive.js');
  api.export('Ract', ['client', 'server']);
});


