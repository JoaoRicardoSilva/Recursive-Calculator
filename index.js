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
    let memory = { first: 15.365 };

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

        // VM Command
        const vm = () => {
            const vmRegex = /^(\w+) (\w+)/gi;
            const memoryName = vmRegex.exec(userInput);

            memory[memoryName[2]]
                ? console.log(
                      `${memoryName[2]}: ${memory[memoryName[2]].toFixed(2)}`
                  )
                : console.log("Memoria nao existente.");
        };

        // LM Command
        const lm = () => {
            Object.entries(memory).forEach(([key, value]) =>
                console.log(`${key}: ${value.toFixed(2)}`)
            );
        };

        // CE Command
        const ce = () => {
            let closeBracketIndex = [];
            const binaryOperators = {
                "+": "",
                "-": "",
                "*": "",
                "/": "",
            };

            const unaryOperators = {
                ABS: Math.abs(""),
                COS: Math.cos(""),
                LOG: Math.log(""),
                CEIL: Math.ceil(""),
                FLOOR: Math.floor(""),
                SIN: Math.sin(""),
                ROUND: Math.round(""),
                EXP: Math.exp(""),
            };

            const isBalanced = (input) => {
                const brackets = "()";
                let stack = [];

                let strArr = [...input].map((bracket) => {
                    let bracketsIndex = brackets.indexOf(bracket);
                    console.log(bracketsIndex);

                    if (bracketsIndex === -1) {
                        return;
                    }

                    if (bracketsIndex % 2 === 0) {
                        stack.push(bracketsIndex + 1);
                    } else {
                        if (stack.pop() !== bracketsIndex) {
                            return false;
                        }
                    }

                    if (stack.length === 0) {
                        closeBracketIndex.push(input.indexOf(bracket));
                        console.log(closeBracketIndex);
                    }
                });

                console.log(stack.length === 0);
                return stack.length === 0;
            };
            isBalanced(userInput);
        };

        // Command AM
        const am = () => {
            const amRegex = /^(\w+) (\w+)/gi;
            const name = amRegex.exec(userInput);

            // Creating the memory
            memory[name[2]] = null;
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
            ? vm()
            : check("LM")
            ? lm()
            : check("CE")
            ? ce()
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
