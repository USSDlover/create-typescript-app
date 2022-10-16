#!/usr/bin/env node

const {execSync} = require('child_process');
const {rm, rmdir, rename} = require('fs');

const runCommand = command => {
    try {
        console.log('Running Command: ', command);
        execSync(`${command}`, {sdio: 'inherit'})
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const exit = code => process.exit(code);

const cleanUp = () => {
    rm(appFolder + '/CHANGELOG.md', () => {});
    rm(appFolder + '/LICENCE', () => {});
    rm(appFolder + '/yarn.lock', () => {});
    rmdir(binFolder, {recursive: true}, () => console.log('Clean up is done...'));
}
const replaceFiles = () => {
    rename(binFolder + '/replacements/package.json', appFolder + '/package.json', () => '[package.json] Replacement is done...')
    rename(binFolder + '/replacements/README.md', appFolder + '/README.md', () => '[README.md] Replacement is done...')
}

const template = process.argv[3] || 'default';
const repoName = process.argv[2];
const appFolder = `${repoName}`;
const binFolder = `${repoName}/bin`;

const gitCloneCommand = `git clone --depth 1 https://github.com/USSDlover/create-typescript-app.git -b ${template} ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install ci`;

console.log(`Creating "${repoName}" ...`);
const cloned = runCommand(gitCloneCommand);
if (!cloned) {
    console.log('Error during creation');
    exit(-1);
}
console.log('Creating is done...');

console.log('Install Dependencies...');
const depsInstalled = runCommand(installDepsCommand);
if (!depsInstalled) {
    console.log('Error during dependencies installation...');
    exit(-1);
}

console.log('Clean up...');
replaceFiles();
cleanUp();

console.log('Everything is set.');
