import * as React from 'react';
import { Textarea,Result, Prediction, Counter,Header,Footer, rotn, doBreak } from './components';
import Chart from './components/Chart/Chart'
import './App.css'

interface IValue {
  value: string;
}

interface IEvent {
  target: IValue
}

interface IAppState {
  choosedShift: number;
  text: string;
  rotedText: string;
  encryptedText: string;
  shift: number;
}

class App extends React.Component<IAppState> {
  state = {
    choosedShift: 13,
    text: '',
    rotedText: '',
    encryptedText: '',
    shift: 0
  };

  shiftChangedHandler(increase = true) {
    const { choosedShift, text } = this.state;
    if ((choosedShift === 1 && !increase) || (choosedShift === 26 && increase)) {return}
    const changedChoosedShift = increase ? choosedShift + 1 : choosedShift - 1;
    const rotText = rotn(text, changedChoosedShift);
    const encrypt = doBreak(rotText);
    this.setState({
      choosedShift: changedChoosedShift,
      rotedText: rotText,
      encryptedText: encrypt.text,
      shift: encrypt.shift,
    })
  }


  textChangedHandler = (e: IEvent) => {
    const rotedText = rotn(e.target.value, this.state.choosedShift);
    const encrypt = doBreak(rotedText);
    this.setState({
      text: e.target.value,
      rotedText,
      encryptedText:encrypt.text,
      shift:encrypt.shift
    });
  };


  render() {
    const { choosedShift, rotedText, encryptedText, shift } = this.state;
    return (
      <div className="app">
        <Header>Caesar Cipher</Header>
        <Counter
          num={this.state.choosedShift}
          increase={() => this.shiftChangedHandler()}
          decrease={() => this.shiftChangedHandler(false)}
        />
        <Textarea changed={this.textChangedHandler} />
        <Result text={this.state.rotedText} shiftValue={choosedShift} />
        <Prediction shift={shift} text={encryptedText} />
        <Chart text={rotedText}/>
        <Footer text='Made by Oleg Kupriianov' />
      </div>
    );
  }
}



export default App;
