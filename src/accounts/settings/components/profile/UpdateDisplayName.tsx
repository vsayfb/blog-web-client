import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMe, setUpdatedMe } from "../../../../auth/slices/authSlice";
import { InputField } from "../../../../lib/components/InputField";
import { RootState } from "../../../../store";

export const UpdateDisplayName = () => {
  const { me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState(me.display_name);

  const [displayNameProps, setdisplayNameProps] = useState({
    classAttributes: "",
    labelText: "Display name",
    error: false,
  });

  useEffect(() => {
    if (me.display_name != displayName) {
      updateDisplayName(displayName);
    } else {
      setdisplayNameProps({
        classAttributes: "",
        labelText: "Display name",
        error: false,
      });
      dispatch(setUpdatedMe({ display_name: me.display_name }));
    }
  }, [displayName]);

  function updateDisplayName(displayName: string) {
    if (displayName.length < 2) {
      setdisplayNameProps({
        classAttributes: "border-b border-red-500",
        error: true,
        labelText: "Display name must be longer than one character.",
      });

      dispatch(
        setUpdatedMe({ display_name: displayName, validationError: true })
      );
    } else if (displayName.length > 15) {
      setdisplayNameProps({
        classAttributes: "border-b border-red-500",
        error: true,
        labelText: "Display name must be shorter than 16 characters.",
      });

      dispatch(
        setUpdatedMe({ display_name: displayName, validationError: true })
      );
    } else {
      setdisplayNameProps({
        classAttributes: "border-b border-emerald-500 text-emerald-500",
        error: false,
        labelText: "Display name",
      });

      dispatch(
        setUpdatedMe({ display_name: displayName, validationError: false })
      );
    }
  }

  return (
    <InputField
      labelText={
        displayNameProps.error ? displayNameProps.labelText : "Display name"
      }
      type={"text"}
      value={displayName}
      onChangeEvent={(e) => setDisplayName(e.target.value)}
      inputAttributes={displayNameProps.classAttributes}
      labelAttributes={displayNameProps.classAttributes + " border-none"}
    />
  );
};
