import CreateRecipeForm from "./CreateRecipeForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddRecipe() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="recipe-form">
          <Button>Add new Recipe</Button>
        </Modal.Open>
        <Modal.Window name="recipe-form">
          <CreateRecipeForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddRecipe;
