import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import './App.css';
import emailjs from 'emailjs-com';

class App extends Component {
  
  state = {
    inputValue: ''
  }

  inputChange = event => {
    this.setState({
      inputValue: 'Pedido enviado!'
    })
  }

  render() {
    const {
      clickButton,
      sucesso
    } = this.props;

    const { inputValue } = this.state;
    
  function reply(e) {
    e.preventDefault();
    emailjs.sendForm('gmail','papoyshop',e.target,'*******')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
    e.target.reset();
  }


  return(
    <div className="Encapsulamento" >

      <header className="Cabecalho">
          <a href="http://papoy.s3-sa-east-1.amazonaws.com/index.html"><img className="Logo" src={require('./banana.png')} alt="Papoy Shop"/></a>
      </header>
        <div className="mh"><img src={require('./assets/images/minionhang.png')} alt="Minion-hang"></img></div>
        <div className="mt"><img src={require('./assets/images/miniontop.png')} alt="Minion-hang"></img></div>
        <span className="titulo">A melhor loja de minions em miniatura da internet!</span>
      <div className="Rodape">
        
        <form className="Formulario" id="Formulario"  onSubmit={reply}>
          <span className="cab">{sucesso}</span>
          <span className="Dados">
            <input onChange={this.inputChange} id="nome" type="text" placeholder="Nome" name="nome"></input>
            <input id="email" type="email" placeholder="E-mail" name="email"></input>
          </span>
          <span>
            <textarea className="msg" placeholder="Faça aqui o seu pedido!" name="msg" ></textarea>
          </span>
          <input type="submit" id="enviar" value="Enviar" onClick={() => clickButton(inputValue)}></input>
        </form>
      </div>
    </div> 
  );
  }
}

const mapStateToProps = store => ({
  sucesso: store.clickState.newValue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);