import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react"; 

export default function CopyComponent({ id }: { id: string | null }) {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate URL when component mounts or when `id` changes
    const url = id ? `https://pay.muggle.link/?pid=${id}` : null;
    setGeneratedUrl(url);
    if (url) {
      window.location.href = url; // Redirect to the generated URL
    }
  }, [id]);

  return (
    <div className="flex w-full max-w-sm items-start space-x-1">
      <div className="relative w-full">
        <Input
          className="rounded md:w-60"
          placeholder="MuggleLink"
          readOnly
          type="url"
          value={generatedUrl || "Please create your form."}
        />
      </div>
    </div>
  );
}
