import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  changeEducations,
  selectEducations,
} from "@/app/lib/redux/resumeSlice";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "@/app/lib/redux/settingsSlice";
import { Form, FormSection } from "./Form";
import { CreateHandleChangeArgsWithDescriptions } from "./types";
import { ResumeEducation } from "@/app/lib/redux/types";
import { BulletListTextArea, Input } from "./Form/InputGroup";
import { BulletListIconButton } from "./Form/IconButton";

export const EducationsForm = () => {
  const educations = useAppSelector(selectEducations);
  const dispatch = useAppDispatch();
  const showDelete = educations.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  return (
    <Form form={form} addButtonText="Adicionar Escola">
      {educations.map(({ school, degree, gpa, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
        ) => {
          dispatch(changeEducations({ idx, field, value } as any));
        };

        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== educations.length - 1;

        return (
          <FormSection
            key={idx}
            form="educations"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Excluir escola"
          >
            <Input
              label="Escola"
              labelClassName="col-span-4"
              name="school"
              placeholder="Universidade XYZ"
              value={school}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Data"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jan 2022 - Presente"
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Grau e Curso"
              labelClassName="col-span-4"
              name="degree"
              placeholder="Bacharelado em Engenharia da Computação"
              value={degree}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Média"
              labelClassName="col-span-2"
              name="gpa"
              placeholder="8.55"
              value={gpa}
              onChange={handleWorkExperienceChange}
            />
            <div className="relative col-span-full">
              <BulletListTextArea
                label="Informações Adicionais (Opcional)"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Digite informações adicionais como atividades extracurriculares..."
                value={descriptions}
                onChange={handleWorkExperienceChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[15.6rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
    </Form>
  );
};
