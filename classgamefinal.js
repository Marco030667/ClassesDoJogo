const { clear } = require('console');

// Importa o módulo para ler dados do terminal
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = parseInt(idade) || 0;
        this.tipo = tipo.toLowerCase().trim(); 
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

        return `${this.nome} é um ${this.tipo} com ${this.idade} anos e ataca usando ${ataque}.`;
    }
}

// Lista de tipos válidos para a validação
const tiposValidos = ["mago", "guerreiro", "monge", "ninja"];

// Função principal que gerencia o fluxo de perguntas com validações
function iniciarFormulario() {


    readline.question('\nDigite o nome do herói: ', (nome) => {
        // Validação do Nome: Não pode ser vazio
        if (!nome.trim()) {
            console.log(">>> Erro: O nome do herói não pode ficar em branco. <<<");
            return iniciarFormulario(); // Reinicia o fluxo atual
        }

        perguntarIdade(nome.trim());
    });
}

function perguntarIdade(nome) {
    readline.question('Digite a idade do herói: ', (idade) => {
        let idadeNum = parseInt(idade);
        
        // Validação da Idade: Deve ser um número maior que zero
        if (isNaN(idadeNum) || idadeNum <= 0) {
            console.log(">>> Erro: Por favor, digite uma idade válida (número maior que 0). <<<");
            return perguntarIdade(nome); // Refaz apenas a pergunta da idade
        }

        perguntarTipo(nome, idadeNum);
    });
}

function perguntarTipo(nome, idade) {
    readline.question('Digite o tipo (mago, guerreiro, monge, ninja): ', (tipo) => {
        let tipoFormatado = tipo.toLowerCase().trim();

        // Validação do Tipo: Deve estar na lista de tipos válidos
        if (!tiposValidos.includes(tipoFormatado)) {
            console.log(`>>> Erro: Tipo inválido! <<< Escolha entre: ${tiposValidos.join(", ")}.`);
            return perguntarTipo(nome, idade); // Refaz apenas a pergunta do tipo
        }

        // Se passou em todas as validações, cria o herói e exibe o resultado
        const novoHeroi = new heroi(nome, idade, tipoFormatado);
        console.log("\n >>> RESULTADO <<<");
        console.log(novoHeroi.obterMensagemAtaque());

        perguntarSeDesejaContinuar();
    });
}

// Rotina que questiona se o usuário quer verificar outro caso
function perguntarSeDesejaContinuar() {
    readline.question('\nDeseja verificar outro caso? (sim/nao): ', (resposta) => {
        let escolha = resposta.toLowerCase().trim();
        
        if (escolha === 'sim' || escolha === 's') {
            console.clear(); // Limpa a tela do terminal para a nova execução!
            console.log("<<<<<<<<<<<<<<<<<<<<<<< CRIADOR DE HERÓIS RPG >>>>>>>>>>>>>>>>>>>>>>>");
            iniciarFormulario(); 
        } else {
            console.clear()
            console.log('\n>>> Programa Encerrado. Até a próxima! <<<');
            readline.close(); 
        }
    });
}

// Inicia o programa limpando a tela logo na primeira vez
console.clear();
console.log("<<<<<<<<<<<<<<<<<<<<<<< CRIADOR DE HERÓIS RPG >>>>>>>>>>>>>>>>>>>>>>>");
iniciarFormulario();
