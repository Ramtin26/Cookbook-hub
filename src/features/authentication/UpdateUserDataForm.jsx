import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

import { fileToBase64 } from "../../utils/helpers";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.username || user.fullName);
    }
  }, [user]);

  if (isLoading) return <Spinner />;
  if (!user) return <p>Could not load user data.</p>;

  const email = user.email;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    let avatarBase64 = null;
    if (avatar) avatarBase64 = await fileToBase64(avatar);

    updateUser(
      {
        fullName,
        avatar: avatarBase64,
      },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(user.username || user.fullName);
    setAvatar(null);
  }

  console.log("avatar:", avatar);
  console.log("type:", typeof avatar);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
