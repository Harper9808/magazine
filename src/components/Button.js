import React from "react";
import styled from "styled-components";

const ButtonH = styled.button`
    width: 65px;
    height: 28px;
    margin-left: 5px;
    background-color: black;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 13px;
`

const Button = (props) => {
    const { text, position, onClick } = props;return (
    <ButtonH position={position} onClick={onClick}> {text} </ButtonH>
  )
}

export default Button;