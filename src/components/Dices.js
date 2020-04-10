import React from 'react';
import AnimatedDice from '../images/dice.gif';
import White1 from '../images/dice-w1.png';
import White2 from '../images/dice-w2.png';
import White3 from '../images/dice-w3.png';
import White4 from '../images/dice-w4.png';
import White5 from '../images/dice-w5.png';
import White6 from '../images/dice-w6.png';
import Red1 from '../images/dice-r1.png';
import Red2 from '../images/dice-r2.png';
import Red3 from '../images/dice-r3.png';
import Red4 from '../images/dice-r4.png';
import Red5 from '../images/dice-r5.png';
import Red6 from '../images/dice-r6.png';
import ArrowRight from '../images/arrow-right.png';
import './Dices.css';

class Dices extends React.Component {
  state={
    showAnimatedDices: false,
    redA: null,
    whiteA: null,
    redB: null,
    whiteB: null
  }

  getRedDice = (num) => {
    if (num === 1) {
      return Red1;
    } else if (num === 2) {
      return Red2;
    } else if (num === 3) {
      return Red3;
    } else if (num === 4) {
      return Red4;
    } else if (num === 5) {
      return Red5;
    } else if (num === 6) {
      return Red6;
    }
    return null;
  }

  getWhiteDice = (num) => {
    if (num === 1) {
      return White1;
    } else if (num === 2) {
      return White2;
    } else if (num === 3) {
      return White3;
    } else if (num === 4) {
      return White4;
    } else if (num === 5) {
      return White5;
    } else if (num === 6) {
      return White6;
    }
    return null;
  }

  getRandomDice = () => {
    return Math.floor(Math.random() * Math.floor(6)) + 1;
  }

  dice = () => {
    this.setState({showAnimatedDices: true, redA: null });
    const rA = this.getRandomDice();
    const wA = this.getRandomDice();
    const rB = this.getRandomDice();
    const wB = this.getRandomDice();
    console.log('Dices:', rA, wA, rB, wB);

    setTimeout(() => {
      this.setState({
        showAnimatedDices: false,
        redA: this.getRedDice(rA),
        whiteA: this.getWhiteDice(wA),
        redB: this.getRedDice(rB),
        whiteB: this.getWhiteDice(wB)
      });
    }, 1000);
  }

  render() {
    const animatedDice = (this.state.showAnimatedDices) ?
      <img src={AnimatedDice} className="aniDice pl-3" alt="dice" />
      : <div/>;

    const dices = (this.state.redA) ?
      <div className="col-4">
        <img src={this.state.redA} className="dice pl-2" alt="dice" ></img>
        <img src={this.state.whiteA} className="dice pl-2" alt="dice" ></img>
        <img src={ArrowRight} className="pl-2" alt="arrow"/> 
        <img src={this.state.redB} className="dice pl-2" alt="dice" ></img>
        <img src={this.state.whiteB} className="dice pl-2" alt="dice" ></img> 
      </div>
      : <div/>;

    return (
      <div className="container-fluid align-self-center">
        <div className="row">
          <div className="col-1 align-self-center">
            <button type="button" className="btn btn-primary pt-1 pb-1" onClick={this.dice}>Würfeln</button>
          </div>
          <div className="col-11">
            {animatedDice}
            {dices}
          </div>
        </div>
      </div>
    )
  }
}

export default Dices;