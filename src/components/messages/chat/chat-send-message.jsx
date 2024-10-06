/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

export default function ChatSendMessage({
  disabled,
  sendMessage = () => {},
  setMessage = () => {},
  handleKeyDown = () => {},
  message = "",
  images = [],
  setImages = () => {},
  preview = [],
  setPreview = () => {},
  error = false,
  setError = () => {},
  isSending = false,
}) {
  const handleImageChange = (e) => {
    setError(false);
    const maxFiles = 5;
    const selectedFiles = e.target.files;

    if (selectedFiles.length > maxFiles) {
      setError(true);
      setPreview([]);
      e.target.value = "";
    } else {
      setImages([...selectedFiles]);
    }
  };

  useEffect(() => {
    if (images) {
      const urls = [];
      images.forEach((img) => {
        urls.push(URL.createObjectURL(img));
      });
      setPreview(urls);
    }
  }, [images, setPreview]);

  return (
    <div
      className={`${preview.length > 0 && "flex-1 max-h-[300px]"} 
      ${error && "flex-1 max-h-[230px]"} border-t p-4`}
    >
      {preview && (
        <div className="mb-2">
          <div className="flex flex-wrap gap-4 rounded-md">
            {preview.map((previewUrl, index) => (
              <img
                key={index}
                src={previewUrl}
                alt={`Preview ${index}`}
                className="object-cover aspect-square size-24"
              />
            ))}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                You can only upload a maximum of 5 files.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <div className="relative">
        <div className="flex items-center gap-3">
          <label htmlFor="fileUpload">
            <div className="hover:bg-secondary cursor-pointer p-2 rounded">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Fill Upload</span>
              <input
                type="file"
                hidden
                id="fileUpload"
                multiple
                onChange={handleImageChange}
                disabled={disabled || isSending}
              />
            </div>
          </label>
          <Textarea
            placeholder="Type your message..."
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl pr-16 resize-none"
            rows={1}
            disabled={disabled || isSending}
          />
        </div>

        <Button
          type="submit"
          size="icon"
          onClick={sendMessage}
          className="absolute top-1/2 right-2 -translate-y-1/2"
          disabled={disabled || isSending}
        >
          {isSending ? (
            <LoadingSpinner isLoading={isSending} cls="mr-0" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
