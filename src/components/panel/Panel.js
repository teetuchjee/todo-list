const Panel = ({ children }) => {
  return (
    <div
      className="w-full h-full bg-white p-4 mt-3"
      style={{
        borderRadius: 4,
        borderRadius: 8,
        boxShadow: "2px 2px 8px 0 rgba(106, 117, 202, 0.15)",
      }}
    >
      {children}
    </div>
  );
};

export { Panel };
