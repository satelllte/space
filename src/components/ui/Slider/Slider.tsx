import {useId} from 'react';

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
};

export function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: SliderProps) {
  const id = useId();
  const valueText = format(value);
  return (
    <div className='tw:flex tw:flex-col tw:gap-1'>
      <div className='tw:flex tw:items-baseline tw:justify-between tw:gap-2 tw:font-mono tw:text-xs'>
        <label htmlFor={id} className='tw:text-gray-11'>
          {label}
        </label>
        <output htmlFor={id} className='tw:text-gray-12'>
          {valueText}
        </output>
      </div>
      <input
        id={id}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        className='tw:w-full tw:accent-gray-12 tw:outline-hidden tw:focus-visible:outline-2 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid tw:focus-visible:outline-offset-2'
      />
    </div>
  );
}
