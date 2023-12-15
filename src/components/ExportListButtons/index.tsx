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
      // jss-plugin-nested applies this to a child span
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
export const ExportListButtons = ({ collection }) => {
  const classes = useStyles();
  const { t } = useTranslation("general");
  const [fileNameCSV, setFileNameCSV] = useState(null);
  const [fileNameJSON, setFileNameJSON] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { slug } = collection;
  const {
    routes: { api },
    serverURL,
  } = useConfig();
  const save = async (exportType) => {
    let hasItems = true;
    let result = [];
    while (hasItems) {
      const data = await fetch(`${serverURL}${api}/${slug}?limit=100`).then(
        (res) => res.json()
      );
      hasItems = data.hasNextPage;
      result = result.concat(data.docs);
    }
    const filePath = await fetch(
      `${serverURL}${api}/${slug}/save-exports?id=${userInfo.id}&type=${exportType}&slug=${slug}`,
      {
        method: "POST",
        body: JSON.stringify({ data: result }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.text());
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
  });
  return (
    userInfo && (
      <div className={classes.buttons}>
        {fileNameCSV && (
          <DownloadExportFile fileName={fileNameCSV} slug={slug} type={"csv"} />
        )}
        <Button type="submit" onClick={() => save(ExportTypes.CSV)}>
          {t("export-list-csv")}
        </Button>
        {fileNameJSON && (
          <DownloadExportFile
            fileName={fileNameJSON}
            slug={slug}
            type={"json"}
          />
        )}
        <Button type="submit" onClick={() => save(ExportTypes.JSON)}>
          {t("export-list-json")}
        </Button>
      </div>
    )
  );
};
