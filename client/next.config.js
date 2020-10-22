// tell the config watch the poll 300 ms, not watching 
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};
