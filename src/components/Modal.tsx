import {
  Dialog,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import { useAppStore } from "../stores/useAppStore";
import { Recipe } from "../types";

export default function Modal() {
  const {
    modal,
    closeModal,
    selectedRecipe,
    handleClickFavorite,
    favoriteExist,
  } = useAppStore();

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-lg font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <>
      <Dialog
        open={modal}
        onClose={() => closeModal()}
        className="relative z-10"
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <DialogTitle className="text-gray-900 text-2xl font-extrabold my-5">
                {selectedRecipe.strDrink}
              </DialogTitle>
              <img
                src={selectedRecipe.strDrinkThumb}
                alt={`Imagen de ${selectedRecipe.strDrink}`}
                className="mx-auto w-96"
              />
              <DialogTitle className="text-gray-900 text-2xl font-extrabold my-5">
                Ingredientes y Cantidades
              </DialogTitle>
              {renderIngredients()}
              <DialogTitle className="text-gray-900 text-2xl font-extrabold my-5">
                Instrucciones
              </DialogTitle>
              <p className="text-lg">{selectedRecipe.strInstructions}</p>
              <div className="mt-5 flex justify-between gap-4">
                <button
                  type="button"
                  className="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                  onClick={closeModal}
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  className="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
                  onClick={() => {
                    handleClickFavorite(selectedRecipe);
                    closeModal();
                  }}
                >
                  {favoriteExist(selectedRecipe.idDrink)
                    ? "Eliminar Favorito"
                    : "Agregar a Favoritos"}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
