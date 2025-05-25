// react-ui/src/app/Routes.tsx
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useUser } from '@/hooks/useUser.ts';

import NavBar from './NavBar.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

const Login = lazy(() => import('../features/account/components/login/Login.tsx'));
const Register = lazy(() => import('../features/account/components/register/Register.tsx'));
const PostList = lazy(() => import('../features/job-listings/components/PostList.tsx'));
const EmployerDashboard = lazy(() => import('../features/employer-dashboard/components/EmployerDashboard.tsx'));
const JobTrackBoard = lazy(() => import('../features/track-applicant/components/JobTrackBoard.tsx'));
const StudentProfile = lazy(() => import('../features/profile/student-profile/StudentProfile.tsx'));
const JobDetails = lazy(() => import('../features/job-listings/components/JobDetails.tsx'));
const EmployerProfile = lazy(() => import('../features/profile/employer-profile/EmployerProfile.tsx'));
const ProfileSettings = lazy(
  () => import('../features/profile/profile-settings/ProfileSettings.tsx'),
);
const Inbox = lazy(() => import('../features/inbox/components/Inbox.tsx'));

const TrackApplications = lazy(() => import('../features/track-applications/components/TrackApplications.tsx'));

const AppRoutes = () => {
  const { user } = useUser();

  return (
    <>
      {user && <NavBar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/jobs" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/jobs" /> : <Register />} />
          <Route path="/" element={user ? <Navigate to="/jobs" /> : <Login />} />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:jobId/applications"
            element={
              <ProtectedRoute>
                <JobTrackBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/:studentId/applications"
            element={
              <ProtectedRoute>
                <TrackApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:jobId"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/:studentId"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employers/:employerId"
            element={
              <ProtectedRoute>
                <EmployerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/settings"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox/:conversationId"
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
