import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CopyComponent({id} : {id : string | null}) {
  const url = id ? `https://pay.muggle.link/?pid=${id}` : "Please create your form.";

  const copyToClipBord = () => {
    navigator.clipboard.writeText(url);
  };
  return (
    <div className="flex w-full max-w-sm items-start space-x-1">
      <div className="relative w-full">
        <Input
          className="rounded md:w-60"
          placeholder="Link"
          readOnly
          type="url"
          value={url}
        />
        <Button
          className="absolute right-5 top-0 h-full rounded-l-none overflow-hidden"
          style={{ right: "2rem", maxWidth: "10rem" }}
          onClick={copyToClipBord}
          variant="outline"
        >
          <Copy />
        </Button>
      </div>
    </div>
  );
}
