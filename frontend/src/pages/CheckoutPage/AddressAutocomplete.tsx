import { useEffect, useRef, useState } from "react";

type Suggestion = {
  value: string;
  unrestricted_value: string;
  data?: any;
};

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function AddressAutocomplete({
  value,
  onChange,
  apiUrl,
}: {
  value: string;
  onChange: (val: string) => void;
  apiUrl: string;
}) {
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const q = useDebouncedValue(value, 350);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    let alive = true;

    async function run() {
      const query = (q ?? "").trim();
      if (query.length < 3) {
        setItems([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/suggest/address`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ query, count: 8 }),
        });
        const data = await res.json();
        if (!alive) return;
        setItems(Array.isArray(data?.suggestions) ? data.suggestions : []);
        setOpen(true);
      } catch {
        if (!alive) return;
        setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [q, apiUrl]);

  const hasList = open && (loading || items.length > 0);

  return (
    <div ref={rootRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => value.trim().length >= 3 && setOpen(true)}
        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400"
        placeholder="Город, улица, дом"
        autoComplete="off"
      />

      {hasList && (
        <div className="absolute z-50 mt-2 w-full max-h-80 overflow-y-auto custom-scroll rounded-2xl border border-gray-200 bg-white shadow-xl">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">Поиск адреса…</div>
          )}
          {!loading &&
            items.map((s, idx) => (
              <button
                key={`${s.value}-${idx}`}
                type="button"
                onClick={() => {
                  onChange(s.unrestricted_value || s.value);
                  setOpen(false);
                  setItems([]);
                }}
                className="w-full text-left px-4 py-3 text-sm hover:bg-pink-50"
              >
                <div className="font-medium text-gray-900">{s.value}</div>
                {s.unrestricted_value && s.unrestricted_value !== s.value && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {s.unrestricted_value}
                  </div>
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
