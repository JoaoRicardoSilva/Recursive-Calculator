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
    const message = "Hello user! What you need me to do? (Press A for help)";
    const userInput = window.prompt(message);
    console.log(userInput); // Debug
    let memory = { first: 154, second: 548 };

    const checkInput = (() => {
        userInput.toUpperCase() == "S"
            ? console.log("Aplicacao terminada. Ate a proxima.")
            : userInput.toUpperCase() == "A"
            ? (() => {
                  console.log(
                      "\nVM - Consultar o valor da memoria\nLM - Indicar o nome das memorias\nCE - Calcular o valor duma expressao\nAVM - Atribuir ultimo valor calculado aA uma memoria\nA - Ajuda\nAM - Alocar Memória\nS – Sair"
                  );

                  recursiveCalculator();
              })()
            : userInput.toUpperCase().startsWith("VM ")
            ? (() => {
                  console.log(memory[0]);
                  recursiveCalculator();
              })()
            : (() => {
                  console.log("Opcao inexistente.");
                  recursiveCalculator();
              })();
    })();
};

recursiveCalculator();
