type TagsProps = {
  tags: string[];
};

export function Tags({tags}: TagsProps) {
  return (
    <ul aria-label='Tags' className='flex flex-wrap gap-2'>
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
    <li className='rounded-full border border-gray-5 px-2.5 py-0.5 text-xs text-gray-11'>
      {text}
    </li>
  );
}
