// ====================================================================================================
// 1. IMPORTAÇÃO E INTERFACE DE ENTRADA/SAÍDA
// ====================================================================================================

// require('readline'): Importa o módulo nativo do Node.js para ler dados do terminal.
// .createInterface({...}): Configura o teclado como entrada (input) e o terminal como saída (output).
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// ====================================================================================================
// 2. ESTRUTURA DA CLASSE (O MOLDE DO HERÓI)
// ====================================================================================================

// class heroi: Declara a criação de uma classe (molde) para fabricar os personagens.
class heroi {
    
    // constructor(...): Função que roda automaticamente para criar o objeto quando usamos "new heroi()".
    constructor(nome, idade, tipo) {
        this.nome = nome;                        // this.nome: Guarda o nome recebido dentro deste herói específico.
        this.idade = parseInt(idade) || 0;       // parseInt(): Converte o texto em número. O "|| 0" define zero se a conversão falhar.
        this.tipo = tipo.toLowerCase().trim();   // .toLowerCase(): Deixa em minúsculo. .trim(): Apaga espaços nas pontas.
    }

    // obterMensagemAtaque(): Método (função interna da classe) que define o ataque e monta a frase final.
    obterMensagemAtaque() {
        let ataque = ""; // let ataque: Cria uma variável temporária vazia que pode ter seu valor alterado.
        
        // if / else if: Estrutura condicional que testa o tipo do herói usando igualdade estrita (===).
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

        // return: Envia a frase final de volta. As crases (``) e o ${} injetam as variáveis direto no texto.
        return `${this.nome} é um ${this.tipo} com ${this.idade} anos e ataca usando ${ataque}.`;
    }
}

// ====================================================================================================
// 3. VARIÁVEIS DE CONTROLE GLOBAL
// ====================================================================================================

// const tiposValidos: Um Array (lista entre colchetes) com os únicos tipos permitidos no sistema.
const tiposValidos = ["mago", "guerreiro", "monge", "ninja"];

// ====================================================================================================
// 4. FLUXO DE PERGUNTAS E VALIDAÇÕES (FUNÇÕES)
// ====================================================================================================

// iniciarFormulario(): Função que inicia o questionário pedindo o nome do personagem.
function iniciarFormulario() {
    // readline.question(): Faz a pergunta na tela e aguarda a resposta do usuário na variável (nome).
    readline.question('\nDigite o nome do herói: ', (nome) => {
        
        // !nome.trim(): O "!" inverte o valor. Se o nome limpo for vazio (falso), o "!" transforma em verdadeiro.
        if (!nome.trim()) {
            console.log("❌ Erro: O nome do herói não pode ficar em branco.");
            return iniciarFormulario(); // return + função(): Para a execução atual e reinicia a pergunta do nome.
        }
        
        // perguntarIdade(): Se o nome for válido, avança para o próximo passo enviando o nome tratado.
        perguntarIdade(nome.trim());
    });
}

// perguntarIdade(): Função isolada que cuida apenas da captura e validação da idade.
function perguntarIdade(nome) {
    readline.question('Digite a idade do herói: ', (idade) => {
        let idadeNum = parseInt(idade); // Tenta transformar o texto recebido em um número inteiro.
        
        // isNaN(): Verifica se "Não é um Número". O "||" (OU) adiciona a regra de validar se a idade é menor ou igual a zero.
        if (isNaN(idadeNum) || idadeNum <= 0) {
            console.log("❌ Erro: Por favor, digite uma idade válida (número maior que 0).");
            return perguntarIdade(nome); // Reinicia a pergunta da idade sem perder o nome digitado anteriormente.
        }

        // perguntarTipo(): Avança para a última pergunta levando o nome e a idade já validados.
        perguntarTipo(nome, idadeNum);
    });
}

// perguntarTipo(): Função que valida a classe do herói e finaliza a criação do personagem.
function perguntarTipo(nome, idade) {
    readline.question('Digite o tipo (mago, guerreiro, monge, ninja): ', (tipo) => {
        let tipoFormatado = tipo.toLowerCase().trim(); // Padroniza a resposta limpando espaços e maiúsculas.

        // !tiposValidos.includes(): O .includes() busca o texto na lista. O "!" altera a lógica para "Se NÃO estiver na lista".
        if (!tiposValidos.includes(tipoFormatado)) {
            // .join(", "): Pega os itens do Array e transforma em um texto amigável separado por vírgulas.
            console.log(`❌ Erro: Tipo inválido! Escolha entre: ${tiposValidos.join(", ")}.`);
            return perguntarTipo(nome, idade); // Reinicia a pergunta do tipo mantendo os dados anteriores salvos.
        }

        // new heroi(...): Cria/instancia o objeto final na memória usando a classe criada no início.
        const novoHeroi = new heroi(nome, idade, tipoFormatado);
        
        console.log("\n✨ RESULTADO:");
        console.log(novoHeroi.obterMensagemAtaque()); // Executa o método de ataque e exibe o resultado no terminal.

        perguntarSeDesejaContinuar(); // Chama a rotina de loop para saber se o usuário quer continuar.
    });
}

// ====================================================================================================
// 5. LOOP DE REPETIÇÃO E ENCERRAMENTO
// ====================================================================================================

// perguntarSeDesejaContinuar(): Gerencia se o programa deve rodar de novo ou fechar.
function perguntarSeDesejaContinuar() {
    readline.question('\nDeseja verificar outro caso? (sim/nao): ', (resposta) => {
        let escolha = resposta.toLowerCase().trim();
        
        // Se a escolha for igual a 'sim' OU igual a 's', limpa a tela e recomeça.
        if (escolha === 'sim' || escolha === 's') {
            console.clear();        // console.clear(): Apaga todo o histórico visual do terminal.
            iniciarFormulario();    // Reinicia o fluxo de perguntas lá do absoluto zero.
        } else {
            console.log('\nPrograma encerrado. Obrigado! 🎮');
            readline.close();       // readline.close(): Desliga a escuta do teclado. Sem isso o Node.js fica travado.
        }
    });
}

// ====================================================================================================
// 6. EXECUÇÃO AUTOMÁTICA (PONTAPÉ INICIAL)
// ====================================================================================================

console.clear();                        // Limpa a tela do terminal assim que o comando "node classgame.js" é disparado.
console.log("=== CRIADOR DE HERÓIS RPG ==="); // Imprime um cabeçalho estético no topo do terminal limpo.
iniciarFormulario();                    // Ativa a primeira função do fluxo para iniciar o programa.
