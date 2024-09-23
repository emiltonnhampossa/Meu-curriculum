"use client";

import { useEffect, useState } from "react";
import { getHasUsedAppBefore } from "../lib/redux/local-storage";
import Link from "next/link";
import ResumeDropzone from "../components/ResumeDropzone";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);

  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main>
      <div className="mx-auto mt-14 max-w-3xl rounded-md border border-gray-200 px-10 py-10 text-center shadow-md">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-lg font-semibold text-gray-900">
              Importar dados de um currículo existente
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Ainda não tem um currículo?"
                  buttonText="Criar do zero"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="Você tem dados salvos no navegador da sessão anterior"
                  buttonText="Continuar de onde parei"
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-gray-900">
              Substituir dados com um novo currículo
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">ou</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
      <p className="font-semibold text-gray-900">{heading}</p>
      <div className="mt-5">
        <Link
          href="/resume-builder"
          className="outline-theme-blue rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-base font-semibold text-white"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};
