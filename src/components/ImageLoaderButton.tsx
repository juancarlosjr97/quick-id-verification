import React, { memo } from "react";

import Button from "@mui/material/Button";

export type ImageLoaderTarget = {
  target: { files: FileList | null };
};

type TImageButtonLoader = {
  label: string;
  onClickImageLoader: (image: ImageLoaderTarget) => void;
  size: "small" | "medium" | "large" | undefined;
};

const ImageButtonLoader = ({ label, size, onClickImageLoader }: TImageButtonLoader) => {
  return (
    <Button variant="contained" component="label" size={size}>
      {label}
      <input hidden accept="image/*" multiple={false} type="file" onChange={onClickImageLoader} />
    </Button>
  );
};

export default memo(ImageButtonLoader);
