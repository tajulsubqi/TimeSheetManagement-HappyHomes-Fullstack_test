export const formatToRupiah = (amount: number): string => {
  // Format amount to Indonesian Rupiah
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount)

  // Remove trailing zeroes after decimal point
  const trimmedAmount = formattedAmount.replace(/(\.|,)00$/, "")

  return trimmedAmount
}
