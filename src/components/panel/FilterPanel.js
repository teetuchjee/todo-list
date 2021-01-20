import Button from "../button/Button";

const FilterPanel = ({ children, onRefresh, isCreate }) => {
  return (
    <div
      className={`
        w-full
        h-auto 
        flex 
        flex-column
        px-3 
        py-6 
        rounded-md 
        sm:py-6 
        md:py-6 
        lg:py-2 
        xl:py2 
        md:mt-2 
         `}
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "2px 2px 8px 0 rgba(106, 117, 202, 0.15)",
      }}
    >
      <div className="w-full flex flex-col">
        <span className="mb-2" style={{ color: "#000", fontWeight: 600 }}>
          Filter
        </span>
        {children}
      </div>
    </div>
  );
};

FilterPanel.SearchButton = ({ onClick, disabled }) => {
  const _onClick = () => {
    onClick && onClick();
  };

  return (
    <Button
      disabled={disabled}
      width="100%"
      height={40}
      textCenter
      onClick={_onClick}
    >
      SEARCH
    </Button>
  );
};

FilterPanel.ClearButton = ({ onClick, disabled }) => {
  const _onClick = () => {
    onClick && onClick();
  };

  return (
    <Button
      disabled={disabled}
      className="clear-button "
      width="100%"
      height={40}
      textCenter
      onClick={_onClick}
    >
      CLEAR
    </Button>
  );
};

export { FilterPanel };
