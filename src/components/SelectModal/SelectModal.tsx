import { ComponentPropsWithoutRef, useState } from "react";
import { TbCheck } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";

type SelectModalProps = ComponentPropsWithoutRef<"div"> & {
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
      <AnimatePresence>
        {showModal && (
          <Modal
            data={options}
            selectedOptions={props.selectedOptions}
            closeModal={() => setShowModal(false)}
            title={title}
            toggleFunction={props.toggleFunction}
          />
        )}
      </AnimatePresence>
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
    <motion.div
      key="select-modal-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-10 select-none bg-black bg-opacity-80"
    >
      <div onClick={closeModal} className="z-20 h-full"></div>
      <motion.div
        className="fixed inset-0 z-30 my-auto mx-5 h-2/3 overflow-y-auto rounded-md bg-accent-gray-black"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.5 }}
        key="select-modal"
      >
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
      </motion.div>
    </motion.div>
  );
};

export default SelectModal;
