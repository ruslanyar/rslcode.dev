export interface Project {
  name: string;
  description: {
    en: string;
    ru: string;
  };
  stack: string[];
  links: {
    github: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    name: 'algososh',
    description: {
      en: 'A visualizer for algorithms and data structures like string reversal, Fibonacci sequence, sorting, stack, queue, and linked lists.',
      ru: 'Визуализатор алгоритмов и структур данных, таких как разворот строки, последовательность Фибоначчи, сортировка, стек, очередь и связный список.',
    },
    stack: ['TypeScript', 'React', 'Jest', 'Cypress', 'CSS'],
    links: {
      github: 'https://github.com/ruslanyar/algososh',
      live: 'https://ruslanyar.github.io/algososh',
    },
  },
  {
    name: 'react-typewriter',
    description: {
      en: 'A simple and highly customizable React component that creates a typewriter animation for your text.',
      ru: 'Простой и гибко настраиваемый React-компонент, который создает анимацию пишущей машинки для вашего текста.',
    },
    stack: ['TypeScript', 'React', 'CSS'],
    links: {
      github: 'https://github.com/ruslanyar/react-typewriter',
      live: 'https://react-typewriter-ruslanyars-projects.vercel.app/',
    },
  },
];
