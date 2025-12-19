import {
  Card,
  CardHeader,
  CardPreview,
  Image,
  Link,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";

export const Home = () => {
  const [profiles, setProfiles] = useState<ProfileData>();
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

  const onClickHandler = (profile: string) => {
    api.launchProfile(profile);
  };

  return (
    <>
      <div className="topHeader">
        <div className="mainHeader">
          <Image src={"src/img/logo2.1.png"} width={200} />
        </div>
        <div>
          <Tooltip content="GitHub" relationship="label">
            <Link
              appearance="subtle"
              onClick={() => {
                api.openExternal("https://www.github.com/oliverflint");
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
    </>
  );
};
