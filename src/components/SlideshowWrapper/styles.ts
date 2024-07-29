import styled from "styled-components";

export const StyleSlideshowWrapper = styled.div`
  width: 300px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  outline: none;
  margin: 0 auto;
  text-align:center;
  background-color: ${({ theme }) => theme.colors.white};

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;