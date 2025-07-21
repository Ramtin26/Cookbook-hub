import { useNavigate } from "react-router-dom";
import {
  HiEye,
  HiMiniPencil,
  HiMiniTrash,
  HiSquare2Stack,
} from "react-icons/hi2";
import CreateRecipeForm from "./CreateRecipeForm";
import { useCreateRecipe } from "./useCreateRecipe";
import { useDeleteRecipe } from "./useDeleteRecipe";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Food = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-yellow-600);
  font-family: "Gill Sans";
`;

const Popularity = styled.div`
  font-family: "Gill Sans";
  font-weight: 600;
  color: var(--color-yellow-700);
`;

function RecipeRow({ recipe }) {
  const { isDeleting, deleteRecipe } = useDeleteRecipe();
  const { isCreating, createRecipe } = useCreateRecipe();
  const navigate = useNavigate();

  const {
    id: recipeId,
    name,
    ingredients,
    instructions,
    diet,
    prepTime,
    popularity,
    image,
  } = recipe;

  function handleDuplicate() {
    createRecipe({
      name: `Copy of ${name}`,
      ingredients,
      instructions,
      diet,
      prepTime,
      popularity,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Food>{name}</Food>
      <div>{ingredients.join(", ")}</div>
      <div>{instructions}</div>
      <div>{diet}</div>
      <div>{prepTime} mins</div>
      <Popularity>
        {popularity < 100 ? (
          <span>{popularity} (Unpopular)</span>
        ) : (
          <span>{popularity} (Popular)</span>
        )}
      </Popularity>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={recipeId} />

            <Menus.List id={recipeId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/recipes/${recipeId}`)}
              >
                See details
              </Menus.Button>

              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiMiniPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiMiniTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateRecipeForm recipeToEdit={recipe} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="recipe"
                disabled={isDeleting}
                onConfirm={() => deleteRecipe(recipeId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default RecipeRow;
