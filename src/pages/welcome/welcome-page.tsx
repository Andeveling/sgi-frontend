import FirstStoreForm from './components/first-store-form/first-store-form';
import WelcomeMessageSection from './components/welcome-message-section/welcome-message';

export default function WelcomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <WelcomeMessageSection />
      <FirstStoreForm />
    </div>
  );
}
