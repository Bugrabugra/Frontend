import React, { useContext, useRef } from "react";
import s from "../styles/skills.module.css";
import { ScrollContext } from "../utils/scroll-observer";

const fallbackCommits = 284;
const fallbackDownloads = 26958111;

interface Props {
  downloads: number;
  commits: number;
}

const opacityForBlock = (sectionProgress: number, blockNo: number) => {
  const progress = sectionProgress - blockNo;
  if (progress >= 0 && progress < 1) return 1;
  return 0.2;
};

const Skills: React.FC<Props> = ({ commits, downloads }) => {
  const { scrollY } = useContext(ScrollContext);
  const refContainer = React.useRef<HTMLDivElement>(null);

  const numOfPages = 3;
  let progress = 0;

  const { current: elContainer } = refContainer;

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;
    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
  }

  const numOfCommits = Math.round(commits || fallbackCommits).toLocaleString();
  const numOfDownloads =
    Math.round(
      (downloads || fallbackDownloads) / 1000 / 1000
    ).toLocaleString() + " millions";

  return (
    <div ref={refContainer} className="bg-black text-white">
      <div className="min-h-screen max-w-5xl mx-auto px-10 lg:px-20 py-24 md:py-28 lg:py-36 flex flex-col justify-center items-center text-4xl md:text-6xl lg:text-7xl tracking-tight font-semibold">
        <div className="leading-[1.15]">
          <div
            className={s.skillText}
            style={{ opacity: opacityForBlock(progress, 0) }}
          >
            We know our tools inside out.
          </div>
          <span
            className={`${s.skillText} inline-block after:content-['_']`}
            style={{ opacity: opacityForBlock(progress, 1) }}
          >
            Our team has contributed {numOfCommits} commits to React Native
            core, powering thousands of apps worldwide.
          </span>
          <span
            className={`${s.skillText} inline-block`}
            style={{ opacity: opacityForBlock(progress, 2) }}
          >
            We&apos;re maintaining some of the most popular open-source
            projects, with over <strong>{numOfDownloads}</strong> downloads.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Skills;
