import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;