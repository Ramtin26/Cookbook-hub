import { useUser } from "./useUser";
import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  /* font-size: 1.4rem; */
  font-size: 1.6rem;
  letter-spacing: 0.5px;
  color: var(--color-yellow-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-yellow-100);
  /* outline: 2px solid var(--color-border); */
`;

function UserAvatar() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) return null;

  const fullName = user.fullName || user.username;
  const avatar = user.avatarImage;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
