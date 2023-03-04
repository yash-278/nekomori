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
      <div className="mx-auto w-full max-w-full">
        <Listbox as="div" className="space-y-1" value={selectedValue} onChange={setSelectedValue}>
          {({ open }) => (
            <div className="flex items-center justify-between">
              <div className="relative w-36">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button className="focus:shadow-outline-blue md:text-md relative w-full cursor-default rounded-md border-none border-accent-gray-darker bg-accent-gray-darker py-2 pl-3 pr-10 text-left text-sm leading-5 text-white transition duration-150 ease-in-out focus:border-accent-gray-darkest focus:outline-none">
                    <span className="block truncate">{selectedValue}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                  className="absolute z-50 mt-1 w-full rounded-md bg-accent-gray-darkest shadow-lg lg:bg-accent-gray-darker"
                >
                  <Listbox.Options
                    static
                    className="shadow-xs max-h-60 overflow-auto rounded-md bg-accent-gray-darkest py-1 shadow-2xl"
                  >
                    {rangeOfValues.map((currentValue) => (
                      <Listbox.Option key={currentValue} value={currentValue}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active ? "bg-accent-gray-darker text-gray-100" : "text-gray-400"
                            } md:text-md relative cursor-default select-none py-2 pl-8 pr-4 text-sm`}
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
