import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Megaphone, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import CreatePostTrigger from './CreatePostTrigger';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import type { User as AuthUser } from '@/store/useAuthStore';
import { getImageUrl } from '@/lib/utils';

type Props = {
  user: AuthUser | null;
};

const CreatePost = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openCreatePost) {
      setOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isValid =
    subject.trim().length > 0 &&
    (content.trim().length > 0 || images.length > 0);

  const handleSubmit = () => {
    if (!isValid) return;

    console.log({
      subject,
      content,
      images,
    });

    setSubject('');
    setContent('');
    setImages([]);
    setOpen(false);
  };

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <CreatePostTrigger
        userImage={getImageUrl(user?.pictureUrl)}
        onClick={() => setOpen(true)}
      />

      {/* Dialog Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card max-w-xl gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-2xl">
          <DialogHeader className="border-border/50 bg-card border-b px-6 py-4">
            <DialogTitle className="text-foreground flex items-center justify-center gap-2 text-lg font-semibold">
              <Megaphone className="text-primary" size={20} />
              <span>إنشاء منشور</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 p-6">
            {/* User Info & Post Type */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                {user?.pictureUrl ? (
                  <img
                    src={getImageUrl(user.pictureUrl)}
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="text-primary h-5 w-5" />
                )}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="موضوع المنشور..."
                className="placeholder:text-muted-foreground/60 bg-secondary/30 border-0 px-4 py-6 font-medium shadow-none focus-visible:ring-0 md:text-lg"
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب ما يدور في ذهنك..."
                className="placeholder:text-muted-foreground/60 bg-secondary/30 min-h-[120px] resize-none border-0 px-4 py-6 text-base shadow-none focus-visible:ring-0"
              />
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="border-border group relative overflow-hidden rounded-xl border"
                  >
                    <img
                      src={img}
                      className="h-28 w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="hover:bg-destructive/90 absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-muted/30 border-border/50 flex items-center justify-between border-t px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground ml-2 hidden text-sm font-medium sm:inline-block">
                إضافة إلى منشورك
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleImageClick}
                className="text-primary hover:bg-primary/10 hover:text-primary bg-primary/5 rounded-full transition-colors"
              >
                <ImageIcon size={20} />
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              variant="gradient"
              className="shadow-primary-gradient rounded-full px-8 disabled:opacity-50 disabled:shadow-none"
            >
              نشر
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePost;
