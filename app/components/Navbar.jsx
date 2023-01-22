/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSearchStore } from "../store";
import { FcAssistant } from "react-icons/fc";

export default function Navbar() {
  function searchHandler(e) {
    console.log(e.target.value);
    useSearchStore.setState({ text: e.target.value });
  }
  return (
    <div className="navbar bg-accent-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/">Homepage</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost upper-case text-xl">
          Dev Guides
        </a>
      </div>
      <div className="navbar-end">
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="max-w-lg w-full lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search{" "}
            </label>
            <form methode="get" action="#" className="relative z-50">
              <button
                type="submit"
                id="searchsubmit"
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                name="s"
                id="s"
                onChange={searchHandler}
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-purple-200 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg> */}
            <FcAssistant size={30}/>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
