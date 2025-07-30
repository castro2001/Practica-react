import { Upload } from "lucide-react";
import BackgroundDefault from "~/assets/image/background_default.png";

export const Welcome = (props: IWelcome) => {
  const {
    title = "Título por defecto",
    descripcion,
    isIcon = false,
    image = BackgroundDefault,
    secondImage = null, // ✅ Nueva imagen secundaria opcional
  } = props;

  const {
    content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto minus perferendis amet perspiciatis corrupti totam?",
    icon,
  } = descripcion;

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="container flex flex-col-reverse lg:flex-row items-center px-6 py-10 mx-auto gap-8">
        {/* CONTENIDO */}
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
              {title}
            </h1>

            <div className="mt-8 space-y-5">
              <p className="text-gray-700 dark:text-gray-200">{content}</p>

              {isIcon && (
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  {icon} <span>{content}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* IMÁGENES */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2 items-center">
          <img
            className="object-contain w-full h-auto max-h-80 rounded-md"
            src={image}
            alt="Imagen principal"
          />

          {secondImage && (
            <img
              className="object-contain w-full h-auto max-h-80 rounded-md"
              src={secondImage}
              alt="Imagen secundaria"
            />
          )}
        </div>
      </div>
    </section>
  );
};
