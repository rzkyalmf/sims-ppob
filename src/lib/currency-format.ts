export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("IDR", "Rp")
    .replace(/\s/g, "") // Hapus semua spasi
    .replace(/\./g, ".") // Ubah titik jadi koma untuk ribuan
    .replace(/,00$/, ""); // Hapus desimal .00
};
