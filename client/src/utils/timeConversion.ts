const formatMsToHoursMinutes = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours} Jam ${minutes} Menit`
}

export const calculateDuration = (startTime: string, endTime: string) => {
  const start: Date = new Date(`1970-01-01T${startTime}Z`)
  const end: Date = new Date(`1970-01-01T${endTime}Z`)
  const duration: number = end.getTime() - start.getTime()

  return formatMsToHoursMinutes(duration)
}

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const date: Date = new Date(dateString)
  return date.toLocaleDateString("id-ID", options)
}

//
export const formatMsToDaysHoursMinutes = (milliseconds: number): string => {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

  // Membuat string berdasarkan durasi
  let durationString = ""
  if (days > 0) {
    durationString += `${days} Hari `
  }
  if (hours > 0) {
    durationString += `${hours} Jam `
  }
  if (minutes > 0) {
    durationString += `${minutes} Menit`
  }

  return durationString.trim() // Menghapus spasi di awal dan akhir
}
