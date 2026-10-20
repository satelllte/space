type TagsProps = {
  tags: string[];
};

export function Tags({tags}: TagsProps) {
  return (
    <ul aria-label='Tags' className='tw:flex tw:flex-wrap tw:gap-2'>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </ul>
  );
}

type TagProps = {
  text: string;
};

function Tag({text}: TagProps) {
  return (
    <li className='tw:rounded-full tw:border tw:border-gray-5 tw:px-2.5 tw:py-0.5 tw:text-xs tw:text-gray-11'>
      {text}
    </li>
  );
}
