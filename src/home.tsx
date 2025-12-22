import {
  Card,
  CardHeader,
  CardPreview,
  FluentProvider,
  Image,
  Link,
  Text,
  Tooltip,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import type { ProfileData } from "./types/ProfileData";
import { Api } from "./interfaces/Api";
import logoUrl from "./img/logo2.1.png";

declare const api: Api;

export const Home = () => {
  const [profiles, setProfiles] = useState<ProfileData>();
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage["elc_darkmode"] ?? false,
  );
  useEffect(() => {
    api
      .readfile(`${api.profileRoot}\\Microsoft\\Edge\\User data\\Local State`)
      .then((data) => {
        const jsondata = JSON.parse(data);
        const tempProfiles: ProfileData = jsondata.profile;
        tempProfiles.profiles_order.forEach((value) => {
          const icon = api.readfileSync(
            `${api.profileRoot}\\Microsoft\\Edge\\User data\\${value}\\Edge Profile.ico`,
            "binary",
          );
          tempProfiles.info_cache[value].avatar_icon = btoa(icon);
        });
        setProfiles(tempProfiles);
      })
      .catch((err) => {
        console.error("Error reading directory:", err);
      });
  }, []);

  const toggleDarkMode = () => {
    localStorage["elc_darkmode"] = darkMode;
    setDarkMode(!darkMode);
  };

  const onClickHandler = (profile: string) => {
    api.launchProfile(profile);
  };

  return (
    <FluentProvider theme={darkMode ? webLightTheme : webDarkTheme}>
      <div className="mainContainer">
        <div className="topHeader">
          <div className="mainHeader">
            <Image src={logoUrl} width={200} />
          </div>
          <div>
            <Tooltip content="GitHub" relationship="label">
              <Link
                appearance="subtle"
                onClick={() => {
                  api.openExternal(
                    "https://github.com/OliverFlint/EdgeLaunchControl",
                  );
                }}
              >
                <FaGithub size={20} />
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Buy me a brew (Tea/Coffee)" relationship="label">
              <Link
                appearance="subtle"
                onClick={() => {
                  api.openExternal("https://ko-fi.com/oliverflint");
                }}
              >
                <SiKofi size={20} />
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Dark/Light mode toggle" relationship="label">
              <Link appearance="subtle" onClick={toggleDarkMode}>
                {darkMode ? (
                  <MdOutlineLightMode size={20} />
                ) : (
                  <MdDarkMode size={20} />
                )}
              </Link>
            </Tooltip>
          </div>
        </div>

        <div className="profilesContainer">
          {profiles?.profiles_order?.map((value, index) => {
            return (
              <Card
                key={`profile_${index}`}
                className="profileCard"
                onClick={() => onClickHandler(value)}
              >
                <CardHeader
                  header={
                    <Text weight="bold">{profiles.info_cache[value].name}</Text>
                  }
                />
                <CardPreview>
                  <Image
                    style={{ maxWidth: "70px" }}
                    src={`data:image/ico;base64,${profiles.info_cache[value].avatar_icon}`}
                  />
                </CardPreview>
              </Card>
            );
          })}
        </div>
      </div>
    </FluentProvider>
  );
};
