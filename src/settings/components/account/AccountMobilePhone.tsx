import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MyButton } from "../../../lib/components/Button";
import { InputField } from "../../../lib/components/InputField";
import { sendRequest } from "../../../lib/sendRequest";
import { MobilePhoneSVG } from "../../../lib/svgs/MobilePhoneSVG";
import { setMobilePhoneToAccount } from "../../slices/settingsSlice";
import { AccountDto } from "./Account";
import {
  addMobilePhoneToAccount,
  removeMobilePhone,
} from "./api/account-requests";

export const AccountMobilePhone = ({ account }: { account: AccountDto }) => {
  const [phone, setPhone] = useState(account.mobile_phone || "");

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
      if (!account.mobile_phone) {
        result = await addMobilePhoneToAccount(account.via, phone, password);
      } else {
        result = await removeMobilePhone(account.via, password);
      }

      setPasswordAreaVisibility(false);
      setCode((p) => ({ ...p, verification_token: result.following_link }));
      setCodeAreaVisibility(true);
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
      const result: { data: { mobile_phone: string } } = await sendRequest(
        code.verification_token,
        "post",
        true,
        {
          verification_code: code.verification_code,
        }
      );

      dispatch(setMobilePhoneToAccount(result.data.mobile_phone));
      setPhone("");
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
            buttonText={
              account.mobile_phone ? "REMOVE" : "ADD" + " MOBILE PHONE"
            }
            classProperties={
              "w-48 " + (account.mobile_phone ? "bg-red-600" : "")
            }
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
            <MobilePhoneSVG w={30} h={30} />{" "}
            <h4 className="ml-2 text-orange-400">Manage Mobile Phone </h4>
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
              value={phone}
              labelText={
                account.mobile_phone
                  ? "Your mobile phone number"
                  : "You have not a mobile phone number"
              }
              onChangeEvent={(e) => setPhone(e.target.value)}
              placeholderText="Enter mobile phone number"
            />
          </div>

          <div className="mt-4">
            <MyButton
              buttonText={
                account.mobile_phone ? "REMOVE" : "ADD" + " MOBILE PHONE"
              }
              classProperties={
                "w-48 " + (account.mobile_phone ? "bg-red-600" : "")
              }
              onClickEvent={() => setPasswordAreaVisibility(true)}
            />
          </div>
        </>
      )}
    </div>
  );
};
