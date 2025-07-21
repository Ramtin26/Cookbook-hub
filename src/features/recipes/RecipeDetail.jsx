import { useParams, useNavigate } from "react-router-dom";
import RecipeDataBox from "./RecipeDataBox";
import { useDeleteRecipe } from "./useDeleteRecipe";
import { useRecipe } from "./useRecipe";

import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import styled from "styled-components";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function RecipeDetail() {
  const { recipeId } = useParams();
  const { recipe, isLoading } = useRecipe(recipeId);
  const { deleteRecipe, isDeleting } = useDeleteRecipe();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!recipe) return <Empty resourceName="recipe" />;

  const { diet, popularity, id } = recipe;

  const dietToTagName = {
    vegetarian: "herbal",
    "non-vegetarian": "meaty",
  };

  const isPopular = popularity >= 100;
  const popularityTag = isPopular ? "indigoish" : "grey";
  const popularityLabel = isPopular
    ? `Popular (${popularity})`
    : `Unpopular (${popularity})`;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Recipe #{id}</Heading>
          <Tag type={dietToTagName[diet]}>{diet.replace("-", " ")}</Tag>
          <Tag type={popularityTag}>{popularityLabel}</Tag>
        </HeadingGroup>
      </Row>

      <RecipeDataBox recipe={recipe} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete recipe</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="recipe"
              disabled={isDeleting}
              onConfirm={() =>
                deleteRecipe(id, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RecipeDetail;
