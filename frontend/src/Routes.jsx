import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import AthleteDashboard from "pages/athlete-dashboard";
import InjuryFundRequestForm from "pages/injury-fund-request-form";
import AdminPanel from "pages/admin-panel";
import AthleteProfileView from "pages/athlete-profile-view";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
        <Route path="/injury-fund-request-form" element={<InjuryFundRequestForm />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/athlete-profile-view" element={<AthleteProfileView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;