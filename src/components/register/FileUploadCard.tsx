import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, type LucideIcon } from "lucide-react";

type Props = {
    title: string;
    description: string;
    icon: LucideIcon;
    accept: string;
    isImage?: boolean;
    onChange?: (file: File) => void;
    errorMessage?: string;
};

const FileUploadCard = ({
    title,
    description,
    icon: Icon,
    accept,
    isImage = true,
    onChange,
    errorMessage
}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "application/pdf",
        ];

        const maxSize = 5 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            setError("نوع الملف غير مدعوم");
            return;
        }

        if (file.size > maxSize) {
            setError("حجم الملف يجب ألا يتجاوز 5MB");
            return;
        }

        setError("");

        if (file.type === "application/pdf") {
            setPreview(file.name);
        } else {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
        onChange?.(file);
    };

    const handleRemove = () => {
        setPreview("");
        setError("");
        if (inputRef.current) inputRef.current.value = "";
        onChange?.(undefined as unknown as File);
    };

    return (
        <div
            className={`rounded-xl border-2 border-dashed p-6 text-center relative transition
            ${error || errorMessage? "border-red-500": preview ? "border-primary shadow-sm shadow-primary/20": "border-gray-200 "}`}
        >
            <input
                type="file"
                ref={inputRef}
                accept={accept}
                className="hidden"
                onChange={handleChange}
            />

            {preview ? (
                <div className="relative space-y-2">

                    {isImage && !preview.endsWith(".pdf") ? (
                        <img
                            src={preview}
                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                    ) : (
                        <p className="text-xs text-gray-600 break-all">
                            {preview}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
                    >
                        <X size={14} />
                    </button>

                </div>
            ) : (
                <div className="space-y-2">

                    <Icon className="mx-auto text-primary" />

                    <p className="text-sm font-medium">{title}</p>

                    <p className="text-xs text-gray-400">{description}</p>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        onClick={handleClick}
                    >
                        اختر ملف
                    </Button>

                </div>
            )}
            {(error || errorMessage) && (
                <p className="mt-2 text-xs text-red-500">
                {error || errorMessage}
                </p>
            )}
        </div>
    );
};

export default FileUploadCard;