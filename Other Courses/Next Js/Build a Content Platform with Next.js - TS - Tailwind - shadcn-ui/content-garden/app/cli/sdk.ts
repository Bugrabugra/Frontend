import path from "path";
import fs from "fs/promises";

const DB_PATH = path.join(process.cwd(), "written-content");

export interface GetFoldersResult {
  folders: Folder[]
}

export interface Folder {
  absolutePath: string;
  relativePath: string;
  label: string;
}

const transformDashCaseToSentenceCase = (str: string) => {
  return str
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ")
}

export const getFolders = async (): Promise<GetFoldersResult> => {
  const foldersToIgnore = ["_old", "node_modules"]
  const folders = (await fs.readdir(DB_PATH)).filter((f) => {
    return !f.includes(".") && !foldersToIgnore.includes(f)
  })

  return {
    folders: folders.map((f) => {
      return {
        absolutePath: path.join(DB_PATH, f),
        relativePath: f,
        label: transformDashCaseToSentenceCase(f)
      }
    })
  };
}
