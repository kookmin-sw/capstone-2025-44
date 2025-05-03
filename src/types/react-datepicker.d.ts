declare module 'react-datepicker' {
  import { ComponentType, ReactNode } from 'react';

  export interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    inline?: boolean;
    locale?: any;
    renderCustomHeader?: (props: CustomHeaderProps) => ReactNode;
  }

  export interface CustomHeaderProps {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
  }

  const DatePicker: ComponentType<DatePickerProps>;
  export default DatePicker;
} 