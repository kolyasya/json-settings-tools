import { check, sort, help, CommandExecutor, Result } from './commands';
import { Commands, FlagsType } from './index';
import log from './helpers/log';
import _ from 'lodash';

type CommandHanldersMap = { [key in Commands]?: CommandExecutor }

const handlers: CommandHanldersMap = {
  sort: new CommandExecutor({
    handler: sort,
    name: 'sort',
    condition: (args, flags) => {
      if (!flags['--target']) {
        return Result.error('Flag: --target is required for this command');
      }

      return Result.passed();
    }
  }),
  check: new CommandExecutor({
    handler: check,
    name: 'check',
    condition: (args, flags) => {
      if (!flags['--target'] || !flags['--main']) {
        return Result.error('Flags: --target and --main - are required for this command');
      }

      return Result.passed();
    }
  }),
  help: new CommandExecutor({
    handler: help,
    name: 'help'
  })
}

const commandHandler = async (args: FlagsType): Promise<Result> => {
  const [command] = args._ as Array<Commands>;

  if (!command && !args['--help']) {
    log.error`Command not found`;
    return handlers.help!.run([command], args);
  }

  if (args['--help']) {
    return handlers.help!.run([command], args);
  }

  const currentHandler = handlers[command];

  if (!currentHandler) {
    log.error`'${command}' is not a valid command. Check the README.MD`;

    return Result.error(`'${command}' is not a valid command. Check the README.MD`);
  }

  log.ln();
  log.info(_.capitalize(command));

  return await currentHandler.run([command], args);
}

export default commandHandler;
