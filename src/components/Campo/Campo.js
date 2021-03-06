import React, { Component } from 'react';
import './Campo.css';

class Campo extends Component {
    
    constructor (props){
        super(props);
        this.valor = '';
        this.state ={
            modificado: false,
            erro: ''
        }
    }

    pegaValor() {
        return this.valor;
    }

    temErro(){   
        if (!this.state.modificado || this.state.erro) {
            return true;
        }else{
            return false;
        }
       
    }
    
    
    validar = (event) => {
        const input = event.target;
        const {value, type} = input;
        this.valor = value;
        const {required, minLength, telefone} = this.props;
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let mensagem = '';
        
        if(required && value.trim() === ''){
           
            mensagem = 'Campo obrigatório';

        } else if(minLength && value.trim().length < minLength){

            mensagem =  `Digite pelo menos ${minLength} caracteres`;

        }else if(telefone && isNaN(value.trim())){

            mensagem =  'Digite um número válido';

        }else if(type === 'email' && !regex.test(value)){

            mensagem =  'Digite um email válido';

        }

        this.setState({modificado: true, erro: mensagem}, this.props.onChange);
        
    }

    render(){

        
        return (
                <div>
                    <input 
                        className="caixa-texto" 
                        id={this.props.id} 
                        type={this.props.type} 
                        name={this.props.name} 
                        placeholder={this.props.placeholder}
                        onChange={this.validar}
                        onBlur={this.validar}
                    />
                    <p className="grupo__erro">
                        {this.state.erro}
                    </p>

                    
                </div>
                
                
                )
    }
    
    
}

export default Campo;