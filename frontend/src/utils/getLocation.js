const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        resolve({
          latitude: 0,
          longitude: 0,
        });
      },
      { timeout: 5000 },
    );
  });
};

export default getLocation;
