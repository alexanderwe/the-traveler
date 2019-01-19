export default class Logger {

    static debug(message: string) {
        console.log('\x1b[34m%s\x1b[0m', `[Debug] ${message}`);
    }

    static trace(message: string) {
        console.log('\x1b[37m%s\x1b[0m', `[TRACE] ${message}`);
    }

    static warn(message: string) {
        console.log('\x1b[33m%s\x1b[0m', `[WARN] ${message}`);
    }

    static err(message: string) {
        console.log('\x1b[31m%s\x1b[0m', `[ERR] ${message}`);
    }
}