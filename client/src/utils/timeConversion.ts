export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const date: Date = new Date(dateString)
  return date.toLocaleDateString("id-ID", options)
}

export const formatMsToDuration = (milliseconds: number): string => {
  const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
  )
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

  // Membuat string berdasarkan durasi
  let durationString = ""
  if (months > 0) {
    durationString += `${months} Bulan, `
  }
  if (days > 0) {
    durationString += `${days} Hari, `
  }
  if (hours > 0) {
    durationString += `${hours} Jam, `
  }
  if (minutes > 0) {
    durationString += `${minutes} Menit`
  }

  return durationString.trim()
}
