"use client";

import { useEffect, useState } from "react";
import { TextItems } from "../lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "../lib/parse-resume-from-pdf/extract-resume-from-sections";
import { FlexboxSpacer } from "../components/FlexboxSpacer";
import { Heading } from "../components/documentation/Heading";
import { Paragraph } from "../components/documentation/Paragraph";
import ResumeDropzone from "../components/ResumeDropzone";
import { ResumeTable } from "./ResumeTable";
import { readPdf } from "../lib/parse-resume-from-pdf/read-pdf";

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [textItems, setTextItems] = useState<TextItems>([]);

  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function parse() {
      if (fileUrl) {
        const textItems = await readPdf(fileUrl);
        setTextItems(textItems);
      }
    }
    parse();
  }, [fileUrl]);

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="grid md:grid-cols-6">
        <div className="flex justify-center px-2 md:col-span-3 md-h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
          <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
            {fileUrl && (
              <div className="aspect-h-[9.5] aspect-w-7">
                <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" />
              </div>
            )}
          </section>
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
        </div>
        <div className="flex px-6 text-gray-900 md:col-span-3 md-h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
          <section className="max-w-[600px] grow">
            <Heading className="text-primary !mt-4">
            Área de Testes de Análise de Currículos
            </Heading>
            <Paragraph smallMarginTop={true}>
              Adicione seu currículo abaixo para analisar como ele seria interpretado por sistemas de rastreamento de candidatos (ATS)
              utilizados em aplicações de emprego. Quanto mais informações forem extraídas corretamente, melhor formatado e fácil de ler o currículo.
            </Paragraph>
            <div className="mt-3">
              <ResumeDropzone
                onFileUrlChange={(fileUrl) =>
                  setFileUrl(fileUrl || null)
                }
                playgroundView={true}
              />
            </div>
            {fileUrl && (
              <>
                <Heading level={2} className="!mt-[1.2em]">
                  Resultados da Análise do Currículo
                </Heading>
                <ResumeTable resume={resume} />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
