export default function PreCodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  return (
    <div className="">
      <code className="">{code}</code>
    </div>
  );
}
