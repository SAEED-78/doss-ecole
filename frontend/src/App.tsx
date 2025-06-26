import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./pages/StudentLogin";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import ProtectedRoute from "./components/ProtectedRoute";
import TeacherProtectedRoute from "./components/TeacherProtectedRoute";
import StudentProtectedRoute from "./components/StudentProtectedRoute";
import NotFound from "./pages/NotFound";
import Exams from '@/pages/Exams';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-dashboard" 
            element={
              <TeacherProtectedRoute>
                <TeacherDashboard />
              </TeacherProtectedRoute>
            } 
          />
          <Route 
            path="/student-dashboard" 
            element={
              <StudentProtectedRoute>
                <StudentDashboard />
              </StudentProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/teachers" 
            element={
              <ProtectedRoute>
                <Teachers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/students" 
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/schedule" 
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/exams" 
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/reports" 
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
