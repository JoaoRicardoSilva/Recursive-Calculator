const string = "CE + (+ (-1) (5)) (+ (-1) (5))";

const ce = (str) => {
    let userInputSplice = "";
    str[0] === "C" || str[0] === "c"
        ? (userInputSplice = [...str].splice(3).join(""))
        : (userInputSplice = str);
    console.log("userInputSlice: " + userInputSplice);
    let index = -1;
    let closeBracketIndex = [];
    // const regex = userInputSplice.match(/^([a-zA-Z]+)/g);

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
        const brackets = "[]()";
        let stack = [];

        console.log("Input is: " + input);

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

            if (stack.length === 0) {
                closeBracketIndex.push(index);
                // console.log("Bracket index is: " + closeBracketIndex);
            }
            // console.log("Stack is: " + stack);
        });

        return stack.length === 0;
    };
    isBalanced(userInputSplice);

    binaryOperators.hasOwnProperty(userInputSplice[0])
        ? (() => {
              let arg1 = [...userInputSplice]
                  .slice(3, closeBracketIndex[0])
                  .join("");
              console.log("arg1 is: " + arg1);
              let operator = userInputSplice[0];
              let arg2 = [...userInputSplice]
                  .slice(closeBracketIndex[0] + 3, userInputSplice.length - 1)
                  .join("");
              console.log("arg2 is: " + arg2);
              const binaryCalculation = {
                  "+": parseFloat(arg1) + parseFloat(arg2),
                  "-": parseFloat(arg1) - parseFloat(arg2),
                  "*": parseFloat(arg1) * parseFloat(arg2),
                  "/": parseFloat(arg1) / parseFloat(arg2),
              };

              isNaN(parseFloat(arg1)) === true &&
              isNaN(parseFloat(arg2)) === false
                  ? (() => {
                        arg1 = ce(arg1);
                    })()
                  : isNaN(parseFloat(arg1)) === false &&
                    isNaN(parseFloat(arg2)) === true
                  ? (() => {
                        arg2 = ce(arg2);
                    })()
                  : isNaN(parseFloat(arg1)) === true &&
                    isNaN(parseFloat(arg2)) === true
                  ? (() => {
                        arg1 = parseFloat(ce(arg1));
                        arg2 = parseFloat(ce(arg2));
                    })()
                  : console.log("All are numbers");

              console.log("New arg1 is: " + arg1);
              console.log("New arg2 is: " + arg2);
              let result = binaryCalculation[userInputSplice[0]];
              console.log("Result is: " + result);
              return result;
          })()
        : console.log("Future unary functions")
        ? console.log("Uni")
        : console.log("Error");
};

ce(string);
