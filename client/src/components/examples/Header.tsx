import Header from '../Header';

export default function HeaderExample() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={handleMenuClick} />
      <div className="p-4">
        <p className="text-muted-foreground">App content would appear below the header...</p>
      </div>
    </div>
  );
}