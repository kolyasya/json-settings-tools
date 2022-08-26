#!/usr/bin/env node
var $dxT2C$arg = require("arg");
var $dxT2C$lodash = require("lodash");
var $dxT2C$chalk = require("chalk");
var $dxT2C$fs = require("fs");
var $dxT2C$util = require("util");
var $dxT2C$path = require("path");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $f309677db718e41f$var$LogTypeStylesMap = {
    error: "redBright",
    warning: "yellow",
    info: "blue",
    success: "green",
    clean: "white"
};
class $f309677db718e41f$var$LoggerRaw {
    static parseText = (...text)=>{
        if (typeof text[0] === "string") return text[0];
        else {
            const templateString = text;
            const start = [
                text[0][0]
            ];
            const templateMembers = templateString.slice(1).map((value, index)=>value + text[0][index + 1]);
            const resultMembers = [
                ...start,
                ...templateMembers
            ];
            return resultMembers.join("");
        }
    };
    static makeTextStyle = (type, ...text)=>{
        const parsedText = $f309677db718e41f$var$LoggerRaw.parseText(...text);
        return (0, ($parcel$interopDefault($dxT2C$chalk)))[$f309677db718e41f$var$LogTypeStylesMap[type]](parsedText);
    };
    error = (...message)=>$f309677db718e41f$var$LoggerRaw.makeTextStyle("error", ...message);
    warning = (...message)=>$f309677db718e41f$var$LoggerRaw.makeTextStyle("warning", ...message);
    info = (...message)=>$f309677db718e41f$var$LoggerRaw.makeTextStyle("info", ...message);
    success = (...message)=>$f309677db718e41f$var$LoggerRaw.makeTextStyle("success", ...message);
    clean = (...message)=>$f309677db718e41f$var$LoggerRaw.makeTextStyle("clean", ...message);
}
class $f309677db718e41f$var$Logger {
    constructor(){
        this.raw = new $f309677db718e41f$var$LoggerRaw();
    }
    static log = (...text)=>{
        console.log(...text);
    };
    static makeLogText = (type, ...text)=>{
        if (process.env.SILENT_MODE === "true") return;
        $f309677db718e41f$var$Logger.log($f309677db718e41f$var$LoggerRaw.makeTextStyle(type, ...text));
        $f309677db718e41f$var$Logger.log("");
    };
    error = (...message)=>$f309677db718e41f$var$Logger.makeLogText("error", ...message);
    warning = (...message)=>$f309677db718e41f$var$Logger.makeLogText("warning", ...message);
    info = (...message)=>$f309677db718e41f$var$Logger.makeLogText("info", ...message);
    success = (...message)=>$f309677db718e41f$var$Logger.makeLogText("success", ...message);
    clean = (...message)=>$f309677db718e41f$var$Logger.makeLogText("clean", ...message);
    ln = ()=>"\n";
}
const $f309677db718e41f$var$log = new $f309677db718e41f$var$Logger();
var $f309677db718e41f$export$2e2bcd8739ae039 = $f309677db718e41f$var$log;







const $aa9b11a1a0afc280$var$readFilePromise = (0, ($parcel$interopDefault($dxT2C$util))).promisify((0, ($parcel$interopDefault($dxT2C$fs))).readFile);
const $aa9b11a1a0afc280$var$readFile = async (targetFilePath)=>{
    const targetNaturalPath = (0, ($parcel$interopDefault($dxT2C$path))).resolve(process.cwd(), targetFilePath);
    try {
        const targetFile = await $aa9b11a1a0afc280$var$readFilePromise(targetNaturalPath, {
            encoding: "utf-8"
        });
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).data(targetFile);
    } catch (err) {
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error(err.message);
    }
};
var $aa9b11a1a0afc280$export$2e2bcd8739ae039 = $aa9b11a1a0afc280$var$readFile;



const $c4f42c5e0488ce37$var$flatObject = (object, baseKey = "")=>{
    return Object.keys(object).reduce((r, key)=>{
        if ((0, ($parcel$interopDefault($dxT2C$lodash))).isObject(object[key]) && Object.keys(object[key]).length > 0) return {
            ...r,
            ...$c4f42c5e0488ce37$var$flatObject(object[key], `${baseKey}${key}.`)
        };
        return {
            ...r,
            [`${baseKey}${key}`]: object[key]
        };
    }, {});
};
var $c4f42c5e0488ce37$export$2e2bcd8739ae039 = $c4f42c5e0488ce37$var$flatObject;


