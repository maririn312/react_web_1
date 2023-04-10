import { fireEvent, render, screen } from "@testing-library/react";
import RegisterPage, { alphabetRegex, capitalRegex, numericeRegex, passwordRegex, rePasswordValid, symbolRegex, unameRegex,} from "../../../pages/register/RegisterPage";
import StringUtility from "../../../utility/StringUtility";
import Translation from "../../../i18n/mn/translation.json";
import i18n from '../../../i18n/i18nForTests';
import { BrowserRouter } from "react-router-dom";

const text = "96333553";
const textError = "9633";
const password = "Amane0312!@#";
const passwordError = "9633";
const rePassword = "Amane0312!@#";
const rePasswordError = "fdsfas";
const rePasswordFormError = "rePasswordError";

i18n.init();

describe('user register user field validation', () => {
 
  test('render username', () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
  
    const inputUname = screen.getByTestId("userId");

    expect(inputUname).toBeInTheDocument();
    expect(inputUname).toHaveAttribute("type", "text");
  });
  
  test('username correct', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const unameEvent = screen.getByTestId("userId");
  
    fireEvent.change(unameEvent, { target: { value: text }});
    expect(StringUtility.isValidText(text) || unameRegex.test(textError)).toBe(true);
  });
  
  test('username incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const unameErrorEvent = screen.getByTestId("userId");
    const unameErrorNode = screen.getByTestId("user-error-sms");
    
    expect(unameErrorEvent).toBeInTheDocument();
    expect(unameErrorEvent).toHaveAttribute("type", "text");
  
    fireEvent.change(unameErrorEvent, {target: {value: textError}});

    expect(unameErrorEvent).toBeInTheDocument();
    expect(!StringUtility.isValidText(textError) || unameRegex.test(textError)).toBe(false);

    expect(unameErrorNode).toBeInTheDocument();
    expect(unameErrorNode.textContent).toEqual(Translation.validation.usernameError);
  });
});

describe('user register password field validation', () => {
 
  test('render password', () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
  
    const inputPassword = screen.getByTestId("passwordId");

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute("type", "password");
  });
  
  test('password correct', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const passwordEvent = screen.getByTestId("passwordId");
  
    fireEvent.change(passwordEvent, { target: { value: password }});
    expect(
      StringUtility.isValidText(password) || passwordRegex.test(password) 
    ).toBe(true);
  });
  
  test('password validation incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const passwordErrorEvent = screen.getByTestId("passwordId");
    const passwordErrorNode = screen.getByTestId("password-length-error-sms");

    fireEvent.change(passwordErrorEvent, {target: {value: passwordError}});

    expect(
      !StringUtility.isValidText(passwordError) || passwordRegex.test(passwordError)
    ).toBe(false);
    expect(passwordErrorNode).toBeInTheDocument();
    expect(passwordErrorNode.textContent).toEqual(
      Translation.validation.passwordLengthError
    );
  });

  test('password capital validation incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const passwordCapitalErrorEvent = screen.getByTestId("passwordId");
    const passwordCapitalErrorNode = screen.getByTestId("capital-password-error-sms");

    fireEvent.change(passwordCapitalErrorEvent, {target: {value: passwordError}});

    expect(
      !StringUtility.isValidText(passwordError) || capitalRegex.test(passwordError)
    ).toBe(false);
    expect(passwordCapitalErrorNode).toBeInTheDocument();
    expect(passwordCapitalErrorNode.textContent).toEqual(
      Translation.validation.capitalLetterError
    );
  });

  test('password alphabet validation incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const passwordAlphabetErrorEvent = screen.getByTestId("passwordId");
    const passwordAlphabetErrorNode = screen.getByTestId("letter-password-error-sms");

    fireEvent.change(passwordAlphabetErrorEvent, {target: {value: passwordError}});

    expect(
      !StringUtility.isValidText(passwordError) || alphabetRegex.test(passwordError) 
    ).toBe(false);
    expect(passwordAlphabetErrorNode).toBeInTheDocument();
    expect(passwordAlphabetErrorNode.textContent).toEqual(
      Translation.validation.letterError
    );
  });

  test('password numeric validation incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const passwordNumericErrorEvent = screen.getByTestId("passwordId");
    const passwordNumericErrorNode = screen.getByTestId("numeric-password-error-sms");

    fireEvent.change(passwordNumericErrorEvent, {target: {value: passwordError}});

    expect(
      !StringUtility.isValidText(passwordError) || !numericeRegex.test(passwordError)
    ).toBe(false);
    expect(passwordNumericErrorNode).toBeInTheDocument();
    expect(passwordNumericErrorNode.textContent).toEqual(
      Translation.validation.numericError
    );
  });

  test('password symbol validation incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const passwordSymbolErrorEvent = screen.getByTestId("passwordId");
    const passwordSymbolErrorNode = screen.getByTestId("symbol-password-error-sms");

    fireEvent.change(passwordSymbolErrorEvent, {target: {value: passwordError}});

    expect(
      !StringUtility.isValidText(passwordError) || symbolRegex.test(passwordError) 
    ).toBe(false);
    expect(passwordSymbolErrorNode).toBeInTheDocument();
    expect(passwordSymbolErrorNode.textContent).toEqual(
      Translation.validation.symbolError
    );
  });
});

describe('user register repassword field validation', () => {
 
  test('render repassword', () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
  
    const inputRePassword = screen.getByTestId("rePasswordId");

    expect(inputRePassword).toBeInTheDocument();
    expect(inputRePassword).toHaveAttribute("type", "password");
  });
  
  test('repassword correct', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const rePasswordEvent = screen.getByTestId("rePasswordId");
  
    fireEvent.change(rePasswordEvent, { target: { value: rePassword }});
    expect(StringUtility.isValidText(rePassword) || unameRegex.test(rePassword)).toBe(true);
  });

  test('repassword incorrect', async () => {
    render(<RegisterPage />, {wrapper: BrowserRouter});
    
    const rePasswordErrorEvent = screen.getByTestId("rePasswordId");
    const rePasswordErrorNode = screen.getByTestId("repassword-error-sms");

    fireEvent.change(rePasswordErrorEvent, {target: {value: passwordError}});
    
    expect(
      rePasswordValid(
        rePassword,
        rePasswordError,
        rePasswordFormError,
        Translation.validation.repasswordError
      )
    ).toBe(false);
    expect(rePasswordErrorNode).toBeInTheDocument();
    expect(rePasswordErrorNode.textContent).toEqual(Translation.validation.repasswordError);
  });
});