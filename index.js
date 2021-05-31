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

    //Memory
    let memory = [];

    const loop = () => {
        // Ask input
        const userInput = window.prompt(
            "Hello user! What you need me to do? (Press A for help)"
        );
        debug("User input", userInput);

        // Memorize the command
        const command = (arg) => {
            const commandRegex = /^(\w+)/gi;
            const commandArr = commandRegex.exec(arg);
            return commandArr[0];
        };
        const commandConst = command(userInput);
        debug("Command", commandConst);
        console.log(typeof commandConst);

        //Command S
        const s = () => {
            console.log("Aplicacao terminada. Ate a proxima");
            throw "";
        };

        // Command A
        const a = () => {
            console.log("VM - Consultar o valor da memoria ");
            console.log("LM - Indicar o nome das memorias");
            console.log("CE - Calcular o valor duma expressao ");
            console.log("AVM - Atribuir ultimo valor calculado a uma memoria");
            console.log("A - Ajuda");
            console.log("AM - Alocar Memória");
            console.log("S – Sair");
        };

        // Command AM
        const am = () => {
            const amRegex = /^(\w+) (\w+)/gi;
            const name = amRegex.exec(userInput);
            const nameArr = [name[2]];
            console.log(nameArr);
            memory.push(nameArr);
            console.log(memory);
            if (memory[2]) {
                memory.shift();
            }
            console.log(memory);
        };
        // Run the command
        const check = (arg1) => {
            return commandConst.toUpperCase() === arg1;
        };
        check("S")
            ? s()
            : check("A")
            ? a()
            : check("VM")
            ? console.log("vm")
            : check("LMS")
            ? console.log("lm")
            : check("CE")
            ? console.log("ce")
            : check("AVM")
            ? console.log("avm")
            : check("AM")
            ? am()
            : console.log("Opcao inexistente.");

        loop();
    };

    loop();
};

recursiveCalculator();
