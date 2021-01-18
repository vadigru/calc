import React, {useState} from 'react';
import Display from '../display/Display';
import Buttons from '../Buttons/Buttons';

import './Calculator.scss';

let valueArray = [];

const Calculator = () => {
  const [onOff, setOnOff] = useState({isCalcOn: false});
  const [display, setShowOnDisplay] = useState({showOnDisplay: ''});
  const [numbers, setNumbersArr] = useState({numbersArr: []});
  // const [calculated, setCalculated] = useState({calculated: false});
  const [decimal, setDecimal] = useState({dot: false});

  const toggleOnOff = () => {
      if (!onOff.isCalcOn) {
        valueArray = [];
        setOnOff({isCalcOn: true});
        setShowOnDisplay({showOnDisplay: '0'});
        setNumbersArr({numbersArr: valueArray});
        // setCalculated({calculated: false});
        setDecimal({dot: false});
      } else {
        valueArray = [];
        setOnOff({isCalcOn: false})
        setShowOnDisplay({showOnDisplay: ''})
        setNumbersArr({numbersArr: valueArray});
        // setCalculated({calculated: false});
        setDecimal({dot: false});
      }
  }

  const clearDisplay = () => {
    valueArray = [];
    setShowOnDisplay({showOnDisplay: '0'});
    setNumbersArr({numbersArr: valueArray});
    // setCalculated({calculated: false});
    setDecimal({dot: false});
  }

  const deleteLastValue = () => {
    if (valueArray.length > 0) {
      const popped = valueArray.pop();
      setShowOnDisplay({showOnDisplay: numbers.numbersArr.join('')});
      setNumbersArr({numbersArr: valueArray});
      // setCalculated({calculated: false})
      if (popped === '.') {
        setDecimal({dot: false});
      }
    }
    if (valueArray.length === 0) {
      valueArray = [];
      setShowOnDisplay({showOnDisplay: '0'});
      setNumbersArr({numbersArr: valueArray});
    }
  }

  const getSquare = () => {
    const num = eval(numbers.numbersArr.join(''));
    if (num < 0) {
      return;
    }
    const res = Math.sqrt(num);
    const resArr = res.toString().split('');
    valueArray = [];
    resArr.slice(0, 12).forEach((item) => {
      if (typeof parseInt(item) === 'number' && !isNaN(item)) {
        valueArray.push(parseInt(item));
      } else {
        valueArray.push(item);
      }
    })
    const resToDisplay = valueArray.join('');
    setShowOnDisplay({showOnDisplay: resToDisplay});
    setNumbersArr({numbersArr: valueArray});
    // setCalculated({calculated: false})
  }

  const calculate = () => {
    const res = eval(numbers.numbersArr.join(''));
    const resArr = res.toString().split('');
    valueArray = [];
    resArr.slice(0, 12).forEach((item) => {
      if (typeof parseInt(item) === 'number' && !isNaN(item)) {
        valueArray.push(parseInt(item));
      } else {
        valueArray.push(item);
      }
    })
    const resToDisplay = valueArray.join('');
    setShowOnDisplay({showOnDisplay: resToDisplay});
    setNumbersArr({numbersArr: valueArray});
    // setCalculated({calculated: true});
    // console.log(numbers.numbersArr);
  }

  const getResult = () => {
    if (typeof valueArray[valueArray.length - 1] !== 'number') {
      return;
    } 
    return calculate();
  }

  const handlePressedButtons = (targetContent) => {
    if ((targetContent === '+' || targetContent === '-' || targetContent === '*' || targetContent === '/') && decimal.dot === true) {
      setDecimal({dot: false})
    }

    if ((numbers.numbersArr.length === 0 || typeof valueArray[valueArray.length - 1] === 'string') && (targetContent === '+' || targetContent === '*' || targetContent === '/')) {
      return;
    }

    if (targetContent === '-' && typeof valueArray[valueArray.length - 1] === 'string') {
      return;
    }

    if (targetContent === '.') {
      console.log(decimal);
      if (decimal.dot === true) {
        return;
      }
      if (numbers.numbersArr.length === 0 || typeof valueArray[valueArray.length - 1] === 'string') {
        targetContent = '0.'
      }
      setDecimal({dot: true});
    }

    // if ((typeof valueArray[valueArray.length - 1] === 'string') && (typeof targetContent === 'string'))  {
    //   if (targetContent === '.') {
    //     targetContent = '0.'
    //   }
    //   return;
    // } else if ((valueArray.length === 1 && values.calculated) && (typeof targetContent === 'number' || targetContent === '.')) {
    //   valueArray = [];
    //   if (targetContent === '.') {
    //     targetContent = '0.'
    //   }
    // } else {
    //   if ((typeof valueArray[valueArray.length - 1] !== 'number') && targetContent === '.') {
    //     targetContent = '0.'
    //   }
    // }
    valueArray.push(targetContent);
    setShowOnDisplay({showOnDisplay: numbers.numbersArr.join('') || targetContent});
    setNumbersArr({numbersArr: valueArray});
    // setCalculated({calculated: false})
  }

  const getNumbers = (value) => {
    const targetContent = value;

    switch (true) {
      case targetContent === 'on/off':
        toggleOnOff();
        break;
      case targetContent === 'C':
        clearDisplay();
        break;
      case targetContent === '⇦':
        deleteLastValue();
        break;
      case targetContent === '√':
        getSquare();
        break;
      case targetContent === '=':
        getResult();
        break;
      default:
        handlePressedButtons(targetContent);
        break;
    }
  }

  return(
    <div className={'calculator'}>
      <Display 
        showOnDisplay={display.showOnDisplay}
        isCalcOn={onOff.isCalcOn}
      />
      <Buttons 
        getNumbers={getNumbers}
        isCalcOn={onOff.isCalcOn}
      />
    </div>
  )
};

export default Calculator;