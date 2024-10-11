/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

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
  filePreview = [],
  setFilePreview = () => {},
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
      setFilePreview([]);
      e.target.value = "";
    } else {
      setImages([...selectedFiles]);
    }
  };

  useEffect(() => {
    if (images) {
      const urls = [];
      const fileUrls = [];
      images.forEach((img) => {
        if(img?.type == "application/pdf"){
          fileUrls.push({
            name: img?.name,
            url: URL.createObjectURL(img)
          });
        } else {
          urls.push(URL.createObjectURL(img));
        }
      });
      setPreview(urls);
      setFilePreview(fileUrls);
    }
  }, [images, setPreview, setFilePreview]);

  return (
    <div 
      className={`${(preview.length > 0 && filePreview.length > 0) ? 'flex-1 max-h-[240px]' : (preview.length > 0 ? 'flex-1 max-h-[200px]' : (filePreview.length > 0 ? 'flex-1 max-h-[140px]' : ''))} 
      ${error ? 'flex-1 max-h-[230px]' : ' '}`}
    >
      <div className="border-t px-4 pt-4">
      {preview.length > 0 && (
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
        </div>
      )}

      {filePreview.length > 0 && (
        <div className="mb-2">
          <div className="flex flex-wrap gap-2 rounded-md">
            {filePreview.map((previewUrl, index) => (
              <a href={previewUrl?.url} target="_blank" title={previewUrl?.name} key={index} className="hover:underline bg-secondary px-3 py-2 rounded-md flex justify-center items-center gap-1"><FaFilePdf/> File</a>
            ))}
          </div>
        </div>
      )}

      
      {error && (
          <Alert variant="destructive" className="mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              You can only upload a maximum of 5 files.
            </AlertDescription>
          </Alert>
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
                accept="image/*,.pdf"
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
    </div>
  );
}
