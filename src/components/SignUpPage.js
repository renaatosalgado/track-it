import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../services/API";
import Loader from "react-loader-spinner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function CreateUser(event) {
    event.preventDefault();
    setLoading(true);

    const body = {
      email,
      password,
      name,
      image,
    };

    postSignUp(body)
      .then((res) => {
        setLoading(false);
        navigate("/");
        alert("Seu cadastro foi realizado com sucesso!");
      })
      .catch(() => {
        alert(
          "Ocorreu um erro ao criar seu cadastro. Por favor, preencha os dados novamente."
        );
        setLoading(false);
        setEmail("");
        setPassword("");
        setName("");
        setImage("");
      });
  }

  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="logo-image" />
        <Title>TrackIt</Title>
      </Link>
      <Form onSubmit={CreateUser}>
        <Email
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={loading ? true : false}
          required
        ></Email>
        <Password
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loading ? true : false}
          required
        ></Password>
        <Name
          type="text"
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
          disabled={loading ? true : false}
          required
        ></Name>
        <Image
          type="url"
          placeholder="foto"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          disabled={loading ? true : false}
          required
        ></Image>

        <RegisterButton type={"submit"} disabled={loading ? true : false}>
          {loading ? (
            <Loader
              type="ThreeDots"
              color="#ffffff"
              height={80}
              width={80}
              timeout={5000}
            />
          ) : (
            "Cadastrar"
          )}
        </RegisterButton>
      </Form>
      <Link to="/">
        <Login>Já tem uma conta? Faça login!</Login>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;

const Title = styled.div`
  font-family: "Playball", cursive;
  font-size: 69px;
  color: #126ba5;
`;

const Logo = styled.img`
  width: 180px;
  height: 90px;
  margin-bottom: 8px;
`;

const Form = styled.form`
  width: 303px;
  margin: 0 auto;
`;

const Email = styled.input`
  width: 303px;
  height: 45px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin-top: 6px;
  padding-left: 11px;
  color: #666666;

  ::placeholder {
    color: #dbdbdb;
  }

  :focus {
    outline: none;
  }

  :disabled {
    opacity: 0.5;
  }
`;

const Password = Email;

const Name = Email;

const Image = Email;

const RegisterButton = styled.button`
  width: 303px;
  height: 45px;
  color: #ffffff;
  background-color: #52b6ff;
  border: none;
  border-radius: 5px;
  margin: 6px 0 25px 0;
  font-size: 20px;
  font-family: "Lexend Deca", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :disabled {
    opacity: 0.5;
  }
`;

const Login = styled.p`
  font-size: 14px;
  color: #52b6ff;
  text-decoration-line: underline;
  font-family: "Lexend Deca", sans-serif;
`;
