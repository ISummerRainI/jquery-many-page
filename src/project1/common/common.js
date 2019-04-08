import './initialize.less';
import 'lib-flexible';

// 调试时打开此代码
// import vConsole from 'vconsole';
// new vConsole();

export function Toast (msg) {
  $('#toast').remove();
  $('body').append(`
    <div id="toast" class="toast">${msg}</div>
  `);
  $('#toast').fadeIn(200);
  setTimeout(() => {
    $('#toast').fadeOut(200, () => {
      $('#toast').remove();
    })
  }, 3000)
}

export function Alert (data) {
  $('body, html').addClass('no-scroll');
  $('#alert, #mask').remove();
  $('body').append(`
    <div id="mask" class="mask"></div>
    <div id="alert" class="alert-modal">
      <div class="title">${data.title}</div>
      <div class="content">${data.content}</div>
      <div class="footer">${data.okText || '确定'}</div>
    </div>
  `);
  $('#alert, #mask').fadeIn(200);
  $('#alert .footer').on('click', () => {
    $('#alert, #mask').fadeOut(200, () => {
      $('body, html').removeClass('no-scroll');
      $('#alert, #mask').remove();
    })
  })
}
