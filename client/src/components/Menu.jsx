import React, { useEffect, useState } from "react";
import Control from "../assets/control.png";
import Logo from "../assets/tensor-logo.png";
import axios from "axios";
import { deleteChat, fetchUserData } from "../services/Api";
import chat from "../assets/chat.png";
import { useNavigate } from "react-router";
import logout from "../assets/logout.png";
import add from "../assets/add.png";
import del from "../assets/trash-bin.png";
import toast from "react-hot-toast";

const Menu = () => {
  const [open, setOpen] = useState(true);

  const [data, setData] = useState([]);

  const [Menus, setMenus] = useState([]);

  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:8080/logout";
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteChat(id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserChats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/tensor/chats",
        { withCredentials: true }
      );
      const apiResponse = response.data;
      setData(apiResponse);
      const transformedMenus = apiResponse.map((item) => ({
        id: item.id,
        title: item.question,
        icon: "https://via.placeholder.com/24",
        gap: false,
      }));
      setMenus(transformedMenus);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetchUserData();
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserChats();
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleMenuClick = (id) => {
    navigate(`/conversation/${id}`);
  };

  const newChat = () => {
    navigate("/home");
  };

  const { picture, email, name } = user || {};

  return (
    <div className="flex h-screen">
      <div
        className={` ${
          open ? "w-72" : "w-[70px] relative"
        } bg-white h-screen p-2 pt-8 duration-300 fixed left-0 top-0 z-50`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-8 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div
          className={`${!open && "hidden"} overflow-y-scroll h-[85%] py-5 pr-2`}
        >
          <ul className={`${!open && "hidden"}`}>
            <li className="my-5 justify-center overflow-hidden flex rounded-[100px] p-2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm max-w-[220px] mx-auto items-center gap-x-4">
              <button
                onClick={newChat}
                className="flex items-center gap-1 font-semibold"
              >
                <span>New Chat</span>
                <img src={add} className="w-4" />
              </button>
            </li>
            {Menus.slice()
              .reverse()
              .map((Menu, index) => (
                <div className="flex items-center">
                  <li
                    key={Menu.id}
                    className={`overflow-hidden flex rounded-[100px] p-2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm w-[200px] max-w-[220px] mx-auto items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
                    onClick={() => handleMenuClick(Menu.id)}
                  >
                    <img src={chat} alt="icon" className="w-4" />
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                  </li>
                  <button
                    key={Menu.id}
                    onClick={() => handleDelete(Menu.id)}
                    className="mt-2"
                  >
                    <img src={del} className="w-5" />
                  </button>
                </div>
              ))}
          </ul>
        </div>
        <hr />
        <div className={`${!open && "hidden"} mt-14 flex items-center gap-x-4`}>
          <img src={picture} className="h-12 rounded-full" />
          <div className={`${!open && "hidden"} origin-left duration-200`}>
            <div className="flex items-center gap-3">
              <p className="text-md text-gray-700 font-semibold">{name}</p>
              <button onClick={handleLogout}>
                <img className="w-4" src={logout} alt="logout-button" />
              </button>
            </div>
            <p className="text-md text-gray-700 font-medium">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
