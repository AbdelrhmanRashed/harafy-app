import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { DirectRequestForm } from './DirectRequestForm';
import { useGetProviderProfile } from '@/features/profile/hooks/useGetProviderProfile';

const DirectServiceDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  ProviderId,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
  ProviderId: number | undefined;
}) => {
  const { data: provider } = useGetProviderProfile(
    ProviderId?.toString() ?? '',
  );
  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      direction="right"
    >
      <DrawerContent className="bg-background fixed inset-y-0 right-0 z-50 mt-0 h-full w-full max-w-none! rounded-none border-l outline-none md:w-[400px]!">
        <div className="flex h-full flex-col overflow-hidden">
          {provider && (
            <DirectRequestForm
              provider={provider}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DirectServiceDrawer;
