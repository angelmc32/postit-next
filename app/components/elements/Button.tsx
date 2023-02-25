type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
  onClickHandler?: () => void;
};

export default function Button({
  children = "Action",
  classes = "",
  onClickHandler = () => null,
}: ButtonProps) {
  return (
    <button
      className={`min-w-[100px] rounded-md py-1 px-4 lg:py-1.5 ${classes}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
