
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const API_KEY_STORAGE_KEY = 'gemini-api-key';

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [keyExists, setKeyExists] = useState<boolean>(false);

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setApiKey(storedKey);
      onApiKeyChange(storedKey);
      setKeyExists(true);
    } else {
      // Show dialog automatically if no key exists
      setShowDialog(true);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      onApiKeyChange(apiKey);
      setKeyExists(true);
      setShowDialog(false);
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey('');
    onApiKeyChange('');
    setKeyExists(false);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-20">
        <Button 
          variant={keyExists ? "outline" : "default"} 
          size="sm" 
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 text-xs shadow-md"
        >
          <KeyRound className="h-3.5 w-3.5" />
          {keyExists ? "API Key Saved" : "Set API Key"}
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Gemini API Key</DialogTitle>
            <DialogDescription>
              Enter your Gemini API key to use AI features. The key will be stored in your browser's local storage.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Alert>
              <AlertDescription>
                Get your API key from the <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Google AI Studio</a>
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-2">
              <Input
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and is only sent directly to Google's servers.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            {keyExists && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleRemoveApiKey}
              >
                Remove Key
              </Button>
            )}
            <Button 
              type="button" 
              onClick={handleSaveApiKey} 
              disabled={!apiKey.trim()}
            >
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeyInput;
