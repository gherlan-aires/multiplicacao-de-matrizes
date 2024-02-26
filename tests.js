import { naive, strassen } from "./services/functions.js";
import { a, b } from "./services/variables.js";

//naive:
console.log("Resultado da multiplicação no método ingênuo: ");

    console.time();
        console.log(naive(a, b));
    console.timeEnd();

//strassen:
console.log("Resultado da multiplicação de Strassen: ");

        console.time();
            console.log(strassen(a, b));
        console.timeEnd();