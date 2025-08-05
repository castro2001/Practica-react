
export const InputComponente = <T,>({ fields, values, onChange }: Props<T>) => {
  return (
    <>
      {fields.map(({ name, label, type, placeholder,classNameContenedor, classNameInput,classNameLabel }) => (
        <div key={String(name)} className={`${ classNameContenedor?classNameContenedor : "space-y-4"}`}>
          <label
            htmlFor={String(name)}
            className={` ${ classNameLabel ? classNameLabel  :'text-gray-900 font-bold' }`}
          >
            {label}
          </label>
          <input
            type={type}
            name={String(name)}
            id={String(name)}
            placeholder={placeholder}
            onChange={onChange}
            value={String(values[name])}
            className={`${classNameInput ? classNameInput : 'bg-green-50 border border-green-500 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5'}`}
        
          />
        </div>
      ))}
    </>
  );
};
