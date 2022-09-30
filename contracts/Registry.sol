// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

// Estrutura de dados para uma pessoa
struct Person {
    // Nome da pessoa
    string name;
    // CPF da pessoa, somente número
    uint64 cpf; /* 0 : 18446744073709551615] que é 2^64*/
    // Data de nascimento da pessoa, somente número
    uint32 birthdate; /* [0 : 4294967295] que é 2^32 */
}

// Contrato de registro/cartório
contract Registry {

    // Cria uma variável pública do tipo de Person
    // o [] indica que será um array de Person
    Person[] public people;
    // Cria uma variável do tipo address que receberá o endereço do dono do contrato
    address public owner;
    // Construtor que será executado quando o deploy do contrato ocorrer
    constructor() {
        // Irá atribuir o endereço de quem executou o deploy na variável owner
        owner = msg.sender;       
    }
    // Função para registrar uma pessoa
    function registry(Person memory person) public {
        // Se a pessoa que executar essa função não for o dono do contrato irá gerar erro
        require(msg.sender == owner, "Voce nao possui permissao");
        // Se o CPF for menor ou igual a 9999999999 irá gerar erro
        require(person.cpf > 9999999999, "Cpf muito curto");
        // Poe a nova variável no final do array people
        people.push(person);
    }
    // Função para retornar todas as pessoas
    function getAllPeople() public view returns (Person[] memory _people){
        // Retorna a variável people
        return people;
    }
    // Função para buscar uma pessoa a partir de um CPF
    function findByCpf(uint64 cpf) public view returns (Person memory _people)  {
        // Laço de repetição para mapear o array pessoa
        for (uint i = 0; i < people.length; i++) {
            // Caso o cpf for igual ao cpf da pessoa atual então retorna a pessoa
            if(cpf == people[i].cpf){
                return people[i];
            }
        }
    }

}