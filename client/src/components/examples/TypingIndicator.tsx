import TypingIndicator from '../TypingIndicator';

export default function TypingIndicatorExample() {
  return (
    <div className="p-4 bg-background min-h-screen">
      <p className="text-muted-foreground mb-4">AI is typing...</p>
      <TypingIndicator />
    </div>
  );
}