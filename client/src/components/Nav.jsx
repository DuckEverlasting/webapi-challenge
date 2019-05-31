import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarSC = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 200px;
  margin: 20px auto 0;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  background: #ddd;
`

const LinkSC = styled(Link)`
  background: lightblue;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid blue;
  font-weight: bold;
`

export default function Nav() {
  return (
    <NavBarSC>
      <LinkSC to="/projects">Projects</LinkSC>
      <LinkSC to="/actions">Actions</LinkSC>
    </NavBarSC>
  )
}
