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
    <div className='flex flex-col gap-1'>
      <div className='flex items-baseline justify-between gap-2 font-mono text-xs'>
        <label htmlFor={id} className='text-gray-11'>
          {label}
        </label>
        <output htmlFor={id} className='text-gray-12'>
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
        className='w-full accent-gray-12 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-8'
      />
    </div>
  );
}
