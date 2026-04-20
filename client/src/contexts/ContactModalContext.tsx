/**
 * ContactModalContext
 * Contexto global para manejar el estado del modal de contacto
 */

import { createContext, useContext, useState, ReactNode } from 'react';

type FormType = 'demo' | 'sales' | 'partner';

interface ContactModalContextType {
  isOpen: boolean;
  formType: FormType;
  openModal: (type: FormType) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('demo');

  const openModal = (type: FormType) => {
    setFormType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, formType, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}
