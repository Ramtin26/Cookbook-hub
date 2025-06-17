import {
  HiArchiveBoxArrowDown,
  HiOutlineBookmarkSquare,
  HiOutlineHome,
  HiShare,
  HiUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-yellow-600);
    /* font-size: 1.6rem; */
    font-size: 1.8rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-yellow-800);
    background-color: var(--color-yellow-50);
    border-radius: 5px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-yellow-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-primary-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/recipes">
            <HiOutlineBookmarkSquare />
            <span>Recipes</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiUsers />
            <span>Create User</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/vote">
            <HiArchiveBoxArrowDown />
            <span>Vote Center</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/share-recipe">
            <HiShare />
            <span>Share Recipe</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
