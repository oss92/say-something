import Logger from 'js-logger';

Logger.useDefaults({
  defaultLevel: Logger.DEBUG,
  formatter: function (messages, context) {
    messages.unshift(`[${context.level.name}][${new Date().toUTCString()}]`)
  }
})

export default Logger;