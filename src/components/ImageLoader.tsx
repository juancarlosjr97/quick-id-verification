import React, { memo, useEffect, useState } from "react";

import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

import ImageButtonLoader, { ImageLoaderTarget } from "./ImageLoaderButton";

type TImageLoader = {
  label: string;
  image: File | null;
  setImage: (image: File) => void;
};

const ImageCardActions = styled.div`
  margin-top: 0.5em;
  margin-left: auto;
`;

const ImageLoader = ({ label, image, setImage }: TImageLoader) => {
  const [imagePreview, setImagePreview] = useState<null | string>(null);

  const onClickImageLoader = async (event: ImageLoaderTarget) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      setImagePreview(URL.createObjectURL(image));
    }

    return () => {
      setImagePreview(null);
    };
  }, [image]);

  if (imagePreview) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt={label} height="150" image={imagePreview} />
        <CardActions>
          <ImageCardActions>
            <ImageButtonLoader label={"Replace"} size="small" onClickImageLoader={onClickImageLoader} />
          </ImageCardActions>
        </CardActions>
      </Card>
    );
  }

  return <ImageButtonLoader size="medium" label={label} onClickImageLoader={onClickImageLoader} />;
};

export default memo(ImageLoader);
