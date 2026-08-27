// Estrutura de entrada e saída de dados
// Importa o módulo para ler dados do terminal
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = parseInt(idade) || 0; // Garante que a idade seja um número
        this.tipo = tipo.toLowerCase(); 
    }

    obterMensagemAtaque() {
        let ataque = "";
        
        if (this.tipo === "mago") {
            ataque = "magia";
        }
        else if (this.tipo === "guerreiro") {
            ataque = "espada";
        }
        else if (this.tipo === "monge") {
            ataque = "artes marciais";
        }
        else if (this.tipo === "ninja") {
            ataque = "shuriken";
        }
        else {
            ataque = "um ataque desconhecido"; 
        }

        // Retorna a frase personalizada que você pediu
        return `${this.nome} é um ${this.tipo} com ${this.idade} anos e ataca usando ${ataque}.`;
    }
}

// Função principal que gerencia o fluxo de perguntas
function iniciarFormulario() {
    readline.question('\nDigite o nome do herói: ', (nome) => {
        readline.question('Digite a idade do herói: ', (idade) => {
            readline.question('Digite o tipo (mago, guerreiro, monge, ninja): ', (tipo) => {
                
                // Cria o herói com os dados digitados
                const novoHeroi = new heroi(nome, idade, tipo);
                
                // Exibe o resultado na tela
                console.log("\n" + novoHeroi.obterMensagemAtaque());

                // Pergunta se deseja continuar
                perguntarSeDesejaContinuar();
            });
        });
    });
}

// Rotina que questiona se o usuário quer verificar outro caso
function perguntarSeDesejaContinuar() {
    readline.question('\nDeseja verificar outro caso? (sim/nao): ', (resposta) => {
        let escolha = resposta.toLowerCase().trim();
        
        if (escolha === 'sim' || escolha === 's') {
            iniciarFormulario(); // Reinicia o processo
        } else {
            console.log('Programa encerrado. Até a próxima!');
            readline.close(); // Fecha o terminal corretamente
        }
    });
}

// Inicia o programa pela primeira vez
iniciarFormulario();
