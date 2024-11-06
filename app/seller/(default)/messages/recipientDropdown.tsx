import { sendToUserType } from "@fizno/api-client/src/models/messageTypes";
import React from "react";

interface RecipientDropdownProps {
  onUserSelect: (user: sendToUserType) => void;
  userList: sendToUserType[];
  searchText: string;
}

const RecipientDropdown: React.FC<RecipientDropdownProps> = ({
  onUserSelect,
  userList,
  searchText,
}) => {
  const handleUserList = () => {
    if (searchText !== "") {
      return (
        userList.filter((el) =>
          el?.displayName?.toLowerCase()?.includes(searchText.toLowerCase()),
        ) || []
      );
    } else {
      return userList;
    }
  };

  return (
    <div className="absolute w-full bg-white p-2 pb-0 h-[250px] overflow-y-auto z-10 border">
      <ul>
        {handleUserList()?.map((user) => (
          <li
            key={user.id}
            className="flex items-center p-2 cursor-pointer"
            onClick={() => onUserSelect(user)} // Handle user selection
          >
            <div className="content-item ml-4">
              <a className="text-base font-normal text-primaryMain">
                {user.displayName}
              </a>
              <p className="text-black text-xs leading-[10px]">
                {user.userName}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipientDropdown;
