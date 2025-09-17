import Image from "next/image";

const ImageWithSkeleton = ({ src, alt, width = 400, height = 300, isLoading }) => {
  const aspectRatio = (height / width) * 100; 

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {/* Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
          <span className="text-gray-500 text-sm">Загрузка...</span>
        </div>
      )}

      {/* Картинка */}
      {!isLoading && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 hover:scale-110"
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
