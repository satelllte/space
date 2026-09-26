type FileTreeProps = {
  label: string;
  children: React.ReactNode;
};

/**
 * Renders a nested markdown list as a file tree:
 *
 * <FileTree label='Snapshots directory'>
 * - `directory/`
 *   - `file.txt` (comment)
 * </FileTree>
 */
export function FileTree({label, children}: FileTreeProps) {
  return (
    <figure className='file-tree mt-4' aria-label={label}>
      {children}
    </figure>
  );
}
