import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

export const getAssetInfo = async (publicId) => {
  const options = {
    colors: true,
  };

  try {
    const result = await cloudinary.api.resource(publicId, options);
    console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

export const uploadVideo = async (video) => {
  const options = {
    resource_type: 'video',
    public_id: 'myfolder/mysubfolder/dog_closeup',
    chunk_size: 6000000,
    eager: [
      {
        width: 300, height: 300, crop: 'pad', audio_codec: 'none',
      },
      {
        width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none',
      },
    ],
    eager_async: true,
    eager_notification_url: 'https://mysite.example.com/notify_endpoint',
  };
  try {
    const result = await cloudinary.api.resource(video, options);
    console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};
