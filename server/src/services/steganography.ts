import { readFile, writeFile } from "fs/promises";
import { console } from "inspector";
import path from "path";

const START_MARKER = Buffer.from("::HIDDEN_START::");
const END_MARKER = Buffer.from("::HIDDEN_END::");


export async function embedTextInFile(filePath: string, hiddenText: string, outputFilePath?: string) {
    const fileBuffer = await readFile(filePath);
  const textBuffer = Buffer.from(hiddenText, "utf8");
  
    const combinedBuffer = Buffer.concat([
        fileBuffer,
        START_MARKER,
        textBuffer,
        END_MARKER
    ]);

    const outPath = outputFilePath ?? path.join(path.dirname(filePath), "embedded_" + path.basename(filePath));
    await writeFile(outPath, combinedBuffer);
    return outPath;
}

export async function extractTextFromFile(filePath: string): Promise<string | null> {
  const fileBuffer = await readFile(filePath);

  const startIndex = fileBuffer.indexOf(START_MARKER);
  const endIndex = fileBuffer.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      return null; // Ничего не найдено
  }

  const textStart = startIndex + START_MARKER.length;
  const textBuffer = fileBuffer.slice(textStart, endIndex);

  return textBuffer.toString("utf8");
}
