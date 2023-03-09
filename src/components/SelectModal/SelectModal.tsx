import { useState } from "react";
import { TbCheck } from "react-icons/tb";

type SelectModalProps = {
  options: (string | undefined)[];
  title: string;
  toggleFunction: (value: string) => void;
  selectedOptions: string[];
};

const SelectModal = (props: SelectModalProps) => {
  const { options, title } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="rounded-md bg-accent-gray-darkest px-5 py-1 font-semibold uppercase tracking-wider text-accent-gray shadow-md drop-shadow-md"
        color="gray"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {title}
      </button>
      {showModal && (
        <Modal
          data={options}
          selectedOptions={props.selectedOptions}
          closeModal={() => setShowModal(false)}
          title={title}
          toggleFunction={props.toggleFunction}
        />
      )}
    </div>
  );
};

const Modal = ({
  data,
  selectedOptions,
  closeModal,
  title,
  toggleFunction,
}: {
  data: (string | undefined)[];
  selectedOptions: string[];
  closeModal: () => void;
  title: string;
  toggleFunction: (value: string) => void;
}) => {
  return (
    <div className="fixed inset-0 z-10 select-none bg-black bg-opacity-80">
      <div onClick={closeModal} className="z-20 h-full"></div>
      <div className="fixed inset-0 top-1/2 z-30 mx-5 h-2/3 -translate-y-1/2 overflow-y-auto rounded-md bg-accent-gray-black">
        <p className="my-2 text-center font-semibold tracking-wider text-gray-300">{title}</p>
        <div className="px-2">
          {data.map(
            (option, index) =>
              option && (
                <div
                  className="flex items-center justify-between rounded-lg px-2 py-3 font-semibold text-gray-300 transition-all duration-300 ease-in-out hover:bg-accent-gray-darkest hover:text-blue-500"
                  onClick={() => {
                    toggleFunction(option);
                  }}
                  key={`${option}-${index}`}
                >
                  <p>{option}</p>
                  {selectedOptions.includes(option) && <TbCheck className="text-blue-500" />}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
