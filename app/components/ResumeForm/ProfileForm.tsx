import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeProfile, selectProfile } from "@/app/lib/redux/resumeSlice";
import { BaseForm } from "./Form";
import { Input } from "./Form/InputGroup";
import { ResumeProfile } from "@/app/lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Nome"
          labelClassName="col-span-full"
          name="name"
          placeholder="seu nome"
          value={name}
          onChange={handleProfileChange}
        />
        <Input
          label="Objectivo"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Empreendedor e inovador obcecado em fazer produtos excepcionais"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@john.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Telefone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="+258 12345 7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/seunome"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Localizacao"
          labelClassName="col-span-2"
          name="location"
          placeholder="CIDADE OU PROVINCIA"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
