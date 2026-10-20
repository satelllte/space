type HeaderProps = {
  children: React.ReactNode;
};

export function Header({children}: HeaderProps) {
  return <header className='tw:pb-12'>{children}</header>;
}
