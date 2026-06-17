import { useEffect } from "react";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeLabel = "Fermer la fenêtre",
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6"
      onClick={onClose}
    >
      <section
        aria-modal="true"
        className={`relative w-full ${sizeClasses[size] || sizeClasses.md} rounded-card bg-soft-linen p-5 text-coffee-beans shadow-2xl`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label={closeLabel}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-button text-coffee-beans hover:bg-vanilla-custard"
          onClick={onClose}
          type="button"
        >
          X
        </button>

        <div className="pr-10">
          {title ? <h2 className="font-display text-xl text-coffee-beans">{title}</h2> : null}
          {description ? <p className="mt-2 text-base leading-7 text-coffee-beans/75">{description}</p> : null}
        </div>

        {children ? <div className="mt-5">{children}</div> : null}
        {footer ? <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</div> : null}
      </section>
    </div>
  );
}

export function DeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  description = "Cette action est définitive. Elle ne pourra pas être annulée.",
  confirmLabel = "Supprimer",
  cancelLabel = "Annuler",
}) {
  return (
    <Modal
      description={description}
      footer={
        <>
          <button
            className="min-h-11 rounded-button border border-coffee-beans bg-white px-4 text-base font-bold text-coffee-beans hover:bg-vanilla-custard"
            onClick={onClose}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-inferno px-4 text-base font-bold text-white hover:bg-[#7d0800]"
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      size="sm"
      title={title}
    />
  );
}

export const ModalSection = Modal;
export default Modal;
