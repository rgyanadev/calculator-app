import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  currentNumber = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber = false;

  constructor() { }
  ngOnInit() {
  }

  public getNumber(input: string) {
    console.log(input);

    if (this.waitForSecondNumber) {
      this.currentNumber = input;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = input : this.currentNumber += input;
    }
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op: any, secondOp: any) {
    if (this.firstOperand === null) {
      // If firstOperand is null, initialize it
      this.firstOperand = secondOp;
      return this.firstOperand;
    }

    switch (op) {
      case '+': return this.firstOperand += secondOp;
      case '-': return this.firstOperand -= secondOp;
      case '*': return this.firstOperand *= secondOp;
      case '/': return this.firstOperand /= secondOp;
      case '=': return secondOp;
    }
  }

  public getOperation(op: string) {
    console.log(op);
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
    console.log(this.firstOperand);
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
