import React from "react";
import SliderContainer, { SliderItem } from "./slider";
import Image from "next/image";

const ClientLogos: React.FC = () => (
  <>
    <SliderContainer initialOffsetX={0} className="" contentWidth={1290}>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={150}>
        <Image
          src="/assets/trustedby/audubon.png"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain"
        />
      </SliderItem>
    </SliderContainer>
  </>
);

export default ClientLogos;
