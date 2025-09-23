import React from 'react';

export const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1
    className={`
      text-3xl leading-9 font-extrabold tracking-tight text-pretty text-primary
      sm:text-4xl sm:leading-10
      md:text-6xl md:leading-14
    `}>
    {children}
  </h1>
);
