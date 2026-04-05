import { Field } from '@/components/ui/field';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Search } from 'lucide-react';

const SearchInputField = () => {
  return (
    <div className="max-w-md flex-1 px-4">
      <Field className="relative">
        <InputGroup className="bg-muted/50 focus:bg-background h-10 rounded-full border-transparent px-4">
          <InputGroupInput id="search" placeholder="ابحث هنا..." />
          <InputGroupAddon align="inline-start">
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <KbdGroup>
              <Kbd>K</Kbd>
              <Kbd>⌘</Kbd>
            </KbdGroup>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
};

export default SearchInputField;
