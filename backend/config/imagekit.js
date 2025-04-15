import dotenv from "dotenv";
import ImageKit from "imagekit";
dotenv.config()

const imageKit = new ImageKit({
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
})
// console.log(imageKit)
export default imageKit;
