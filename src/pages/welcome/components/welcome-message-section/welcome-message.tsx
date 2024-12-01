import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function WelcomeMessageSection() {
  return (
    <div className="hidden md:flex md:w-1/2  bg-gradient-to-br from-primary to-primary/20 text-primary-foreground p-8  flex-col justify-center items-center text-center">    
      <ShoppingBag className="w-24 h-24 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Welcome to Inventory Manager</h1>
      <p className="text-xl mb-6">
        Start by creating your first store to manage your inventory efficiently.
      </p>
      <ArrowRight className="w-12 h-12 animate-bounce" />
    </div>
  );
}
