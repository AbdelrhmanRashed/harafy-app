import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, User } from 'lucide-react';

type Props = {
  userImage?: string | null;
  onClick: () => void;
};

const CreatePostTrigger = ({ userImage, onClick }: Props) => {
  return (
    <Card className="bg-card border-border w-full rounded-2xl shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold">
            {userImage ? (
              <img
                src={userImage}
                alt="user"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="text-primary h-5 w-5" />
            )}
          </div>
          <div
            onClick={onClick}
            className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-12 w-full cursor-text items-center rounded-full px-5 text-sm transition-colors"
          >
            ماذا تفكر اليوم؟ شارك خبراتك أو اسأل المجتمع...
          </div>
        </div>
        <div className="flex items-center justify-between pl-2">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={onClick}
              className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <ImageIcon size={18} className="mr-2" />
              <span>صورة</span>
            </Button>
          </div>
          <Button
            onClick={onClick}
            variant="gradient"
            className="shadow-primary-gradient rounded-full px-6"
          >
            نشر
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostTrigger;
