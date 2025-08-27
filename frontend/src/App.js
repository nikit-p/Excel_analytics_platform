import "./App.css";
import { Route, Routes } from "react-router-dom";
import HeaderNavbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import Content from "./components/Content";
import FileUpload from "./components/FileUpload";
import FileHistory from "./components/FileHistory";
import TableView from "./components/TableView";
import ChartView from "./components/ChartView";

function App() {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <HeaderNavbar />
              <Content />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<FileUpload />} />
          <Route path="upload" element={<FileUpload />} />
          <Route path="files" element={<FileHistory />} />
          <Route path="table" element={<TableView />} />
          <Route path="charts" element={<ChartView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