const $a3b2d59ff378c280$var$sortObjectByKeys = (object, exceptKeys)=>{
    const objectKeys = Object.keys(object);
    let exceptedKeys = [];
    if (exceptKeys) exceptedKeys = objectKeys.filter((key)=>exceptKeys.some((except)=>new RegExp(`^${except}.*`, "gim").test(key)));
    const sortedKeys = objectKeys.sort((a, b)=>a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0).filter((key)=>!exceptedKeys.includes(key));
    return exceptedKeys.concat(sortedKeys).reduce((acc, key)=>({
            ...acc,
            [key]: object[key]
        }), {});
};
var $a3b2d59ff378c280$export$2e2bcd8739ae039 = $a3b2d59ff378c280$var$sortObjectByKeys;



const $03288ea8a1b26f53$var$deflatObject = (object)=>{
    const resultObject = {};
    Object.keys(object).map((key)=>{
        (0, ($parcel$interopDefault($dxT2C$lodash))).set(resultObject, key, object[key]);
    });
    return resultObject;
};
var $03288ea8a1b26f53$export$2e2bcd8739ae039 = $03288ea8a1b26f53$var$deflatObject;






const $921495dc1e45c2cb$var$writeFilePromise = (0, ($parcel$interopDefault($dxT2C$util))).promisify((0, ($parcel$interopDefault($dxT2C$fs))).writeFile);
const $921495dc1e45c2cb$var$writeFile = async (targetFilePath, data)=>{
    const targetNaturalPath = (0, ($parcel$interopDefault($dxT2C$path))).resolve(process.cwd(), targetFilePath);
    try {
        await $921495dc1e45c2cb$var$writeFilePromise(targetNaturalPath, data, {
            encoding: "utf-8"
        });
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).passed();
    } catch (err) {
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error(err.message);
    }
};
var $921495dc1e45c2cb$export$2e2bcd8739ae039 = $921495dc1e45c2cb$var$writeFile;



const $cce8ee627b555c45$var$parseJson = (jsonString)=>{
    try {
        const parsedJson = JSON.parse(jsonString);
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).data(parsedJson);
    } catch (err) {
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error(err.message);
    }
};
var $cce8ee627b555c45$export$2e2bcd8739ae039 = $cce8ee627b555c45$var$parseJson;


const $609642defeeeda0c$var$exceptObjectKeys = (object, keys)=>{
    const resultObject = {};
    const restKeys = Object.keys(object).filter((key)=>!keys.includes(key));
    const resultKeysOrder = keys.concat(restKeys);
    resultKeysOrder.map((key)=>{
        resultObject[key] = object[key];
    });
    return resultObject;
};
var $609642defeeeda0c$export$2e2bcd8739ae039 = $609642defeeeda0c$var$exceptObjectKeys;







