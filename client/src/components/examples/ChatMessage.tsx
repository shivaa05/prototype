import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 p-4 bg-background min-h-screen">
      <ChatMessage
        message="Hello! I need help identifying a disease on my tomato plants. The leaves are turning yellow with brown spots."
        isUser={true}
        timestamp="2:30 PM"
        type="text"
      />
      
      <ChatMessage
        message="I'd be happy to help you identify the disease on your tomato plants. Please upload a clear photo of the affected leaves so I can analyze them."
        isUser={false}
        timestamp="2:31 PM"
        type="text"
      />
      
      <ChatMessage
        message="Here's a photo of my tomato plant"
        isUser={true}
        timestamp="2:32 PM"
        type="image"
        imageSrc="@assets/generated_images/Plant_disease_sample_image_ac8b8a0f.png"
      />
      
      <ChatMessage
        message="Based on the image analysis, your tomato plant appears to have Early Blight (Alternaria solani). This is a common fungal disease that causes yellow leaves with brown, concentric spots. I recommend removing affected leaves, improving air circulation, and applying a copper-based fungicide. Water at the base of the plant to avoid wetting the leaves."
        isUser={false}
        timestamp="2:33 PM"
        type="disease-result"
        confidence={87}
        diseaseType="Early Blight"
      />
    </div>
  );
}