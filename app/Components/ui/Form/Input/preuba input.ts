import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Field<T> = {
  name: keyof T;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  validation?: object;
};

type Props<T> = {
  fields: Field<T>[];
  onSubmit: SubmitHandler<T>;
  successMessage?: string;
};

export function FormBuilder<T>({ fields, onSubmit, successMessage }: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>();

  const [success, setSuccess] = useState(false);

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data); // se lo delegamos al componente padre
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 4000); // Oculta mensaje después de 4s
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {fields.map(({ name, label, type, placeholder, validation }) => (
        <div key={String(name)}>
          <label className="block font-semibold mb-1">{label}</label>
          {type === "textarea" ? (
            <textarea
              className={`w-full border px-3 py-2 rounded ${
                errors[name] ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={placeholder}
              {...register(name, validation)}
            />
          ) : (
            <input
              type={type}
              className={`w-full border px-3 py-2 rounded ${
                errors[name] ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={placeholder}
              {...register(name, validation)}
            />
          )}
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">
              {(errors[name]?.message as string) ?? "Campo requerido"}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>

      {success && (
        <p className="text-green-600 font-medium mt-3">
          {successMessage ?? "Formulario enviado con éxito"}
        </p>
      )}
    </form>
  );
}


<form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="username-success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Your name</label>
    <input type="text" id="username-success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Bonnie Green">
    <p class="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p>
  </div>
  <div>
    <label for="username-error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
    <input type="text" id="username-error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Bonnie Green">
    <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
  </div>
</form>
