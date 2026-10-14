import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme";
import { IntroProvider } from "@/lib/intro";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Preloader } from "@/components/site/Preloader";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { PageCurtain } from "@/components/site/PageCurtain";
import Home from "@/pages/Home";
import AppsPage from "@/pages/AppsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import AdminPage from "@/pages/AdminPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import SupportPage from "@/pages/SupportPage";
import DataRequestPage from "@/pages/DataRequestPage";

const Shell = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <div className="grain relative min-h-screen">
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <PageCurtain key={pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/data-request" element={<DataRequestPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SiteContentProvider>
        <IntroProvider>
          <BrowserRouter>
            <Preloader />
            <Shell />
            <Toaster position="bottom-center" richColors />
          </BrowserRouter>
        </IntroProvider>
      </SiteContentProvider>
    </ThemeProvider>
  );
}

export default App;
