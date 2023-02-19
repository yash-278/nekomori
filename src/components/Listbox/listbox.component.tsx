import React, { useState, useEffect, Dispatch } from "react";
import { useDispatch } from "react-redux";

import { Listbox, Transition } from "@headlessui/react";
import { useAppDispatch } from "../../hooks/customRedux";
import { setYear } from "../../store/reducer/season/season.slice";
import { Action, AnyAction, PayloadAction } from "@reduxjs/toolkit";

export default function MyListbox({
  defaultValue,
  rangeOfValues,
  setterFunction,
}: {
  defaultValue: string;
  rangeOfValues: string[];
  setterFunction: (value: string) => void;
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setterFunction(selectedValue);
  }, [dispatch, selectedValue]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-full mx-auto">
        <Listbox as="div" className="space-y-1" value={selectedValue} onChange={setSelectedValue}>
          {({ open }) => (
            <div className="flex justify-between items-center">
              <div className="relative w-32">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button className="cursor-default relative w-full rounded-md border-none text-white border-gray-700 bg-gray-700 pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-gray-800 transition ease-in-out duration-150 text-xs md:text-sm leading-5">
                    <span className="block truncate">{selectedValue}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md lg:bg-gray-700 bg-gray-800 shadow-lg z-50"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 shadow-xs overflow-auto bg-gray-800 shadow-2xl"
                  >
                    {rangeOfValues.map((currentValue) => (
                      <Listbox.Option key={currentValue} value={currentValue}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active ? "text-gray-100 bg-gray-700" : "text-gray-400"
                            } cursor-default select-none relative py-2 pl-8 pr-4 text-xs md:text-sm`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {currentValue}
                            </span>
                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-gray-100"
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
}
