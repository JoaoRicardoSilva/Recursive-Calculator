"use strict";
/*

Prompt

Create 7 functions
VM - Consultar o valor da memoria 
LM - Indicar o nome das memorias 
CE - Calcular o valor duma expressao 
AVM - Atribuir ultimo valor calculado a uma memoria 
A - Ajuda 
AM - Alocar Memória
S – Sair

*/

const recursiveCalculator = () => {
    //Debug log
    const debug = (arg1, arg2) => console.log(`${arg1} is: ${arg2}`);

    // Ask input
    const userInput = window.prompt(
        "Hello user! What you need me to do? (Press A for help)"
    );
    debug("User input", userInput);

    // See the command
    const command = (arg) => {
        const commandRegex = /^(\w+)/gi;
        const commandArr = commandRegex.exec(arg);
        return commandArr[0];
    };
    const commandConst = command(userInput);
    debug("Command", commandConst);
};

recursiveCalculator();
