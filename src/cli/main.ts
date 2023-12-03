import { Command } from 'commander'
import {setupNewDay} from "../../scripts/directory-setup";

const program = new Command()

program
    .name('init')
    .description('initialize a directory for a new day')
    .argument('<basePath>', 'the base path to create the directory in')
    .option('-y, --year <year>', 'year')
    .option('-d, --day <day>', 'day to initialize')
    .action((basePath, {day, year}) => {
        setupNewDay(basePath, year, day)
    });

program.parse();