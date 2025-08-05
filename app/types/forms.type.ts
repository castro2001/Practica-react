type Field<T> = {
  name: keyof T;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  validation?: object;
  classNameContenedor?:string;
  classNameLabel?:string;
  classNameInput?:string;
};



type Props<T> = {
  fields: Field<T>[];
  values: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
