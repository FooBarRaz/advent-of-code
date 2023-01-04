import fs from "fs";
import tree from 'tree-node-cli';
import {fetchInput} from "./fetch-input";

export const setupNewDay = async (basePath: string, year: string, day: string) => {
    const path = `${basePath}/${year}/day${day}`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }

    fetchInput(year, parseInt(day).toString())
        .then(input => {
            fs.writeFileSync(`${path}/problemSolver.ts`, '');
            fs.writeFileSync(`${path}/data.ts`, `export const data = \`${input.trim()}\``)
            fs.writeFileSync(`${path}/problemSolver.test.ts`, '');
            const fileTree = tree(path, {trailingSlash: true});
            console.log(fileTree);
        })
}