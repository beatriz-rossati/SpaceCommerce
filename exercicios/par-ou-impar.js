function ParOuImpar(palavra, numero) {

    console.log("Joque par ou ímpar com o computador!")

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const numPC = randomNumber(1, 5);
    const soma = Number(numero) + numPC;
    const result = (soma) % 2

    console.log(`O computador tirou ${numPC}`)
    if (palavra == "par" & result == 0) {
        console.log(`A soma é ${soma}, você ganhou`)
    } else if (palavra == "impar" & result == 1) {
        console.log(`A soma é ${soma}, você ganhou`)
    } else {
        console.log(`A soma é ${soma}, o computador ganhou.\n`)
    }
};

ParOuImpar(process.argv[2], process.argv[3]);