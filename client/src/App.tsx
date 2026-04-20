import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ContactModalProvider, useContactModal } from "./contexts/ContactModalContext";
import { HelmetProvider } from "react-helmet-async";
import ContactModal from "./components/ContactModal";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import MedicalLanding from "./pages/MedicalLanding";
import RealEstateLanding from "./pages/RealEstateLanding";
import EcommerceLanding from "./pages/EcommerceLanding";
import HotelsLanding from "./pages/HotelsLanding";
import CollectionsLanding from "./pages/CollectionsLanding";
import ManyMoreLanding from "./pages/ManyMoreLanding";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/es" component={Home} />
      <Route path="/ro" component={Home} />
      <Route path="/partners" component={Partners} />
      <Route path="/partners/es" component={Partners} />
      <Route path="/partners/ro" component={Partners} />
      <Route path="/industries/medical" component={MedicalLanding} />
      <Route path="/industries/medical/es" component={MedicalLanding} />
      <Route path="/industries/medical/ro" component={MedicalLanding} />
      <Route path="/industries/real-estate" component={RealEstateLanding} />
      <Route path="/industries/real-estate/es" component={RealEstateLanding} />
      <Route path="/industries/real-estate/ro" component={RealEstateLanding} />
      <Route path="/industries/ecommerce" component={EcommerceLanding} />
      <Route path="/industries/ecommerce/es" component={EcommerceLanding} />
      <Route path="/industries/ecommerce/ro" component={EcommerceLanding} />
      <Route path="/industries/hotels" component={HotelsLanding} />
      <Route path="/industries/hotels/es" component={HotelsLanding} />
      <Route path="/industries/hotels/ro" component={HotelsLanding} />
      <Route path="/industries/collections" component={CollectionsLanding} />
      <Route path="/industries/collections/es" component={CollectionsLanding} />
      <Route path="/industries/collections/ro" component={CollectionsLanding} />
      <Route path="/industries/many-more" component={ManyMoreLanding} />
      <Route path="/industries/many-more/es" component={ManyMoreLanding} />
      <Route path="/industries/many-more/ro" component={ManyMoreLanding} />
      {/* Blog routes temporarily disabled */}
      {/* <Route path="/blog" component={Blog} /> */}
      {/* <Route path="/blog/:slug" component={BlogPost} /> */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function GlobalContactModal() {
  const { isOpen, formType, closeModal } = useContactModal();
  return <ContactModal isOpen={isOpen} formType={formType} onClose={closeModal} />;
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider>
            <ContactModalProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
                <GlobalContactModal />
              </TooltipProvider>
            </ContactModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
