import AlertBanner from "./components/AlertBanner";
import UserLocationMap from "./components/UserLocationMap";
import SyncManager from "./components/SyncManager";
import ReferralSlip from "./components/ReferralSlip";

function App() {
  return (
    <>
      <AlertBanner />
      <UserLocationMap />
      <SyncManager />
      <ReferralSlip />
    </>
  );
}

export default App;