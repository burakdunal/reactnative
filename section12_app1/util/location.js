import {GOOGLE_API_KEY} from 'react-native-dotenv';

const GOOGLE_KEY = GOOGLE_API_KEY;

export function getMapPreview(lat, lng) {
  // console.log("mapPreview", GOOGLE_KEY);
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_KEY}`;
  // console.log(imagePreviewUrl);
  return imagePreviewUrl;
}

export async function getAddres(lat, lng) {
  // console.log("getAddress", GOOGLE_KEY);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
