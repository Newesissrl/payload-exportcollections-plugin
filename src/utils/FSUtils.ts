import path from "path";
import fs from "fs";
import type { LoadResult } from "../types";
export class FSUtils {
  GetBaseDir(dirName: string = "out"): string {
    return path.join(process.cwd(), dirName);
  }
  GetBaseDirByType(type: string, rootDir?: string): LoadResult {
    const baseDir = path.join(this.GetBaseDir(rootDir), type);
    return {
      result: fs.existsSync(baseDir),
      strData: baseDir,
    };
  }
  SaveToFolder = (
    folder: string,
    fileName: string,
    content: string,
    rootDir?: string
  ) => {
    const baseDir = this.GetBaseDirByType(folder, rootDir);
    if (!baseDir.result) {
      fs.mkdirSync(baseDir.strData, { recursive: true });
    }
    const fullPath = path.join(baseDir.strData, fileName);
    fs.writeFileSync(fullPath, content);
    return fullPath;
  };
  EmptyFolder = (folder: string, rootDir?: string) => {
    const baseDir = this.GetBaseDirByType(folder, rootDir);
    if (!baseDir.result) {
      return;
    }
    fs.rmSync(baseDir.strData, {
      recursive: true,
    });
  };
}
