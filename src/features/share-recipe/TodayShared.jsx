import TodayItem from "./TodayItem";
import { useTodayShared } from "./useTodayShared";

import { useUserByIds } from "../authentication/useUserByIds";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const StyledShared = styled.div`
  background-color: var(--color-yellow-0);
  border: 1px solid var(--color-yellow-100);
  border-radius: 5px;

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoShared = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayShared() {
  const { sharedToday, isLoading } = useTodayShared();

  const sharedBys = sharedToday?.map((shared) => shared.sharedBy);

  const uniqueSharedBys = [...new Set(sharedBys)];

  const { usersById } = useUserByIds(uniqueSharedBys);

  return (
    <StyledShared>
      <Heading as="h2">Shared with you</Heading>
      <Row type="horizontal">
        <Heading as="h3">Today</Heading>
      </Row>

      {!isLoading ? (
        sharedToday.length > 0 ? (
          <TodayList>
            {sharedToday.map((shared) => (
              <TodayItem
                shared={shared}
                usersById={usersById}
                key={shared.id}
              />
            ))}
          </TodayList>
        ) : (
          <NoShared>No recipe shared today</NoShared>
        )
      ) : (
        <Spinner />
      )}
    </StyledShared>
  );
}

export default TodayShared;
