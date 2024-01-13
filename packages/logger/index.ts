import { Chalk } from 'chalk';

const chalk = new Chalk();

export const red = (...args: any[]) => console.log('log', chalk.red(args));