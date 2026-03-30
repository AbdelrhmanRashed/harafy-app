import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button variant="gradient" className="shadow-primary-gradient-shadow">
        اهلا بالعالم!
      </Button>
    </div>
  );
};

export default HomePage;
