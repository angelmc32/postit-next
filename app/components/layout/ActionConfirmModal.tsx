"use client";

import Button from "../elements/Button";

type ActionConfirmationModelProps = {
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmationAction: (data?: any) => void;
  confirmationDescription: string;
  confirmationTitle: string;
  isButtonDisabled?: boolean;
  setToggleModal: (toggle: boolean) => void;
};

export default function ActionConfirmationModal({
  cancelButtonText = "Cancelar",
  confirmButtonText = "Confirmar",
  confirmationAction,
  confirmationDescription,
  confirmationTitle,
  isButtonDisabled = false,
  setToggleModal,
}: ActionConfirmationModelProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setToggleModal(false);
      }}
      className="fixed left-0 top-0 z-20 flex h-full w-full bg-black/50"
    >
      <div className="absolute top-1/3 left-1/2 flex w-5/6 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-md bg-white py-4 px-8 md:w-2/3 lg:w-1/2 xl:w-2/5">
        <h2 className="text-xl">{confirmationTitle}</h2>
        <h3 className="text-md text-gray-900">{confirmationDescription}</h3>
        <div className="flex items-center justify-between">
          <Button
            onClickHandler={(event) => setToggleModal(false)}
            classes="text-md box-border border-2 border-gray-500 bg-gray-200 text-gray-700 hover:bg-blue-200 disabled:opacity-25"
          >
            {cancelButtonText}
          </Button>
          <Button
            classes="text-md bg-secondary-500 text-white hover:bg-secondary-250 disabled:opacity-25"
            isDisabled={isButtonDisabled}
            onClickHandler={confirmationAction}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
