import { Component } from "react";

export default class App extends Component {
  state = {
    listaUsuario: [],
    usuario: {},
    qtdPessoa: '',
    qtdeMulher: 0,
    qtdeHomem: 0,
  }

  async gerarPessoas() {
    this.resultado = await fetch(`https://randomuser.me/api?results=${this.state.qtdPessoa}`);
    this.resultado = await this.resultado.json();
    this.listaUsuario = this.resultado.results;

    this.qtdeHomem = 0;
    this.qtdeMulher = 0;

    for (let i = 0; i < this.listaUsuario.length; i++) {
      this.usuario = this.listaUsuario[i];

      if (this.usuario.gender === 'male') {
        this.qtdeHomem = this.qtdeHomem + 1;
      }

      if (this.usuario.gender === 'female') {
        this.qtdeMulher = this.qtdeMulher + 1;
      }
    }

    this.setState({
      listaUsuario: this.listaUsuario,
      qtdeHomem: this.qtdeHomem,
      qtdeMulher: this.qtdeMulher,
    })
  }

  selecionarUsuario(pUsuario) {
    console.log(pUsuario)
    this.setState({ usuario: pUsuario });
  }


  removerPessoa() {
    this.usuario = this.state.usuario;
    this.listaUsuario = this.state.listaUsuario;
    this.listaUsuario = this.listaUsuario.filter(pUsuario => pUsuario !== this.usuario);
    this.setState({ listaUsuario: this.listaUsuario, usuario: {} })
  }

  adicionarPessoa() {
    this.usuario = this.state.usuario;
    this.listaUsuario = this.state.listaUsuario;
    this.listaUsuario.push(this.usuario);
    this.setState({ listaUsuario: this.listaUsuario })
  }
  render() {
    return (
      <div className='container'>
        <h1>Gerador de Pessoa</h1>

        <section>
          <label>Quantidade de pessoa: </label>
          <input placeholder='Exemplo: 10' onChange={(pTexto) => this.setState({ qtdPessoa: pTexto.target.value })} />
          <button
            className='btn-pesquisa'
            onClick={() => this.gerarPessoas()}
          >
            Gerar pessoas
          </button>
        </section>
        {this?.state?.usuario?.name?.first ? <section style={{ width: '100%' }}>
          <h3>Pessoa selecionada:</h3>
          <div style={{ width: 100, height: 100 }}>
            <img style={{ borderRadius: 500 }} src={`${this?.state?.usuario?.picture?.medium}`} width={'100%'} height={'100%'} />
          </div>
          <p><strong>Nome: </strong>{`${this?.state?.usuario?.name?.first} ${this?.state?.usuario?.name?.last} `}</p>
          <p><strong>Genero: </strong>{`${this?.state?.usuario?.gender}`}</p>

          <button onClick={() => this.removerPessoa()}>Deletar</button>
          <button onClick={() => this.adicionarPessoa()}>Adicionar</button>
        </section> : null}
        <section>
          <h2>PESSOAS GERADAS: </h2>

          <h3>homens: {this.state.qtdeHomem}</h3>
          <h3>mulheres: {this.state.qtdeMulher}</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gênero</th>
                <th>Nome</th>
                <th>Último Nome</th>
                <th>Rua</th>
                <th>Nº</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Selecionar</th>
              </tr>
            </thead>

            <tbody>

            </tbody>
            {this.state.listaUsuario.map(pUsuario => <tr>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.id.value}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.gender === 'male' ? 'masculino' : 'feminino'}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.name.first}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.name.last}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.location.street.name}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.location.street.number}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.location.city}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}>{pUsuario.location.state}</td>
              <td className={pUsuario.gender === 'male' ? 'masculino' : 'feminino'}><button onClick={() => this.selecionarUsuario(pUsuario)}>Selecionar</button></td>
            </tr>
            )}
          </table>

        </section>

      </div>

    )
  }
}