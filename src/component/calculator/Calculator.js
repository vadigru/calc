import React, {useEffect, useState} from 'react';
import Display from '../display/display';
import Buttons from '../buttons/buttons';

import './calculator.scss';

const Calculator = () => {
  const [decimal, setDecimal] = useState(false);
  const [display, setDisplay] = useState(`0`);
  const [displayArray, setDisplayArray] = useState([]);
  const [error, setError] = useState(false);
  const [onOff, setOnOff] = useState(false);
  const [result, setResult] = useState(false);
  const [scale, setScale] = useState(50);
  const [sqrtResult, setSqrtResult] = useState(false);
  const [total, setTotal] = useState(`0`);
  const [valueArray, setValueArray] = useState([]);

  const clearArrays = (...args) => {
    args.forEach((arr) => {
      arr.length = 0;
    });
  };

  const toggleOnOff = () => {
    if (!onOff) {
      setOnOff(true);
      setDisplay(`0`);
      setValueArray([]);
      setDisplayArray([]);
      setDecimal(false);
      setError(false);
      setScale(50);
      setResult(false);
      setSqrtResult(false);
      setTotal(`0`);
    } else {
      setOnOff(false);
      setDisplay(`0`);
      setValueArray([]);
      setDisplayArray([]);
      setDecimal(false);
      setError(false);
      setScale(50);
      setResult(false);
      setSqrtResult(false);
      setTotal(`0`);
    }
  };

  const clearDisplay = () => {
    setDisplay(`0`);
    setValueArray([]);
    setDisplayArray([]);
    setDecimal(false);
    setError(false);
    setScale(50);
    setResult(false);
    setSqrtResult(false);
    setTotal(`0`);
  };

  const deleteLastValue = () => {
    if (displayArray.length > 0) {
      const popped = valueArray.pop();
      displayArray.pop();
      setDisplay(displayArray.join(``));
      if (popped === `.`) {
        setDecimal(false);
      }
    }
    if (displayArray.length === 0) {
      setDisplay(valueArray[valueArray.length - 1]);
    }
    if (displayArray.length < 12) {
      setScale(50);
    }
    setError(false);
    setResult(false);
    setSqrtResult(false);
  };

  const handleResult = (res) => {
    if (!Number.isInteger(res)) {
      res = Math.round(res * 1000000) / 1000000;
    }
    const resArr = res.toString().split(``);
    clearArrays(valueArray, displayArray);
    resArr.forEach((item) => {
      if (typeof parseInt(item, 10) === `number` && !isNaN(item)) {
        valueArray.push(parseInt(item, 10));
        displayArray.push(parseInt(item, 10));
      } else {
        valueArray.push(item);
        displayArray.push(item);
      }
    });
    if (displayArray.length > 11) {
      setScale(35);
    } else {
      setScale(50);
    }
    if (displayArray.includes(`.`)) {
      setDecimal(true);
    } else {
      setDecimal(false);
    }
    setDisplay(displayArray.join(``));
    setTotal(valueArray.join(``));
  };

  const getSquare = () => {
    if (typeof valueArray[valueArray.length - 1] === `string` && valueArray[valueArray.length - 1] !== `.`) {
      setError(true);
      return;
    }
    const num = eval(valueArray.join(``));

    if (num <= 0 || valueArray.length === 0) {
      setError(true);
      return;
    }
    const res = Math.sqrt(num);
    handleResult(res);
    if (result === true) {
      setResult(false);
    }
    setError(false);
    setSqrtResult(true);
  };

  const changeSign = () => {
    if (valueArray.length === 0 || valueArray[0] === 0) {
      return;
    }
    if ((typeof valueArray[valueArray.length - 1] === `number` || valueArray[0] === `0.` || valueArray[valueArray.length - 1] === `.`) && (displayArray[0] !== `-`)) {
      if (typeof valueArray[valueArray.length - (displayArray.length + 1)] === `string`) {
        valueArray.splice(valueArray.length - displayArray.length, 0, `(-`);
        valueArray.splice(valueArray.length, 0, `)`);
        displayArray.unshift(`-`);
      } else {
        valueArray.splice(valueArray.length - displayArray.length, 0, `-`);
        displayArray.unshift(`-`);
      }
    } else {
      if (typeof valueArray[valueArray.length - 1] === `string` && valueArray[valueArray.length - 1] !== `.`) {
        return;
      }
      valueArray.splice(valueArray.length - displayArray.length, 1);
      displayArray.shift();
    }
    setError(false);
    setDisplay(displayArray.join(``));
  };

  const calculate = () => {
    let res = eval(valueArray.join(``));
    if (res === 0.30000000000000004) {
      res = 0.3;
    }
    handleResult(res);
  };

  const getResult = (targetContent) => {
    if (typeof valueArray[valueArray.length - 1] !== `number` && valueArray[valueArray.length - 1] !== `)`) {
      return;
    }
    if (targetContent === `=`) {
      setResult(true);
    }
    calculate();
  };

  const handlePressedButtons = (targetContent) => {
    if ((targetContent === `+`
      || targetContent === `-`
      || targetContent === `*`
      || targetContent === `/`)) {
      if ((valueArray.length === 0
        || typeof valueArray[valueArray.length - 1] === `string`
        && valueArray[valueArray.length - 1] !== `)`
        && valueArray[valueArray.length - 1] !== `.`)
        && (targetContent === `+`
        || targetContent === `-`
        || targetContent === `*`
        || targetContent === `/`)) {
        return;
      }
      if ((targetContent === `+`
          || targetContent === `-`
          || targetContent === `*`
          || targetContent === `/`)) {
        getResult();
        setScale(50);
        setDecimal(false);
      }
    }

    if (targetContent === `.`) {
      if (decimal === true) {
        setError(true);
        return;
      }
      setDecimal(true);
      if (displayArray.length === 0 || (displayArray.length === 1
        && displayArray[displayArray.length - 1] === 0)) {
        targetContent = `0.`;
      }
    }

    valueArray.push(targetContent);
    displayArray.push(targetContent);

    if (displayArray[displayArray.length - 1] !== `.`
      && displayArray[displayArray.length - 1] !== `0.`
      && typeof displayArray[displayArray.length - 1] !== `number`
      && targetContent !== `-/+`) {
      clearArrays(displayArray);
    }

    if (displayArray.length > 11) {
      setScale(35);
    }

    if (result === true || sqrtResult === true || error === true) {
      setResult(false);
      setSqrtResult(false);
      setError(false);
    }

    setDisplay(displayArray.join(``) || targetContent);
  };

  const getNumbers = (value) => {
    const targetContent = value;

    switch (true) {
      case targetContent === `on/off`:
        toggleOnOff();
        break;
      case targetContent === `C`:
        clearDisplay();
        break;
      case targetContent === `⇦`:
        deleteLastValue();
        break;
      case targetContent === `√`:
        getSquare(`√`);
        break;
      case targetContent === `-/+`:
        changeSign();
        break;
      case targetContent === `=`:
        getResult(`=`);
        break;
      default:
        handlePressedButtons(targetContent);
        break;
    }
  };

  return (
    <div className={`calculator`}>
      <Display
        isCalcOn={onOff}
        isResult={result}
        isSqrtResult={sqrtResult}
        isError={error}
        scale={scale}
        showOnDisplay={display}
        total={total}
      />
      <Buttons
        getNumbers={getNumbers}
        isCalcOn={onOff}
      />
      <div className="calculator_label">
        <span className="calculator_model">BK201</span>
      </div>
    </div>
  );
};

export default Calculator;
