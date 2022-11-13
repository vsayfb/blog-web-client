import { useEffect, useState } from "react";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";

export const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="mt-5">
      <h1>This will update.</h1>
    </div>
  );
};
