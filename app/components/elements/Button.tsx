type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
  isDisabled?: boolean;
  onClickHandler?: (data?: any) => void;
};

export default function Button({
  children = "Action",
  classes = "",
  isDisabled = false,
  onClickHandler = () => null,
}: ButtonProps) {
  return (
    <button
      className={`min-w-[100px] rounded-md py-1 px-4 lg:py-1.5 ${classes}`}
      disabled={isDisabled}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
