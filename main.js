const prompt = require('prompt-sync')();

let alunos = [];
let materias = [];

function criaAluno() {
    // A função cria um objeto 'aluno'
    let aluno = new Object;

    // Verifica se o valor inserido é válido e não contem apenas espaços em branco
    do {
        var nome = prompt("Digite o nome do aluno: ");
        var validacao = nome.trim().length == "";
        if (validacao) {
            console.log('Nome inválido! O nome não pode ficar em branco.\n');
        } else {
            aluno['nome'] = nome;
        }        
    } while (validacao);
    // Adiciona o aluno no array 'alunos'
    alunos.push(aluno);
}

criaAluno();

function cadastraMateria() {
    // A função cria um objeto 'materia' que terá as notas, média, faltas e se o aluno foi aprovado
    let materia = new Object;
    let notas = [];
    let media = 0;

    // NOME DA MATERIA
    // Aqui é cadastrado o nome da matéria e feita uma verificação para não ficar em branco
    do {
        console.log("");
        var nome = prompt("Digite o nome da matéria: ");
        var validacao = nome.trim().length == "";
        if (validacao) {
            console.log('Nome inválido! O nome não pode ficar em branco.\n');
        } else {
            materia['nomeMateria'] = nome;
        }
    } while (validacao);

    // NOTAS DA MATERIA
    // Aqui as 3 notas são atribuídas à matéria através do loop for
    for (let i = 0; i < 3; i++) {
        do {
            var nota = +prompt(`Digite a nota ${i+1} de ${materia['nomeMateria']}: `);
            var validacao = isNaN(nota) || nota < 0 || nota > 10;
            // Valida se o valor é um número, e se está entre 0 e 10
            if (validacao) {
                console.log("Valor inválido! A nota precisa ser um número entre 0 e 10.\n")
            } else {
                // Se tudo estiver OK, a nota é cadastrada
                notas.push(nota);
            }
        } while (validacao);
    }
    materia['notas'] = notas;

    // MEDIA DAS NOTAS DA MATERIA
    // A média é calculada com um forEach, somando as 3 notas e dividindo por 3 
    materia['notas'].forEach(nota => {
        media += nota;
    });
    media = media / 3;
    materia['media'] = media;

    // QUANTIDADE DE FALTAS
    // Solicita a quantidade de faltas que o aluno teve na matéria e verifica se o valor é válido ou não
    do {
        var faltas = +prompt(`Digite o número de faltas em ${materia['nomeMateria']}: `)
        var validacao = isNaN(faltas) || faltas < 0;
        // Valida se o valor passado é um numero maior ou igual a 0
        if(validacao) {
            console.log("Valor inválido! A quantidade de faltas precisa ser um número maior ou igual a 0.\n")
        } else {
            // Se tudo estiver OK, é cadastrado a quantidade de faltas
            materia['faltas'] = faltas;
        }
    } while (validacao);

    // SITUAÇÃO DO ALUNO
    // A situação do aluno vai ser o retorno da funcao 'verificaAprovado()', que será 'aprovado' ou 'reprovado'
    materia['situacao'] = verificaAprovado(alunos[0]['nome'], materia['nomeMateria'], materia['media'], materia['faltas']);

    // Ao final, a matéria é adicionada ao array 'materias'
    materias.push(materia);
}

// Essa função vai ser chamada dentro da função 'cadastraMateria()'
// Seus parâmetros são passados de acordo com as informações digitadas pelo usuário
// Retorna apenas duas strings de acordo com as verificações: 'Aprovado' e 'Reprovado'
function verificaAprovado(aluno, materia, media, faltas) {
    // Verifica se a média é menor que 6, se for, o aluno é automaticamente reprovado
    if (media < 6) {
        console.log(`O(a) aluno(a) ${aluno} foi reprovado na matéria ${materia} pois a sua média foi menor que 6.`);
        return 'Reprovado';
    } else {
        // Se a média tiver sido maior que 6, verifica se não foi reprovado por faltas
        if (faltas > 5) {
            console.log(`O(a) aluno(a) ${aluno} foi reprovado na matéria ${materia} pois ultrapassou o limite de faltas.`);
            return 'Reprovado';
        } else {
            // Se tiver média maior que 6 e faltas menor que 5 é aprovado
            console.log(`Parabéns!!! O(a) aluno(a) ${aluno} foi aprovado na matéria ${materia} com média ${media}. :)`);
            return 'Aprovado';
        }
    }
}

// Essa função será chamada no final do programa, para exibir as informações do aluno
function exibeInformacoes() {
    console.log(`\nAluno: ${alunos[0]['nome']}\n`);
    // Pega cada materia dentro da lista 'materias' e exibe as informações de forma mais organizada
    materias.forEach(materia => {
        console.log(`Materia: ${materia['nomeMateria']}`);
        console.log(`Media: ${materia['media']}`);
        console.log(`Faltas: ${materia['faltas']}`);
        console.log(`Situação do aluno: ${materia['situacao']}\n`);
    });
}

console.log("Cadastre  pelo menos 3 matérias:");

// Aqui o programa faz o usuário cadastrar no mínimo 3 matérias 
do {
    cadastraMateria();    
} while (materias.length < 3);

// Após o usuário cadastrar 3 matérias, o programa deixa escolher se irá continuar ou ver as matérias já cadastradas
do {
    console.log('\ns - Cadastrar mais uma matéria');
    console.log('n - Parar e ver as matérias já cadastradas');
    var continuar = prompt(`Você já cadastrou ${materias.length} matérias, deseja cadastrar mais? `);
    if (continuar == 'n') {
        // Se o usuário escolher parar, serão exibidas as informações das matérias já cadastradas
        exibeInformacoes();
    } else if (continuar == 's') {
        // Se o usuário escolher continuar, o programa cadastra mais uma matéria
        cadastraMateria();
    } else {
        console.log('Opção inválida!');
    }
} while (continuar != 'n');
