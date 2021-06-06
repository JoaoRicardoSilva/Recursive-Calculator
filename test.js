const str =
    "CE * (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))";

let isBalanced = (input) => {
    let brackets = "[]{}()<>";
    let stack = [];
    let closeBracketIndex = [];

    for (let bracket of input) {
        let bracketsIndex = brackets.indexOf(bracket);
        console.log(bracketsIndex);

        if (bracketsIndex === -1) {
            continue;
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
    }

    console.log(stack.length === 0);
    return stack.length === 0;
};

isBalanced(str);
