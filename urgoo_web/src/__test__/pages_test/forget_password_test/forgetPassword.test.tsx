import { fireEvent, render, screen } from "@testing-library/react";
import { unameRegex, } from "../../../pages/register/RegisterPage";
import StringUtility from "../../../utility/StringUtility";
import Translation from "../../../i18n/mn/translation.json";
import i18n from '../../../i18n/i18nForTests';
import ForgetPasswordPage from "../../../pages/forget-password/ForgetPasswoardPage";

const text = "96333553";
const textError = "9633";

i18n.init();

describe('forget password field validation', () => {
 
  test('render forget password', () => {
    render(<ForgetPasswordPage />);
  
    const inputNumber = screen.getByTestId("forgetPasswordId");

    expect(inputNumber).toBeInTheDocument();
    expect(inputNumber).toHaveAttribute("type", "text");
  });
  
  test('forget password correct', async () => {
    render(<ForgetPasswordPage />);
    
    const unameEvent = screen.getByTestId("forgetPasswordId");
  
    fireEvent.change(unameEvent, { target: { value: text }});
    expect(StringUtility.isValidText(text) || unameRegex.test(textError)).toBe(true);
  });
  
  test('forget password incorrect', async () => {
    render(<ForgetPasswordPage />);
    
    const unameErrorEvent = screen.getByTestId("forgetPasswordId");
    const unameErrorNode = screen.getByTestId("forget-password-error-sms");
    
    expect(unameErrorEvent).toBeInTheDocument();
    expect(unameErrorEvent).toHaveAttribute("type", "text");
  
    fireEvent.change(unameErrorEvent, {target: {value: textError}});

    expect(unameErrorEvent).toBeInTheDocument();
    expect(!StringUtility.isValidText(textError) || unameRegex.test(textError)).toBe(false);

    expect(unameErrorNode).toBeInTheDocument();
    expect(unameErrorNode.textContent).toEqual(Translation.validation.usernameError);
  });

});

describe('toast', () => {

  test('success Toast', () => {
    render(<ForgetPasswordPage />);
    const unameEvent = screen.getByTestId("forgetPasswordId");
  
    fireEvent.change(unameEvent, { target: { value: text }});
    expect(StringUtility.isValidText(text) || unameRegex.test(textError)).toBe(true);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    button.addEventListener('click', () => {
      expect(screen.getByTestId("nomad_toast")).toBeInTheDocument();
    });
  });
      
});