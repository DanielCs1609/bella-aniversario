import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';

interface SecretMessage {
  id: number;
  text: string;
  type: 'heart' | 'star' | 'flower' | 'butterfly';
}

interface SecretsContextType {
  collectedSecrets: number[];
  collectSecret: (id: number) => void;
  activeMessage: string | null;
  closeMessage: () => void;
  totalSecretsCount: number;
  secretsList: SecretMessage[];
  allCollectedUnlocked: boolean;
}

const SecretsContext = createContext<SecretsContextType | undefined>(undefined);

export const secretsData: SecretMessage[] = [
  { id: 1, type: 'heart', text: "Seu riso é o meu som favorito no universo inteiro." },
  { id: 2, type: 'star', text: "Você faz o mundo inteiro parecer um lugar muito mais seguro e doce." },
  { id: 3, type: 'flower', text: "Amo a forma como você fecha os olhos e sorri quando está com vergonha." },
  { id: 4, type: 'butterfly', text: "Cada dia ao seu lado é uma página de um conto de fadas que eu tenho a sorte de viver." },
  { id: 5, type: 'heart', text: "Seu abraço tem o poder de curar qualquer dia ruim instantaneamente." },
  { id: 6, type: 'star', text: "Sou absolutamente apaixonado pela sua determinação e pela força dos seus sonhos." },
  { id: 7, type: 'flower', text: "A sua empatia e o carinho com que cuida de todos ao seu redor me inspiram." },
  { id: 8, type: 'butterfly', text: "Amo quando você me manda mensagens aleatórias só para dizer que pensou em mim." },
  { id: 9, type: 'star', text: "Seus olhos brilham com uma luz que nenhuma estrela no céu consegue imitar." },
  { id: 10, type: 'heart', text: "Minha vida ganhou uma paleta de cores totalmente nova no dia em que você entrou nela." },
  { id: 11, type: 'flower', text: "Você é, sem sombra de dúvidas, a minha pessoa favorita no mundo." },
  { id: 12, type: 'butterfly', text: "Amo o aconchego do seu cheiro e a paz que sinto quando deito no seu peito." },
  { id: 13, type: 'heart', text: "Eu prometo escolher você todos os dias, em qualquer vida ou realidade." },
  { id: 14, type: 'star', text: "Em você, eu encontrei o meu lar, meu porto seguro e meu amor eterno." },
  { id: 15, type: 'flower', text: "Obrigado por ser minha melhor amiga, minha maior conselheira e o amor da minha vida." }
];

export const SecretsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collectedSecrets, setCollectedSecrets] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [allCollectedUnlocked, setAllCollectedUnlocked] = useState(false);

  const collectSecret = (id: number) => {
    if (collectedSecrets.includes(id)) {
      // If already collected, just show it again
      const secret = secretsData.find(s => s.id === id);
      if (secret) {
        setActiveMessage(secret.text);
        audioSystem.playChime();
      }
      return;
    }

    // Play chime sound
    audioSystem.playChime();

    // Trigger haptic vibration on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([40, 30, 40]);
    }

    const nextCollected = [...collectedSecrets, id];
    setCollectedSecrets(nextCollected);

    const secret = secretsData.find(s => s.id === id);
    if (secret) {
      setActiveMessage(secret.text);
    }
  };

  useEffect(() => {
    if (collectedSecrets.length === secretsData.length && secretsData.length > 0) {
      setAllCollectedUnlocked(true);
    }
  }, [collectedSecrets]);

  const closeMessage = () => {
    setActiveMessage(null);
    audioSystem.playClick();
  };

  return (
    <SecretsContext.Provider
      value={{
        collectedSecrets,
        collectSecret,
        activeMessage,
        closeMessage,
        totalSecretsCount: secretsData.length,
        secretsList: secretsData,
        allCollectedUnlocked
      }}
    >
      {children}
    </SecretsContext.Provider>
  );
};

export const useSecrets = () => {
  const context = useContext(SecretsContext);
  if (!context) {
    throw new Error('useSecrets must be used within a SecretsProvider');
  }
  return context;
};
