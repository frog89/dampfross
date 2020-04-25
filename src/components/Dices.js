import React from 'react';
import { connect } from 'react-redux';

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
    isDicingAllowed: true,
  }

  componentDidMount() {
    this.props.setDices(0, 0, 0, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps == null || prevProps.nextPlayerIndex !== this.props.nextPlayerIndex) {
      this.setState({isDicingAllowed: true});
    }
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
    this.setState({isDicingAllowed: false});
    this.props.setDices(0, 0, 0, 0);
    this.setState({showAnimatedDices: true });
    const redA = this.getRandomDice();
    const whiteA = this.getRandomDice();
    const redB = this.getRandomDice();
    const whiteB = this.getRandomDice();

    setTimeout(() => {
      this.setState({
        showAnimatedDices: false
      });
      this.props.setDices(redA, whiteA, redB, whiteB);
      this.props.cbFuncs.cbSaveGame(this.props.game);
    }, 1000);
  }

  render() {
    console.log('Dices-render:', this.state.isDicingAllowed, 
      this.props.cbFuncs.cbIsCurrentPlayerEqualLoginPlayer());

    let wuerfelButtonDisabledStyle = this.state.isDicingAllowed &&
      this.props.cbFuncs.cbIsCurrentPlayerEqualLoginPlayer() ? '' : 'disabled';
    const wuerfelButton = 
      <a href="/#" className={`btn btn-primary pt-1 pb-1 ${wuerfelButtonDisabledStyle}`}
            onClick={this.dice}
          >
        Würfeln
      </a>;

    const animatedDice = (this.state.showAnimatedDices) ?
      <img src={AnimatedDice} className="aniDice pl-3" alt="dice" />
      : 
      <span/>;

    const dices = (this.props.dices.redA !== 0) ?
      <span>
        <img src={this.getRedDice(this.props.dices.redA)} className="dice pl-2" alt="dice" ></img>
        <img src={this.getWhiteDice(this.props.dices.whiteA)} className="dice pl-2" alt="dice" ></img>
        <img src={ArrowRight} className="pl-2" alt="arrow"/> 
        <img src={this.getRedDice(this.props.dices.redB)} className="dice pl-2" alt="dice" ></img>
        <img src={this.getWhiteDice(this.props.dices.whiteB)} className="dice pl-2" alt="dice" ></img> 
      </span>
      : 
      <span/>;

    return (
      <span>
        {wuerfelButton}
        {animatedDice}
        {dices}
      </span>
    )
  }
}

const setDices = (redA, whiteA, redB, whiteB) => {
  return {
    type: 'SET_DICES',
    redA, whiteA, redB, whiteB
  }
} 

const mapStateToProps = (state) => {
  return {
    game: state.game,
    dices: state.game.dices,
    nextPlayerIndex: state.game.nextPlayerIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDices: (redA, whiteA, redB, whiteB) => { dispatch(setDices(redA, whiteA, redB, whiteB)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dices);