import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from 'react-redux';
import { changeConfirmPassword, changeEmail, changeName, changePassword, changeRegEmail, changeRegLogin, changeRegPassword, changeSurname, signIn, signUp } from "../../redux/auth/auth";
import Tabs from "../../components/Tabs/Tabs";
import { useEffect } from "react";
import M from "materialize-css";
import Button from "../../components/Button/Button";
import { useNavigate } from 'react-router-dom';

export default function Auth() {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const signInButtonClick = () => {
    if(
      !auth.email &&
      !auth.password
    ) {
      return;
    }

    dispatch(signIn({
      email: auth.email,
      password: auth.password
    }))

    if(!auth.error.length) {
      navigate('/');
    }
  }

  const signUpButtonClick = () => {
    if(
      auth.confirmPassword !== auth.regPassword &&
      !auth.regEmail &&
      !auth.regLogin &&
      !auth.surname &&
      !auth.name &&
      !auth.regPassword
    ) {
      return;
    }

    dispatch(signUp({
      email: auth.regEmail,
      login: auth.regLogin,
      surname: auth.surname,
      name: auth.name,
      password: auth.regPassword
    }))

    if(!auth.error.length) {
      var instance = M.Tabs.getInstance(document.querySelector(".authTabs").querySelector('.tabs'));
      instance.select("login-form");
    }
  }

  const confirmPasswordValidate = () => {
    if(!auth.confirmPassword) {
      return "";
    }

    if(auth.confirmPassword !== auth.regPassword) {
      return "invalid";
    }

    return "valid";
  }

  useEffect(() => {
    M.Tabs.init(document.querySelectorAll(".tabs"));
  }, []);
  
  return(
    <>
      <Tabs className="authTabs">
        <Form className="tabsBlock" tabName="Authorization" id={"login-form"}>
          <Input 
            value={auth.email} 
            label={"Email"} 
            id={"email"}
            type={"email"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeEmail(event.target.value))}
          />
          <Input 
            value={auth.password} 
            label={"Password"} 
            id={"password"}
            type={"password"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changePassword(event.target.value))}
          />
          <Button
            onClick={signInButtonClick}
          >Log in</Button>
        </Form>
        <Form className="tabsBlock" tabName="Registration" id={"registration-form"}>
          <Input 
            value={auth.regEmail} 
            label={"Email"} 
            type={"email"}
            id={"registrationEmail"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeRegEmail(event.target.value))}
          />
          <Input 
            value={auth.regLogin} 
            label={"Login"} 
            id={"registrationLogin"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeRegLogin(event.target.value))}
          />
          <Input 
            value={auth.name} 
            label={"Name"} 
            id={"registrationName"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeName(event.target.value))}
          />
          <Input 
            value={auth.surname} 
            label={"Surname"} 
            id={"registrationSurname"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeSurname(event.target.value))}
          />
          <Input 
            value={auth.regPassword} 
            label={"Password"} 
            type={"password"}
            id={"registrationPassword"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeRegPassword(event.target.value))}
          />
          <Input 
            value={auth.confirmPassword} 
            label={"Confirm password"} 
            type={"password"}
            id={"registrationConfirmPassword"}
            rootClassname = {"s12"}
            inputClassname = {confirmPasswordValidate()}
            onChange={(event) => dispatch(changeConfirmPassword(event.target.value))}
          />
          <Button
            onClick={signUpButtonClick}
          >Registration</Button>
        </Form>
      </Tabs>
    </>
  )
}