import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkSC = styled(Link)`
  display: block;
`

export default function ProjectsList(props) {
  return props.projects.map(el => (
      <LinkSC to={`/projects/${el.id}`}>{el.name}</LinkSC>
  ));
}
