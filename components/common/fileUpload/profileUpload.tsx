import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProfileImageProps {
  title: string;
  initialImageUrl: any;
  handleChangeImage: (arg: any) => void;
}

const ProfileImageUpload: React.FC<ProfileImageProps> = ({
  title,
  initialImageUrl,
  handleChangeImage,
}) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const [defaultImage, setDefaultImage] = useState<string | null>(null);

  const getInitials = (name: string): string => {
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0][0];
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      handleChangeImage(file);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setImageUrl(initialImageUrl);
    if (!initialImageUrl) {
      // Set default image or initials based on title
      setDefaultImage(getInitials(title));
    } else {
      setDefaultImage(null); // Clear default if image is present
    }
  }, [initialImageUrl, title]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden border">
        {imageUrl ? (
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt="Profile"
            className="w-24 h-24 object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primaryMain">
            {defaultImage ? (
              <span className="text-3xl text-white">{defaultImage}</span>
            ) : (
              <Image
                width={100}
                height={100}
                src="/path/to/default/image.png" // Replace with your default image path
                alt="Default Profile"
                className="w-24 h-24 object-cover"
              />
            )}
          </div>
        )}
      </div>
      <h2 className="mt-4 mb-2 text-[#111111] text-base font-semibold normal-case">
        {title}
      </h2>
      <button
        onClick={() => document.getElementById("fileInput")?.click()}
        className="mt-2 px-4 py-2 text-primaryMain rounded-md border text-sm border-primaryMain"
      >
        Change Photo
      </button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;
