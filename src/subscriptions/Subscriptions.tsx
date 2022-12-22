import { useEffect, useState } from "react";
import { sendRequest } from "../lib/sendRequest";

export type Subscriptions = {
  notifications_turned_on: boolean;
  mails_turned_on: boolean;
};

export const Subscriptions = ({
  accountID,
  subscriptions,
}: {
  accountID: string;
  subscriptions: Subscriptions;
}) => {
  const [notificationsTurnedOn, setTurnOnNotification] = useState(
    subscriptions.notifications_turned_on
  );
  const [mailsTurnedOn, setMailsTurnedOn] = useState(
    subscriptions.mails_turned_on
  );

  async function subscribeNotifications() {
    const method = notificationsTurnedOn ? "delete" : "post";

    const result: { data: { subscriptions: Subscriptions } } =
      await sendRequest(
        `subscriptions/to/notifications/${accountID}`,
        method,
        true
      );

    setTurnOnNotification(result.data.subscriptions.notifications_turned_on);
  }

  async function subscribeEmails() {
    const method = mailsTurnedOn ? "delete" : "post";

    const result: { data: { subscriptions: Subscriptions } } =
      await sendRequest(`subscriptions/to/emails/${accountID}`, method, true);

    setMailsTurnedOn(result.data.subscriptions.mails_turned_on);
  }

  return (
    <div>
      <div className="flex items-center mb-4 mt-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-3 h-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={notificationsTurnedOn}
          onChange={subscribeNotifications}
        />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
        >
          Turn on notifications
        </label>
      </div>

      <div className="flex items-center mb-4 mt-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-3 h-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={mailsTurnedOn}
          onChange={subscribeEmails}
        />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
        >
          Get mail when user share a post
        </label>
      </div>
    </div>
  );
};
