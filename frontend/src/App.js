import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AiPowerPageComponent from "./components/AiPowerPageComponent";
import Loader from "./components/Loader";
import PublicRoute from "./components/PublicRoute";
import ExamsPage from "./pages/admin/Exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";
import AdminReportsPage from "./pages/admin/Reports";
import ChatContainer from "./pages/chat/ChatContainer";
import HomePage from "./pages/common/Home";
import LoginPage from "./pages/common/Login";
import RegisterPage from "./pages/common/Register";
import ProfilePage from "./pages/user/Profile";
import ReportsPage from "./pages/user/Reports";
import WriteExam from "./pages/user/WriteExam";
import "./stylesheets/alignments.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import "./stylesheets/textelements.css";
import "./stylesheets/theme.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/common/404PageNotFound";
import {GoogleOAuthProvider} from "@react-oauth/google"


function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <GoogleOAuthProvider clientId="115034301046-u725266m3lhsgpj4ct14nq4nprjoqgc0.apps.googleusercontent.com">
                <LoginPage />
                </GoogleOAuthProvider>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute>
                <ExamsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                <AdminReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/write-exam/:id"
            element={
              <ProtectedRoute>
                <WriteExam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz/ai"
            element={
              <ProtectedRoute>
                <AiPowerPageComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatContainer />
              </ProtectedRoute>
            }
          />
          <Route 
          path="*"
          element={
            <PageNotFound />
          }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
