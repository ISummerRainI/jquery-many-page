import 'common/common';
import './index.less';

const page2 = {
  init: function () {
    this.render();
  },

  getRenderData: function () {
    const data = [{
      title: '数据一',
      content: '内容'
    }, {
      title: '数据二',
      content: '内容'
    }, {
      title: '数据三',
      content: '内容'
    }, {
      title: '数据四',
      content: '内容'
    }, {
      title: '数据五',
      content: '内容'
    }];
    return data;
  },

  render: function () {
    const renderData = this.getRenderData();

    const { compile } = Template7.default;
    const template = $('#template').html();
    const compiledTemplate = compile(template);
    const html = compiledTemplate(renderData);

    $('#content').append(html);
  }
}
page2.init();
