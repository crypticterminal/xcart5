/* vim: set ts=2 sw=2 sts=2 et: */

/**
 * Controller
 *
 * Copyright (c) 2011-present Qualiteam software Ltd. All rights reserved.
 * See https://www.x-cart.com/license-agreement.html for license details.
 */

define('form_model/file_uploader/onboarding', ['js/vue/vue', 'file_uploader'], function (XLiteVue) {

  XLiteVue.component('xlite-file-uploader', {
    ready: function () {
      this.showsMessages = true;
    },
    methods: {
      reset: function () {
        this.temp_id = false;
        this.$reload();
      },
      assignWait: function () {
        this.$dispatch('file-uploader-overlay', this);
      },
      doRequest: function () {
        var promise = this.$options.methods.doRequest.parent.apply(this, arguments);
        return promise.done(this.onUploadSuccess).fail(this.onUploadError);
      },
      onUploadSuccess: function (data, textStatus, jqXHR) {
        var error = jqXHR.getResponseHeader('X-Upload-Error');
        if (error) {
          this.realErrorMessage = error;
          this.$dispatch('file-uploader-error', error, this);
          return;
        }
        this.$dispatch('file-uploader-success', data, this);
      },
      onUploadError: function (jqXHR, textStatus, textResponse) {
        if (jqXHR.status === 413) {
          this.realErrorMessage = core.t('File uploading error 1');
        }
        this.$dispatch('file-uploader-error', '', this);
      },
    }
  });

});