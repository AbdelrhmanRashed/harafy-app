import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Megaphone, User, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type Props = {
  userImage?: string;
};

const CreatePost = ({ userImage }: Props) => {
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [postType, setPostType] = useState<string | null>(null);

  const isValid =
    subject.trim().length > 0 &&
    postType !== null &&
    (content.trim().length > 0 || images.length > 0);
  const handleSubmit = () => {
    if (!isValid) return;

    console.log({
      subject,
      type: postType,
      content,
      images,
    });

    setSubject('');
    setContent('');
    setImages([]);
    setPostType(null);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="bg-background w-full rounded-2xl">
          <CardContent className="space-y-4 p-6">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="bg-primary/5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-sm font-semibold">
                {userImage ? (
                  <img
                    src={userImage}
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="text-primary/60 h-6 w-6" />
                )}
              </div>

              {/* Title */}
              <div className="text flex items-center gap-2 text-lg font-semibold">
                <Megaphone size={18} className="text-primary" />
                شارك خبراتك أو اسأل المجتمع
              </div>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ماذا تفكر اليوم؟ شارك خبراتك أو اسأل المجتمع..."
              className="bg-primary/5 max-h-25 min-h-25 resize-none rounded-2xl border-0 px-5 py-4 text-sm outline-none lg:min-w-110"
            />

            <div className="flex items-center justify-between">
              <button className="hover:text-primary flex items-center gap-2 text-sm text-gray-500 transition">
                <ImageIcon size={16} />
                صورة
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="h-10 rounded-full px-6"
              >
                نشر
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/*  DialogContent */}
      <DialogContent className="[&>button]:text-primary [&>button:hover]:text-primary/80 max-w-xl rounded-xl">
        <DialogHeader className="text-md text-primary text-center">
          <DialogTitle>إنشاء منشور</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {/* Input */}
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="موضوع المنشور"
            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
          <div className="bg-background space-y-3">
            {/* Textarea */}
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ماذا تفكر اليوم؟ شارك خبراتك أو اسأل المجتمع..."
              className="min-h-25 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} className="h-32 w-full rounded-xl" />

                    <button
                      onClick={() => removeImage(index)}
                      className="bg-primary absolute top-2 right-2 rounded-full p-1 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleImageClick}
                className="hover:text-primary flex items-center gap-2 text-sm text-gray-500 transition"
              >
                <ImageIcon size={16} />
                صورة
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <Select onValueChange={(value) => setPostType(value)}>
                <SelectTrigger className="w-full max-w-48 border-0 bg-transparent p-0">
                  <SelectValue placeholder="نوع المنشور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>اختر نوع المنشور </SelectLabel>
                    <SelectItem value="request">طلب خدمة</SelectItem>
                    <SelectItem value="general">مشاركة عامة</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              variant="gradient"
              className="rounded-full px-6"
            >
              نشر
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
