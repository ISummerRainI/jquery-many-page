import './index.less';
import { Toast, Alert } from 'common/common';

const page1 = {
  init: function () {
    this.openToast();
    this.addEvent();
  },

  openToast: function () {
    Toast('I am a toast');
  },

  alertModal: function () {
    Alert({
      title: '提示',
      content: '内容'
    })
  },

  addEvent: function() {
    $('#alert').on('click', this.alertModal)
  }

}
page1.init();
