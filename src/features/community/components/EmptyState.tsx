import { SearchX, FileText } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  isSearch?: boolean;
}

const EmptyState = ({
  title = 'لا يوجد منشورات حالياً',
  description = 'جرب تغيير فلاتر البحث أو العودة لاحقاً لرؤية ما هو جديد.',
  isSearch = false,
}: EmptyStateProps) => {
  return (
    <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center px-4 py-20 text-center duration-300">
      <div className="bg-muted mb-4 rounded-full p-6">
        {isSearch ? (
          <SearchX className="text-muted-foreground/60 h-12 w-12" />
        ) : (
          <FileText className="text-muted-foreground/60 h-12 w-12" />
        )}
      </div>
      <h3 className="text-foreground mb-2 text-xl font-bold">
        {isSearch ? 'لم نجد نتائج للبحث' : title}
      </h3>
      <p className="text-muted-foreground mx-auto max-w-[250px] text-sm leading-relaxed">
        {isSearch
          ? 'تأكد من كتابة الكلمات بشكل صحيح أو جرب كلمات أخرى.'
          : description}
      </p>
    </div>
  );
};

export default EmptyState;
