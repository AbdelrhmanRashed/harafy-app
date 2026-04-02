import ChangePasswordCard from '../components/ChangePasswordCard';
import DangerZone from '../components/DangerZone';
const SecurityPage = () => {
  return (
    <main className="space-y-8">
      {/* تغيير كلمة المرور */}
      <ChangePasswordCard />

      {/* Danger Zone */}
      <DangerZone />
    </main>
  );
};
// ─── PasswordCard ─────────────────────────────────────────────────────────────

export default SecurityPage;
