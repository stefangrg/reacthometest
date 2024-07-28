import React, { forwardRef } from 'react';
import { StyledInput } from './styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <StyledInput ref={ref} {...props} type='number' />;
});

Input.displayName = 'Input';