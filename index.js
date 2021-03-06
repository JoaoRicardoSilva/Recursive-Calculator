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
    //Memory
    let memory = {};

    // Ram
    let ramMemory = 0;

    const loop = () => {
        // Ask input
        const userInput = window.prompt(
            "Hello user! What you need me to do? (Press A for help)"
        );
        // console.log({ userInput });

        // Memorize the command
        const command = (arg) => {
            const commandRegex = /^(\w+)/gi;
            const commandArr = commandRegex.exec(arg);
            return commandArr[0];
        };
        const commandConst = command(userInput);
        // console.log({ commandConst });

        //Command S
        const s = () => {
            window.alert("Aplicacao terminada. Ate a proxima.");
            return;
        };

        // Command A
        const a = () => {
            window.alert(
                "VM - Consultar o valor da memoria\nLM - Indicar o nome das memorias\nCE - Calcular o valor duma expressao\nAVM - Atribuir ultimo valor calculado a uma memoria\nA - Ajuda\nAM - Alocar Memória\nS – Sair"
            );
        };

        // VM Command
        const vm = () => {
            const amRegex = /^(\w+) (\w+)/gi;
            const name = amRegex.exec(userInput);

            if (!memory.hasOwnProperty(name[2])) {
                window.alert("Memoria nao existente.");
            } else {
                window.alert(`${name[2]}: ${memory[name[2]]}`);
            }
        };

        // LM Command
        const lm = () => {
            const keysArr = Object.keys(memory);
            console.log(memory);
            if (keysArr == 0) {
                window.alert("Calculadora sem memorias.");
            } else if (keysArr[0] && !keysArr[1]) {
                console.log("Test1");
                Object.entries(memory).forEach(([key, value]) =>
                    window.alert(`${key}: ${value}`)
                );
            } else if (keysArr[1]) {
                console.log("Test2");
                let preResultAlert = [];
                Object.entries(memory).forEach(([key, value]) =>
                    preResultAlert.push(` ${key}: ${value};`)
                );
                let posResultAlert = preResultAlert
                    .join("")
                    .substr(1, preResultAlert.join("").length - 2);

                window.alert(posResultAlert);
            }
        };

        // CE Command
        const ce = (str) => {
            let finalResult = 0;
            // Take the Command if needed
            let userInputSplice = str;
            if (str.match(/^(CE )/gi)) {
                userInputSplice = [...str].splice(3).join("");
            }
            console.log({ userInputSplice });

            // If userInputSplice is a number
            if (parseFloat(userInputSplice)) {
                ramMemory = parseFloat(userInputSplice);
                return ramMemory;
            }

            // Preparation for binary operators
            let index = -1;
            let closeBracketIndex = [];

            // Preparation for unary operators
            let openBracketIndex = [];
            const regex = /^([a-zA-Z]+)/g;
            const regexOperator = userInputSplice.match(regex);
            // console.log({ regexOperator });

            let balanced = "";

            const binaryOperators = {
                "+": "",
                "-": "",
                "*": "",
                "/": "",
            };

            const unaryOperators = {
                ABS: "",
                COS: "",
                LOG: "",
                CEIL: "",
                FLOOR: "",
                SIN: "",
                ROUND: "",
                EXP: "",
            };

            //"CE + (+ (-1) (5)) (+ (-1) (5))";
            const isBalanced = (input) => {
                const brackets = "[]()";
                let stack = [];

                let strArr = [...input].map((bracket) => {
                    let bracketsIndex = brackets.indexOf(bracket);
                    // console.log(bracketsIndex);

                    index++;
                    // console.log("index is: " + index);

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

                    // Return close bracket's index
                    if (stack.length === 0) {
                        closeBracketIndex.push(index);
                        // console.log("Close bracket index is: " + closeBracketIndex);
                    }

                    // Return 1st open bracket's index
                    if (stack.length === 1) {
                        openBracketIndex.push(index);
                        // console.log({ openBracketIndex });
                    }

                    // console.log({ stack });
                });

                balanced = stack;

                return stack.length === 0;
            };
            isBalanced(userInputSplice);

            if (balanced.length !== 0) {
                return (finalResult = "Expressao mal definida.");
            }

            const calculation = () => {
                if (binaryOperators.hasOwnProperty(userInputSplice[0])) {
                    let arg1 = [...userInputSplice]
                        .slice(3, closeBracketIndex[0])
                        .join("");
                    console.log("arg1 is: " + arg1);
                    let operator = userInputSplice[0];
                    let arg2 = [...userInputSplice]
                        .slice(
                            closeBracketIndex[0] + 3,
                            userInputSplice.length - 1
                        )
                        .join("");
                    console.log("arg2 is: " + arg2);

                    const binaryCalculation = (num1, num2) => {
                        console.log({ num1, num2 });

                        return {
                            "+": parseFloat(num1) + parseFloat(num2),
                            "-": parseFloat(num1) - parseFloat(num2),
                            "*": parseFloat(num1) * parseFloat(num2),
                            "/": parseFloat(num1) / parseFloat(num2),
                        };
                    };

                    //Check if arg1 and arg2 have brackets
                    if (
                        userInputSplice[2] !== "(" ||
                        userInputSplice[closeBracketIndex[0]] !== ")" ||
                        userInputSplice[closeBracketIndex[0] + 2] !== "(" ||
                        userInputSplice[userInputSplice.length - 1] !== ")"
                    ) {
                        return (finalResult = "Expressao mal definida.");
                    }

                    // If arg1 is on memory
                    if (memory.hasOwnProperty(arg1)) {
                        arg1 = parseFloat(memory[arg1]);
                    }

                    // If arg1 is a number but in not in memory
                    if (parseFloat(arg1)) {
                        arg1 = parseFloat(arg1);
                    }

                    if (typeof arg1 === "number") {
                        console.log("Arg1 is a number");
                    } else {
                        arg1 = parseFloat(ce(arg1));
                    }

                    // If arg2 is on memory
                    if (memory.hasOwnProperty(arg2)) {
                        arg2 = memory[arg2];
                    }

                    // If arg2 is a number but in not in memory
                    if (parseFloat(arg2)) {
                        arg2 = parseFloat(arg2);
                    }

                    if (typeof arg2 === "number") {
                        console.log("Arg2 is a number");
                    } else {
                        arg2 = parseFloat(ce(arg2));
                    }

                    console.log("New arg1 is: " + arg1, typeof arg1);
                    console.log("New arg2 is: " + arg2, typeof arg2);
                    finalResult = parseFloat(
                        binaryCalculation(arg1, arg2)[operator]
                    );
                    ramMemory = finalResult;
                } else if (unaryOperators.hasOwnProperty(regexOperator)) {
                    let arg3 = [...userInputSplice]
                        .slice(
                            openBracketIndex[0] + 1,
                            userInputSplice.length - 1
                        )
                        .join("");
                    console.log({ arg3 });

                    let operator = regexOperator.toString();
                    console.log({ operator });

                    //Check if arg1 and arg2 have brackets
                    if (
                        userInputSplice[openBracketIndex[0]] !== "(" ||
                        userInputSplice[userInputSplice.length - 1] !== ")"
                    ) {
                        return (finalResult = "Expressao mal definida.");
                    }

                    // If arg3 is on memory
                    if (memory.hasOwnProperty(arg3)) {
                        arg3 = memory[arg3];
                    }

                    // If arg3 is a number but in not in memory
                    if (parseFloat(arg3)) {
                        arg3 = parseFloat(arg3);
                    }

                    if (parseFloat(arg3)) {
                        console.log("Arg3 is a number");
                    } else {
                        console.log("Arg3 is not a number");
                        arg3 = parseFloat(ce(arg3));
                    }

                    const unaryCalculation = (num3) => {
                        console.log({ num3 });

                        return {
                            ABS: Math.abs(num3),
                            COS: Math.cos(num3),
                            LOG: Math.log(num3),
                            CEIL: Math.ceil(num3),
                            FLOOR: Math.floor(num3),
                            SIN: Math.sin(num3),
                            ROUND: Math.round(num3),
                            EXP: Math.exp(num3),
                        };
                    };

                    arg3 = parseFloat(arg3);
                    console.log("New arg3 is: " + arg3, typeof arg3);
                    finalResult = unaryCalculation(arg3)[operator];
                    ramMemory = finalResult;
                } else {
                    finalResult = "Expressao mal definida.";
                }
            };
            calculation();

            console.log({ finalResult });

            return finalResult;
        };

        // Command AVM
        const avm = () => {
            const amRegex = /^(\w+) (\w+)/gi;
            const name = amRegex.exec(userInput);

            // Creating the memory

            if (!memory.hasOwnProperty(name[2])) {
                window.alert("Memoria nao existente.");
            } else {
                memory[name[2]] = ramMemory.toFixed(2);
                window.alert(`${name[2]}: ${memory[name[2]]}`);
            }
        };

        // Command AM
        const am = () => {
            const amRegex = /^(\w+) (\w+)/gi;
            const name = amRegex.exec(userInput);

            // Creating the memory
            memory[name[2]] = 0;
            memory[name[2]] = memory[name[2]].toFixed(2);
            console.log(memory);
            window.alert(`memoria criada com o nome: ${name[2]}`);
        };

        // Run the command
        const check = (arg1) => {
            return commandConst.toUpperCase() === arg1;
        };

        check("S")
            ? (() => {
                  s();
              })()
            : check("A")
            ? (() => {
                  a();
                  loop();
              })()
            : check("VM")
            ? (() => {
                  vm();
                  loop();
              })()
            : check("LM")
            ? (() => {
                  lm();
                  loop();
              })()
            : check("CE")
            ? (() => {
                  let result = ce(userInput);
                  if (parseFloat(result)) {
                      result = Math.round(result * 100) / 100;
                  }

                  window.alert(result);
                  loop();
              })()
            : check("AVM")
            ? (() => {
                  avm();
                  loop();
              })()
            : check("AM")
            ? (() => {
                  am();
                  loop();
              })()
            : console.log("Opcao inexistente.");
    };

    loop();
};

recursiveCalculator();