const $95c8707c1c78aa84$var$sortMethod = async (target, flags)=>{
    const exceptKeys = flags["--except"] ? flags["--except"].replace(/\s/gim, "").split(",") : null;
    const parseResult = (0, $cce8ee627b555c45$export$2e2bcd8739ae039)(target);
    if (!parseResult.passed) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to parse json. Check syntax`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${parseResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const flattenedTarget = (0, $c4f42c5e0488ce37$export$2e2bcd8739ae039)(parseResult.data);
    const sortedTarget = (0, $a3b2d59ff378c280$export$2e2bcd8739ae039)(flattenedTarget, exceptKeys);
    const deflattenedTarget = (0, $03288ea8a1b26f53$export$2e2bcd8739ae039)(sortedTarget);
    const resultTarget = deflattenedTarget;
    const targetJson = JSON.stringify(resultTarget, null, 2);
    (0, $f309677db718e41f$export$2e2bcd8739ae039).success`${flags["--target"]} was successfully sorted and prettified`;
    return (0, $17c156b0805d0b25$export$8fdcabde73f49165).data(targetJson);
};
var $95c8707c1c78aa84$export$2e2bcd8739ae039 = $95c8707c1c78aa84$var$sortMethod;


const $614eac89843f35e4$var$sort = async (args, flags)=>{
    (0, $f309677db718e41f$export$2e2bcd8739ae039).success(`Sorting settings file - ${flags["--target"]}`);
    const readFileResult = await (0, $aa9b11a1a0afc280$export$2e2bcd8739ae039)(flags["--target"]);
    if (readFileResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to read file`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${readFileResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const targetJsonResult = await (0, $95c8707c1c78aa84$export$2e2bcd8739ae039)(readFileResult.data, flags);
    if (targetJsonResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to sort settings`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${targetJsonResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const writeFileResult = await (0, $921495dc1e45c2cb$export$2e2bcd8739ae039)(flags["--output"] || flags["--target"], targetJsonResult.data);
    if (writeFileResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to write file`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${writeFileResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    } else {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).success`It was saved to ${flags["--output"] || flags["--target"]}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).passed();
    }
};
var $614eac89843f35e4$export$2e2bcd8739ae039 = $614eac89843f35e4$var$sort;









const $b591e776cc553575$var$checkMethod = ({ main: main , target: target  }, flags)=>{
    const parseMainResult = (0, $cce8ee627b555c45$export$2e2bcd8739ae039)(main);
    if (parseMainResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to parse main json. Check syntax`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${parseMainResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const parseTargetResult = (0, $cce8ee627b555c45$export$2e2bcd8739ae039)(target);
    if (parseTargetResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to parse target json. Check syntax`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${parseTargetResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const flattenedMain = (0, $c4f42c5e0488ce37$export$2e2bcd8739ae039)(parseMainResult.data);
    const flattenedTarget = (0, $c4f42c5e0488ce37$export$2e2bcd8739ae039)(parseTargetResult.data);
    const mainKeys = Object.keys(flattenedMain);
    const missingKeys = mainKeys.filter((key)=>{
        const targetValue = flattenedTarget[key];
        return targetValue === undefined;
    });
    if (!missingKeys.length) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).success`Target settings are valid and ready to use`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).passed();
    }
    (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Target settings are invalid`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Missing keys:
${missingKeys.map((key)=>(0, ($parcel$interopDefault($dxT2C$chalk))).red(`${key}`)).join("\n")}
`;
    return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
};
var $b591e776cc553575$export$2e2bcd8739ae039 = $b591e776cc553575$var$checkMethod;


const $5693212db91bbf5c$var$check = async (args, flags)=>{
    (0, $f309677db718e41f$export$2e2bcd8739ae039).success`Checking settings file - ${flags["--target"]} by main file - ${flags["--main"]}`;
    const readMainResult = await (0, $aa9b11a1a0afc280$export$2e2bcd8739ae039)(flags["--main"]);
    if (readMainResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to read file`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${readMainResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const readTargetResult = await (0, $aa9b11a1a0afc280$export$2e2bcd8739ae039)(flags["--target"]);
    if (readTargetResult.message) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Failed to read file`;
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Error: ${readTargetResult.message}`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error();
    }
    const main = readMainResult.data;
    const target = readTargetResult.data;
    return (0, $b591e776cc553575$export$2e2bcd8739ae039)({
        target: target,
        main: main
    }, flags);
};
var $5693212db91bbf5c$export$2e2bcd8739ae039 = $5693212db91bbf5c$var$check;




const $5f205c13c66b27df$var$help = async (args, flags)=>{
    (0, $f309677db718e41f$export$2e2bcd8739ae039).warning`Commands`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`sort`} - sorts settings keys alphabetically. Also, you can provide keys, which should be at the start of the object and in the provided order.`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`check`} - compares and checks two files of settings, main and provided. If the provided file missing some fields - the process will be broke and you will see which fields are missing.`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).warning`Flags for commands`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`--main/-m <path_to_main_settings.json>`} (check) - path to main settings file to compare with --target/-t file.`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`--target/-t <path_to_target_settings.json>`} (sort, check) - path to settings file to check and validate.`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`--output/-o <path>`} (sort) - path to save --target/-t after sorting.`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`--silent/-s`} (sort/check) - option to disable all output to the console. The process just will be exited if the settings are not valid.`;
    (0, $f309677db718e41f$export$2e2bcd8739ae039).clean`${(0, $f309677db718e41f$export$2e2bcd8739ae039).raw.success`--except/-e "key1, key2, key3"`} (sort) - keys which should be excepted sorting, will be in provided order and placed to the start of sorted settings.`;
    return (0, $17c156b0805d0b25$export$8fdcabde73f49165).passed();
};
var $5f205c13c66b27df$export$2e2bcd8739ae039 = $5f205c13c66b27df$var$help;



