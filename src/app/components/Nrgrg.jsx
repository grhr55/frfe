import Image from "next/image";

const ImageWithSkeleton = ({ src, alt, width = 400, height = 300, isLoading }) => {
  return (
    <div className="relative w-full" style={{ paddingBottom: `${(height / width) * 100}%` }}>
      {/* Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
      )}

      {/* Картинка */}
      {!isLoading && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 hover:scale-110 rounded-lg"
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
