import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ArchivePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 max-w-2xl mx-auto text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
          Search & Archive
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find past articles and announcements from our school's history.
        </p>
      </header>
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for articles by keyword, author, or date..." className="h-12 pl-12 text-base" />
        </div>
      </div>
       <div className="mt-16 text-center">
        <p className="text-muted-foreground">Archive coming soon.</p>
       </div>
    </div>
  );
}
