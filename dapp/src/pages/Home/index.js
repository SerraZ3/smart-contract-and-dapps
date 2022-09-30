import React, { useEffect, useState } from "react";
// Informação do contrato
import registry from "../../contracts/registry.contract";
// Configuração para requisições na rede
import web3 from "../../utils/web3";
import "./styles.css";

function Home() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfSearch, setCpfSearch] = useState("");
  const [owner, setOwner] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [people, setPeople] = useState([]);
  const [personInfo, setPersonInfo] = useState(null);
  const [loadingInsert, setLoadingInsert] = useState(false);

  // Pega dono do contrato
  const getOwner = async () => {
    try {
      const _owner = await registry.methods.owner().call();

      setOwner(_owner);
    } catch (error) {
      console.log(error);
    }
  };
  // Pega pessoas cadastradas no contrato
  const getPeople = async () => {
    try {
      const response = await registry.methods.getAllPeople().call();
      console.log(response);
      setPeople(response);
    } catch (error) {
      console.log(error);
    }
  };
  // Busca pessoa por cpf
  const handleSearchPerson = async (e) => {
    e.preventDefault();
    try {
      const response = await registry.methods
        .findByCpf(parseInt(cpfSearch))
        .call();

      setPersonInfo(response);
    } catch (error) {
      setPersonInfo(null);
      console.log(error);
    }
  };
  // Cadastra nova pessoa
  const handleRegistry = async (e) => {
    e.preventDefault();
    try {
      setLoadingInsert(true);

      const contas = await web3.eth.getAccounts();
      const response = await registry.methods
        .registry([name, parseInt(cpf), parseInt(birthdate)])
        .send({ from: contas[0] });

      console.log(response);
      setLoadingInsert(false);
    } catch (error) {
      setLoadingInsert(false);
      alert("Ops, erro no cadastro de pessoa");
      console.log(error);
    }
  };
  // Busca dono do contrato e lista de pessoas no inicio da página e quando um novo dado é inserido
  useEffect(() => {
    getOwner();
    getPeople();
  }, [loadingInsert]);
  return (
    <div>
      <h1>Endereço do dono do contrato: {owner}</h1>
      <div className="divider" />
      <h2>Listagem de lotes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>cpf</th>
            <th>birthdate</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {people.map((person, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{person.name}</td>
              <td>{person.cpf}</td>
              <td>{person.birthdate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!(people.length > 0) ? <h4>Nenhuma pessoa cadastrada</h4> : null}

      <br />
      <br />
      <div className="divider" />

      <form onSubmit={handleRegistry}>
        <div className="content">
          <h2>Cadastro de pessoa</h2>
          <input
            placeholder="Digite o nome"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Digite o cpf (somente número)"
            type="number"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Digite a data de nascimento"
            type="number"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Cadastrar</button>
          {loadingInsert ? (
            <h5>Processando cadastro de lote...</h5>
          ) : (
            <>
              <br />
              <br />
            </>
          )}
        </div>
      </form>

      <div className="divider" />
      <form onSubmit={handleSearchPerson}>
        <div className="content">
          <h2>Buscar por cpf</h2>

          <input
            placeholder="Digite o cpf da pessoa"
            value={cpfSearch}
            onChange={(e) => setCpfSearch(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Buscar</button>
          {personInfo ? (
            <div>
              <p>
                <b>Nome:</b> {personInfo.name}
              </p>
              <p>
                <b>CPF:</b> {personInfo.cpf}
              </p>
              <p>
                <b>Data de nascimento:</b> {personInfo.birthdate}
              </p>
            </div>
          ) : null}
        </div>
      </form>

      <br />
      <br />
    </div>
  );
}

export default Home;
