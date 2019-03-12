import Logger from 'js-logger';

Logger.useDefaults({
  defaultLevel: Logger.DEBUG,
  formatter: function (messages, context) {
    messages.unshift(new Date().toUTCString())
  }
})


export default Logger;