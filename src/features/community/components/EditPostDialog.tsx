import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUpdatePost } from '../hooks/useUpdatePost';
import type { PostType } from '../types/post.type';
import { EditPostSchema, type FormValues } from '../schemas/EditPost.schema';
import { Loader2, Smile } from 'lucide-react';
import EmojiContainer from './EmojiContainer';

interface EditPostDialogProps {
  post: PostType;
  open: boolean;
  onClose: () => void;
}

const EditPostDialog = ({ post, open, onClose }: EditPostDialogProps) => {
  const { mutate, isPending } = useUpdatePost(post.id);
  const [showEmoji, setShowEmoji] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      title: post.title,
      description: post.description ?? '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: post.title,
        description: post.description ?? '',
      });
    }
  }, [form, open, post.title, post.description]);

  const onSubmit = (data: FormValues) => {
    mutate(
      { Title: data.title, Description: data.description ?? undefined },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="ms-7">تعديل المنشور</DialogTitle>
          <DialogDescription className="ms-7">
            قم بتعديل المنشور الخاص بك
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوصف</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        className="resize-none pe-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute -bottom-1 left-0 mb-2">
                <Button
                  type="button"
                  variant="link"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEmoji(!showEmoji);
                  }}
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <EmojiContainer
                  showEmoji={showEmoji}
                  className="max-sm:-left-25 max-sm:translate-x-0"
                  setShowEmoji={setShowEmoji}
                  onEmojiClick={(emoji) => {
                    const currentVal = form.getValues('description') || '';
                    form.setValue('description', currentVal + emoji, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="cursor-pointer px-8"
                disabled={isPending}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="px-8"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري التعديل...
                  </>
                ) : (
                  'تعديل'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
