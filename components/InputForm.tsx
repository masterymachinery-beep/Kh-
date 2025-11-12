import React from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";

interface InputFormProps {
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  onGenerate,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <Card>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>Generative Logic Engine</h2>
        <p style={{ color: '#ccc', marginBottom: '2rem' }}>
          Click the button below to have the AI generate a completely new and unique story idea, deduce the logical steps, and write the full script from scratch.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            type="submit" 
            isLoading={isLoading}
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.2em', 
              backgroundColor: '#007BFF', 
              color: 'white',
              minWidth: '250px'
            }}
          >
            ✨ Generate New Episode
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default InputForm;
