import { JSONValue } from "ai";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../button";
import { DocumentPreview } from "../document-preview";
import FileUploader from "../file-uploader";
import { Textarea } from "../textarea";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";
import { useFile } from "./hooks/use-file";
import { LlamaCloudSelector } from "./widgets/LlamaCloudSelector";
import { ArrowRight } from "lucide-react";

const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "csv", "pdf", "txt", "docx"];

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
    | "messages"
    | "setInput"
    | "append"
  > & {
    requestParams?: any;
    setRequestData?: React.Dispatch<any>;
  },
) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    imageUrl,
    setImageUrl,
    uploadFile,
    files,
    removeDoc,
    reset,
    getAnnotations,
  } = useFile();

  // default submit function does not handle including annotations in the message
  // so we need to use append function to submit new message with annotations
  const handleSubmitWithAnnotations = (
    e: React.FormEvent<HTMLFormElement>,
    annotations: JSONValue[] | undefined,
  ) => {
    e.preventDefault();
    props.append!({
      content: props.input,
      role: "user",
      createdAt: new Date(),
      annotations,
    });
    props.setInput!("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const annotations = getAnnotations();
    if (annotations.length) {
      handleSubmitWithAnnotations(e, annotations);
      return reset();
    }
    props.handleSubmit(e);
  };

  const handleUploadFile = async (file: File) => {
    if (imageUrl || files.length > 0) {
      alert("You can only upload one file at a time.");
      return;
    }
    try {
      await uploadFile(file, props.requestParams);
      props.onFileUpload?.(file);
    } catch (error: any) {
      const onFileUploadError = props.onFileError || window.alert;
      onFileUploadError(error.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '1.8em';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight > 28 ? `${scrollHeight}px` : '1.8em';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [props.input]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-2"
    >
      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={() => setImageUrl(null)} />
      )}
      {files.length > 0 && (
        <div className="flex gap-4 w-full overflow-auto py-2">
          {files.map((file) => (
            <DocumentPreview
              key={file.id}
              file={file}
              onRemove={() => removeDoc(file)}
            />
          ))}
        </div>
      )}
      <div className="flex-grow flex flex-col space-y-2 relative">
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Textarea
            ref={textareaRef}
            id="chat-input"
            autoFocus
            name="message"
            placeholder="Ask anything about Amr..."
            className={`w-full py-2 px-3 bg-transparent border-black focus:ring-0 resize-none rounded-md transition-colors duration-900 ${
              (isFocused || isHovered) ? 'bg-transparent' : ''
            }`}
            style={{ 
              height: '1.8em',
              minHeight: '1.8em',
              overflowY: 'hidden'
            }}
            value={props.input}
            onChange={(e) => {
              props.handleInputChange(e);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ease-in-out ${
              isFocused || isHovered ? 'scale-x-100' : 'scale-x-0'
            } origin-left`}
            style={{ backgroundColor: '#E85A4F' }}
          ></div>

        </div>
        {process.env.NEXT_PUBLIC_USE_LLAMACLOUD === "true" &&
          props.setRequestData && (
            <LlamaCloudSelector setRequestData={props.setRequestData} />
          )}
        <div className="flex justify-center mt-2">
          <Button 
            type="submit" 
            disabled={props.isLoading || !props.input.trim()}
            className="px-4 py-2 rounded-full w-32"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </form>
  );
}
