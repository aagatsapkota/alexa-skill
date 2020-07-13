import styled from 'styled-components'

export const StyledMobileHeader = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

// Side Rail
export const MenuBar = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 9%;
  min-width: 46px;
  max-width: 60px;
  height: 100vh;
  padding-top: 2vh;
  justify-content: center;
  background: ${({ theme }) => theme.colors.shadow1};
  z-index: +1;
`

export const MenuBarLogoWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  align-self: flex-end;
  transform: rotate(-90deg);
  bottom: 12vh;
  padding-bottom: 5%;

  img {
    width: 200%;
    height: auto;
  }
`

// Burger Bars
export const StyledBurger = styled.button`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: +1;
  transition: all 0.3s linear;
  transform: ${({ open }) => (open ? 'translateX(15%)' : '')};

  &:focus {
    outline: none;
  }

  div {
    position: relative;
    width: 1.5rem;
    height: 0.12rem;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(-20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

// Hamburger Menu
export const StyledMenu = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: ${({ theme }) => theme.colors.dark};
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  z-index: +1;

  a,
  button {
    margin: 0.5rem 0 1rem 0;
  }
`

export const MenuLogoWrapper = styled.div`
  text-align: center;
  width: 10%;
  height: auto;
  margin: 0 auto;
  padding-bottom: 5vh;

  img {
    width: 80%;
    height: auto;
  }
`

export const Copyright = styled.div`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.light};
  margin-top: 2em;
`
