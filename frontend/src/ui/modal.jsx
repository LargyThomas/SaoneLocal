import { useEffect } from "react"
import { FaTrash, FaTimes } from "react-icons/fa"

function ModalSection({ open, onClose, children }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Fermer la fenêtre" className="absolute right-3 top-3 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"><FaTimes /></button>
        {children}
      </div>
    </div>
  )
}

function Modal() {
  const handleDelete = () => {
    console.log("Élément supprimé")
  }

  return (
    <main className="p-6">
      <button type="button" onClick={() => window.dispatchEvent(new Event("open-delete-modal"))} className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"><FaTrash />Supprimer</button>
    </main>
  )
}

function DeleteModal({ open, onClose, onConfirm }) {
  return (
    <ModalSection open={open} onClose={onClose}>
      <div className="text-center">
        <FaTrash size={56} className="mx-auto text-red-500" />

        <div className="mx-auto my-5 max-w-xs">
          <h3 className="text-lg font-bold text-gray-900">Confirmer la suppression</h3>
          <p className="mt-2 text-sm text-gray-500">Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onConfirm} className="w-full rounded-md bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600">Supprimer</button>
          <button type="button" onClick={onClose} className="w-full rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200">Annuler</button>
        </div>
      </div>
    </ModalSection>
  )
}

export { ModalSection, DeleteModal }