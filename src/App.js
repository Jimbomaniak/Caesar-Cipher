import React, { Component } from 'react';
import { Textarea,Result, Prediction, Counter,Header,Footer, rotn, doBreak } from './components/index';
import Chart from './components/Chart/Chart'
import './App.css'


class App extends Component {
  state = {
    num: 13,
    text: '',
    rotedText: '',
    encryptedText: '',
    shift: 0
  };

  shiftChangedHandler(increase=true) {
    if ((this.state.num === 1 && !increase) || (this.state.num === 26 && increase)) {return}
    const numchanged = increase ? this.state.num + 1 : this.state.num - 1;
    let rotText = rotn(this.state.text, numchanged);
    let encrypt = this.state.rotedText ? doBreak(rotText) : '';
    this.setState({num:numchanged,
                   rotedText:rotText,
                   encryptedText:encrypt.encryptedText,
                   shift:encrypt.shift})
  }


  textChangedHandler = (event) => {
    let textValue = event.target.value;
    let rotText = rotn(textValue, this.state.num);
    let encryptText = doBreak(rotText);
    this.setState({text: textValue,
                   rotedText: rotText,
                   encryptedText:encryptText.encryptedText,
                   shift:encryptText.shift
    });
  };


  render() {
    return (
      <div className="app">
        <Header/>
        <Counter num={this.state.num}
                 increase={() => this.shiftChangedHandler()}
                 decrease={() => this.shiftChangedHandler(false)} />
        <Textarea changed={(event) => this.textChangedHandler(event)} />
        <Result text={this.state.rotedText}
                shiftValue={this.state.num}/>
        <Prediction number={this.state.shift}
                    text={this.state.encryptedText}/>
        <Chart text={this.state.rotedText}/>
        <Footer/>
      </div>
    );
  }
}



export default App;
