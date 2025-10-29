interface QuestionDisplayProps {
  imagePath?: string;
}

export default function QuestionDisplay({ imagePath }: QuestionDisplayProps) {
  return imagePath ? (
    <img
      src={imagePath}
      alt="Yo'l holati tasviri"
      className="max-w-full max-h-full object-contain"
    />
  ) : (
    <div className="text-gray-400 dark:text-gray-600 text-center p-8">
      <p className="text-lg">Rasm mavjud emas</p>
    </div>
  );
}
