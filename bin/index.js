#!/usr/bin/env node

const {execSync} = require('child_process');

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

const template = process.argv[3] || 'default';
const repoName = process.argv[2];
const gitCloneCommand = `git clone --depth 1 https://github.com/USSDlover/create-typescript-app.git -b ${template} ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Start creating TypeScript APP with name: "${repoName}"`);
const cloned = runCommand(gitCloneCommand);
if (!cloned) exit(-1);

const depsInstalled = runCommand(installDepsCommand);
if (!depsInstalled) exit(-1);
