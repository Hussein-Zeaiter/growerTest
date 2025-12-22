import styled from "styled-components";
import { css } from "styled-components";

type StyledButtonProps = {
  $isPrimary?: boolean;
  $variant?: "primary" | "secondary";
  $danger?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ $isPrimary }) => ($isPrimary ? "blue" : "red")};
  color: white;
  padding: 10px;
  border: none;
  transition: opacity 0.2s ease;

  ${({ $variant }) => {
    if ($variant === "primary") {
      return css`
        background-color: blue;
        color: white;
      `;
    }

    if ($variant === "secondary") {
      return css`
        background-color: red;
        color: white;
      `;
    }
  }}

  ${({ $danger }) =>
    $danger &&
    css`
      background-color: red;
    `}

  &:hover {
    opacity: 0.8;
  }
`;

function PicassoPage() {
  return (
    <div>
      <StyledButton $isPrimary $danger onClick={() => alert("bruh")}>
        Click me
      </StyledButton>
    </div>
  );
}

export default PicassoPage;
