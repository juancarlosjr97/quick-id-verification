import React, { useState } from "react";

import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Head from "next/head";

import ImageLoader from "../components/ImageLoader";
import { checkMatchSelfieAndId } from "../services/id-verification";
import { CenteredContent, CenteredTop } from "../styles/global";
import { errorNotification, loadingNotification, successNotification } from "../utils/notifications";

const Title = styled(Typography)`
  margin-top: 1em;
`;

const Home = () => {
  const [selfieImage, setSelfieImage] = useState<File | null>(null);

  const [idImage, setIdImage] = useState<File | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const onStartCheckMatchSelfieAndId = async () => {
    const notificationId = "CheckMatchSelfieAndId";

    setLoading(true);

    loadingNotification("Checking...", notificationId);

    if (selfieImage && idImage) {
      try {
        const response = await checkMatchSelfieAndId(selfieImage, idImage);

        if (response.isValid) {
          successNotification("Good, it is a matched", notificationId);
        } else {
          errorNotification(response.message, notificationId);
        }
      } catch {
        errorNotification("Something went wrong, try again later", notificationId);
      }
    }

    setLoading(false);
  };

  const onRestart = () => {
    setSelfieImage(null);
    setIdImage(null);
  };

  const isCheckActionEnabled = selfieImage && idImage;

  const isRestartEnabled = selfieImage || idImage;

  return (
    <>
      <Head>
        <title>Quick ID Verification | AWS</title>
        <meta name="description" content="Quick ID Verification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenteredTop>
        <Title variant="h4">Quick ID Verification</Title>
      </CenteredTop>

      <CenteredContent>
        <Stack spacing={2}>
          <ImageLoader label={"Upload Selfie"} image={selfieImage} setImage={setSelfieImage} />

          <ImageLoader label={"Upload ID"} image={idImage} setImage={setIdImage} />

          {isCheckActionEnabled && (
            <LoadingButton
              variant="contained"
              component="label"
              onClick={onStartCheckMatchSelfieAndId}
              loading={isLoading}
              size="small"
              color="secondary"
            >
              Start
            </LoadingButton>
          )}

          {isRestartEnabled && (
            <LoadingButton
              variant="contained"
              component="label"
              onClick={onRestart}
              size="small"
              color="secondary"
              disabled={isLoading}
            >
              Restart
            </LoadingButton>
          )}
        </Stack>
      </CenteredContent>
    </>
  );
};

export default Home;
