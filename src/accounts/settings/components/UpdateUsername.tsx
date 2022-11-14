import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMe, setUpdatedMe } from "../../../auth/slices/authSlice";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { RootState } from "../../../store";

export const UpdateUsername = () => {
  const { me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [username, setUsername] = useState(me.username);

  const [usernameProps, setUsernameProps] = useState({
    classAttributes: "",
    labelText: "Username",
    error: false,
  });

  async function checkUsernameAvailable(
    username: string
  ): Promise<{ data: boolean; message: string }> {
    return await sendRequest(
      `accounts/is_available_username?username=${username}`,
      "get",
      false
    );
  }

  useEffect(() => {
    if (username != me.username) {
      checkUsernameAvailable(username)
        .then((result) => {
          const available = result.data;

          setUsernameProps({
            classAttributes: available
              ? "border-emerald-500 text-emerald-500"
              : "border-red-500 text-red-500",
            labelText: available ? "Username" : result.message,
            error: available ? false : true,
          });

          if (available)
            dispatch(setUpdatedMe({ username, validationError: false }));
          else {
            dispatch(setUpdatedMe({ username, validationError: true }));
          }
        })
        .catch((reason) => {
          setUsernameProps({
            classAttributes: "border-red-500 text-red-500",
            labelText: reason.response.data.message[0],
            error: true,
          });

          dispatch(setUpdatedMe({ username, validationError: true }));
        });
    } else {
      setUsernameProps({
        classAttributes: "",
        labelText: "Username",
        error: false,
      });
      dispatch(setUpdatedMe({ username: me.username }));
    }
  }, [username]);

  return (
    <InputField
      labelText={usernameProps.error ? usernameProps.labelText : "Username"}
      type={"text"}
      value={username}
      onChangeEvent={(e) => setUsername(e.target.value)}
      inputAttributes={usernameProps.classAttributes}
      labelAttributes={usernameProps.classAttributes + " border-none"}
    />
  );
};
