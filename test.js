let memory1A = "first";
let memory1B = 123;
let memory2A = null;
let memory2B = null;
const showM1 = () => console.log(`${memory1A}: ${memory1B}`);
const showM2 = () => console.log(`${memory2A}: ${memory2B}`);

const loop = () => {
    const userInput = window.prompt(
        "Hello user! What you need me to do? (Press A for help)"
    );
    console.log(userInput); // Debug

    const checkInput = (() => {
        // Transform memory numbers wit to decimal cases (not working)
        //memory1B.toFixed(2);
        //memory2B.toFixed(2);
        // S
        userInput.toUpperCase() == "S"
            ? console.log("Aplicacao terminada. Ate a proxima.")
            : // A
            userInput.toUpperCase() == "A"
            ? (() => {
                  console.log(
                      "\nVM - Consultar o valor da memoria\nLM - Indicar o nome das memorias\nCE - Calcular o valor duma expressao\nAVM - Atribuir ultimo valor calculado a uma memoria\nA - Ajuda\nAM - Alocar Memória\nS – Sair"
                  );

                  loop();
              })()
            : //VM
            userInput.toUpperCase().startsWith("VM ")
            ? (() => {
                  switch (userInput.substr(3)) {
                      case memory1A:
                          showM1();
                          break;
                      case memory2A:
                          showM2();
                          break;

                      default:
                          console.log("Memoria nao existente.");
                          break;
                  }
                  loop();
              })()
            : // LM
            userInput.toUpperCase().startsWith("LM")
            ? (() => {
                  memory1A
                      ? showM1()
                      : memory2A
                      ? showM2()
                      : !memory1A && !memory2A
                      ? console.log("Calculadora sem memorias.")
                      : console.log("Error in LM");
                  loop();
              })()
            : // CE
            userInput.toUpperCase().startsWith("CE")
            ? (() => {
                  // It's with strIndexThree that program will know what to do in CE
                  const strIndexThree = userInput.substr(3, 1);
                  console.log(strIndexThree); // Debug

                  //Function to show result
                  const showResult = (result) =>
                      console.log(`resultado: ${result}`);

                  //Regex for calculation like ABS
                  const regex =
                      /(ABS)|(COS)|(LOG)|(CEIL)|(FLOOR)|(SIN)|(ROUND)|(EXP)/g;

                  !isNaN(strIndexThree)
                      ? console.log("Is a number")
                      : userInput.substr(3) === memory1A
                      ? showResult(memory1B)
                      : userInput.substr(3) === memory2A
                      ? showResult(memory2B)
                      : regex.test(userInput)
                      ? (() => {
                            const regexBrackets = /[()]/g;
                            const regexNumber = /[\d\.\-]/g;
                            const userNumber = parseFloat(
                                userInput.match(regexNumber).join("")
                            );
                            console.log(userNumber);
                            const mathFunName = userInput
                                .match(regex)
                                .toString();
                            console.log(mathFunName);

                            if (!regexBrackets.test(userInput)) {
                                console.log("Expressao mal definida.");
                                loop();
                            }
                            switch (mathFunName) {
                                case "ABS":
                                    showResult(Math.abs(userNumber));
                                    break;

                                case "COS":
                                    showResult(Math.cos(userNumber));
                                    break;
                                case "LOG":
                                    showResult(Math.log(userNumber));
                                    break;
                                case "CEIL":
                                    showResult(Math.ceil(userNumber));
                                    break;
                                case "FLOOR":
                                    showResult(Math.floor(userNumber));
                                    break;
                                case "SIN":
                                    showResult(Math.sin(userNumber));
                                    break;
                                case "ROUND":
                                    showResult(Math.round(userNumber));
                                    break;
                                case "EXP":
                                    showResult(Math.exp(userNumber));
                                    break;

                                default:
                                    log("Error in: switch (mathFunName)");
                                    break;
                            }

                            console.log("WORK");
                        })()
                      : console.log("Expressao mal definida.");
                  loop();
              })()
            : (() => {
                  console.log("Opcao inexistente.");
                  loop();
              })();
    })();
};

loop();
