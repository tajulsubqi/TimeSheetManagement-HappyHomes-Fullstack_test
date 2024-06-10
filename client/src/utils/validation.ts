// utils/validation.js

export const validateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return start <= end
}

export const validateTimeRange = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}Z`)
  const end = new Date(`1970-01-01T${endTime}Z`)

  return start <= end
}
