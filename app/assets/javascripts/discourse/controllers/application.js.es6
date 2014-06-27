export default Ember.Controller.extend({
  styleCategory: null,

  backgroundStyle: function() {
    var bg = this.get('styleCategory.background_url');
    if (!Em.isEmpty(bg)) {
      return "background-image: url(" + bg + ")";
    }
  }.property('styleCategory.background_url')
});
