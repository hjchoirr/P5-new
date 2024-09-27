import styled, { css } from "styled-components";
import fontSizes from "@/theme/fontSizes";

const commonStyle = css`

border-radius: 7px;
cursor: pointer;
`;

export const GroupButton = styled.button`
font-size: 18px;
font-weight: 500;
color: white;
width: 100px;
height: 30px;
display: flex;
justify-content: center;
background-color: #1699F7;
margin-top: 40px;

${commonStyle}

`
