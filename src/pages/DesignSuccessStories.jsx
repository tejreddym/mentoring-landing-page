import React, { Suspense } from 'react';
import DesignSuccessStoriesApp from '../components/DesignSuccessStories/App';

const DesignSuccessStories = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <div className="w-full">
        <DesignSuccessStoriesApp />
      </div>
    </Suspense>
  );
};

export default DesignSuccessStories;
