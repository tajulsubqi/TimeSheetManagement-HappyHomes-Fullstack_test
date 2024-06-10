const formatMsToHoursMinutes = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

  if (hours === 0 && minutes === 0) {
    return "0 Jam 0 Menit"
  }

  let durationString = ""
  if (hours > 0) {
    durationString += `${hours} Jam `
  }
  if (minutes > 0) {
    durationString += `${minutes} Menit`
  }

  return durationString.trim()
}

export const calculateDuration = (startTime: string, endTime: string) => {
  const start: Date = new Date(`1970-01-01T${startTime}Z`)
  const end: Date = new Date(`1970-01-01T${endTime}Z`)
  const duration: number = end.getTime() - start.getTime()

  return formatMsToHoursMinutes(duration)
}
