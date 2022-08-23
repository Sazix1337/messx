class Messx {
    constructor(rootDir) {
        const fs = require('fs');
        const {parse} = require('node-html-parser');
        const path = require('path');
        const root = parse(fs.readFileSync(rootDir));
        const variables = [];
        const VarError = require('./varError');

        function variablesCheck() {
            for(let i = 0; i < variables.length; i++) {
                if(variables[i].variableName == variables[i + 1]?.variableName) {
                    throw new VarError('VarError: Some variables have similar names.');
                }
            }
        }

        if(root.innerHTML.search(/\{\{.*?\}\}+/gim) !== -1) {
            const msxs = root.innerHTML.match(/\{\{.*?\}\}+/gim);
            msxs.forEach(msx => {
                const variableNode = msx.split(/[\{\} ]/gim).filter(s => s != '').join('');
                if(variableNode.charAt(0) == "%") {
                    const variable = variableNode.split(/[\%\(\)]+/gim).filter(s => s != '').join('');
                    if(variable.match('=')) {
                        const leftOperand = variable.split('=')[0];
                        const rightOperand = variable.split('=')[1];
                        variables.push({
                            variableName: leftOperand,
                            variableValue: rightOperand
                        });
                        variablesCheck();
                    }
                }
            });
        }

        function compile() {
            if(root.innerHTML.search(/\{\{.*?\}\}+/gim) !== -1) {
                const msxs = root.innerHTML.match(/\{\{.*?\}\}+/gim);
                msxs.forEach(msx => {
                    let variableNode = msx.split(/[\{\}\$ ]/gim).filter(s => s != '').join('');
                    if(variableNode.charAt(0) == "%") return;
            
                    const variable = variables.filter(n => n.variableName == variableNode);
                    variableNode = variable[0].variableValue;
                    root.innerHTML = root.innerHTML.replace(`${variable[0].variableName}$`, variableNode);
                    const data = root.innerHTML.replaceAll('{', "").replaceAll('}', "").split(/\%\(.*?\)/gim).join('').split(/ \= \d+/gim).join('');
                    fs.mkdir(path.join(__dirname, 'build'), error => {
                        if(error) {};

                        fs.writeFile(path.join(__dirname, 'build', 'public.html'), data, error => {
                            if(error) {};
                        })
                    });
                });
            }
        }

        compile();
    }
}

module.exports = Messx;