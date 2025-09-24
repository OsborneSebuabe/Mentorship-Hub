import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import MentorDirectory from "./pages/MentorDirectory";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import NotFound from "./pages/NotFound";
import StudentOverview from "./pages/Student/Overview";
import StudentGoals from "./pages/Student/Goals";
import StudentSessions from "./pages/Student/Sessions";
import StudentResources from "./pages/Student/Resources";
import LecturerOverview from "./pages/Lecturer/Overview";
import LecturerCourses from "./pages/Lecturer/Courses";
import LecturerAssessments from "./pages/Lecturer/Assessments";
import LecturerMessages from "./pages/Lecturer/Messages";
import AdminOverview from "./pages/Admin/Overview";
import AdminUsers from "./pages/Admin/Users";
import AdminReports from "./pages/Admin/Reports";
import AdminSystem from "./pages/Admin/System";
import AlumniOverview from "./pages/Alumni/Overview";
import AlumniOpportunities from "./pages/Alumni/Opportunities";
import AlumniGiveBack from "./pages/Alumni/GiveBack";
import AlumniCommunity from "./pages/Alumni/Community";
import ResourceLibraryPage from "./pages/Student/ResourceLibrary";
import AlumniDashboardPage from "./pages/AlumniDashboard";
import MentorMatchingPage from "./pages/Student/MentorMatching";
import SessionBookingPage from "./pages/Student/SessionBooking";
import MySessionsPage from "./pages/Student/MySessions";
import CareerRoadmapPage from "./pages/Student/CareerRoadmap";
import AchievementsPage from "./pages/Student/Achievements";
import SessionRequests from "./pages/Lecturer/SessionRequests";
import AvailabilityPage from "./pages/Lecturer/Availability";
import ResourceUploadPage from "./pages/Lecturer/ResourceUpload";
import MentorAnalyticsPage from "./pages/Lecturer/MentorAnalytics";
import AlumniDirectoryPage from "./pages/Alumni/Directory";
import AlumniLeaderboardPage from "./pages/Alumni/Leaderboard";
import SessionManagementPage from "./pages/Admin/SessionManagement";
import ResourceManagementPage from "./pages/Admin/ResourceManagement";
import AnalyticsReportsPage from "./pages/Admin/AnalyticsReports";
import ContentModerationPage from "./pages/Admin/ContentModeration";
import SystemSettingsPage from "./pages/Admin/SystemSettings";
import MessagesPage from "./pages/Communication/Messages";
import VideoRoomPage from "./pages/Communication/VideoRoom";
import ForumsPage from "./pages/Communication/Forums";
import AnnouncementsPage from "./pages/Communication/Announcements";
import EventsPage from "./pages/Engagement/Events";
import BlogPage from "./pages/Engagement/Blog";
import LeaderboardPage from "./pages/Engagement/Leaderboard";
import SurveysFeedbackPage from "./pages/Engagement/SurveysFeedback";
import HelpCenterPage from "./pages/Engagement/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ug-mentorship-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/mentors" element={<MentorDirectory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/lecturer" element={<LecturerDashboard />} />
            <Route path="/alumni" element={<AlumniDashboardPage />} />
            {/* Student pages */}
            <Route path="/student/overview" element={<StudentOverview />} />
            <Route path="/student/goals" element={<StudentGoals />} />
            <Route path="/student/sessions" element={<StudentSessions />} />
            <Route path="/student/resources" element={<StudentResources />} />
            <Route path="/student/resource-library" element={<ResourceLibraryPage />} />
            <Route path="/student/mentor-matching" element={<MentorMatchingPage />} />
            <Route path="/student/session-booking" element={<SessionBookingPage />} />
            <Route path="/student/my-sessions" element={<MySessionsPage />} />
            <Route path="/student/career-roadmap" element={<CareerRoadmapPage />} />
            <Route path="/student/achievements" element={<AchievementsPage />} />
            {/* Lecturer pages */}
            <Route path="/lecturer/overview" element={<LecturerOverview />} />
            <Route path="/lecturer/courses" element={<LecturerCourses />} />
            <Route path="/lecturer/assessments" element={<LecturerAssessments />} />
            <Route path="/lecturer/messages" element={<LecturerMessages />} />
            <Route path="/lecturer/session-requests" element={<SessionRequests />} />
            <Route path="/lecturer/availability" element={<AvailabilityPage />} />
            <Route path="/lecturer/resource-upload" element={<ResourceUploadPage />} />
            <Route path="/lecturer/analytics" element={<MentorAnalyticsPage />} />
            {/* Admin pages */}
            <Route path="/admin/overview" element={<AdminOverview />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/system" element={<AdminSystem />} />
            <Route path="/admin/session-management" element={<SessionManagementPage />} />
            <Route path="/admin/resource-management" element={<ResourceManagementPage />} />
            <Route path="/admin/analytics-reports" element={<AnalyticsReportsPage />} />
            <Route path="/admin/content-moderation" element={<ContentModerationPage />} />
            <Route path="/admin/system-settings" element={<SystemSettingsPage />} />
            {/* Alumni pages */}
            <Route path="/alumni/overview" element={<AlumniOverview />} />
            <Route path="/alumni/opportunities" element={<AlumniOpportunities />} />
            <Route path="/alumni/give-back" element={<AlumniGiveBack />} />
            <Route path="/alumni/community" element={<AlumniCommunity />} />
            <Route path="/alumni/directory" element={<AlumniDirectoryPage />} />
            <Route path="/alumni/leaderboard" element={<AlumniLeaderboardPage />} />
            {/* Communication */}
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/video-room" element={<VideoRoomPage />} />
            <Route path="/forums" element={<ForumsPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            {/* Engagement */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/surveys" element={<SurveysFeedbackPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
