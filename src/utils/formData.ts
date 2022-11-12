export const buildFormData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", "u2net");
  formData.append("a", "false");
  formData.append("af", "240");
  formData.append("ab", "10");
  formData.append("ae", "10");
  formData.append("om", "false");
  formData.append("ppm", "false");
  return formData;
};