class $17c156b0805d0b25$export$8fdcabde73f49165 {
    static data(data) {
        return {
            passed: true,
            data: data
        };
    }
    static passed() {
        return {
            passed: true
        };
    }
    static error(message) {
        return {
            passed: false,
            message: message
        };
    }
}
class $17c156b0805d0b25$export$f1402aa65ae5caf1 {
    constructor(config){
        this.handler = config.handler;
        this.condition = config.condition;
        this.name = config.name;
    }
    async run(args, flags) {
        const { passed: passed , message: message = ""  } = this.condition ? this.condition(args, flags) : {
            passed: true
        };
        if (passed) return await this.handler(args, flags);
        else {
            (0, $f309677db718e41f$export$2e2bcd8739ae039).error(message || `Command '${this.name}' - failed`);
            return $17c156b0805d0b25$export$8fdcabde73f49165.error(message);
        }
    }
}




const $c3da6f75a66f1671$var$handlers = {
    sort: new (0, $17c156b0805d0b25$export$f1402aa65ae5caf1)({
        handler: (0, $614eac89843f35e4$export$2e2bcd8739ae039),
        name: "sort",
        condition: (args, flags)=>{
            if (!flags["--target"]) return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error("Flag: --target is required for this command");
            return (0, $17c156b0805d0b25$export$8fdcabde73f49165).passed();
        }
    }),
    check: new (0, $17c156b0805d0b25$export$f1402aa65ae5caf1)({
        handler: (0, $5693212db91bbf5c$export$2e2bcd8739ae039),
        name: "check",
        condition: (args, flags)=>{
            if (!flags["--target"] || !flags["--main"]) return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error("Flags: --target and --main - are required for this command");
            return (0, $17c156b0805d0b25$export$8fdcabde73f49165).passed();
        }
    }),
    help: new (0, $17c156b0805d0b25$export$f1402aa65ae5caf1)({
        handler: (0, $5f205c13c66b27df$export$2e2bcd8739ae039),
        name: "help"
    })
};
const $c3da6f75a66f1671$var$commandHandler = async (args)=>{
    const [command] = args._;
    if (!command && !args["--help"]) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`Command not found`;
        return $c3da6f75a66f1671$var$handlers.help.run([
            command
        ], args);
    }
    if (args["--help"]) return $c3da6f75a66f1671$var$handlers.help.run([
        command
    ], args);
    const currentHandler = $c3da6f75a66f1671$var$handlers[command];
    if (!currentHandler) {
        (0, $f309677db718e41f$export$2e2bcd8739ae039).error`'${command}' is not a valid command. Check the README.MD`;
        return (0, $17c156b0805d0b25$export$8fdcabde73f49165).error(`'${command}' is not a valid command. Check the README.MD`);
    }
    (0, $f309677db718e41f$export$2e2bcd8739ae039).ln();
    (0, $f309677db718e41f$export$2e2bcd8739ae039).info((0, ($parcel$interopDefault($dxT2C$lodash))).capitalize(command));
    return await currentHandler.run([
        command
    ], args);
};
var $c3da6f75a66f1671$export$2e2bcd8739ae039 = $c3da6f75a66f1671$var$commandHandler;


const $20dd7fc7127fd575$var$rawArgs = (0, ($parcel$interopDefault($dxT2C$arg)))({
    "--main": String,
    "--target": String,
    "--help": Boolean,
    "--output": String,
    "--except": String,
    "--silent": Boolean,
    "-e": "--except",
    "-o": "--output",
    "-m": "--main",
    "-t": "--target"
}, {
    argv: process.argv.slice(2)
});
const $20dd7fc7127fd575$var$main = (async ()=>{
    const args = $20dd7fc7127fd575$var$rawArgs;
    process.env.SILENT_MODE = args["--silent"] ? "true" : "false";
    const executionResult = await (0, $c3da6f75a66f1671$export$2e2bcd8739ae039)(args);
    if (executionResult?.passed) process.exit(0);
    else process.exit(1);
})();


//# sourceMappingURL=index.js.map
