# JSON Settings Tools
This package allows you to control your json settings files and be sure that you are using the most relevant version. \
\
You can compare your settings, which can be separated by envs, with the main settings template file. \
\
Also, you can sort your settings file alphabetically. 

## Commands:
  - sort - sorts settings keys alphabetically. Also, you can provide keys, which should be at the start of the object and in the provided order.
  - check - compares and checks two files of settings, main and provided. If the provided file missing some fields - the process will be broke and you will see which fields are missing

## Flags for commands:
  - `--main/-m <path_to_main_settings.json>` (check) - path to main settings file to compare with `--target/-t` file.
  - `--target/-t <path_to_target_settings.json>` (sort, check) - path to settings file to check and validate.
  - `--output/-o <path>` (sort) - path to save `--target/-t` after sorting.
  - `--silent/-s` (sort/check) - option to disable all output to the console. The process just will be exited if the settings are not valid.
  - `--except/-e "key1, key2, key3"` (sort) - keys which should be excepted sorting, will be in provided order and placed to the start of sorted settings.- `--except/-e "key1, key2, key3"` (sort) - keys which should be excepted sorting, will be in provided order and placed to the start of sorted settings.
  - `--help` - get help for commands.
