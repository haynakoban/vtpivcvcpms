/* eslint-disable react/prop-types */
export default function ChatContainer({ children }) {
  return (
    <div className="pr-2 grid grid-cols-[76px_1fr] md:grid-cols-[300px_1fr] h-[80vh] w-full max-w-[1200px] bg-background border rounded-lg overflow-auto scrolly">
      {children}
    </div>
  );
}
