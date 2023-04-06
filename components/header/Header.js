import Image from "next/image";

import { MenuIcon, SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import HeaderMenu from "./HeaderMenu";
import HeaderRight from "./HeaderRight";
import { Store } from "../../utils/Store";

function Header({ navigation, category }) {
  const { state, dispatch } = useContext(Store);

  const router = useRouter();

  const changeMenu = () => {
    dispatch({ type: "CHANGE_MENU" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100 mx-auto h-20 shadow-lg ">
      {/* top header */}
      <div className="relative">
        <div className="flex items-center justify-between  h-20">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-0  rounded-full flex items-center relative h-16 w-16 ml-4 p-2 rounded-full bg-green-500 shadow-2xl ">
              <Image
                onClick={() => router.push("/")}
                src="/images01/Logo Balijava.png"
                layout="fill"
                className="cursor-pointer rounded-full"
              />
            </div>
            <h1 className="font-bold text-xl text-gray-900 cursor-pointer">
              BaliJava Spirit
            </h1>
          </div>

          {/* right */}
          <div className="hidden sm:flex flex-wrap  w-2/3 mr-10">
            <HeaderRight category={category} navigation={navigation} />
          </div>
          <div
            className="flex items-center justify-around
          
          "
          >
            {/* <ShoppingCartIcon className="h-8 mr-10" /> */}
            <div
              onClick={changeMenu}
              className="sm:hidden cursor-pointer mx-4 relative flex items-center"
            >
              <MenuIcon className="h-8" />
            </div>
          </div>
        </div>
        {/* bottom header */}
        <div>
          <HeaderMenu menu={state.menuItem} changeMenu={changeMenu} />
        </div>
      </div>
    </header>
  );
}

export default Header;
