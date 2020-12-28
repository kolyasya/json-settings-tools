import chalk from 'chalk';

type LogType = 'error' | 'warning' | 'info' | 'success' | 'clean';

type LogTypeStyles = {
  [key in LogType]: typeof chalk.Color;
}

const LogTypeStylesMap: LogTypeStyles = {
  error: 'redBright',
  warning: 'yellow',
  info: 'blue',
  success: 'green',
  clean: 'white'
}

type LogText = any;

class LoggerRaw {
  static parseText = (...text: LogText) => {
    if (typeof text[0] === 'string') {
      return text[0];
    } else {
      const templateString = text
      const start = [text[0][0]];
      const templateMembers = templateString.slice(1).map((value: string, index: number) => value + text[0][index + 1]);
      const resultMembers = [...start, ...templateMembers];

      return resultMembers.join('');
    }
  };

  static makeTextStyle = (type: LogType, ...text: LogText): string => {
    const parsedText = LoggerRaw.parseText(...text);

    return chalk[LogTypeStylesMap[type]](parsedText)
  }

  public error = (...message: LogText) => LoggerRaw.makeTextStyle('error', ...message);
  public warning = (...message: LogText) => LoggerRaw.makeTextStyle('warning', ...message);
  public info = (...message: LogText) => LoggerRaw.makeTextStyle('info', ...message);
  public success = (...message: LogText) => LoggerRaw.makeTextStyle('success', ...message);
  public clean = (...message: LogText) => LoggerRaw.makeTextStyle('clean', ...message);
}

class Logger {
  raw: LoggerRaw;

  constructor() {
    this.raw = new LoggerRaw();
  }

  static log = (...text: LogText) => {
    console.log(...text);
  }

  static makeLogText = (type: LogType, ...text: LogText) => {
    if (process.env.SILENT_MODE === 'true') {
      return;
    }

    Logger.log(LoggerRaw.makeTextStyle(type, ...text));
    Logger.log('');
  }

  public error = (...message: LogText) => Logger.makeLogText('error', ...message);
  public warning = (...message: LogText) => Logger.makeLogText('warning', ...message);
  public info = (...message: LogText) => Logger.makeLogText('info', ...message);
  public success = (...message: LogText) => Logger.makeLogText('success',...message);
  public clean = (...message: LogText) => Logger.makeLogText('clean', ...message);
  public ln = () => '\n';
}

const log = new Logger();

export default log;
