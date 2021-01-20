import Header from "../components/nav/Header";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="container layout">
      <Header />
      <div
        className="w-full h-full"
        style={{ paddingTop: 85, paddingBottom: 30 }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
