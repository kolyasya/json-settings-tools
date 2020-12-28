import { CommandHandler, Result } from '../index';
import log from '../../helpers/log';


const help: CommandHandler = async (args, flags): Promise<Result> => {
  log.warning`Commands`;
  log.clean`${log.raw.success`sort`} - sorts settings keys alphabetically. Also, you can provide keys, which should be at the start of the object and in the provided order.`;
  log.clean`${log.raw.success`check`} - compares and checks two files of settings, main and provided. If the provided file missing some fields - the process will be broke and you will see which fields are missing.`;
  log.warning`Flags for commands`;
  log.clean`${log.raw.success`--main/-m <path_to_main_settings.json>`} (check) - path to main settings file to compare with --target/-t file.`;
  log.clean`${log.raw.success`--target/-t <path_to_target_settings.json>`} (sort, check) - path to settings file to check and validate.`
  log.clean`${log.raw.success`--output/-o <path>`} (sort) - path to save --target/-t after sorting.`;
  log.clean`${log.raw.success`--silent/-s`} (sort/check) - option to disable all output to the console. The process just will be exited if the settings are not valid.`;
  log.clean`${log.raw.success`--except/-e "key1, key2, key3"`} (sort) - keys which should be excepted sorting, will be in provided order and placed to the start of sorted settings.`;


  return Result.passed();
}

export default help;
