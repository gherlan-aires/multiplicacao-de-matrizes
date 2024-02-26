function naive(a, b) {
    let m = a.length;
    let n = a[0].length;
    let k = b[0].length;
    let c = Array.from({ length: m }, () => Array(k).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < k; j++) {
            let soma = 0;
            for (let l = 0; l < n; l++) {
                soma += a[i][l] * b[l][j];
            }
            c[i][j] = soma;
        }
    }

    return c;
}

function addMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return result;
}

function subtractMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }
    return result;
}

function strassen(a, b) {
    const n = a.length;

    if (n === 1) {
        return [[a[0][0] * b[0][0]]];
    }

    const halfSize = n / 2;
    const a11 = new Array(halfSize);
    const a12 = new Array(halfSize);
    const a21 = new Array(halfSize);
    const a22 = new Array(halfSize);
    const b11 = new Array(halfSize);
    const b12 = new Array(halfSize);
    const b21 = new Array(halfSize);
    const b22 = new Array(halfSize);

    for (let i = 0; i < halfSize; i++) {
        a11[i] = a[i].slice(0, halfSize);
        a12[i] = a[i].slice(halfSize);
        a21[i] = a[i + halfSize].slice(0, halfSize);
        a22[i] = a[i + halfSize].slice(halfSize);

        b11[i] = b[i].slice(0, halfSize);
        b12[i] = b[i].slice(halfSize);
        b21[i] = b[i + halfSize].slice(0, halfSize);
        b22[i] = b[i + halfSize].slice(halfSize);
    }

    const p1 = strassen(a11, subtractMatrices(b12, b22));
    const p2 = strassen(addMatrices(a11, a12), b22);
    const p3 = strassen(addMatrices(a21, a22), b11);
    const p4 = strassen(a22, subtractMatrices(b21, b11));
    const p5 = strassen(
        addMatrices(a11, a22),
        addMatrices(b11, b22)
    );
    const p6 = strassen(
        subtractMatrices(a12, a22),
        addMatrices(b21, b22)
    );
    const p7 = strassen(
        subtractMatrices(a11, a21),
        addMatrices(b11, b12)
    );

    const c11 = addMatrices(subtractMatrices(addMatrices(p5, p4), p2), p6);
    const c12 = addMatrices(p1, p2);
    const c21 = addMatrices(p3, p4);
    const c22 = subtractMatrices(subtractMatrices(addMatrices(p5, p1), p3), p7);

    const resultMatrix = [];
    for (let i = 0; i < halfSize; i++) {
        resultMatrix[i] = c11[i].concat(c12[i]);
    }
    for (let i = 0; i < halfSize; i++) {
        resultMatrix[i + halfSize] = c21[i].concat(c22[i]);
    }

    return resultMatrix;
}

export { naive, strassen }