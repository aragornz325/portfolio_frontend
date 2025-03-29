import { ReactNode } from 'react';

export type Command = {
    text: string;
    output: string | string[] | ReactNode;
    style?: string;
};
  
  export type commandBooting = {
    label: string;
    status?: 'ok' | 'warn' | 'error' | 'info';
  }

