/**
   A plugin outlet is an extension point for templates where other templates can
   be inserted by plugins.

   If you handlebars template has:

   ```handlebars
     {{plugin-outlet "evil-trout"}}
   ```

   Then any handlebars files you create in the `connectors/evil-trout` directory
   will automatically be appended. For example:

   plugins/hello/assets/javascripts/discourse/templates/connectors/evil-trout/hello.handlebars

   With the contents:

   ```handlebars
     <b>Hello World</b>
   ```

   Will insert <b>Hello World</b> at that point in the template.

**/
export default function(connectionName, options) {

  var views = [];

  // Find any templates that use the outlet
  Ember.keys(Ember.TEMPLATES).forEach(function(t) {
    if (t.indexOf("/connectors/" + connectionName) !== -1) {
      views.push(Ember.View.create({templateName: t.replace('javascripts/', '')}));
    }
  });

  // If we found templates to append, create a container view for them
  if (views.length) {
    var CustomContainerView = Ember.ContainerView.extend({ childViews: views });
    return Ember.Handlebars.helpers.view.call(this, CustomContainerView, options);
  }
}
