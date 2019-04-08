const config = {
  project1: {
    name: 'project1',
    description: '活动描述',
    entry: ['page1', 'page2', 'page3'],
    tinypngKey: 'GRbtc5JbDBMyRfjKdKHjPtgcHz7q3cmw',
    api: {
      dev: '//dev',
      test: '//test',
      prod: '//prod'
    }
  }
}

module.exports = config.project1;
