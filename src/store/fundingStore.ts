import { create } from 'zustand';

interface FundingStore {
    title: string;
    imageUrl: string | null;
    purchaseLink: string;
    address: string;
    content: string;
    setTitle: (title: string) => void;
    setImageUrl: (imageUrl: string | null) => void;
    setPurchaseLink: (purchaseLink: string) => void;
    setAddress: (address: string) => void;
    setContent: (content: string) => void;
    reset: () => void;
  }

const useFundingStore = create<FundingStore>((set) => ({
    title: '',
    imageUrl: null,
    purchaseLink: '',
    address: '',
    content: '',
    setTitle: (title) => set({title}),
    setImageUrl: (imageUrl) => set({imageUrl}),
    setPurchaseLink: (purchaseLink) => set({purchaseLink}),
    setAddress: (address) => set({address}),
    setContent: (content) => set({content}),
    reset: () => set({
        title: '',
        imageUrl: null,
        purchaseLink: '',
        address: '',
        content: '',
    })
}));

export default useFundingStore;