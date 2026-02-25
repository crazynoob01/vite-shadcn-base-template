import React from 'react';
import { ConvyaBadge } from './components/ConvyaBadge';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-wedding-sage selection:text-white overflow-x-hidden">
        {/*Navbar*/}
      <main className="relative">
          Convya AI
        {/*Hero*/}
        {/*Story*/}
        {/*EventDetails*/}
        {/*Timeline*/}
        {/*Gallery*/}
        {/*RSVP*/}
        {/*FAQ*/}
      </main>
      {/*Footer */}
      <ConvyaBadge />
    </div>
  );
};

export default App;
