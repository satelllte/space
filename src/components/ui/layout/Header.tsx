type HeaderProps = {
  children: React.ReactNode;
};

export function Header({children}: HeaderProps) {
  return <header className='pb-12'>{children}</header>;
}
