/* vim: set ts=2 sw=2 sts=2 et: */

/**
 * Controller
 *
 * Copyright (c) 2011-present Qualiteam software Ltd. All rights reserved.
 * See https://www.x-cart.com/license-agreement.html for license details.
 */

define('vue/vue', function () { return Vue; });

if ('undefined' !== typeof(Vuex)) {
  Vue.use(Vuex);
  define('vue/vuex', function () { return Vuex; });
}

define('js/vue/vue', ['vue/vue', 'js/vue/component'], function (Vue, XLiteVueComponent) {
  Vue.directive('data', {
    update: function() {
      var self = this;
      var object = JSON.parse(this.expression);
      for (var key in object) {
        var parts = key.replace('[','.').replace(']','').split('.');
        var path = '';

        parts.forEach(function (part) {
          if (path) {
            path = isNaN(part)
              ? path.concat('.' + part)
              : path.concat('[' + part + ']');
          } else {
            path = part;
          }

          if (_.isUndefined(self.vm.$get(path))) {
            self.vm.$set(path, {});
          }
        });

        this.vm.$set(key, object[key]);
      }
    }
  });

  function XLiteVue() {
    this.root = null;
  }

  XLiteVue.prototype.components = {};

  XLiteVue.prototype.start = function (element) {
    for (var componentName in this.components) if (this.components.hasOwnProperty(componentName)) {
      Vue.component(componentName, this.components[componentName].definition)
    }

    var elementToInit = element || 'body';

    if (element instanceof jQuery && element.length > 0) {
      elementToInit = element.get(0);
    }

    this.root = new Vue({el: elementToInit});
  };

  XLiteVue.prototype.component = function (name, definition) {
    if (this.components[name]) {
      this.components[name].extend(definition);
    } else {
      this.components[name] = new XLiteVueComponent(name, definition);
    }
  };

  return new XLiteVue();
});

jQuery(document).ready(function () {
  define('xlite_vue_model_start', ['js/vue/vue', 'ready'], function (XLiteVue) {
    if ('admin' === xliteConfig.zone) {
        XLiteVue.start();
    }
  });
});

