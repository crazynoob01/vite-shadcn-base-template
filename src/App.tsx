import React from 'react';
import { GatherlaneBadge } from './components/GatherlaneBadge';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-wedding-sage selection:text-white overflow-x-hidden">
        {/*Navbar*/}
      <main className="relative">
          GatherLane AI
        {/*Hero*/}
        {/*Story*/}
        {/*EventDetails*/}
        {/*Timeline*/}
        {/*Gallery*/}
        {/*RSVP*/}
        {/*FAQ*/}
      </main>
      {/*Footer */}
      <GatherlaneBadge />
    </div>
  );
};

export default App;
