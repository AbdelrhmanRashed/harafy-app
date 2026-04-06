import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, Megaphone, User, X, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { createPostSchema, type CreatePostInput } from '../schemas/post.schema';
import { useAddPost } from '../hooks/useAddPost';
import CreatePostTrigger from './CreatePostTrigger';
import type { User as AuthUser } from '@/store/useAuthStore';
import { getImageUrl } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  user: AuthUser | null;
};

// ─── Component ────────────────────────────────────────────────────────────────

const CreatePost = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: addPost, isPending } = useAddPost();

  // ── Open dialog from router state (e.g. navbar shortcut) ──────────────────
  useEffect(() => {
    if (location.state?.openCreatePost) {
      setOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // ── Form ──────────────────────────────────────────────────────────────────
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      Title: '',
      Description: '',
    },
    mode: 'onTouched',
  });

  // ── Reset everything when dialog closes ───────────────────────────────────
  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset();
      setImagePreviews([]);
      setImageFiles([]);
    }
    setOpen(value);
  };

  // ── Image handlers ────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);

    // reset input so re-selecting the same file triggers onChange
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (values: CreatePostInput) => {
    const formData = new FormData();
    formData.append('Title', values.Title);
    if (values.Description) {
      formData.append('Description', values.Description);
    }
    imageFiles.forEach((file) => formData.append('Images', file));

    addPost(formData, {
      onSuccess: () => {
        handleOpenChange(false);
      },
    });
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <CreatePostTrigger
        userImage={getImageUrl(user?.pictureUrl)}
        onClick={() => setOpen(true)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-card mx-auto w-full max-w-2xl! gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-2xl"
          aria-describedby={undefined}
        >
          {/* ── Header ── */}
          <DialogHeader className="border-border/50 bg-card border-b px-6 py-4">
            <DialogTitle className="text-foreground flex items-center justify-center gap-2 text-lg font-semibold">
              <Megaphone className="text-primary" size={20} />
              <span>إنشاء منشور</span>
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
              <div className="space-y-5 p-6">
                {/* ── User avatar ── */}
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

                {/* ── Title ── */}
                <FormField
                  control={form.control}
                  name="Title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="موضوع المنشور..."
                          dir="rtl"
                          className="placeholder:text-muted-foreground/60 bg-secondary/30 border-0 px-4 py-6 font-medium shadow-none focus-visible:ring-0 md:text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Description ── */}
                <FormField
                  control={form.control}
                  name="Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="اكتب ما يدور في ذهنك..."
                          dir="rtl"
                          className="placeholder:text-muted-foreground/60 bg-secondary/30 min-h-[120px] resize-none border-0 px-4 py-6 text-base shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Image Previews ── */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {imagePreviews.map((src, index) => (
                      <div
                        key={index}
                        className="border-border group relative overflow-hidden rounded-xl border"
                      >
                        <img
                          src={src}
                          className="h-28 w-full object-cover transition-transform group-hover:scale-105"
                          alt={`صورة ${index + 1}`}
                        />
                        <button
                          type="button"
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

              {/* ── Footer ── */}
              <div className="bg-muted/30 border-border/50 flex items-center justify-between border-t px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground ml-2 hidden text-sm font-medium sm:inline-block">
                    إضافة إلى منشورك
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => inputRef.current?.click()}
                    className="text-primary hover:bg-primary/10 hover:text-primary bg-primary/5 rounded-full transition-colors"
                    aria-label="إضافة صور"
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
                  type="submit"
                  disabled={isPending}
                  variant="gradient"
                  className="shadow-primary-gradient rounded-full px-8 disabled:opacity-50 disabled:shadow-none"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جاري النشر...
                    </>
                  ) : (
                    'نشر'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePost;
