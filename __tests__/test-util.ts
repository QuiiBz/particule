// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';

export * from '@testing-library/react';

const wait = (seconds: number = 1): Promise<void> => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export { render, wait };
