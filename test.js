const string = "CE * (+ (* (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1)))";
const ce = (str) => {
    let finalResult = 0;
    // Take the Command if needed
    let userInputSplice = str;
    if (str.match(/^(CE )/gi)) {
        userInputSplice = [...str].splice(3).join("");
    }
    console.log({ userInputSplice });

    // Preparation for binary operators
    let index = -1;
    let closeBracketIndex = [];

    // Preparation for unary operators
    let openBracketIndex = [];
    const regex = /^([a-zA-Z]+)/g;
    const regexOperator = userInputSplice.match(regex);
    // console.log({ regexOperator });

    let balanced = ""

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

        balanced = stack

        return stack.length === 0;

        
    };
    isBalanced(userInputSplice);

    if (balanced !== 0) {
        return console.log("Expressao mal definida.");
    }

    const calculation = () => {
        if (binaryOperators.hasOwnProperty(userInputSplice[0])) {
            let arg1 = [...userInputSplice]
                .slice(3, closeBracketIndex[0])
                .join("");
            console.log("arg1 is: " + arg1);
            let operator = userInputSplice[0];
            let arg2 = [...userInputSplice]
                .slice(closeBracketIndex[0] + 3, userInputSplice.length - 1)
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

            if (parseFloat(arg1)) {
                console.log("Arg1 is a number");
            } else {
                arg1 = parseFloat(ce(arg1));
                console.log("if not number" + arg1);
            }

            if (parseFloat(arg2)) {
                console.log("Arg2 is a number");
            } else {
                arg2 = parseFloat(ce(arg2));
            }

            console.log("New arg1 is: " + arg1, typeof arg1);
            console.log("New arg2 is: " + arg2, typeof arg2);
            finalResult = parseFloat(binaryCalculation(arg1, arg2)[operator]);
        } else if (unaryOperators.hasOwnProperty(regexOperator)) {
            let arg3 = [...userInputSplice]
                .slice(openBracketIndex[0] + 1, userInputSplice.length - 1)
                .join("");
            console.log({ arg3 });

            let operator = regexOperator.toString();
            console.log({ operator });

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
        } else {
            console.log("Error");
        }
    };
    calculation();

    console.log({ finalResult });
    return finalResult;
};

ce(string);
