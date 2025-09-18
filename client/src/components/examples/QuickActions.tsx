import QuickActions from '../QuickActions';

export default function QuickActionsExample() {
  const handleActionClick = (action: string, message: string) => {
    console.log('Action clicked:', { action, message });
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading font-semibold text-2xl mb-6">How can I help you today?</h2>
        <QuickActions onActionClick={handleActionClick} />
      </div>
    </div>
  );
}