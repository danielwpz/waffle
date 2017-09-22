const config = {
  logger: {
    options: {
      level: 'emerg',
      handle_exceptions: false,
      colorize: true,
      silent: false,
      timestamp: true,
      pretty_print: true,
      label: 'waffle',
      levels: {
        debug: 0,
        info: 1,
        notice: 2,
        warning: 3,
        error: 4,
        crit: 5,
        alert: 6,
        emerg: 7
      },
      colors: {
        debug: 'white',
        info: 'grey',
        notice: 'green',
        warning: 'yellow',
        error: 'red',
        crit: 'blue',
        alert: 'magenta',
        emerg: 'cyan'
      }
    }
  }
};

module.exports = config;
