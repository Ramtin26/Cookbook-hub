export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error("Expected a Blob or File"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
