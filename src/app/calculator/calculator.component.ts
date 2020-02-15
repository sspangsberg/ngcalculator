import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  /**
   * Constructor of the Calculator Component
   */
  constructor() { }

  /**
   * Any initialization code here...
   */
  ngOnInit(): void {
  }


  /**
   * Get the current number from the calculator
   * 
   * @param v 
   */
  public getNumber(v: string) {
    console.log(v);
    
    if (this.waitForSecondNumber) { //we already have a firstOperand set
      this.currentNumber = v; 
      this.waitForSecondNumber = false;
    }
    else {

      if (this.currentNumber === '0') {
        this.currentNumber = v; //if currentNumber is 0 replace with v
      }
      else {
        this.currentNumber += v; //otherwise append the new number to currentNumber (2343 etc.)
      }

    }
  }

  /**
   * Will append a decimal point to the current number
   */
  getDecimal() {
    if (!this.currentNumber.includes('.'))
    {
      this.currentNumber += '.';
    }
  }


  /**
   * Perform the actual calculation based on the operator op
   * 
   * @param op the operator
   * @param secondOperand
   */
  private doCalculation(op, secondOperand) {
    switch (op) {
      case '+':
        return this.firstOperand += secondOperand;
      case '-':
        return this.firstOperand -= secondOperand;
      case '*':
        return this.firstOperand *= secondOperand;
      case '/':
        return this.firstOperand /= secondOperand;
      case '=':
        return secondOperand;
    } 
  }


  /**
   * Get the performed operation
   * 
   * @param op 
   */
  public getOperation(op: string) {
    console.log(op);

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    }
    else if (this.operator) { //if we have an operator between firstOperand and secondOperand
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
  }


  /**
   * Clear the calculator
   */
  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator= null;
    this.waitForSecondNumber = false;
  }
}
