import chalk from 'chalk';

const log = {
  error: (message: string) => {
    if (process.env.SILENT_MODE === 'true') {
      return;
    }
    console.log(chalk.redBright(message));
    log.ln();
   },
  warning: (message: string) => {
    if (process.env.SILENT_MODE === 'true') {
      return;
    }
    console.log(chalk.yellow(message));
    log.ln();
   },
  info: (message: string) => {
    if (process.env.SILENT_MODE === 'true') {
      return;
    }
    console.log(chalk.blue(message));
    log.ln();
  },
  success: (message: string) => {
    if (process.env.SILENT_MODE === 'true') {
      return;
    }
    console.log(chalk.green(message));
    log.ln();
  },
  ln: () => console.log(''),
}

export default log;