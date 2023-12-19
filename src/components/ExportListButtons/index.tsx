import { Button } from "payload/components/elements";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useConfig } from "payload/components/utilities";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      margin: "0 8px",
      "&:last-of-type": {
        marginRight: 0,
      },
    },
    "& .hidden": {
      display: "none",
    },
  },
});
const ExportTypes = {
  JSON: "json",
  CSV: "csv",
};
const DownloadExportFile = ({ slug, type, fileName }) => {
  const {
    routes: { api },
  } = useConfig();

  return (
    <a
      className="hidden"
      target="_download"
      id={`download-${type}`}
      href={`${api}/${slug}/download-exports?filePath=${fileName}`}
    >
      {`download-${type}`}
    </a>
  );
};
const ExportButton = ({ onClick, type, disabled }) => {
  const { t } = useTranslation("general");
  return (
    <Button type="submit" onClick={() => onClick(type)} disabled={disabled}>
      {t(`export-list-${type}`)}
    </Button>
  );
};
export const ExportListButtons = ({ collection }) => {
  const classes = useStyles();
  const [fileNameCSV, setFileNameCSV] = useState(null);
  const [fileNameJSON, setFileNameJSON] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const { slug } = collection;
  const config = useConfig();
  const {
    routes: { api },
    serverURL,
  } = config;
  const save = async (exportType) => {
    setIsExporting(true);

    const filePath = await fetch(
      `${serverURL}${api}/${slug}/save-exports?id=${userInfo.id}&type=${exportType}&slug=${slug}`,
      {
        method: "GET",
      }
    ).then((res) => res.text());
    setIsExporting(false);
    if (exportType === ExportTypes.CSV) {
      setFileNameCSV(filePath);
      return;
    }
    setFileNameJSON(filePath);
  };
  useEffect(() => {
    if (!fileNameCSV) {
      return;
    }
    document.getElementById("download-csv").click();
  }, [fileNameCSV]);
  useEffect(() => {
    if (!fileNameJSON) {
      return;
    }
    document.getElementById("download-json").click();
  }, [fileNameJSON]);
  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await fetch(`${serverURL}${api}/users/me`).then((res) =>
        res.json()
      );
      setUserInfo(userData.user);
    };
    getUserInfo();
  }, [serverURL, api, setUserInfo]);
  return (
    userInfo && (
      <div className={classes.buttons}>
        {fileNameCSV && (
          <DownloadExportFile fileName={fileNameCSV} slug={slug} type={"csv"} />
        )}
        <ExportButton
          type={ExportTypes.CSV}
          onClick={save}
          disabled={isExporting}
        />
        {fileNameJSON && (
          <DownloadExportFile
            fileName={fileNameJSON}
            slug={slug}
            type={"json"}
          />
        )}
        <ExportButton
          type={ExportTypes.JSON}
          onClick={save}
          disabled={isExporting}
        />
      </div>
    )
  );
};
