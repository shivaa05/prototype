import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  const handleSendMessage = (message: string, type?: "text" | "image", file?: File) => {
    console.log('Message sent:', { message, type, file });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-4">
        <p className="text-center text-muted-foreground">Chat messages would appear here...</p>
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}