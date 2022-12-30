import { useState } from "react";
import { useDispatch } from "react-redux";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { MailSVG } from "../../../lib/svgs/MailSVG";
import { setEmailToAccount } from "../../slices/settingsSlice";
import { AccountDto } from "./Account";
import { addEmailToAccount, removeEmail } from "./api/account-requests";
import { sendRequest } from "../../../lib/sendRequest";

export const AccountEmail = ({ account }: { account: AccountDto }) => {
  const [email, setEmail] = useState(account.email || "");

  const [passwordAreaVisibility, setPasswordAreaVisibility] = useState(false);

  const [wrongCode, setWrongCode] = useState(false);

  const [codeAreaVisibility, setCodeAreaVisibility] = useState(false);

  const [wrongPassword, setWrongPassword] = useState(false);

  const [code, setCode] = useState({
    verification_code: "",
    verification_token: "",
  });

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  async function addOrRemove() {
    let result: { following_link: string; message: string };

    try {
      if (!account.email) {
        result = await addEmailToAccount(account.via, email, password);
      } else {
        result = await removeEmail(account.via, password);
      }

      setPasswordAreaVisibility(false);
      setCodeAreaVisibility(true);
      setCode((p) => ({
        ...p,
        verification_token: result.following_link,
      }));
    } catch (error: any) {
      if (error.response.data.message.indexOf("sent") >= 0) {
        setCodeAreaVisibility(true);
        setCode((p) => ({
          ...p,
          verification_token: error.response.data.following_link,
        }));
      }

      setWrongPassword(true);
    }
  }

  async function verifyProcess() {
    try {
      const result: { data: { email: string } } = await sendRequest(
        code.verification_token,
        "post",
        true,
        {
          verification_code: code.verification_code,
        }
      );

      dispatch(setEmailToAccount(result.data.email));
      setEmail("");

      setPasswordAreaVisibility(false);
      setPassword("");
      setCodeAreaVisibility(false);
      setCode({ verification_code: "", verification_token: "" });
    } catch (error) {
      setWrongCode(true);
    }
  }

  if (codeAreaVisibility) {
    return (
      <>
        <h4
          className={`ml-2 ${wrongCode ? "text-red-500" : "text-orange-400"}`}
        >
          {wrongCode ? "Wrong verification code" : "Enter verification code"}{" "}
        </h4>

        <div className="mt-4">
          <InputField
            value={code.verification_code}
            inputAttributes={wrongCode ? "border-b border-red-500" : ""}
            onChangeEvent={(e) =>
              setCode((p) => ({ ...p, verification_code: e.target.value }))
            }
            placeholderText="Enter verification code"
          />
        </div>

        <div className="mt-4">
          <MyButton
            buttonText={account.email ? "REMOVE" : "ADD" + " EMAIL"}
            classProperties={"w-48 " + (account.email ? "bg-red-600" : "")}
            onClickEvent={() => verifyProcess()}
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center text-orange-400">
        {passwordAreaVisibility ? (
          <h4
            className={`ml-2 ${
              wrongPassword ? "text-red-500" : "text-orange-400"
            }`}
          >
            {wrongPassword ? "Wrong password" : "Enter your password"}{" "}
          </h4>
        ) : (
          <>
            <MailSVG w={30} h={30} />{" "}
            <h4 className="ml-2 text-orange-400">Manage Email </h4>
          </>
        )}
      </div>

      {passwordAreaVisibility ? (
        <>
          <div className="mt-4">
            <InputField
              value={password}
              onChangeEvent={(e) => {
                if (password.length < 7 || password.length > 16) {
                  setWrongPassword(true);
                } else {
                  setWrongPassword(false);
                }

                setPassword(e.target.value);
              }}
              inputAttributes={wrongPassword ? "border-b border-red-500" : ""}
              placeholderText="Enter your password"
            />
          </div>

          <div className="mt-4">
            <MyButton
              buttonText={"NEXT"}
              classProperties={"w-48"}
              onClickEvent={() => {
                if (!wrongPassword) addOrRemove();
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <InputField
              value={email}
              labelText={account.email ? "Your email" : "You have not an email"}
              onChangeEvent={(e) => setEmail(e.target.value)}
              placeholderText="Enter email"
            />
          </div>

          <div className="mt-4">
            <MyButton
              buttonText={account.email ? "REMOVE" : "ADD" + " EMAIL"}
              classProperties={"w-48 " + (account.email ? "bg-red-600" : "")}
              onClickEvent={() => setPasswordAreaVisibility(true)}
            />
          </div>
        </>
      )}
    </div>
  );
};
