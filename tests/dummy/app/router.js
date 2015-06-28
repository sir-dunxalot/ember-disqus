import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('bacon');
  this.route('eggs');
  this.route('toast');
  this.route('load-disqus-api');
});

export default Router;
