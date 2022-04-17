import React from "react";
import { TileContent, TileBackground, TileWrapper, Tile } from "./tile";
import {
  WorkContainer,
  WorkLeft,
  WorkLink,
  WorkRight,
  WorksBackground,
} from "./work";
import Image from "next/image";

const Works = () => {
  return (
    <TileWrapper numOfPages={3}>
      <TileBackground>
        <WorksBackground />
      </TileBackground>
      <TileContent>
        <Tile
          page={0}
          renderContent={({ progress }) => (
            <WorkContainer>
              <WorkLeft progress={progress}>
                <div>We built</div>
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                  <WorkLink href="https://pinkpanda.io">Pink Panda</WorkLink>
                  &apos;s app
                </div>
              </WorkLeft>
              <WorkRight progress={progress}>
                <Image
                  src="/assets/750x750bb.jpeg"
                  layout="responsive"
                  width={840}
                  height={1620}
                  alt="Pink Panda"
                />
              </WorkRight>
            </WorkContainer>
          )}
        ></Tile>
        <Tile
          page={1}
          renderContent={({ progress }) => (
            <WorkContainer>
              <WorkLeft progress={progress}>
                <div>We made</div>
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                  <WorkLink href="https://pinkpanda.io">SteakWallet</WorkLink>
                  &nbsp; faster
                </div>
              </WorkLeft>
              <WorkRight progress={progress}>
                <Image
                  src="/assets/750x750bbb.jpeg"
                  layout="responsive"
                  width={840}
                  height={1620}
                  alt="Steak Wallet"
                />
              </WorkRight>
            </WorkContainer>
          )}
        ></Tile>
        <Tile
          page={2}
          renderContent={({ progress }) => (
            <WorkContainer>
              <WorkLeft progress={progress}>
                <div>We helped</div>
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                  <WorkLink href="https://pinkpanda.io">Showtime</WorkLink> ship
                  faster.
                </div>
              </WorkLeft>
              <WorkRight progress={progress}>
                <Image
                  src="/assets/showtime.jpg"
                  layout="responsive"
                  width={840}
                  height={1620}
                  alt="Showtime"
                />
              </WorkRight>
            </WorkContainer>
          )}
        ></Tile>
      </TileContent>
    </TileWrapper>
  );
};

export default Works;
