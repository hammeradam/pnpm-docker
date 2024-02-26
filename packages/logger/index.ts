import { Chalk } from 'chalk';

const chalk = new Chalk();

export const red = (...args: any[]) => console.log(chalk.red(args));
