"use client";

type DocumentUploadProps = {
  id: string;
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export function DocumentUpload({ id, label, file, onChange }: DocumentUploadProps) {
  return (
    <div className="border border-white/10 p-4 transition duration-500 focus-within:border-gold hover:border-white/25">
      <label htmlFor={id} className="block text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.55]">
        {label}
      </label>
      <div className="mt-3 flex min-h-14 items-center justify-between gap-4 border border-white/10 px-4 text-sm text-white/70">
        <span className="min-w-0 truncate">{file ? file.name : "Photo ou PDF"}</span>
        <div className="flex shrink-0 items-center gap-3">
          {file ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="luxury-focus text-[0.62rem] uppercase tracking-[0.18em] text-white/[0.45] transition duration-500 hover:text-gold"
            >
              Retirer
            </button>
          ) : null}
          <label
            htmlFor={id}
            className="luxury-focus cursor-pointer text-[0.62rem] uppercase tracking-[0.18em] text-gold"
          >
            Ajouter
          </label>
        </div>
      </div>
      <input
        id={id}
        name={id}
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        className="sr-only"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
