Ember Disqus [![Build Status](https://travis-ci.org/sir-dunxalot/ember-disqus.svg)](https://travis-ci.org/sir-dunxalot/ember-disqus)
======

`ember-disqus` provides an easy way to integrate [Disqus](//disqus.com) comments and comment counts with your Ember CLI app.

This Ember addon also lazy-loads only the required parts of the Disqus API to improve performance of your app.

## Installation

```sh
ember install ember-disqus
```

Then add your Disqus forum's shortname to your `config/environment.js` file:

```js
module.exports = function(environment) {
  var ENV = {

  /* ... */

    disqus: {
      shortname: 'your-shortname-here'
    }
  }
}
```

## Usage

- [Displaying comments](#displaying-comments)
- [Displaying comment counts](#displaying-comment-counts)

### Displaying Comments

Disqus' main functionality is to display comments relating to a particular page - that being a 'thread' of comments. Disqus highly reccomends each thread be identified using a unique identifer instead of other means like the URL incase your URLs should change or you want to show the same thread on multiple routes.

Thus, this addon maintains those standards and **requires a unique thread identifier to be passed to the comment component**.

To render the comment thread for any topic:

```hbs
{{disqus-comments identifier=post.title}}
```

It's as simple as that!

------

For advanced functionality, you can pass an optional `title` argument, which makes working with threads on Disqus.com a bit easier. By default Disqus will use the identifier or the page URL for the thread title. However, you can override this functionality using the `title` argument. For example:

```hbs
{{disqus-comments identifier=post.id title=post.title}}
```


The `{{disqus-comments}}` component also accepts a `categoryId` property. This is used by Disqus to assign specific threads to categories. This is also optional. Please note, **Disqus only supports the use of categories once you have manually added them** in your [Disqus options](//octosmashed.disqus.com/admin/settings/advanced/).

```hbs
{{disqus-comments identifier=postId categoryId=category.id}}
```

For more information on the [individual configuration variables please see the Disqus docs](//help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables).

### Displaying comment counts

Like the other Disqus implementations in this plugin, the `{{disqus-comment-count}}` requires an `identifier` argument. For example:

```hbs
{{disqus-comment-count identifier=post.title}}
```

**This identifier must be the same identifier used to display the comment thread you are referencing**

By default, this component will render the comment count for the specified comment thread in a lowly `<span>`. Simple!

Disqus automatically renders the result with an associated noun. For example `8 Comments` or `1 Comment`. However, you can turn off this functionality and just show the digits by setting the `removeNoun` property to `true`:

```hbs
{{disqus-comment-count identifier=post.title removeNoun=true}}
```

## Lazy Loading

This addon tries to improve page performance by waiting to request Diqsus' assets until they are needed and the current document has finished loading.

In addition, this addon only loads the parts of the Disqus API that you need. If you don't use the comment count features then you won't load the comment count API!

You can disable the lazy loading functionality by passing an additional option in your `config/environment.js` file:

```js
module.exports = function(environment) {
  var ENV = {

  /* ... */

    disqus: {
      shortname: 'your-shortname-here',
      lazyLoad: false
    }
  }
}
```


## Development

- `git clone https://github.com/sir-dunxalot/ember-disqus.git`
- `ember s`
- `ember test` or `/tests` route
