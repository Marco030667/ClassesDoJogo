
class heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo.toLowerCase(); 
    }

    atacar() {
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

        // Saída: Identificação do tipo e ataque correspondente
        console.log(`o ${this.tipo} atacou usando ${ataque}`);
    } // Fechamento do método atacar
} // Fechamento da classe heroi

const grupoHerois = [
    new heroi("Gandalf", 150, "mago"),
    new heroi("Aragorn", 38, "guerreiro"),
    new heroi("Liu Kang", 23, "monge"),
    new heroi("Hanzo", 32, "ninja")
];

// Loop percorrendo os Herois do Array
for (let i = 0; i < grupoHerois.length; i++) {
    let heroiAtual = grupoHerois[i];
    // Aplicamos a função de ataque:
    heroiAtual.atacar();
}







   
