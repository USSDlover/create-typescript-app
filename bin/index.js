#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, {sdio: 'inherit'})
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const exit = code => process.exit(code);

const repoName = process.argv[2];
const gitCloneCommand = `git clone --depth 1 https://github.com/USSDloveer/create-typescript-app ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`create typescript app with name ${repoName}`);
const cloned = runCommand(gitCloneCommand);
if (!cloned) exit(-1);

const depsInstalled = runCommand(installDepsCommand);
if (!depsInstalled) exit(-1);
