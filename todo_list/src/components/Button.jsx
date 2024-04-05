export default function Button({ children, ...atributes }) {
  return (
    <button type="button" {...atributes}>
      {children}
    </button>
  );
}
